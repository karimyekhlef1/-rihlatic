import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import logoutService from '../../../services/logout/logout_service';
import { storageUtils } from '@/utils/localStorage';
import { clearSinginState } from '../signin/signinSlice';

interface LogoutState {
  loading: boolean;
  success: boolean;
  error: string | null;
  logoutData: any;
}

const initialState: LogoutState = {
  loading: false,
  success: false,
  error: null,
  logoutData: {},
};

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (token: string, { dispatch, rejectWithValue }) => {
    try {
      await logoutService.logoutUser(token);

      // Clear all auth data
      storageUtils.clearAuth();

      // Reset auth state
      dispatch(clearSinginState());

      return true;
    } catch (error: any) {
      console.error('Logout error:', error);
      // Even if the API call fails, clear local auth data
      storageUtils.clearAuth();
      dispatch(clearSinginState());

      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

const logoutSlice = createSlice({
  name: 'slice/logout',
  initialState,
  reducers: {
    clearLogoutState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.logoutData = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.logoutData = action.payload;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.success = true; // Consider logout successful even if API fails
        state.error = action.payload as string;
        state.logoutData = {};
      });
  },
});

export const { clearLogoutState } = logoutSlice.actions;
export const { actions, reducer } = logoutSlice;
export default reducer;
