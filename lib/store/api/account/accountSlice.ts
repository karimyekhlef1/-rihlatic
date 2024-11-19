import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import accountService from '../../../services/account/account_service';

interface fetchingState {
    loading: boolean;
    accountData: any;
}

const initialState: fetchingState = {
    loading: false,
    accountData: {},
}
    

export const accountFunc = createAsyncThunk('account/slice', async (_, thunkApi) => {
    try {
        const response = await accountService.getAccountData();
       
        return response;
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.response.data);
    }
});
export const updateAccountFunc = createAsyncThunk('updateAccount/slice', async (account :any, thunkApi) => {
    try {
        const response = await accountService.updateAccount(account);
        return response;
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.response.data);
    }
});
const accountSlice = createSlice({
    name: 'slice/account',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(accountFunc.pending, (state) => {
                state.loading = true;
            })
            .addCase(accountFunc.fulfilled, (state, action) => {
                state.loading = false;
                state.accountData = action.payload;
            })
            .addCase(accountFunc.rejected, (state, _) => {
                state.loading = false;
                state.accountData = {};
            })
             // Handle updateAccountData lifecycle
             .addCase(updateAccountFunc.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateAccountFunc.fulfilled, (state, action) => {
                state.loading = false;
                state.accountData = action.payload;
            })
            .addCase(updateAccountFunc.rejected, (state, action) => {
                state.loading = false;
                console.error(action.payload || 'Error updating account data');
            });
    },
});


export const { actions, reducer } = accountSlice;
export default reducer;
