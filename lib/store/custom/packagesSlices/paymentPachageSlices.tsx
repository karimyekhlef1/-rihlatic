import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Existing interfaces
interface UpdatePassengerFieldPayload {
  room_id: number;
  room_index:number
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
  cardToken:string
  validationSteps:boolean[]

}

// Local storage key
const STORAGE_KEY = 'paymentPackageState';

// Create a default initial state
const createInitialState = (): PaymentPackageState => ({
  package: null,
  departure: null,
  rooms: [],
  currentStep: 1,
  steps: [],
  RoomsData: [],
  cardToken : "",
  validationSteps:[]

});

// Function to load state from localStorage
const loadStateFromLocalStorage = (): PaymentPackageState => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) return createInitialState();
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Failed to load state from localStorage', err);
    return createInitialState();
  }
};

// Initial state with potential localStorage load
const initialState: PaymentPackageState = loadStateFromLocalStorage();

// Function to save state to localStorage
const saveStateToLocalStorage = (state: PaymentPackageState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (err) {
    console.error('Failed to save state to localStorage', err);
  }
};

const paymentPackageSlice = createSlice({
  name: 'paymentPackage',
  initialState,
  reducers: {
    setPackage(state, action: PayloadAction<any>) {
      state.package = action.payload;
      saveStateToLocalStorage(state);
    },
    setDeparture(state, action: PayloadAction<any>) {
      state.departure = action.payload;
      state.currentStep = 1; // Reset currentStep when departure changes
      saveStateToLocalStorage(state);
    },
    setRooms(state, action: PayloadAction<any[]>) {
      console.log(action.payload)
     
      const filteredRooms = action.payload.filter(room => room.roomType !== null);
      state.rooms = filteredRooms; 
      state.RoomsData = Array(filteredRooms.length).fill(null).map((_, index) => ({
        room_id: filteredRooms[index].roomType.id,
        passengers: {
          adults: [],
          children: [],
          infants: []
        }
      }));
      state.currentStep = 1; 
      state.steps = filteredRooms.map((_, index) => `Réglage de la chambre: ${index + 1}`);
      state.steps.push('Vérifier'); 
      state.validationSteps = new Array(filteredRooms.length + 1).fill(false);

      
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
    updatePassengerFieldByIndex(state, action: PayloadAction<UpdatePassengerFieldPayload>) {
      const { room_id,room_index, type, index, field, value } = action.payload;
      
      // Find room, create if not exists
 
      let room = state.RoomsData[room_index]
      // let room = state.RoomsData[room_index]
      console.log("state.RoomsData[room_index]",room_index)

      
      // Ensure passenger type array exists and has enough elements
      const passengerTypeArray = room?.passengers[type];
      while (passengerTypeArray.length <= index) {
        passengerTypeArray.push({
          id: Date.now() + passengerTypeArray.length,
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
      passengerTypeArray[index] = { ...passengerTypeArray[index], [field]: value };
      
      saveStateToLocalStorage(state);
    },
    reStateRoomData(state){
      localStorage.removeItem(STORAGE_KEY)
      state.RoomsData=[] ;
    },
    setCardToken(state , action: PayloadAction<any>){
      state.cardToken= action.payload
  
    },
    clearStoredState(state) {      
      localStorage.removeItem(STORAGE_KEY);
      return createInitialState();
    },
    setValidationStep(state, action: PayloadAction<{index: number, isValid: boolean}>) {
      state.validationSteps[action.payload.index] = action.payload.isValid;
      saveStateToLocalStorage(state);
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
  updatePassengerFieldByIndex,
  clearStoredState,
  reStateRoomData,
  setCardToken,
  setValidationStep
} = paymentPackageSlice.actions;

export default paymentPackageSlice.reducer;
