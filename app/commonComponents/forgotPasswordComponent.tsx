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
  openDialogForgotPassword,
  closeDialogForgotPassword,
  openDialogResetPassword,
} from '@/lib/store/custom/mainSlices/dialogSlice';

import {
  remindPassword,
  clearRemindPasswordState,
} from '@/lib/store/api/remindPassword/remindPasswordSlice';

import Image from 'next/image';
import logo from '@/public/images/logo.svg';
import { toast } from 'sonner';
import ResetPasswordDialogue from './resetPasswordComponent';

// Import Zod validation
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '@/lib/schemas/passwordSchemas';
import type { z } from 'zod';

type FormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordDialogue() {
  const dispatch = useDispatch<AppDispatch>();
  const isDialogOpen = useSelector(
    (state: RootState) => state.dialog.isForgotPasswordOpen
  );

  const { loading, error } = useSelector(
    (state: RootState) => state.remindPassword
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      await dispatch(remindPassword({ email: data.email })).unwrap();
      toast.success('Verification code has been sent to your email');
      dispatch(openDialogResetPassword());
      dispatch(closeDialogForgotPassword());
      reset();
    } catch (error: any) {
      console.error('Sending verification code failed:', error);
      toast.error(error?.message || 'Failed to send verification code. Please try again.');
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          reset();
        }
        dispatch(
          open ? openDialogForgotPassword() : closeDialogForgotPassword()
        )
      }}
    >
      <DialogContent className="sm:max-w-[355px]">
        <DialogHeader>
          <div className="flex flex-col items-center justify-center">
            <Image src={logo} alt="Rihlatic" width={80} height={80} />
            <div className="flex pt-5">
              <DialogTitle className="text-lg font-semibold">
                Send verification email
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-3">
            <p className="text-xs font-medium text-gray-500">
              Please provide your email
            </p>
          </div>
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Your@email.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>
          <Button
            variant={'active'}
            className="text-xs w-full"
            type="submit"
            disabled={loading}
          >
            Send
          </Button>
        </form>
      </DialogContent>
      <ResetPasswordDialogue />
    </Dialog>
  );
}
