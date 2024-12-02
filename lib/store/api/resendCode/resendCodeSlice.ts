import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import resendCodeService from '../../../services/resend-code/resendCode_service';

interface ResendCodeState {
  loading: boolean;
  success: boolean;
  error: string | null;
  userData: any;
}

const initialState: ResendCodeState = {
  loading: false,
  success: false,
  error: null,
  userData: {},
};

export const resendCode = createAsyncThunk(
  'auth/resendCode',
  async (userData: any, thunkApi) => {
    try {
      const response = await resendCodeService.resendCode(userData);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const resendCodeSlice = createSlice({
  name: 'slice/resendCode',
  initialState,
  reducers: {
    clearResendCodeState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.userData = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resendCode.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(resendCode.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.userData = action.payload;
      })
      .addCase(resendCode.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
        state.userData = {};
      });
  },
});

export const { clearResendCodeState } = resendCodeSlice.actions;
export const { actions, reducer } = resendCodeSlice;
export default reducer;
