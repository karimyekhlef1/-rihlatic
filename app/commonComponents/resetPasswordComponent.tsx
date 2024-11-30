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

interface FormData {
  email: string;
  code: string;
  password: string;
  password_confirmation: string;
}

export default function ResetPasswordDialogue() {
  const dispatch = useDispatch<AppDispatch>();
  const isDialogOpen = useSelector(
    (state: RootState) => state.dialog.isResetPasswordOpen
  );

  const { loading, success, error } = useSelector(
    (state: RootState) => state.resetPassword
  );

  const [formData, setFormData] = useState<FormData>({
    email: '',
    code: '',
    password: '',
    password_confirmation: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.code) {
      newErrors.code = 'Code is required';
    } else if (formData.code.length !== 6) {
      newErrors.code = 'Code must be 6 characters';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (!formData.password_confirmation) {
      newErrors.password_confirmation = 'Password confirmation is required';
    } else if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await dispatch(resetPassword(formData));
        toast.success('Password reset successfully');
        dispatch(closeDialogResetPassword());
      } catch (error) {
        toast.error('Failed to reset password');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'code' && value.length > 6) return; // Limit code to 6 characters
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResendCode = async () => {
    try {
      await dispatch(resendCode({ email: formData.email }));
      toast('Verification code has been resent.');
    } catch (error) {
      console.error('Resending code failed:', error);
    }
  };

  const handleResetPassword = async () => {
    try {
      await dispatch(
        resetPassword({
          email: formData.email,
          code: formData.code,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
        })
      );
      toast('Your password has been changed successfully!');
      dispatch(closeDialogResetPassword());
    } catch (error) {
      console.error('Password changing failed:', error);
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) =>
        dispatch(open ? openDialogResetPassword() : closeDialogResetPassword())
      }
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500">
              Enter your email
            </p>
            <Input
              type="email"
              name="email"
              placeholder="Your@email.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500">Enter your code</p>
            <Input
              type="text"
              name="code"
              maxLength={6}
              placeholder="Enter 6-digit code"
              value={formData.code}
              onChange={handleChange}
            />
            {errors.code && (
              <p className="text-red-500 text-xs">{errors.code}</p>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500">
              Enter your new password
            </p>
            <Input
              type="password"
              name="password"
              placeholder="New password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500">
              Confirm your new password
            </p>
            <Input
              type="password"
              name="password_confirmation"
              placeholder="Confirm new password"
              value={formData.password_confirmation}
              onChange={handleChange}
            />
            {errors.password_confirmation && (
              <p className="text-red-500 text-xs">
                {errors.password_confirmation}
              </p>
            )}
          </div>

          <Link
            href="#"
            className="text-xs text-orange-500 underline underline-offset-2"
            onClick={handleResendCode}
          >
            Resend code
          </Link>

          <div className="space-y-2">
            <Button
              variant={'active'}
              className="text-xs w-full"
              type="submit"
              disabled={loading}
              onClick={handleResetPassword}
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
