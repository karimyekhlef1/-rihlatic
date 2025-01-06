import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateRange } from 'react-day-picker';

interface OmraState {
    dateRange: DateRange;
    volError: string;
}

const initialState: OmraState = {
    dateRange: {
        from: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        to: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    },
    volError: '',
};

const omraSearchSlice = createSlice({
    name: 'omraSearch',
    initialState,
    reducers: {
        setVolError: (state, action: PayloadAction<string>) => {
            state.volError = action.payload;
        },
        setDateRange: (state, action: PayloadAction<DateRange>) => {
            state.dateRange = action.payload;
        },
    },
});

export const { setDateRange, setVolError } = omraSearchSlice.actions;

export default omraSearchSlice.reducer;