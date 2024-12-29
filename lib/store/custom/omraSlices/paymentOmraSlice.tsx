import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaymentOmraState {
  omra: any;
  departure: any;
  currentStep: number;
}

// Local storage key
const STORAGE_KEY = "paymentOmraState";

// Create a default initial state
const createInitialState = (): PaymentOmraState => ({
  omra: null,
  departure: null,
  currentStep: 1,
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
    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
      saveStateToLocalStorage(state);
    },
    nextStep(state) {
      state.currentStep += 1;
      saveStateToLocalStorage(state);
    },
    previousStep(state) {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
        saveStateToLocalStorage(state);
      }
    },
    clearStoredState(state) {
      Object.assign(state, createInitialState());
      localStorage.removeItem(STORAGE_KEY);
    },
  },
});

export const {
  setOmra,
  setDeparture,
  setCurrentStep,
  nextStep,
  previousStep,
  clearStoredState,
} = paymentOmraSlice.actions;

export default paymentOmraSlice.reducer;
