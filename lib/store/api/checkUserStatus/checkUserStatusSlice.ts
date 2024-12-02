import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import checkUserStatusService from '../../../services/check-user/checkUserStatus_service';

interface CheckUserStatusState {
  loading: boolean;
  success: boolean;
  error: string | null;
  userData: any;
}

const initialState: CheckUserStatusState = {
  loading: false,
  success: false,
  error: null,
  userData: {},
};

export const checkUserStatus = createAsyncThunk(
  'auth/checkUserStatus',
  async (userData: any, thunkApi) => {
    try {
      const response = await checkUserStatusService.checkUserStatus(userData);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const checkUserStatusSlice = createSlice({
  name: 'slice/checkUserStatus',
  initialState,
  reducers: {
    clearCheckUserStatusState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.userData = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserStatus.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(checkUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.userData = action.payload;
      })
      .addCase(checkUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
        state.userData = {};
      });
  },
});

export const { clearCheckUserStatusState } = checkUserStatusSlice.actions;
export const { actions, reducer } = checkUserStatusSlice;
export default reducer;
