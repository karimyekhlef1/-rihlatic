import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import omrasService from  '@/lib/services/omras/omras_package';

interface omrasState {
    loading: boolean;
    omraData: any;
}

const initialState: omrasState = {
    loading: false,
    omraData: {},
};

export const getOmraDetails = createAsyncThunk('omraDetails/slice', async (params:any, thunkApi) => {
    try {
        const response = await omrasService.getOmraData(params);
        return response;
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.response.data);
    }
});

export const getOmraReservationDetails = createAsyncThunk('omraReservationDetails/slice', async (params:any, thunkApi) => {
    try {
        const response = await omrasService.getOmraReservationData(params);
        return response;
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.response.data);
    }
});

export const storeOmraReservation = createAsyncThunk('omraStoreReservation/slice', async (data:any, thunkApi) => {
    try {
        const response = await omrasService.storeOmraReservation(data);
        return response;
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.response.data);
    }
});

export const cancelOmraReservation = createAsyncThunk('omraCancelReservation/slice', async (data:any, thunkApi) => {
    try {
        const response = await omrasService.cancelOmraReservation(data);
        return response;
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.response.data);
    }
});

export const cancelOmraPenalty = createAsyncThunk('omraCancelPenalty/slice', async (data:any, thunkApi) => {
    try {
        const response = await omrasService.cancelOmraPenalty(data);
        return response;
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.response.data);
    }
});


const OmraSlice = createSlice({
    name: 'slice/omra',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOmraDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOmraDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.omraData = action.payload;
            })
            .addCase(getOmraDetails.rejected, (state, _) => {
                state.loading = false;
                state.omraData = {};
            }).addCase(storeOmraReservation.pending, (state) => {
                state.loading = true;
            })
            .addCase(storeOmraReservation.fulfilled, (state, action) => {
                state.loading = false;
                state.omraData = action.payload;
            })
            .addCase(storeOmraReservation.rejected, (state, _) => {
                state.loading = false;
                state.omraData = {};
            }).addCase(getOmraReservationDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOmraReservationDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.omraData = action.payload;
            })
            .addCase(getOmraReservationDetails.rejected, (state, _) => {
                state.loading = false;
                state.omraData = {};
            }).addCase(cancelOmraReservation.pending, (state) => {
                state.loading = true;
            })
            .addCase(cancelOmraReservation.fulfilled, (state, action) => {
                state.loading = false;
                state.omraData = action.payload;
            })
            .addCase(cancelOmraReservation.rejected, (state, _) => {
                state.loading = false;
                state.omraData = {};
            }).addCase(cancelOmraPenalty.pending, (state) => {
                state.loading = true;
            })
            .addCase(cancelOmraPenalty.fulfilled, (state, action) => {
                state.loading = false;
                state.omraData = action.payload;
            })
            .addCase(cancelOmraPenalty.rejected, (state, _) => {
                state.loading = false;
                state.omraData = {};
            });
    },
});


export const { actions, reducer } = OmraSlice;
export default reducer;