import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interfaces from omraReservationSlice
interface Passenger {
  email: string | null;
  phone: string | null;
  first_name: string;
  last_name: string;
  sex: "male" | "female";
  passport_nbr: string;
  passport_expire_at: string;
  passport_scan: string | null;
  birth_date: string;
}

interface Passengers {
  adults: Passenger[];
  children: Passenger[];
  children_without_bed: Passenger[];
  infants: Passenger[];
}

interface Room {
  room_id: number;
  type: string;
  reservation_type: string;
  passengers: Passengers;
}

interface PaymentOmraState {
  omra: any;
  departure: any;
  rooms: Room[];
  currentStep: number;
  steps: string[];
  RoomsData: Room[];
}

// Local storage key
const STORAGE_KEY = "paymentOmraState";

// Create a default initial state
const createInitialState = (): PaymentOmraState => ({
  omra: null,
  departure: null,
  rooms: [],
  currentStep: 1,
  steps: ["Room Information", "Verify"],
  RoomsData: [],
});

// Function to load state from localStorage
const loadStateFromLocalStorage = (): PaymentOmraState => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) return createInitialState();
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Failed to load state from localStorage", err);
    return createInitialState();
  }
};

// Initial state with potential localStorage load
const initialState: PaymentOmraState = loadStateFromLocalStorage();

// Function to save state to localStorage
const saveStateToLocalStorage = (state: PaymentOmraState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (err) {
    console.error("Failed to save state to localStorage", err);
  }
};

const paymentOmraSlice = createSlice({
  name: "paymentOmra",
  initialState,
  reducers: {
    setOmra(state, action: PayloadAction<any>) {
      state.omra = action.payload;
      saveStateToLocalStorage(state);
    },
    setDeparture(state, action: PayloadAction<any>) {
      state.departure = action.payload;
      state.currentStep = 1; // Reset currentStep when departure changes
      saveStateToLocalStorage(state);
    },
    setRooms(state, action: PayloadAction<Room[]>) {
      state.rooms = action.payload;
      state.currentStep = 1; // Reset currentStep when rooms change
      saveStateToLocalStorage(state);
    },
    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
      saveStateToLocalStorage(state);
    },
    nextStep(state) {
      if (state.currentStep < state.steps.length) {
        state.currentStep += 1;
        saveStateToLocalStorage(state);
      }
    },
    previousStep(state) {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
        saveStateToLocalStorage(state);
      }
    },
    updatePassengerField(
      state,
      action: PayloadAction<{
        room_id: number;
        type: keyof Passengers;
        index: number;
        field: keyof Passenger;
        value: string | null;
      }>
    ) {
      const { room_id, type, index, field, value } = action.payload;

      // Find room, create if not exists
      let room = state.RoomsData.find((r) => r.room_id === room_id);
      if (!room) {
        room = {
          room_id,
          type: "",
          reservation_type: "",
          passengers: {
            adults: [],
            children: [],
            children_without_bed: [],
            infants: [],
          },
        };
        state.RoomsData.push(room);
      }

      // Ensure passenger type array exists and has enough elements
      const passengerTypeArray = room.passengers[type];
      while (passengerTypeArray.length <= index) {
        passengerTypeArray.push({
          email: null,
          phone: null,
          first_name: "",
          last_name: "",
          sex: "male",
          passport_nbr: "",
          passport_expire_at: "",
          passport_scan: null,
          birth_date: "",
        });
      }

      // Update specific field
      passengerTypeArray[index] = {
        ...passengerTypeArray[index],
        [field]: value,
      };

      saveStateToLocalStorage(state);
    },
    clearStoredState(state) {
      localStorage.removeItem(STORAGE_KEY);
      return createInitialState();
    },
  },
});

export const {
  setOmra,
  setDeparture,
  setRooms,
  setCurrentStep,
  nextStep,
  previousStep,
  updatePassengerField,
  clearStoredState,
} = paymentOmraSlice.actions;

export default paymentOmraSlice.reducer;
