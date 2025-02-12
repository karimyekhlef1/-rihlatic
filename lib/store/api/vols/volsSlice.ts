import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import volsService from '@/lib/services/vols/vols_package';
import { setCarriers } from '@/lib/store/custom/searchSlices/carrierSlice';
import { setAirplaneTypes } from '@/lib/store/custom/searchSlices/airplaneSlice';
import { setPriceRange } from '@/lib/store/custom/searchSlices/priceSlice';

interface VolsState {
    loading: boolean;
    flightsData: any[];
    selectedFlight: any | null;
    airportsData: any;
    error: string | null;
    conditions: any | null;
    conditionsLoading: boolean;
    conditionsError: string | null;
}

const initialState: VolsState = {
    loading: false,
    flightsData: [],
    selectedFlight: null,
    airportsData: {},
    error: null,
    conditions: null,
    conditionsLoading: false,
    conditionsError: null
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

const getAirplaneName = (code: string): string => {
    // This is a simplified mapping. In a real application, you might want to fetch this from an API or database
    const airplaneMap: { [key: string]: string } = {
        '73H': 'Boeing 737-800',
        '320': 'Airbus A320',
        '321': 'Airbus A321',
        '738': 'Boeing 737-800',
        '319': 'Airbus A319',
        // Add more mappings as needed
    };
    return airplaneMap[code] || code;
};

const extractUniqueAirplaneTypes = (flights: any[]) => {
    const airplaneTypesMap = new Map();
    
    flights.forEach(flight => {
        flight.segments.forEach((segment: any[]) => {
            segment.forEach(leg => {
                if (leg.equipmentType) {
                    const code = leg.equipmentType;
                    airplaneTypesMap.set(code, {
                        code,
                        name: `${getAirplaneName(code)} (${code})`
                    });
                }
            });
        });
    });
    
    return Array.from(airplaneTypesMap.values());
};

const extractPriceRange = (flights: any[]) => {
    const prices = flights.map(flight => flight.price);
    return {
        min: Math.min(...prices),
        max: Math.max(...prices)
    };
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
            // Extract and set airplane types
            const airplaneTypes = extractUniqueAirplaneTypes(flights);
            thunkApi.dispatch(setAirplaneTypes(airplaneTypes));
            // Extract and set price range
            const priceRange = extractPriceRange(flights);
            thunkApi.dispatch(setPriceRange(priceRange));
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

export const getFlightsConditions = createAsyncThunk('flights_conditions/search', async (data: any, thunkApi) => {
    try {
      console.log('Getting flight conditions with data:', JSON.stringify(data, null, 2));
      const response = await volsService.getFlightsConditions(data);
      console.log('Flight conditions raw response:', JSON.stringify(response, null, 2));
      
      // Validate response structure
      if (!response?.success) {
        throw new Error('API request failed: ' + response?.message || 'Unknown error');
      }
      
      if (!response?.result?.data?.[0]) {
        console.log('No conditions data in response');
        return {
          result: {
            data: []
          }
        };
      }
      
      return response;
    } catch (error: any) {
      console.error('Error getting flight conditions:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to get flight conditions';
      return thunkApi.rejectWithValue(errorMessage);
    }
});

export const storeReservationFlight = createAsyncThunk('flights_reservation', async (data: any, thunkApi) => {
    try {
        console.log("storeReservation==>",data)
        const response = await volsService.storReservationFlights(data);
        return response;
    } catch (error: any) {
    }
});
export const getVolsReservationDetails = createAsyncThunk(
    "VolReservationDetails/slice",
    async (params: any, thunkApi) => {
      try {
        const response = await volsService.getVolsReservation(params);
        return response;
      } catch (error: any) {
        return thunkApi.rejectWithValue(error.response.data);
      }
    }
  );

const VolsSlice = createSlice({
    name: 'vols',
    initialState,
    reducers: {
        clearFlightsData(state) {
            state.flightsData = [];
            state.error = null;
            state.loading = false;
        },
        setSelectedFlight(state, action) {
            state.selectedFlight = action.payload;
        }
    },
    extraReducers(builder) {
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

        // Get Flights Conditions
        builder
            .addCase(getFlightsConditions.pending, (state) => {
                state.conditionsLoading = true;
                state.conditionsError = null;
                state.conditions = null;
            })
            .addCase(getFlightsConditions.fulfilled, (state, action) => {
                state.conditionsLoading = false;
                state.conditions = action.payload;
                state.conditionsError = null;
            })
            .addCase(getFlightsConditions.rejected, (state, action) => {
                state.conditionsLoading = false;
                state.conditions = null;
                state.conditionsError = action.payload as string || 'Failed to get flight conditions';
            })
            //stor resarvation
            .addCase(storeReservationFlight.pending, (state) => {
                state.loading = true;
            })
            .addCase(storeReservationFlight.fulfilled, (state, action) => {
                state.loading = false;
                state.airportsData = action.payload;
            })
            .addCase(storeReservationFlight.rejected, (state) => {
                state.loading = false;
            })
            //list 
            .addCase(getVolsReservationDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getVolsReservationDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.airportsData = action.payload;
            })
            .addCase(getVolsReservationDetails.rejected, (state) => {
                state.loading = false;
            });

    }
});

export const { clearFlightsData, setSelectedFlight } = VolsSlice.actions;
export default VolsSlice.reducer;
