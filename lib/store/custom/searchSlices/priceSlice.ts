import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PriceRange {
  min: number;
  max: number;
}

interface PriceState {
  availableRange: PriceRange;
  selectedRange: PriceRange;
}

const initialState: PriceState = {
  availableRange: {
    min: 0,
    max: 0,
  },
  selectedRange: {
    min: 0,
    max: 0,
  },
};

const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    setPriceRange: (state, action: PayloadAction<PriceRange>) => {
      state.availableRange = action.payload;
      // Initially set the selected range to the available range
      state.selectedRange = action.payload;
    },
    setSelectedPriceRange: (state, action: PayloadAction<PriceRange>) => {
      state.selectedRange = action.payload;
    },
  },
});

export const { setPriceRange, setSelectedPriceRange } = priceSlice.actions;

export default priceSlice.reducer;
