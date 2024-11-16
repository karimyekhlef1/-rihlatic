import { createSlice, configureStore } from '@reduxjs/toolkit';

const paymentStepSlice = createSlice({
  name: 'paymentStep',
  initialState: {
    step: 'details',
  },
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
  },
});

export const { setStep } = paymentStepSlice.actions;

export default paymentStepSlice.reducer;
