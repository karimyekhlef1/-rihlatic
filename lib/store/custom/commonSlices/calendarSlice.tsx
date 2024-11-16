import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';

interface CalendarState {
  dateRange: DateRange | undefined;
}

const initialState: CalendarState = {
  dateRange: {
    from: new Date(),
    to: addDays(new Date(), 7),
  },
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setDateRange: (state, action: PayloadAction<DateRange | undefined>) => {
      state.dateRange = action.payload;
    },
  },
});

export const { setDateRange } = calendarSlice.actions;

export default calendarSlice.reducer;
