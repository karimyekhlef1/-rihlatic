import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import signupService from '../../../services/sign-up/signup_service';

interface SignupState {
  loading: boolean;
  success: boolean;
  error: string | null;
  userData: any;
}

const initialState: SignupState = {
  loading: false,
  success: false,
  error: null,
  userData: {},
};

export const signupUser = createAsyncThunk(
  'auth/signup',
  async (userData: any, thunkApi) => {
    try {
      const response = await signupService.registerUser(userData);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const signupSlice = createSlice({
  name: 'slice/signup',
  initialState,
  reducers: {
    clearSignupState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.userData = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.userData = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        // Handle both string and object error responses
        const errorPayload = action.payload as any;
        state.error = errorPayload?.message || 
                     (typeof errorPayload === 'string' ? errorPayload : 'Signup failed');
        state.userData = {};
      });
  },
});

export const { clearSignupState } = signupSlice.actions;
export const { actions, reducer } = signupSlice;
export default reducer;
