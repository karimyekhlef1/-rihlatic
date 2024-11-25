import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import signinService from '../../../services/sign-in/signin_service';

interface SinginState {
  loading: boolean;
  success: boolean;
  error: string | null;
  userData: any;
}

const initialState: SinginState = {
  loading: false,
  success: false,
  error: null,
  userData: {},
};

export const signinUser = createAsyncThunk(
  'auth/signin',
  async (userData: any, thunkApi) => {
    try {
      const response = await signinService.loginUser(userData);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const signinSlice = createSlice({
  name: 'slice/signin',
  initialState,
  reducers: {
    clearSinginState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.userData = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.userData = action.payload;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
        state.userData = {};
      });
  },
});

export const { clearSinginState } = signinSlice.actions;
export const { actions, reducer } = signinSlice;
export default reducer;
