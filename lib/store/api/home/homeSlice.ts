import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import homeService from '../../../services/home/home_service';

interface HomeState {
    loading: boolean;
    homeData: any;
}

const initialState: HomeState = {
    loading: false,
    homeData: {},
};

export const HomeFunc = createAsyncThunk('home/slice', async (params:any, thunkApi) => {
    try {
        const response = await homeService.getHomeData(params);
        return response;
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.response.data);
    }
});



const homeSlice = createSlice({
    name: 'slice/home',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(HomeFunc.pending, (state) => {
                state.loading = true;
            })
            .addCase(HomeFunc.fulfilled, (state, action) => {
                state.loading = false;
                state.homeData = action.payload;
            })
            .addCase(HomeFunc.rejected, (state, _) => {
                state.loading = false;
                state.homeData = {};
            });
    },
});


export const { actions, reducer } = homeSlice;
export default reducer;