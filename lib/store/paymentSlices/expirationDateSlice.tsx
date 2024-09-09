import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExpirationDateState {
  expirationDate: string | null;
}

const initialExpirationDateState: ExpirationDateState = {
  expirationDate: null,
};

const expirationDateSlice = createSlice({
  name: 'expirationDate',
  initialState: initialExpirationDateState,
  reducers: {
    setExpirationDate: (state, action: PayloadAction<string | null>) => {
      state.expirationDate = action.payload;
    },
  },
});

export const { setExpirationDate } = expirationDateSlice.actions;
export default expirationDateSlice.reducer;
