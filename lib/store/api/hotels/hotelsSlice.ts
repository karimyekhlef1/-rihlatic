import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import hotelsService from '../../../services/hotels/hotels_services'


interface hotelsState {
    loading: boolean;
    hotelData: any;
}

const initialState: hotelsState = {
    loading: false,
    hotelData: {},
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
    },
});


export const { actions, reducer } = HotelSlice;
export default reducer;