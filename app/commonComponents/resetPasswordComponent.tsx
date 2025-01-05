'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/lib/store/store';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RootState } from '@/lib/store/store';
import {
  openDialogResetPassword,
  closeDialogResetPassword,
  openDialogForgotPassword,
} from '@/lib/store/custom/mainSlices/dialogSlice';

import {
  resetPassword,
  clearResetPasswordState,
} from '@/lib/store/api/resetPassword/resetPasswordSlice';

import Image from 'next/image';
import logo from '@/public/images/logo.svg';
import { toast } from 'sonner';
import Link from 'next/link';
import { resendCode } from '@/lib/store/api/resendCode/resendCodeSlice';

// Import Zod validation
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '@/lib/schemas/passwordSchemas';
import type { z } from 'zod';

type FormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordDialogue() {
  const dispatch = useDispatch<AppDispatch>();
  const isDialogOpen = useSelector(
    (state: RootState) => state.dialog.isResetPasswordOpen
  );

  const { loading, error } = useSelector(
    (state: RootState) => state.resetPassword
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues
  } = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
      code: '',
      password: '',
      password_confirmation: ''
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      await dispatch(resetPassword(data)).unwrap();
      toast.success('Password reset successfully');
      dispatch(closeDialogResetPassword());
      reset();
    } catch (error: any) {
      console.error('Password reset failed:', error);
      toast.error(error?.message || 'Failed to reset password. Please try again.');
    }
  };

  const handleResendCode = async () => {
    const email = getValues('email');
    if (!email) {
      toast.error('Please enter your email first');
      return;
    }
    
    try {
      await dispatch(resendCode({ email })).unwrap();
      toast.success('Verification code has been resent.');
    } catch (error: any) {
      console.error('Resending code failed:', error);
      toast.error(error?.message || 'Failed to resend code. Please try again.');
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          reset();
        }
        dispatch(open ? openDialogResetPassword() : closeDialogResetPassword())
      }}
    >
      <DialogContent className="sm:max-w-[355px]">
        <DialogHeader>
          <div className="flex flex-col items-center justify-center">
            <Image src={logo} alt="Rihlatic" width={80} height={80} />
            <div className="flex pt-5">
              <DialogTitle className="text-lg font-semibold">
                Change your password
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500">
              Enter your email
            </p>
            <Input
              type="email"
              placeholder="Your@email.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500">Enter your code</p>
            <Input
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit code"
              {...register('code')}
            />
            {errors.code && (
              <p className="text-red-500 text-xs">{errors.code.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500">
              Enter your new password
            </p>
            <Input
              type="password"
              placeholder="New password"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500">
              Confirm your new password
            </p>
            <Input
              type="password"
              placeholder="Confirm new password"
              {...register('password_confirmation')}
            />
            {errors.password_confirmation && (
              <p className="text-red-500 text-xs">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>

          <Link
            href="#"
            className="text-xs text-orange-500 underline underline-offset-2"
            onClick={(e) => {
              e.preventDefault();
              handleResendCode();
            }}
          >
            Resend code
          </Link>

          <div className="space-y-2">
            <Button
              variant={'active'}
              className="text-xs w-full"
              type="submit"
              disabled={loading}
            >
              Confirm
            </Button>
            <Button
              variant={'outline'}
              className="text-xs w-full"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                dispatch(closeDialogResetPassword());
                dispatch(openDialogForgotPassword());
              }}
            >
              Go Back
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
