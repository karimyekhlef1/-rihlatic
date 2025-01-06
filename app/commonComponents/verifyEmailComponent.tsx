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
import { useEffect } from 'react';
import Image from 'next/image';
import verify from '@/public/images/home/news.png';
import Link from 'next/link';
import { toast } from 'sonner';
import { clearEmailToVerify } from '@/lib/store/custom/mainSlices/verificationSlice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifyEmailSchema } from '@/lib/schemas/authSchemas';
import type { z } from 'zod';

type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;

export default function VerifyEmailDialog() {
  const dispatch = useDispatch<AppDispatch>();
  
  const emailToVerify = useSelector(
    (state: RootState) => state.verification.emailToVerify
  );
  const isDialogOpen = useSelector(
    (state: RootState) => state.dialog.isVerifyEmailOpen
  );

  const { loading, error } = useSelector(
    (state: RootState) => state.verifyEmail
  );

  const {
    loading: resendCodeLoading,
    error: resendCodeError,
  } = useSelector((state: RootState) => state.resendCode);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      code: ''
    }
  });

  const handleOpenRegister = () => {
    dispatch(openDialogRegister());
    dispatch(closeDialogVerifyEmail());
  };

  const onSubmit = async (data: VerifyEmailFormData) => {
    if (emailToVerify) {
      try {
        await dispatch(
          verifyEmail({
            email: emailToVerify,
            code: data.code,
          })
        ).unwrap();
        toast.success('Account has been verified successfully.');
        dispatch(clearEmailToVerify());
        dispatch(closeDialogVerifyEmail());
        reset();
      } catch (err) {
        toast.error('Verification failed. Please try again.');
      }
    }
  };

  const handleResendCode = async () => {
    if (emailToVerify) {
      try {
        await dispatch(resendCode({ email: emailToVerify }));
        toast.success('Verification code has been resent.');
      } catch (error) {
        toast.error('Failed to resend code. Please try again.');
      }
    }
  };

  // Clean up verification state when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearVerifyEmailState());
      dispatch(clearEmailToVerify());
    };
  }, [dispatch]);

  if (!emailToVerify) {
    return null;
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          dispatch(clearEmailToVerify());
          reset();
        }
        dispatch(open ? openDialogVerifyEmail() : closeDialogVerifyEmail());
      }}
    >
      <DialogContent className="sm:max-w-[355px]">
        <DialogHeader>
          <Image src={verify} alt="verify" width={162} height={96} />
          <DialogTitle className="text-lg font-semibold mt-4">
            Verify your email
          </DialogTitle>
          <p className="text-xs font-medium text-gray-500">
            We sent a code to your email{' '}
            <span className="text-xs font-medium text-orange-500">
              {emailToVerify}
            </span>
            . Please add it below to verify your email.
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter 6-character code"
              {...register('code')}
              maxLength={6}
            />
            {errors.code && (
              <p className="text-xs text-red-500">{errors.code.message}</p>
            )}
          </div>
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
              type="submit"
              variant={'active'}
              className="text-xs"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Continue'}
            </Button>
            <Button
              type="button"
              variant={'secondary'}
              className="text-xs"
              onClick={handleOpenRegister}
              disabled={loading}
            >
              Back
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
