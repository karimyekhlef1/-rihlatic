import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    adults: 1,
    children: 0,
  },
  reducers: {
    incrementAdults: (state) => {
      state.adults += 1;
    },
    decrementAdults: (state) => {
      if (state.adults > 1) state.adults -= 1;
    },
    incrementChildren: (state) => {
      state.children += 1;
    },
    decrementChildren: (state) => {
      if (state.children > 0) state.children -= 1;
    },
  },
});

export const {
  incrementAdults,
  decrementAdults,
  incrementChildren,
  decrementChildren,
} = bookingSlice.actions;

export default bookingSlice.reducer;
