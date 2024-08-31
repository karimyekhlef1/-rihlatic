import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DialogState {
  isOpen: boolean;
}

const initialState: DialogState = {
  isOpen: false,
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    setDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setDialogOpen } = dialogSlice.actions;
export default dialogSlice.reducer;
