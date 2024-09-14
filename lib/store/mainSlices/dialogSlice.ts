import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DialogState {
  isOpen: boolean;
  isDetailOpen: boolean;
  isSummaryOpen: boolean;
}

const initialState: DialogState = {
  isOpen: false,
  isDetailOpen: false,
  isSummaryOpen: false,
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
  },
});

export const {
  openDialogDetail,
  closeDialogDetail,
  openDialogSummary,
  closeDialogSummary,
  setDialogOpen,
} = dialogSlice.actions;
export default dialogSlice.reducer;
