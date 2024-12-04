import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VerificationState {
  emailToVerify: string | null;
}

const initialState: VerificationState = {
  emailToVerify: null,
};

const verificationSlice = createSlice({
  name: 'verification',
  initialState,
  reducers: {
    setEmailToVerify: (state, action: PayloadAction<string>) => {
      state.emailToVerify = action.payload;
    },
    clearEmailToVerify: (state) => {
      state.emailToVerify = null;
    },
  },
});

export const { setEmailToVerify, clearEmailToVerify } = verificationSlice.actions;
export default verificationSlice.reducer;
