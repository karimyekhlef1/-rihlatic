import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';

import { RootState } from '@/lib/store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  openDialogCreateAccount,
  closeDialogCreateAccount,
  openDialogVerifyEmail,
} from '@/lib/store/custom/mainSlices/dialogSlice';

import Image from 'next/image';
import login from '@/public/images/login.png';
import VerifyEmailDialog from './verifyEmailComponent';

export default function CreateAccountDialog() {
  const dispatch = useDispatch();
  const isDialogOpen = useSelector(
    (state: RootState) => state.dialog.isCreateAccountOpen
  );

  const handleOpenDialogVerifyEmail = () => {
    dispatch(openDialogVerifyEmail());
    dispatch(closeDialogCreateAccount());
  };
  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) =>
        dispatch(open ? openDialogCreateAccount() : closeDialogCreateAccount())
      }
    >
      <DialogContent className="sm:max-w-[355px]">
        <DialogHeader>
          <Image src={login} alt="signin" width={162} height={96} />
          <DialogTitle className="text-lg font-semibold mt-4">
            Continue to your account
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          <p className="text-xs font-medium text-gray-500">
            Sign in or register with your email
          </p>
        </div>
        <Input type="email" placeholder="e.g  your@email.com" />
        <Button
          variant={'active'}
          className="text-xs"
          onClick={handleOpenDialogVerifyEmail}
        >
          Continue
        </Button>
      </DialogContent>
      <VerifyEmailDialog />
    </Dialog>
  );
}
