import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TravelOptionsState {
  selectedOption: string;
}

const initialState: TravelOptionsState = {
  selectedOption: 'Best',
};

export const travelOptionsSlice = createSlice({
  name: 'travelOptions',
  initialState,
  reducers: {
    setSelectedOption: (state, action: PayloadAction<string>) => {
      state.selectedOption = action.payload;
    },
  },
});

export const { setSelectedOption } = travelOptionsSlice.actions;

export default travelOptionsSlice.reducer;
