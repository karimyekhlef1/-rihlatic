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
  openDialogVerifyEmail,
  closeDialogVerifyEmail,
  openDialogCreateAccount,
} from '@/lib/store/mainSlices/dialogSlice';

import Image from 'next/image';
import verify from '@/public/images/home/news.png';
import Link from 'next/link';

export default function VerifyEmailDialog() {
  const dispatch = useDispatch();
  const isDialogOpen = useSelector(
    (state: RootState) => state.dialog.isVerifyEmailOpen
  );

  const handleOpenDialogCreateAccount = () => {
    dispatch(openDialogCreateAccount());
    dispatch(closeDialogVerifyEmail());
  };
  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) =>
        dispatch(open ? openDialogVerifyEmail() : closeDialogVerifyEmail())
      }
    >
      <DialogContent className="sm:max-w-[355px]">
        <DialogHeader>
          <Image src={verify} alt="verify" width={162} height={96} />
          <DialogTitle className="text-lg font-semibold mt-4">
            Verify your email
          </DialogTitle>
          {/* Here we can put any email */}
          <p className="text-xs font-medium text-gray-500">
            We sent a code to yakoubbatouche21@gmail.com. Please add it below to
            verify your email.
          </p>
        </DialogHeader>
        <Input type="text" placeholder="Enter 8-character code" />
        <Link
          href="#"
          className="text-xs text-orange-500 underline underline-offset-2"
        >
          Resend code
        </Link>
        <div className="flex flex-col gap-y-2">
          <Button variant={'active'} className="text-xs">
            Continue
          </Button>
          <Button
            variant={'secondary'}
            className="text-xs"
            onClick={handleOpenDialogCreateAccount}
          >
            Back
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
