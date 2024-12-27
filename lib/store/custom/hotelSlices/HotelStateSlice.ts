import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PriceRange {
  min: number;
  max: number;
}

interface HotelState {
  maxMinRangePrice: PriceRange;
  filterRangePrice: PriceRange;
  filterRating: number;
}

const initialState: HotelState = {
  maxMinRangePrice: { min: 0, max: 1000 }, // Example initial range
  filterRangePrice: { min: 0, max: 1000 }, // Example initial range
  filterRating: 0, // Example initial rating
};

const HotelStateSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    setMaxMinRangePrice(state, action: PayloadAction<PriceRange>) {
      
      state.maxMinRangePrice = action.payload;
    },
    setFilterRangePrice(state, action: PayloadAction<PriceRange>) {
      state.filterRangePrice = action.payload;
    },
    setFilterRating(state, action: PayloadAction<number>) {
      state.filterRating = action.payload;
    },
  },
});

export const { setMaxMinRangePrice, setFilterRangePrice, setFilterRating } =
HotelStateSlice.actions;

export default HotelStateSlice.reducer;
