import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import homeService from '../../../services/home/home_service';
import packagesService from "../../../services/packages/packages_services";

interface packagesState {
  loading: boolean;
  packagesData: any;
}

const initialState: packagesState = {
  loading: false,
  packagesData: {},
};

export const packagesFunc = createAsyncThunk(
  "packages/slice",
  async (params: any, thunkApi) => {
    try {
      const response = await packagesService.getPackagesData(params);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const getPackagesReservationDetails = createAsyncThunk(
  "PackagesReservationDetails/slice",
  async (params: any, thunkApi) => {
    try {
      const response = await packagesService.getPackagesReservationData(params);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const cancelPackagePenalty = createAsyncThunk(
  "cancelPackagePenalty/slice",
  async (id: any, thunkApi) => {
    try {
      const response = await packagesService.cancelPackagePenalty(id);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const storePackageReservation = createAsyncThunk(
  "storePackageReservation/slice",
  async (params: any, thunkApi) => {
    try {
      const response = await packagesService.storePackageReservation(params);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const packagesSlice = createSlice({
  name: "slice/packages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(packagesFunc.pending, (state) => {
        state.loading = true;
      })
      .addCase(packagesFunc.fulfilled, (state, action) => {
        state.loading = false;
        state.packagesData = action.payload;
      })
      .addCase(packagesFunc.rejected, (state, _) => {
        state.loading = false;
        state.packagesData = {};
      })
      .addCase(getPackagesReservationDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPackagesReservationDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.packagesData = action.payload;
      })
      .addCase(getPackagesReservationDetails.rejected, (state, _) => {
        state.loading = false;
        state.packagesData = {};
      })
      .addCase(cancelPackagePenalty.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelPackagePenalty.fulfilled, (state, action) => {
        state.loading = false;
        state.packagesData = action.payload;
      })
      .addCase(cancelPackagePenalty.rejected, (state, _) => {
        state.loading = false;
        state.packagesData = {};
      })
      .addCase(storePackageReservation.pending, (state) => {
        state.loading = true;
      })
      .addCase(storePackageReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.packagesData = action.payload;
      })
      .addCase(storePackageReservation.rejected, (state, _) => {
        state.loading = false;
        state.packagesData = {};
      });
  },
});

export const { actions, reducer } = packagesSlice;
export default reducer;
