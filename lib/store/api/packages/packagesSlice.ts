import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import homeService from '../../../services/home/home_service';
import packagesService from "../../../services/packages/packages_services";

interface packagesState {
  loading: boolean;
  packagesData: any;
  cardData :any
  loadingCard:any
}

const initialState: packagesState = {
  loading: false,
  packagesData: {},
  cardData:{},
  loadingCard:false
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

export const  storBookingCard = createAsyncThunk(
  "storBookingCardPackage/slice",
  async (data: any, thunkApi) => {
    try {
      const response = await packagesService.storbookingCard(data);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
)


export const  getPricingBookingCard = createAsyncThunk(
  "getPricingBookingCardPackage/slice",
  async (id: any, thunkApi) => {
    try {
      const response = await packagesService.pricingBookingCard(id);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
)


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
      })
      .addCase(storBookingCard.pending, (state) => {
        state.loadingCard = true;
      })
      .addCase(storBookingCard.fulfilled, (state, action) => {
        state.loadingCard = false;
        state.cardData = action.payload;
      })
      .addCase(storBookingCard.rejected, (state, _) => {
        state.loadingCard = false;
        state.cardData = {};
      })
      .addCase(getPricingBookingCard.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPricingBookingCard.fulfilled, (state, action) => {
        state.loading = false;
        state.packagesData = action.payload;
      })
      .addCase(getPricingBookingCard.rejected, (state, _) => {
        state.loading = false;
        state.packagesData = {};
      });
  },
});

export const { actions, reducer } = packagesSlice;
export default reducer;
