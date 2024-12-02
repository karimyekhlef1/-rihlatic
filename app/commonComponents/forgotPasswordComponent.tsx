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

interface FormData {
  email: string;
}

export default function ForgotPasswordDialogue() {
  const dispatch = useDispatch<AppDispatch>();
  const isDialogOpen = useSelector(
    (state: RootState) => state.dialog.isForgotPasswordOpen
  );

  const { loading, success, error } = useSelector(
    (state: RootState) => state.remindPassword
  );

  const [formData, setFormData] = useState<FormData>({
    email: '',
  });

  const [email, setEmail] = useState('');

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Email submitted:', formData.email);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendCode = async () => {
    try {
      await dispatch(remindPassword({ email: formData.email }));
      toast(`Verification code has been sent to ${formData.email}.`);
      dispatch(openDialogResetPassword());
      dispatch(closeDialogForgotPassword());
    } catch (error) {
      console.error('Sending verification code failed:', error);
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) =>
        dispatch(
          open ? openDialogForgotPassword() : closeDialogForgotPassword()
        )
      }
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <p className="text-xs font-medium text-gray-500">
              Please provide your email
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
          <Button
            variant={'active'}
            className="text-xs w-full"
            type="submit"
            onClick={handleSendCode}
          >
            Send
          </Button>
        </form>
      </DialogContent>
      <ResetPasswordDialogue />
    </Dialog>
  );
}
