import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimeRange {
  start: string;
  end: string;
}

interface HoursState {
  departureTimes: string[];
  arrivalTimes: string[];
  selectedDepartureTimes: string[];
  selectedArrivalTimes: string[];
  loading: boolean;
}

const initialState: HoursState = {
  departureTimes: [],
  arrivalTimes: [],
  selectedDepartureTimes: [],
  selectedArrivalTimes: [],
  loading: false,
};

const hoursSlice = createSlice({
  name: 'hours',
  initialState,
  reducers: {
    setDepartureTimes: (state, action: PayloadAction<string[]>) => {
      state.departureTimes = action.payload;
    },
    setArrivalTimes: (state, action: PayloadAction<string[]>) => {
      state.arrivalTimes = action.payload;
    },
    toggleDepartureTime: (state, action: PayloadAction<string>) => {
      const time = action.payload;
      const index = state.selectedDepartureTimes.indexOf(time);
      if (index === -1) {
        state.selectedDepartureTimes.push(time);
      } else {
        state.selectedDepartureTimes.splice(index, 1);
      }
    },
    toggleArrivalTime: (state, action: PayloadAction<string>) => {
      const time = action.payload;
      const index = state.selectedArrivalTimes.indexOf(time);
      if (index === -1) {
        state.selectedArrivalTimes.push(time);
      } else {
        state.selectedArrivalTimes.splice(index, 1);
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearTimeSelections: (state) => {
      state.selectedDepartureTimes = [];
      state.selectedArrivalTimes = [];
    },
  },
});

export const {
  setDepartureTimes,
  setArrivalTimes,
  toggleDepartureTime,
  toggleArrivalTime,
  setLoading,
  clearTimeSelections,
} = hoursSlice.actions;

export default hoursSlice.reducer;
