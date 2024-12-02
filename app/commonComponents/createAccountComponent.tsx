'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AppDispatch, RootState } from '@/lib/store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  openDialogCreateAccount,
  closeDialogCreateAccount,
  openDialogForgotPassword,
} from '@/lib/store/custom/mainSlices/dialogSlice';

import Image from 'next/image';
import login from '@/public/images/login.png';
import Link from 'next/link';
import ForgotPasswordDialogue from './forgotPasswordComponent';
import { signinUser } from '@/lib/store/api/signin/signinSlice';
import { toast } from 'sonner';
import { storageUtils } from '@/utils/localStorage';

interface FormData {
  email: string;
  password: string;
}

export default function CreateAccountDialog() {
  const dispatch = useDispatch<AppDispatch>();
  const isDialogOpen = useSelector(
    (state: RootState) => state.dialog.isCreateAccountOpen
  );

  const { loading, success, error, userData } = useSelector(
    (state: RootState) => state.signIn
  );

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  // Helper function to generate a random string
  function generateRandomToken(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from(
      { length },
      () => characters[Math.floor(Math.random() * characters.length)]
    ).join('');
  }

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to generate random device informations
  function generateDeviceInfo() {
    const deviceToken = generateRandomToken(10); // Generate a 10-character random token for device_token
    const deviceNameToken = generateRandomToken(8); // Generate an 8-character random token for device_name
    return {
      username: formData.email.split('@')[0],
      password: formData.password,
      device_token: `device_${deviceToken}`,
      device_id: `${Math.floor(100000000 + Math.random() * 900000000)}`, // Random 9-digit number as a string
      device_name: `device_${deviceNameToken}`,
    };
  }

  const result = generateDeviceInfo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
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

  const handleSignIn = async () => {
    try {
      await dispatch(
        signinUser({
          username: result.username,
          password: result.password,
          device_token: result.device_token,
          device_id: result.device_id,
          device_name: result.device_name,
        })
      );
      toast.success('Login successful!');
      dispatch(closeDialogCreateAccount());
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) =>
        dispatch(open ? openDialogCreateAccount() : closeDialogCreateAccount())
      }
    >
      <DialogContent className="sm:max-w-[355px]">
        <DialogHeader>
          <Image src={login} alt="signin" width={162} height={96} />
          <DialogTitle className="text-lg font-semibold mt-4">
            Continue to your account
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <p className="text-xs font-medium text-gray-500">
              Sign in or register with your email and password
            </p>
          </div>
          <div className="space-y-2">
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
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>
          <Button
            variant={'active'}
            className="text-xs w-full"
            type="submit"
            disabled={loading}
            onClick={handleSignIn}
          >
            Continue
          </Button>
        </form>
        <Link
          href="#"
          className="text-xs text-orange-500 underline underline-offset-2"
          onClick={(e) => {
            e.preventDefault();
            dispatch(openDialogForgotPassword());
            dispatch(closeDialogCreateAccount());
          }}
        >
          Forgot your password?
        </Link>
      </DialogContent>
      <ForgotPasswordDialogue />
    </Dialog>
  );
}
