import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AccountState {
  firstName: string;
  lastName: string;
  gender: string;
  birthdate: string;
  nationality: string;
  documentNumber: string;
  documentExpiration: string;
  email: string;
  phone: string;
}

const initialState: AccountState = {
  firstName: '',
  lastName: '',
  gender: '',
  birthdate: '',
  nationality: '',
  documentNumber: '',
  documentExpiration: '',
  email: '',
  phone: '',
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ field: keyof AccountState; value: string }>
    ) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: () => initialState,
  },
});

export const { updateField, resetForm } = accountSlice.actions;
export default accountSlice.reducer;
