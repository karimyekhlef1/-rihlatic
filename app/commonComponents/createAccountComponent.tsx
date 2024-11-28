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
import { RootState } from '@/lib/store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  openDialogCreateAccount,
  closeDialogCreateAccount,
} from '@/lib/store/custom/mainSlices/dialogSlice';

import Image from 'next/image';
import login from '@/public/images/login.png';
import Link from 'next/link';

interface FormData {
  email: string;
  password: string;
}

export default function CreateAccountDialog() {
  const dispatch = useDispatch();
  const isDialogOpen = useSelector(
    (state: RootState) => state.dialog.isCreateAccountOpen
  );

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle login logic here
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
            onClick={(e) => {
              e.preventDefault();
              if (validateForm()) {
                // Handle successful validation
                console.log('Form is valid');
              }
            }}
          >
            Continue
          </Button>
        </form>
        <Link
          href="#"
          className="text-xs text-orange-500 underline underline-offset-2"
          onClick={() => {}}
        >
          Forogot your password?
        </Link>
      </DialogContent>
    </Dialog>
  );
}
