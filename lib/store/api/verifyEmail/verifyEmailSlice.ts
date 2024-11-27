import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import verifyEmailService from '../../../services/verify-email/verifyEmail_service';

interface VerifyEmailState {
  loading: boolean;
  success: boolean;
  error: string | null;
  userData: any;
}

const initialState: VerifyEmailState = {
  loading: false,
  success: false,
  error: null,
  userData: {},
};

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (userData: any, thunkApi) => {
    try {
      const response = await verifyEmailService.verifyEmail(userData);
      return response;
    } catch (error: any) {
      // Extract the error message from the response
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0] ||
        'Verification failed';
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

const verifyEmailSlice = createSlice({
  name: 'slice/verifyEmail',
  initialState,
  reducers: {
    clearVerifyEmailState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.userData = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.userData = action.payload;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
        state.userData = {};
      });
  },
});

export const { clearVerifyEmailState } = verifyEmailSlice.actions;
export const { actions, reducer } = verifyEmailSlice;
export default reducer;
