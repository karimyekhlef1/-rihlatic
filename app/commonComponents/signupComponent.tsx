'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDispatch, useSelector } from 'react-redux';
import {
  openDialogSignUp,
  closeDialogSignUp,
  openDialogSignIn,
  openDialogRegister,
  closeDialogRegister,
} from '@/lib/store/custom/mainSlices/dialogSlice';
import { RootState } from '@/lib/store/store';
import { ChevronRight, CircleUserRound, UserRoundPlus } from 'lucide-react';
import SignInDialog from './signInComponent';
import RegisterDialog from './registerComponent';

export default function SignUpDialog() {
  const dispatch = useDispatch();
  const isDialogOpen = useSelector(
    (state: RootState) => state.dialog.isSignUpOpen
  );

  const isRegisterOpen = useSelector(
    (state: RootState) => state.dialog.isRegisterOpen
  );

  const handleOpenDialogSignin = () => {
    dispatch(openDialogSignIn());
    dispatch(closeDialogSignUp());
  };

  const handleOpenRegister = () => {
    dispatch(openDialogRegister());
    dispatch(closeDialogSignUp()); // Close the signup dialog when opening register
  };

  const handleCLoseDialogSignin = () => {
    dispatch(closeDialogSignUp());
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) =>
        dispatch(open ? openDialogSignUp() : closeDialogSignUp())
      }
    >
      <DialogContent className="sm:max-w-[325px]">
        <div className="px-4 pb-4 pt-2">
          <DialogTitle className="text-left text-lg font-semibold">
            Want to sign in first?
          </DialogTitle>
          <DialogDescription className="text-left mt-2 text-xs">
            You&apos;ll be able to book faster, set up price alerts, and see all
            your trips in one place.
          </DialogDescription>
          <Button
            className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white text-xs flex items-center justify-center"
            onClick={handleOpenDialogSignin}
          >
            <CircleUserRound className="mr-2 h-4 w-4" />
            Sign-in
          </Button>
          <p className="text-left mt-2 text-xs text-gray-500">
            If you don't have an account you can register a new one
          </p>
          <Button
            className="w-full mt-2 bg-white hover:bg-slate-100 text-orange-500 hover:text-orange-600 text-xs flex items-center justify-center"
            onClick={handleOpenRegister}
          >
            <UserRoundPlus className="mr-2 h-4 w-4" />
            Sign-up
          </Button>
          <div className="text-center pt-2">
            <div className="relative my-4">
              <hr className="border-t border-gray-300" />
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-400">
                Or
              </span>
            </div>
            <div className="flex justify-center">
              <Button
                variant="link"
                className="text-orange-800 text-xs hover:text-orange-900 underline underline-offset-2 flex items-center"
                onClick={handleCLoseDialogSignin}
              >
                Continue as a guest
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
      <SignInDialog />
      <RegisterDialog />
    </Dialog>
  );
}
