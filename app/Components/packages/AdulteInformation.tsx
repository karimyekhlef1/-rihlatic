'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { format, parse } from 'date-fns';
import { updatePassengerFieldByIndex } from '@/lib/store/custom/packagesSlices/paymentPachageSlices';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { passengerSchema } from '@/lib/schemas/packageSchema';
// Define the validation schema

type FormData = z.infer<typeof passengerSchema>;

type PassengerType = 'adults' | 'children' | 'infants';
type PassengerInformationProps = {
  titel: PassengerType;
  index: number;
  roomId: number;
  room_index: number;
  readOnly?: boolean;
};

export default function PassengerInformation({ 
  titel, 
  index, 
  roomId, 
  room_index,
  readOnly = false 
}: PassengerInformationProps) {
  const dispatch = useDispatch();
  const passenger = useSelector((state: any) => 
    state.paymentPackage.RoomsData[room_index]?.passengers[titel][index]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger
  } = useForm<FormData>({
    resolver: zodResolver(passengerSchema),
    defaultValues: passenger || {},
    mode: "onChange"
  });

  useEffect(() => {
    if (passenger) {
      Object.entries(passenger).forEach(([key, value]) => {
        setValue(key as keyof FormData, value as string);
      });
    }
  }, [passenger, setValue]);

  const handleInputChange = async (field: keyof FormData, value: string) => {
    if (readOnly) return;

    setValue(field, value);
    const isValid = await trigger(field);
    console.log( titel, 
      index, 
      roomId, 
      room_index,isValid)

    if (isValid) {
      dispatch(
        updatePassengerFieldByIndex({
          room_id: roomId,
          room_index,
          type: titel,
          index,
          field,
          value,
        })
      );
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      toast.error("File too large. Please select a file smaller than 1MB");
      return;
    }

    if (!file.type.startsWith("image/") && !file.type.startsWith("application/pdf")) {
      toast.error("Invalid file type. Please select an image or PDF file");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      await handleInputChange('passport_scan', base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card className="w-full mt-2">
      <CardContent className="w-full">
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col space-y-2 mt-4 mb-6">
            <div className="text-lg font-semibold capitalize">
              {titel} {index + 1}
            </div>
          </div>

          {titel === "adults" && index === 0 && (
            <div className="flex flex-col sm:flex-row gap-4 pb-2">
              <div className="flex flex-col w-full">
                <label className="text-sm text-gray-500">Email</label>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="E-mail of passenger"
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={readOnly}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label className="text-sm text-gray-500">Phone Number</label>
                <Input
                  {...register("phone")}
                  type="tel"
                  placeholder="Phone number"
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={readOnly}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>
          )}

          <Separator />

          <div className="relative">
            <Input
              type="file"
              accept="image/*,application/pdf"
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              onChange={handleFileUpload}
              disabled={readOnly}
            />
            <div className="flex items-center border rounded-md bg-background px-3 py-2 text-gray-700">
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="mr-2 drop-shadow-md"
              >
                Scan passport
              </Button>
            </div>
          </div>
          <p className="text-xs text-gray-400">
            We will scan your passport automatically when you upload it
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pb-2">
            <div className="flex flex-col w-full">
              <label className="text-sm text-gray-500">First Name</label>
              <Input
                {...register("first_name")}
                placeholder="First name"
                onChange={(e) => handleInputChange("first_name", e.target.value)}
                disabled={readOnly}
              />
              {errors.first_name && (
                <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label className="text-sm text-gray-500">Last Name</label>
              <Input
                {...register("last_name")}
                placeholder="Last name"
                onChange={(e) => handleInputChange("last_name", e.target.value)}
                disabled={readOnly}
              />
              {errors.last_name && (
                <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm text-gray-500">Gender</label>
              <Select
                disabled={readOnly}
                onValueChange={(value: "male" | "female") => handleInputChange("sex", value)}
                defaultValue={passenger?.sex || ""}
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
                <p className="text-red-500 text-xs mt-1">{errors.sex.message}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-500">Birth Date</label>
              <Input
                {...register("birth_date")}
                type="date"
                placeholder="Select birth date"
                onChange={(e) => handleInputChange("birth_date", e.target.value)}
                disabled={readOnly}
              />
              {errors.birth_date && (
                <p className="text-red-500 text-xs mt-1">{errors.birth_date.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm text-gray-500">Passport Number</label>
              <Input
                {...register("passport_nbr")}
                placeholder="Passport Number"
                onChange={(e) => handleInputChange("passport_nbr", e.target.value)}
                disabled={readOnly}
              />
              {errors.passport_nbr && (
                <p className="text-red-500 text-xs mt-1">{errors.passport_nbr.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-500">Passport Expiry Date</label>
              <Input
                {...register("passport_expire_at")}
                type="date"
                placeholder="Select passport expire date"
                onChange={(e) => handleInputChange("passport_expire_at", e.target.value)}
                disabled={readOnly}
              />
              {errors.passport_expire_at && (
                <p className="text-red-500 text-xs mt-1">{errors.passport_expire_at.message}</p>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}