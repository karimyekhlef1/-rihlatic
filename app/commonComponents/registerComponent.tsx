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

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterDialog() {
  const dispatch = useDispatch<AppDispatch>();
  const accountDetails = useSelector(
    (state: RootState) => state.accountDetails
  );
  const isDialogOpen = useSelector(
    (state: RootState) => state.dialog.isRegisterOpen
  );
  const signupStatus = useSelector((state: RootState) => state.signUp.loading);
  const signupError = useSelector((state: RootState) => state.signUp.error);

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleOpenDialogVerifyEmail = () => {
    dispatch(openDialogVerifyEmail());
    dispatch(closeDialogCreateAccount());
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!accountDetails.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(accountDetails.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!accountDetails.password) {
      newErrors.password = 'Password is required';
    } else if (accountDetails.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!accountDetails.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (accountDetails.password !== accountDetails.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const resultAction = await dispatch(
          signupUser({
            username: accountDetails.email.split('@')[0],
            email: accountDetails.email,
            password: accountDetails.password,
            password_confirmation: accountDetails.confirmPassword,
          })
        );

        if (signupUser.fulfilled.match(resultAction)) {
          // Registration successful
          handleOpenDialogVerifyEmail();
        }
      } catch (error) {
        console.error('Registration failed:', error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateAccountDetails({ field: name as keyof FormData, value }));
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          dispatch(resetAccountDetails()); // Reset form when dialog is closed
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

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {signupError && <p className="text-red-500 text-xs">{signupError}</p>}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={accountDetails.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={accountDetails.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={accountDetails.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
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
      <VerifyEmailDialog email={accountDetails.email} />
    </Dialog>
  );
}
