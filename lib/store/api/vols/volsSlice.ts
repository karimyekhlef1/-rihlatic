import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import volsService from '@/lib/services/vols/vols_package';

interface VolsState {
    loading: boolean;
    flightsData: any;
    airportsData: any;
}

const initialState: VolsState = {
    loading: false,
    flightsData: {},
    airportsData: {},
};

export const searchFlights = createAsyncThunk('flights/search', async (params: any, thunkApi) => {
    try {
        const response = await volsService.searchFlights(params);
        return response;
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.response.data);
    }
});

export const getAirports = createAsyncThunk('airports/search', async (searchTerm: string, thunkApi) => {
    try {
        const response = await volsService.getAirportsData(searchTerm);
        return response;
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.response.data);
    }
});

const VolsSlice = createSlice({
    name: 'vols',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Search Flights
        builder
            .addCase(searchFlights.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchFlights.fulfilled, (state, action) => {
                state.loading = false;
                state.flightsData = action.payload;
            })
            .addCase(searchFlights.rejected, (state) => {
                state.loading = false;
            });

        // Get Airports
        builder
            .addCase(getAirports.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAirports.fulfilled, (state, action) => {
                state.loading = false;
                state.airportsData = action.payload;
            })
            .addCase(getAirports.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { actions, reducer } = VolsSlice;
export default reducer;
