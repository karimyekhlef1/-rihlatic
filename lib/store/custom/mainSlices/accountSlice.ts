import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AccountState {
  first_name: string;
  last_name: string;
  username:string;
  sexe: string;
  birthday: string;
  nationality: string;
  email: string;
  phone: string;
  avatar:string;
  passport_nbr: string;
  passport_expire_at: string;
  // lang:string
}

const initialState: AccountState = {
  first_name: '',
  last_name: '',
  username:'',
  sexe: '',
  birthday: '',
  nationality: '',
  email: '',
  phone: '',
  avatar: '',
  passport_nbr: '',
  passport_expire_at:'',
  // lang:''
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
