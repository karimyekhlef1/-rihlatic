import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import remindPasswordService from '../../../services/remind-password/remindPassword_service';

interface remindPasswordState {
  loading: boolean;
  success: boolean;
  error: string | null;
  userData: any;
}

const initialState: remindPasswordState = {
  loading: false,
  success: false,
  error: null,
  userData: {},
};

export const remindPassword = createAsyncThunk(
  'auth/remindPassword',
  async (userData: any, thunkApi) => {
    try {
      const response = await remindPasswordService.remindPassword(userData);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const remindPasswordSlice = createSlice({
  name: 'slice/remindPassword',
  initialState,
  reducers: {
    clearRemindPasswordState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.userData = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(remindPassword.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(remindPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.userData = action.payload;
      })
      .addCase(remindPassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
        state.userData = {};
      });
  },
});

export const { clearRemindPasswordState } = remindPasswordSlice.actions;
export const { actions, reducer } = remindPasswordSlice;
export default reducer;
