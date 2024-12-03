import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import signinService from '../../../services/sign-in/signin_service';
import { storageUtils } from '@/utils/localStorage';

interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
  // we can add other user properties as needed
}
interface SinginState {
  loading: boolean;
  success: boolean;
  error: string | null;
  userData: {
    user: User;
    token: string;
  } | null;
  isInitialized: boolean;
}

const initialState: SinginState = {
  loading: false,
  success: false,
  error: null,
  userData: null,
  isInitialized: false,
};

export const signinUser = createAsyncThunk(
  'auth/signin',
  async (userData: any, thunkApi) => {
    try {
      const response = await signinService.loginUser(userData);

      // Extract the token from the nested structure
      const token = response?.token;
      const user = response?.user;

      if (token) {

        storageUtils.setToken(token);
        storageUtils.setUser(user);
        const storedToken = storageUtils.getToken();


        return {
          user: user,
          token: token,
        };
      } else {
        return thunkApi.rejectWithValue('No token in response');
      }
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

export const checkAuthState = createAsyncThunk(
  'auth/checkState',
  async (_, thunkApi) => {
    try {
      const token = storageUtils.getToken();
      const user = storageUtils.getUser();
      if (!token || !user) {
        return thunkApi.rejectWithValue('No auth found');
      }

      return { token, user };
    } catch (error: any) {
      storageUtils.removeToken(); // Clear invalid token
      return thunkApi.rejectWithValue(
        error.response?.data || 'Token verification failed'
      );
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
      state.userData = null;
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
        state.isInitialized = true;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
        state.userData = null;
        state.isInitialized = true;
      })
      .addCase(checkAuthState.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthState.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userData = action.payload;
        state.isInitialized = true;
      })
      .addCase(checkAuthState.rejected, (state) => {
        state.loading = false;
        state.success = false;
        state.userData = null;
        state.isInitialized = true;
      });
  },
});

export const { clearSinginState } = signinSlice.actions;
export const { actions, reducer } = signinSlice;
export default reducer;
