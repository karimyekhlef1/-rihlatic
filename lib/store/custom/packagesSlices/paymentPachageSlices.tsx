import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaymentPackageState {
  package: any;
  departure: any;
  rooms: any[]; // Array of rooms
  currentStep: number; // Current step in the process
  steps: string[]; // Labels for the steps (one per room + a final verification step)
}

const initialState: PaymentPackageState = {
  package: null,
  departure: null,
  rooms: [],
  currentStep: 1, // Start from the first step
  steps: [], // This will be dynamically populated based on the number of rooms
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

      // Generate steps dynamically based on the number of rooms
      state.steps = action.payload.map((_, index) => `Réglage de la chambre: ${index + 1}`);
      state.steps.push('Vérifier'); // Add a final verification step
    },
    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload; // Update the current step
    },
    nextStep(state) {
      if (state.currentStep < state.steps.length) {
        state.currentStep += 1; // Move to the next step
      }
    },
    previousStep(state) {
      if (state.currentStep > 1) {
        state.currentStep -= 1; // Move to the previous step
      }
    },
  },
});

export const {
  setPackage,
  setDeparture,
  setRooms,
  setCurrentStep,
  nextStep,
  previousStep,
} = paymentPackageSlice.actions;

export default paymentPackageSlice.reducer;
