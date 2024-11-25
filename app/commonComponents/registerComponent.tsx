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
import { RootState } from '@/lib/store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeDialogRegister,
  openDialogRegister,
} from '@/lib/store/custom/mainSlices/dialogSlice';

import Image from 'next/image';
import login from '@/public/images/login.png';
import VerifyEmailDialog from './verifyEmailComponent';

import {
  openDialogCreateAccount,
  closeDialogCreateAccount,
  openDialogVerifyEmail,
} from '@/lib/store/custom/mainSlices/dialogSlice';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}
export default function RegisterDialog() {
  const dispatch = useDispatch();
  const isDialogOpen = useSelector(
    (state: RootState) => state.dialog.isRegisterOpen
  );

  const handleOpenDialogVerifyEmail = () => {
    dispatch(openDialogVerifyEmail());
    dispatch(closeDialogCreateAccount());
  };

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle registration logic here
      console.log('Form submitted:', formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) =>
        dispatch(open ? openDialogRegister() : closeDialogRegister())
      }
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
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
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
              value={formData.password}
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
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white text-xs flex items-center justify-center"
            onClick={(e) => {
              e.preventDefault();
              if (validateForm()) {
                // Check if all required fields are filled
                handleOpenDialogVerifyEmail();
              }
            }}
          >
            Create Account
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
