import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import resetPasswordService from '../../../services/reset-password/resetPassword_service';

interface resetPasswordState {
  loading: boolean;
  success: boolean;
  error: string | null;
  userData: any;
}

const initialState: resetPasswordState = {
  loading: false,
  success: false,
  error: null,
  userData: {},
};

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (userData: any, thunkApi) => {
    try {
      const response = await resetPasswordService.resetPassword(userData);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const resetPasswordSlice = createSlice({
  name: 'slice/resetPassword',
  initialState,
  reducers: {
    clearResetPasswordState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.userData = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.userData = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
        state.userData = {};
      });
  },
});

export const { clearResetPasswordState } = resetPasswordSlice.actions;
export const { actions, reducer } = resetPasswordSlice;
export default reducer;
