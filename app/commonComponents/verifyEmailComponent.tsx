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
import { AppDispatch } from '@/lib/store/store';
import {
  openDialogVerifyEmail,
  closeDialogVerifyEmail,
  openDialogRegister,
} from '@/lib/store/custom/mainSlices/dialogSlice';
import {
  verifyEmail,
  clearVerifyEmailState,
} from '@/lib/store/api/verifyEmail/verifyEmailSlice';
import {
  resendCode,
  clearResendCodeState,
} from '@/lib/store/api/resendCode/resendCodeSlice';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import verify from '@/public/images/home/news.png';
import Link from 'next/link';
import { toast } from 'sonner';

interface VerifyEmailDialogProps {
  email: string;
}

export default function VerifyEmailDialog({ email }: VerifyEmailDialogProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [verificationCode, setVerificationCode] = useState('');

  const isDialogOpen = useSelector(
    (state: RootState) => state.dialog.isVerifyEmailOpen
  );

  const { loading, success, error } = useSelector(
    (state: RootState) => state.verifyEmail
  );

  const {
    loading: resendCodeLoading,
    success: resendCodeSuccess,
    error: resendCodeError,
  } = useSelector((state: RootState) => state.resendCode);

  const handleOpenRegister = () => {
    dispatch(openDialogRegister());
    dispatch(closeDialogVerifyEmail());
  };

  const handleVerifyEmail = async () => {
    if (verificationCode.length === 6) {
      try {
        await dispatch(
          verifyEmail({
            email: email,
            code: verificationCode,
          })
        ).unwrap();
      } catch (err) {
        // Error is handled by the slice
        console.error('Verification failed:', err);
      }
    }
    toast('Account has been created.');
  };

  const handleResendCode = async () => {
    try {
      await dispatch(resendCode({ email: email }));
      toast('Verification code has been resent.');
    } catch (error) {
      console.error('Resending code failed:', error);
    }
  };

  // Clean up verification state when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearVerifyEmailState());
    };
  }, [dispatch]);

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
          <p className="text-xs font-medium text-gray-500">
            We sent a code to your email{' '}
            <span className="text-xs font-medium text-orange-500">{email}</span>
            . Please add it below to verify your email.
          </p>
        </DialogHeader>
        <Input
          type="text"
          placeholder="Enter 6-character code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          maxLength={6}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        <Link
          href="#"
          className="text-xs text-orange-500 underline underline-offset-2"
          onClick={handleResendCode}
        >
          Resend code
        </Link>
        <div className="flex flex-col gap-y-2">
          <Button
            variant={'active'}
            className="text-xs"
            onClick={handleVerifyEmail}
            disabled={loading || verificationCode.length !== 6}
          >
            {loading ? 'Verifying...' : 'Continue'}
          </Button>
          <Button
            variant={'secondary'}
            className="text-xs"
            onClick={handleOpenRegister}
            disabled={loading}
          >
            Back
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
