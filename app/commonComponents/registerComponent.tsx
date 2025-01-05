'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RootState, AppDispatch } from '@/lib/store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeDialogRegister,
  openDialogRegister,
  closeDialogCreateAccount,
  openDialogVerifyEmail,
} from '@/lib/store/custom/mainSlices/dialogSlice';
import {
  updateAccountDetails,
  resetAccountDetails,
} from '@/lib/store/custom/commonSlices/accountDetailsSlice';
import Image from 'next/image';
import login from '@/public/images/login.png';
import VerifyEmailDialog from './verifyEmailComponent';
import { signupUser } from '@/lib/store/api/signup/signupSlice';
import { setEmailToVerify } from '@/lib/store/custom/mainSlices/verificationSlice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@/lib/schemas/authSchemas';
import type { z } from 'zod';

interface FormData extends z.infer<typeof signUpSchema> {}

export default function RegisterDialog() {
  const dispatch = useDispatch<AppDispatch>();
  const isDialogOpen = useSelector(
    (state: RootState) => state.dialog.isRegisterOpen
  );
  const signupStatus = useSelector((state: RootState) => state.signUp.loading);
  const signupError = useSelector((state: RootState) => state.signUp.error);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const handleOpenDialogVerifyEmail = (email: string) => {
    dispatch(setEmailToVerify(email));
    dispatch(openDialogVerifyEmail());
    dispatch(closeDialogRegister());
  };

  const onSubmit = async (data: FormData) => {
    try {
      const resultAction = await dispatch(
        signupUser({
          username: data.email.split('@')[0],
          email: data.email,
          password: data.password,
          password_confirmation: data.confirmPassword,
        })
      );

      if (signupUser.fulfilled.match(resultAction)) {
        handleOpenDialogVerifyEmail(data.email);
        reset();
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          reset();
        }
        dispatch(open ? openDialogRegister() : closeDialogRegister());
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <Image src={login} alt="register" width={162} height={96} />
          <DialogTitle className="text-lg font-semibold mt-4">
            Create your account
          </DialogTitle>
          <p className="text-xs font-medium text-gray-500">
            Join us to get access to exclusive deals and manage your bookings
            easily.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {signupError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md text-xs">
              {signupError}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white text-xs flex items-center justify-center"
            disabled={signupStatus === true}
          >
            {signupStatus === true ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <p className="text-[0.65rem] text-gray-600 mt-4">
          By creating an account, you agree to our{' '}
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
      <VerifyEmailDialog />
    </Dialog>
  );
}
