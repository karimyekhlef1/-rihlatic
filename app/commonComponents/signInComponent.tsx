import { Mail } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

import { RootState } from '@/lib/store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  openDialogSignIn,
  closeDialogSignIn,
} from '@/lib/store/mainSlices/dialogSlice';

import Image from 'next/image';
import login from '@/public/images/login.png';
import facebook from '@/public/images/facebook_logo.svg';
import google from '@/public/images/google_logo.svg';
import apple from '@/public/images/apple_logo.svg';

export default function SignInDialog() {
  const dispatch = useDispatch();
  const isDialogOpen = useSelector(
    (state: RootState) => state.dialog.isSignInOpen
  );
  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) =>
        dispatch(open ? openDialogSignIn() : closeDialogSignIn())
      }
    >
      <DialogContent className="sm:max-w-[355px]">
        <DialogHeader>
          <Image src={login} alt="signin" width={162} height={96} />
          <DialogTitle className="text-lg font-semibold mt-4">
            Continue to your account
          </DialogTitle>
          <p className="text-xs font-medium text-gray-500">
            Get better deals, save your details for easy booking, and see all
            your trips in one place.
          </p>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          <p className="text-xs font-medium">Continue with one of these:</p>
          <div>
            <Button
              variant="secondary"
              className="hover:bg-slate-200 text-xs w-full justify-start items-center"
            >
              <Mail size={16} className="mr-2 items-center" />
              Email
            </Button>
          </div>
          <Button
            variant="secondary"
            className="hover:bg-slate-200 text-xs w-full justify-start"
          >
            <Image
              src={facebook}
              alt="facebook"
              width={16}
              height={16}
              className="mr-2"
            />
            Facebook
          </Button>
          <Button
            variant="secondary"
            className="hover:bg-slate-200 text-xs w-full justify-start"
          >
            <Image
              src={google}
              alt="google"
              width={16}
              height={16}
              className="mr-2"
            />
            Google
          </Button>
          <Button
            variant="secondary"
            className="w-full justify-start bg-black text-white text-xs hover:bg-gray-900"
          >
            <Image
              src={apple}
              alt="apple"
              width={16}
              height={16}
              className="mr-2"
            />
            Apple
          </Button>
        </div>
        <p className="text-[0.65rem] text-gray-600 mt-4">
          The use of your account is governed by these{' '}
          <span className="text-orange-500 underline underline-offset-2">
            Terms of Use
          </span>
          . Your Personal Data will be processed according to our{' '}
          <span className="text-orange-500 underline underline-offset-2">
            Privacy Policy
          </span>
          .
        </p>
      </DialogContent>
    </Dialog>
  );
}
