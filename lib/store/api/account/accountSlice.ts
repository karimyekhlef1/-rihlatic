import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import accountService from '../../../services/account/account_service';

interface AccountState {
    loading: boolean;
    accountData: any;
    error: string | null;
}

const initialState: AccountState = {
    loading: false,
    accountData: null,
    error: null,
}

// Fetch account data
export const fetchAccountData = createAsyncThunk(
    'account/fetchData',
    async (_, thunkApi) => {
        try {
            const response = await accountService.getAccountData();
            if (!response) {
                throw new Error('No data received from server');
            }
            return response;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message || 'Failed to fetch account data');
        }
    }
);

// Update account details
export const updateAccountDetails = createAsyncThunk(
    'account/updateDetails',
    async (accountData: any, thunkApi) => {
        try {
            const response = await accountService.updateAccount(accountData);
            return response;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message || 'Failed to update account');
        }
    }
);

// Update password
export const updatePassword = createAsyncThunk(
    'account/updatePassword',
    async (passwordData: any, thunkApi) => {
        try {
            const response = await accountService.updatePassword(passwordData);
            return response;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message || 'Failed to update password');
        }
    }
);

// Update avatar
export const updateAvatar = createAsyncThunk(
    'account/updateAvatar',
    async (file: any, thunkApi) => {
        try {
            const response = await accountService.updateAvatar(file);
            return response;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message || 'Failed to update avatar');
        }
    }
);

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch account data
            .addCase(fetchAccountData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAccountData.fulfilled, (state, action) => {
                state.loading = false;
                state.accountData = action.payload;
                state.error = null;
            })
            .addCase(fetchAccountData.rejected, (state, action) => {
                state.loading = false;
                state.accountData = null;
                state.error = action.payload as string;
            })
            // Update account details
            .addCase(updateAccountDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAccountDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.accountData = action.payload;
                state.error = null;
            })
            .addCase(updateAccountDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Update password
            .addCase(updatePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePassword.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Update avatar
            .addCase(updateAvatar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAvatar.fulfilled, (state, action) => {
                state.loading = false;
                state.accountData = action.payload;
                state.error = null;
            })
            .addCase(updateAvatar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearError } = accountSlice.actions;
export default accountSlice.reducer;
