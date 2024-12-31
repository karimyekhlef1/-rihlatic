import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import engineService from '../../../services/engine/engine_service';

interface DestinationsState {
  loadingDestinations: boolean;
  destinations: any[];
}

const initialState: DestinationsState = {
  loadingDestinations: false,
  destinations: [],
};

export const GetDestinations = createAsyncThunk(
  'get/destinations',
  async (value: string, thunkApi) => {
    try {
      const response = await engineService.get(value);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const getDestinationsSlice = createSlice({
  name: 'destinations/get',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetDestinations.pending, (state) => {
        state.loadingDestinations = true;
        state.destinations = [];
      })
      .addCase(GetDestinations.fulfilled, (state, action) => {
        state.loadingDestinations = false;
        state.destinations = action.payload.result.destinations;
      })
      .addCase(GetDestinations.rejected, (state, _) => {
        state.loadingDestinations = false;
        state.destinations = [];
      });
  },
});

export const { actions, reducer } = getDestinationsSlice;
export default reducer;
