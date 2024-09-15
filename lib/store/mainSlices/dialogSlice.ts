import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DialogState {
  isOpen: boolean;
  isDetailOpen: boolean;
  isSummaryOpen: boolean;
  isSignUpOpen: boolean;
}

const initialState: DialogState = {
  isOpen: false,
  isDetailOpen: false,
  isSummaryOpen: false,
  isSignUpOpen: false,
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialogDetail: (state) => {
      state.isDetailOpen = true;
    },
    closeDialogDetail: (state) => {
      state.isDetailOpen = false;
    },
    openDialogSummary: (state) => {
      state.isSummaryOpen = true;
    },
    closeDialogSummary: (state) => {
      state.isSummaryOpen = false;
    },
    setDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    openDialogSignUp: (state) => {
      state.isSignUpOpen = true;
    },
    closeDialogSignUp: (state) => {
      state.isSignUpOpen = false;
    },
  },
});

export const {
  openDialogDetail,
  closeDialogDetail,
  openDialogSummary,
  closeDialogSummary,
  setDialogOpen,
  openDialogSignUp,
  closeDialogSignUp,
} = dialogSlice.actions;
export default dialogSlice.reducer;
