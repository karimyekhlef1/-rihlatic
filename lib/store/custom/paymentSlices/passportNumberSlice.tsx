import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PassportNumberState {
  passportNumber: string;
}

const initialPassportNumberState: PassportNumberState = {
  passportNumber: '',
};

const passportNumberSlice = createSlice({
  name: 'passportNumber',
  initialState: initialPassportNumberState,
  reducers: {
    setPassportNumber: (state, action: PayloadAction<string>) => {
      state.passportNumber = action.payload;
    },
  },
});

export const { setPassportNumber } = passportNumberSlice.actions;
export default passportNumberSlice.reducer;
