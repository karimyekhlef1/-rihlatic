import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type StopFilterValue = 'any' | 'direct' | 'up-to-1-stop' | 'up-to-2-stops';

interface StopsFilterState {
  selectedStopFilter: StopFilterValue;
}

const initialState: StopsFilterState = {
  selectedStopFilter: 'any'
};

const stopsFilterSlice = createSlice({
  name: 'stopsFilter',
  initialState,
  reducers: {
    setStopFilter: (state, action: PayloadAction<StopFilterValue>) => {
      state.selectedStopFilter = action.payload;
    },
    resetStopFilter: (state) => {
      state.selectedStopFilter = 'any';
    },
  },
});

export const { setStopFilter, resetStopFilter } = stopsFilterSlice.actions;
export default stopsFilterSlice.reducer;
