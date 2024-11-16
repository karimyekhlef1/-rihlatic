import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';

interface DatePickerState {
  date: DateRange | undefined;
}

const initialState: DatePickerState = {
  date: {
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  },
};

const datePickerSlice = createSlice({
  name: 'datePicker',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<DateRange | undefined>) => {
      state.date = action.payload;
    },
  },
});

export const { setDate } = datePickerSlice.actions;
export default datePickerSlice.reducer;
