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

var type = 1;

export const GetDestinations = createAsyncThunk(
  'get/destinations',
  async (value: any, thunkApi) => {
    try {
      type = value.type;
      console.log("---------------------");
      console.log(type);
      console.log("---------------------");
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
        // Vol
        type === 1 && (state.destinations = action.payload.result.airports);

        // Packages
        type === 2 && (state.destinations = action.payload.result.destinations);

        // Hotels

        // Omras
        type === 4 && (state.destinations = action.payload.result.omra);
      })
      .addCase(GetDestinations.rejected, (state, _) => {
        state.loadingDestinations = false;
        state.destinations = [];
      });
  },
});

export const { actions, reducer } = getDestinationsSlice;
export default reducer;
