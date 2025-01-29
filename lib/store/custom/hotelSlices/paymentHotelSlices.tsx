import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Passenger Types
interface BasePassenger {
  id: number;
  first_name: string;
  last_name: string;
  birth_date: string;
  email?: string;
  phone?: string;
}

// Room Data Structure
interface RoomData {
  room_id: number;
  passengers: {
    adults: BasePassenger[];
    children: BasePassenger[];
  };
}

// State Interface
interface PaymentHotelState {
  hotel: any;
  rooms: any[];
  currentStep: number;
  steps: string[];
  RoomsData: RoomData[];
  resultPreBook:null
}

// Local Storage Key
const STORAGE_KEY = 'hotelPaymentState';

// Create Initial State
const createInitialState = (): PaymentHotelState => ({
  hotel: null,
  rooms: [],
  currentStep: 1,
  steps: [],
  RoomsData: [],
  resultPreBook:null
});

// Load State from LocalStorage
const loadStateFromLocalStorage = (): PaymentHotelState => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    return serializedState 
      ? JSON.parse(serializedState) 
      : createInitialState();
  } catch (err) {
    console.error('Failed to load state from localStorage', err);
    return createInitialState();
  }
};

// Save State to LocalStorage
const saveStateToLocalStorage = (state: PaymentHotelState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save state to localStorage', err);
  }
};

const hotelPaymentSlice = createSlice({
  name: 'hotelPayment',
  initialState: loadStateFromLocalStorage(),
  reducers: {
    setHotel(state, action: PayloadAction<any>) {
      state.hotel = action.payload;
      saveStateToLocalStorage(state);
    },
    setRooms(state, action: PayloadAction<any[]>) {
      state.rooms = action.payload;
      saveStateToLocalStorage(state);
    },
    setPreeBook(state, action: PayloadAction<any>) {
      state.resultPreBook = action.payload;
      state.steps = action.payload.rooms.map((_:any, index:number) => `Réglage de la chambre: ${index + 1}`);
      state.steps.push('Vérifier'); 
      saveStateToLocalStorage(state);
    },
    
    updatePassenger(state, action: PayloadAction<{
      roomIndex: number;
      type: 'adults' | 'children';
      passengerData: BasePassenger;
      index?: number;
    }>) {
      const { roomIndex, type, passengerData, index } = action.payload;
      const room = state.RoomsData[roomIndex];
      
      if (index !== undefined) {
        // Update existing passenger
        room.passengers[type][index] = {
          ...room.passengers[type][index],
          ...passengerData
        };
      } else {
        // Add new passenger
        room.passengers[type].push({
          ...passengerData,
          id: Date.now()
        });
      }

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
    clearState(state) {
      localStorage.removeItem(STORAGE_KEY);
      return createInitialState();
    }
  }
});

export const {
  setHotel,
  setRooms,
  updatePassenger,
  setCurrentStep,
  nextStep,
  previousStep,
  clearState,
  setPreeBook
} = hotelPaymentSlice.actions;

export default hotelPaymentSlice.reducer;