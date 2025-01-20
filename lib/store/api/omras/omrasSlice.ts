import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import omrasService from '@/lib/services/omras/omras_package';
import axios from 'axios';
import { omras_bookings_endpoint } from '@/app/Constant/urls';
import { RootState } from '@/lib/store/store';

// Define API base URL
const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface OmrasState {
  loading: boolean;
  error: string | null;
  omraData: any;
}

const initialState: OmrasState = {
  loading: false,
  error: null,
  omraData: {},
};

export const getOmraDetails = createAsyncThunk('omraDetails/slice', async (params: any, { rejectWithValue }) => {
  try {
    const response = await omrasService.getOmraData(params);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const getOmraReservationDetails = createAsyncThunk('omraReservationDetails/slice', async (params: any, { rejectWithValue }) => {
  try {
    const response = await omrasService.getOmraReservationData(params);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const storeOmraReservation = createAsyncThunk(
  'omras/storeOmraReservation',
  async (formData: FormData, { rejectWithValue, getState }) => {
    console.log("[Omra API] Starting store omra reservation");
    
    // Get auth token from state
    const state = getState() as RootState;
    const token = state.signIn.userData?.token;

    if (!token) {
      console.error("[Omra API] No authentication token found");
      return rejectWithValue("You must be logged in to make a reservation");
    }

    // Log FormData entries safely
    console.log("[Omra API] FormData entries:");
    const entries = Array.from(formData.entries());
    entries.forEach(([key, value]) => {
      if (key === 'data') {
        console.log("[Omra API] Data payload:", JSON.parse(value as string));
      } else {
        console.log("[Omra API] File entry:", key, value instanceof File ? `File: ${value.name}` : value);
      }
    });

    try {
      console.log("[Omra API] Sending request to:", omras_bookings_endpoint);
      const response = await axios.post(
        omras_bookings_endpoint,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log("[Omra API] Reservation stored successfully:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("[Omra API] Error storing reservation:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        return rejectWithValue("Please log in again to continue");
      }
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getOmraDepartures = createAsyncThunk(
  'omras/getOmraDepartures',
  async (_, { rejectWithValue }) => {
    console.log("[Omra API] Fetching omra departures");
    try {
      const response = await axios.get(`${apiBaseUrl}/api/omras/departures`);
      console.log("[Omra API] Departures fetched successfully:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("[Omra API] Error fetching departures:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const cancelOmraPenalty = createAsyncThunk(
  'omraCancelPenalty/slice',
  async ({ data, id }: { data: any; id: string }, { rejectWithValue }) => {
    try {
      const response = await omrasService.cancelOmraPenalty(data, id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const omrasSlice = createSlice({
  name: 'omras',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOmraDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOmraDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.omraData = action.payload;
      })
      .addCase(getOmraDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(getOmraReservationDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOmraReservationDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.omraData = action.payload;
      })
      .addCase(getOmraReservationDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(storeOmraReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(storeOmraReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.omraData = action.payload;
      })
      .addCase(storeOmraReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(getOmraDepartures.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOmraDepartures.fulfilled, (state, action) => {
        state.loading = false;
        state.omraData = action.payload;
      })
      .addCase(getOmraDepartures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(cancelOmraPenalty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOmraPenalty.fulfilled, (state, action) => {
        state.loading = false;
        state.omraData = action.payload;
      })
      .addCase(cancelOmraPenalty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default omrasSlice.reducer;