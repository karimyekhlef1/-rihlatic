import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import hotelsService from '../../../services/hotels/hotels_services'


interface hotelsState {
    loading: boolean;
    hotelData: any;
    loadingPreBook:boolean
}

const initialState: hotelsState = {
    loading: false,
    hotelData: {},
    loadingPreBook:false
};
export const getHotels= createAsyncThunk('hotels/slice', async (body:any, thunkApi) => {
    try {
        const response = await hotelsService.getHotelsData(body);
        return response;
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.response.data);
    }
});

export const getHotelsDetails = createAsyncThunk('hotelDetails/slice', async (body:any, thunkApi) => {
    try {
        const response = await hotelsService.getHotelsDetails(body);
        return response;
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.response.data);
    }
});
export const hotelPrebook = createAsyncThunk('hotelPreBook/slice', async (body:any, thunkApi) => {
    try {
        const response = await hotelsService.hotelPrebook(body);
        return response;
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.response.data);
    }
});


const HotelSlice = createSlice({
    name: 'slice/Hotel',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getHotels.pending, (state) => {
            state.loading = true;
        })
        .addCase(getHotels.fulfilled, (state, action) => {
            state.loading = false;
            state.hotelData = action.payload;
        })
        .addCase(getHotels.rejected, (state, _) => {
            state.loading = false;
            state.hotelData = {};
        })
            .addCase(getHotelsDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getHotelsDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.hotelData = action.payload;
            })
            .addCase(getHotelsDetails.rejected, (state, _) => {
                state.loading = false;
                state.hotelData = {};
            })
            .addCase(hotelPrebook.pending, (state) => {
                state.loadingPreBook = true;
            })
            .addCase(hotelPrebook.fulfilled, (state, action) => {
                state.loadingPreBook = false;
                state.hotelData = action.payload;
            })
            .addCase(hotelPrebook.rejected, (state, _) => {
                state.loadingPreBook = false;
                state.hotelData = {};
            })
    
    },
});


export const { actions, reducer } = HotelSlice;
export default reducer;