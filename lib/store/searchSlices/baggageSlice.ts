import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BaggageState {
  cabin: number;
  checked: number;
}

const initialState: BaggageState = {
  cabin: 0,
  checked: 0,
};

const baggageSlice = createSlice({
  name: 'baggage',
  initialState,
  reducers: {
    incrementCabin: (state) => {
      state.cabin += 1;
    },
    decrementCabin: (state) => {
      state.cabin = Math.max(0, state.cabin - 1);
    },
    incrementChecked: (state) => {
      state.checked += 1;
    },
    decrementChecked: (state) => {
      state.checked = Math.max(0, state.checked - 1);
    },
  },
});

export const {
  incrementCabin,
  decrementCabin,
  incrementChecked,
  decrementChecked,
} = baggageSlice.actions;
export default baggageSlice.reducer;
