import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DialogState {
  isOpen: boolean;
  isDetailOpen: boolean;
  isSummaryOpen: boolean;
  isSignUpOpen: boolean;
  isRegisterOpen: boolean;
  isSignInOpen: boolean;
  isVerifyEmailOpen: boolean;
  isCreateAccountOpen: boolean;
  isForgotPasswordOpen: boolean;
  isResetPasswordOpen: boolean;
  isPasswordDialogOpen: boolean;
}

const initialState: DialogState = {
  isOpen: false,
  isDetailOpen: false,
  isSummaryOpen: false,
  isSignUpOpen: false,
  isRegisterOpen: false,
  isSignInOpen: false,
  isVerifyEmailOpen: false,
  isCreateAccountOpen: false,
  isForgotPasswordOpen: false,
  isResetPasswordOpen: false,
  isPasswordDialogOpen: false,
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
    openDialogRegister: (state) => {
      state.isRegisterOpen = true;
    },
    closeDialogRegister: (state) => {
      state.isRegisterOpen = false;
    },
    openDialogSignIn: (state) => {
      state.isSignInOpen = true;
    },
    closeDialogSignIn: (state) => {
      state.isSignInOpen = false;
    },
    openDialogVerifyEmail: (state) => {
      state.isVerifyEmailOpen = true;
    },
    closeDialogVerifyEmail: (state) => {
      state.isVerifyEmailOpen = false;
    },
    openDialogCreateAccount: (state) => {
      state.isCreateAccountOpen = true;
    },
    closeDialogCreateAccount: (state) => {
      state.isCreateAccountOpen = false;
    },
    openDialogForgotPassword: (state) => {
      state.isForgotPasswordOpen = true;
    },
    closeDialogForgotPassword: (state) => {
      state.isForgotPasswordOpen = false;
    },
    openDialogResetPassword: (state) => {
      state.isResetPasswordOpen = true;
    },
    closeDialogResetPassword: (state) => {
      state.isResetPasswordOpen = false;
    },
    setPasswordDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isPasswordDialogOpen = action.payload;
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
  openDialogRegister,
  closeDialogRegister,
  openDialogSignIn,
  closeDialogSignIn,
  openDialogVerifyEmail,
  closeDialogVerifyEmail,
  openDialogCreateAccount,
  closeDialogCreateAccount,
  openDialogForgotPassword,
  closeDialogForgotPassword,
  openDialogResetPassword,
  closeDialogResetPassword,
  setPasswordDialogOpen,
} = dialogSlice.actions;

export default dialogSlice.reducer;
