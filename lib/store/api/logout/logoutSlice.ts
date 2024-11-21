import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import logoutService from '../../../services/logout/logout_service';

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
  async (token: string, thunkApi) => {
    try {
      const response = await logoutService.logoutUser(token);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
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
        state.success = false;
        state.error = action.payload as string;
        state.logoutData = {};
      });
  },
});

export const { clearLogoutState } = logoutSlice.actions;
export const { actions, reducer } = logoutSlice;
export default reducer;
