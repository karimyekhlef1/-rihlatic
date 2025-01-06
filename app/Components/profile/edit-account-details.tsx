'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Dialog, DialogTitle, DialogContent } from '@/components/ui/dialog';
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useDispatch, useSelector } from 'react-redux';
import { setDialogOpen } from '@/lib/store/custom/mainSlices/dialogSlice';
import type { RootState } from '@/lib/store/store';
import { updateAccountDetails, fetchAccountData } from '@/lib/store/api/account/accountSlice';
import { toast } from 'sonner';

// Import Zod validation
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { accountDetailsSchema } from '@/lib/schemas/profileSchemas';
import type { z } from 'zod';

type FormData = z.infer<typeof accountDetailsSchema>;

export default function EditAccountOwnerDetails() {
  const dispatch = useDispatch<any>();
  const { isOpen } = useSelector((state: RootState) => state.dialog);
  const { loading, accountData } = useSelector((state: RootState) => state.account);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<FormData>({
    resolver: zodResolver(accountDetailsSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      birthday: '',
      passport_nbr: '',
      passport_expire_at: '',
      nationality: '',
      sex: '',
    }
  });

  // Fetch account data when dialog opens
  useEffect(() => {
    if (isOpen) {
      dispatch(fetchAccountData());
    }
  }, [isOpen, dispatch]);

  // Update form data when account data is fetched
  useEffect(() => {
    if (accountData) {
      Object.keys(accountData).forEach((key) => {
        if (key in accountDetailsSchema.shape) {
          setValue(key as keyof FormData, accountData[key] || '');
        }
      });
    }
  }, [accountData, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      await dispatch(updateAccountDetails(data)).unwrap();
      dispatch(setDialogOpen(false));
      toast.success('Account details updated successfully');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update account details';
      toast.error(errorMessage);
      console.error('Failed to update account details:', error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          reset();
        }
        dispatch(setDialogOpen(open));
      }}
    >
      <DialogContent className="sm:max-w-[425px] md:max-w-2xl">
        <VisuallyHidden.Root>
          <DialogTitle className="hidden">Edit account owner details</DialogTitle>
        </VisuallyHidden.Root>
        <Card className="w-full bg-white border-0 shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl text-black">Account Details</CardTitle>
            <CardDescription>
              Update your account information
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    {...register('first_name')}
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-xs">{errors.first_name.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    {...register('last_name')}
                  />
                  {errors.last_name && (
                    <p className="text-red-500 text-xs">{errors.last_name.message}</p>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  {...register('phone')}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs">{errors.phone.message}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="birthday">Birthday</Label>
                  <Input
                    id="birthday"
                    type="date"
                    {...register('birthday')}
                  />
                  {errors.birthday && (
                    <p className="text-red-500 text-xs">{errors.birthday.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="sex">Gender</Label>
                  <Select
                    onValueChange={(value: "" | "male" | "female") => setValue('sex', value)}
                    defaultValue={accountData?.sex || ''}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.sex && (
                    <p className="text-red-500 text-xs">{errors.sex.message}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="passport_nbr">Passport Number</Label>
                  <Input
                    id="passport_nbr"
                    {...register('passport_nbr')}
                  />
                  {errors.passport_nbr && (
                    <p className="text-red-500 text-xs">{errors.passport_nbr.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="passport_expire_at">Passport Expiry Date</Label>
                  <Input
                    id="passport_expire_at"
                    type="date"
                    {...register('passport_expire_at')}
                  />
                  {errors.passport_expire_at && (
                    <p className="text-red-500 text-xs">{errors.passport_expire_at.message}</p>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  {...register('nationality')}
                />
                {errors.nationality && (
                  <p className="text-red-500 text-xs">{errors.nationality.message}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex w-full gap-4">
                <Button
                  variant="outline"
                  className="w-1/2"
                  onClick={() => dispatch(setDialogOpen(false))}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  className="w-1/2 bg-orange-600 hover:bg-orange-700"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save changes'}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
