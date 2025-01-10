import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import volsService from '@/lib/services/vols/vols_package';
import { setCarriers } from '@/lib/store/custom/searchSlices/carrierSlice';

interface VolsState {
    loading: boolean;
    flightsData: any[];
    airportsData: any;
    error: string | null;
}

const initialState: VolsState = {
    loading: false,
    flightsData: [],
    airportsData: {},
    error: null
};

const extractUniqueCarriers = (flights: any[]) => {
    const carriersMap = new Map();
    
    flights.forEach(flight => {
        flight.segments.forEach((segment: any[]) => {
            segment.forEach(leg => {
                // Check both airLine and airLineOperating
                const airlines = [leg.airLine, leg.airLineOperating];
                
                airlines.forEach(airline => {
                    if (airline && airline.iata) {
                        carriersMap.set(airline.iata, {
                            code: airline.iata,
                            name: airline.name,
                            // Logo can be added here if available in the future
                            logo: null
                        });
                    }
                });
            });
        });
    });
    
    return Array.from(carriersMap.values());
};

export const searchFlights = createAsyncThunk('flights/search', async (params: any, thunkApi) => {
    try {
        console.log('volsSlice - Search params received:', params);
        // Validate required fields
        if (!params.departureId || !params.arrivalId) {
            console.error('volsSlice - Missing airport codes:', { departureId: params.departureId, arrivalId: params.arrivalId });
            throw new Error('Please select both departure and arrival airports');
        }

        // Validate airport code format (IATA codes are typically 3 uppercase letters)
        const isValidAirportCode = (code: string) => /^[A-Z]{3}$/.test(code);
        
        if (!isValidAirportCode(params.departureId) || !isValidAirportCode(params.arrivalId)) {
            console.error('volsSlice - Invalid airport codes:', { departureId: params.departureId, arrivalId: params.arrivalId });
            throw new Error('Invalid airport codes. Expected IATA format (e.g., PAR, ALG)');
        }

        const response = await volsService.searchFlights(params);
        console.log('volsSlice - API response:', response);
        
        if (response.success) {
            const flights = response.result.data;
            // Extract and set carriers
            const carriers = extractUniqueCarriers(flights);
            thunkApi.dispatch(setCarriers(carriers));
            return flights;
        }
        console.error('volsSlice - API error:', response.message);
        throw new Error(response.message || 'Failed to fetch flights');
    } catch (error: any) {
        console.error('volsSlice - Error:', error.message);
        return thunkApi.rejectWithValue(error.message || 'Failed to fetch flights');
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
    reducers: {
        clearFlightsData: (state) => {
            state.flightsData = [];
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // Search Flights
        builder
            .addCase(searchFlights.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchFlights.fulfilled, (state, action) => {
                state.loading = false;
                state.flightsData = action.payload || [];
                state.error = null;
            })
            .addCase(searchFlights.rejected, (state, action) => {
                state.loading = false;
                state.flightsData = [];
                state.error = action.payload as string || 'Failed to fetch flights';
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
    }
});

export const { clearFlightsData } = VolsSlice.actions;
export default VolsSlice.reducer;
