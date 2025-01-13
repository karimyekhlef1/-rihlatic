import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimeFiltersState {
  selectedDepartureTimes: string[];
  selectedReturnTimes: string[];
}

const initialState: TimeFiltersState = {
  selectedDepartureTimes: [],
  selectedReturnTimes: [],
};

const timeFiltersSlice = createSlice({
  name: 'timeFilters',
  initialState,
  reducers: {
    toggleDepartureTime: (state, action: PayloadAction<string>) => {
      const timeValue = action.payload;
      const index = state.selectedDepartureTimes.indexOf(timeValue);
      if (index === -1) {
        state.selectedDepartureTimes.push(timeValue);
      } else {
        state.selectedDepartureTimes.splice(index, 1);
      }
    },
    toggleReturnTime: (state, action: PayloadAction<string>) => {
      const timeValue = action.payload;
      const index = state.selectedReturnTimes.indexOf(timeValue);
      if (index === -1) {
        state.selectedReturnTimes.push(timeValue);
      } else {
        state.selectedReturnTimes.splice(index, 1);
      }
    },
    resetTimeFilters: (state) => {
      state.selectedDepartureTimes = [];
      state.selectedReturnTimes = [];
    },
  },
});

export const { toggleDepartureTime, toggleReturnTime, resetTimeFilters } = timeFiltersSlice.actions;
export default timeFiltersSlice.reducer;
