import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateRange } from 'react-day-picker';

interface HotelState {
    dateRange: DateRange;
    rooms: Room[];
    volError: string;
}

interface Room {
    adults: number;
    children: number;
}

const initialState: HotelState = {
    dateRange: {
        from: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        to: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    },
    rooms: [
        {
            adults: 1,
            children: 0,
        },
    ],
    volError: '',
};

const hotelSearchSlice = createSlice({
    name: 'hotelSearch',
    initialState,
    reducers: {
        setHotelRooms: (state, action: PayloadAction<Room[]>) => {
            state.rooms = action.payload;
        },
        setVolError: (state, action: PayloadAction<string>) => {
            state.volError = action.payload;
        },
        setDateRange: (state, action: PayloadAction<DateRange>) => {
            state.dateRange = action.payload;
        },
    },
});

export const { setHotelRooms, setDateRange, setVolError } = hotelSearchSlice.actions;

export default hotelSearchSlice.reducer;