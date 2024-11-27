import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
  confirmPassword: '',
};

const accountDetailsSlice = createSlice({
  name: 'accountDetails',
  initialState,
  reducers: {
    updateAccountDetails: (
      state,
      action: PayloadAction<{
        field: keyof typeof initialState;
        value: string;
      }>
    ) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetAccountDetails: () => initialState,
  },
});

export const { updateAccountDetails, resetAccountDetails } =
  accountDetailsSlice.actions;

export default accountDetailsSlice.reducer;
