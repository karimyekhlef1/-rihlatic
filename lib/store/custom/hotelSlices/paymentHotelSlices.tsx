// PaymentHotelSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
interface BasePassenger {
  firstname: string;
  lastname: string;
  civility: String;
}

interface RoomData {
  email?: string;
  phone?: string;
  passengers: {
    adults: BasePassenger[];
    children: BasePassenger[];
  };
}

interface PaymentHotelState {
  hotel: any;
  rooms: any[];
  currentStep: number;
  steps: string[];
  RoomsData: RoomData[];
  RoomsTypes: any[];
  resultPreBook: any;
}

// Constants
const STORAGE_KEY = 'hotelPaymentState';

// Initial state creator
const createInitialState = (): PaymentHotelState => ({
  hotel: null,
  rooms: [],
  currentStep: 1,
  steps: [],
  RoomsData: [],
  RoomsTypes: [],
  resultPreBook: null
});

// Storage utilities
const storage = {
  load: (): PaymentHotelState => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : createInitialState();
    } catch (err) {
      console.error('Failed to load state:', err);
      return createInitialState();
    }
  },
  
  save: (state: PaymentHotelState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.error('Failed to save state:', err);
    }
  }
};

const hotelPaymentSlice = createSlice({
  name: 'hotelPayment',
  initialState: storage.load(),
  reducers: {
    setHotel: (state, action: PayloadAction<any>) => {
      state.hotel = action.payload;
      storage.save(state);
    },
    
    setRooms: (state, action: PayloadAction<any[]>) => {
      state.rooms = action.payload;
      storage.save(state);
    },
    
    setPreeBook: (state, action: PayloadAction<any>) => {
      const { rooms } = action.payload;
      state.resultPreBook = action.payload;
      state.steps = rooms.map((_: any, index: number) => `Réglage de la chambre: ${index + 1}`);
      state.steps.push('Vérifier');
      state.RoomsTypes = rooms;
      state.RoomsData = rooms.map(() => ({
        passengers: {
          adults: [],
          children: []
        }
      }));
      storage.save(state);
    },
    
    updatePassenger: (
      state,
      action: PayloadAction<{
        roomIndex: number;
        type: 'adults' | 'children';
        passengerData: Partial<BasePassenger>;
        index: number;
        field:string,
        value:string
      }>
    ) => {
      const { roomIndex, type, passengerData, index,field,value } = action.payload;
      const room = state.RoomsData[roomIndex]
      const passengerTypeArray = room?.passengers[type];
      while (passengerTypeArray.length <= index) {
        passengerTypeArray.push({
          firstname: '',
          lastname: '',
          civility:''
        });
      }
      passengerTypeArray[index] = { ...passengerTypeArray[index], [field]: value };
      storage.save(state);
    },
    
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
      storage.save(state);
    },
    
    nextStep: (state) => {
      if (state.currentStep < state.steps.length) {
        state.currentStep += 1;
        storage.save(state);
      }
    },
    
    previousStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
        storage.save(state);
      }
    },
    
    clearState: () => {
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