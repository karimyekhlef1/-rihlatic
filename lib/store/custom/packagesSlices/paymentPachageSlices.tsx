import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UpdatePassengerFieldPayload {
  room_id: number;
  type: 'adults' | 'children' | 'infants';
  index: number;
  field: string;
  value: string | null;
}

interface Passenger {
  id: number;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  sex: string;
  passport_nbr: string;
  passport_expire_at: string | null;
  passport_scan: string | null;
  birth_date: string;
}

interface RoomData {
  room_id: number;
  passengers: {
    adults: Passenger[];
    children: Passenger[];
    infants: Passenger[];
  };
}

interface PaymentPackageState {
  package: any;
  departure: any;
  rooms: any[];
  currentStep: number;
  steps: string[];
  RoomsData: RoomData[];
}

const initialState: PaymentPackageState = {
  package: null,
  departure: null,
  rooms: [],
  currentStep: 1,
  steps: [],
  RoomsData: []
};

const paymentPackageSlice = createSlice({
  name: 'paymentPackage',
  initialState,
  reducers: {
    setPackage(state, action: PayloadAction<any>) {
      state.package = action.payload;
    },
    setDeparture(state, action: PayloadAction<any>) {
      state.departure = action.payload;
    },
    setRooms(state, action: PayloadAction<any[]>) {
      state.rooms = action.payload;
      state.steps = action.payload.map((_, index) => `Réglage de la chambre: ${index + 1}`);
      state.steps.push('Vérifier');
    },
    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    nextStep(state) {
      if (state.currentStep < state.steps.length) {
        state.currentStep += 1;
      }
    },
    previousStep(state) {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    updatePassengerFieldByIndex(state, action: PayloadAction<UpdatePassengerFieldPayload>) {
      const { room_id, type, index, field, value } = action.payload;
      
      // Find room, create if not exists
      let room = state.RoomsData.find(r => r.room_id === room_id);
      if (!room) {
        room = {
          room_id,
          passengers: {
            adults: [],
            children: [],
            infants: []
          }
        };
        state.RoomsData.push(room);
      }

      // Ensure passenger type array exists and has enough elements
      const passengerTypeArray = room.passengers[type];
      while (passengerTypeArray.length <= index) {
        passengerTypeArray.push({
          id: Date.now() + passengerTypeArray.length, // generate unique id
          email: '',
          phone: '',
          first_name: '',
          last_name: '',
          sex: '',
          passport_nbr: '',
          passport_expire_at: null,
          passport_scan: null,
          birth_date: ''
        });
      }

      // Update specific field
      passengerTypeArray[index] = {
        ...passengerTypeArray[index],
        [field]: value
      };
    }
  }
});

export const {
  setPackage,
  setDeparture,
  setRooms,
  setCurrentStep,
  nextStep,
  previousStep,
  updatePassengerFieldByIndex
} = paymentPackageSlice.actions;

export default paymentPackageSlice.reducer;