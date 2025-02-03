'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
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
import { updateTraveler } from '@/lib/store/custom/flightSlices/flightPaymentSlice';
import { RootState } from "@/lib/store/store";
import { travellerSchema } from '@/lib/schemas/volSchemas';
type FormData = z.infer<typeof travellerSchema>;

interface PassengerInformationVolProps {
  type: string;
  index: number;
  globalIndex: number;
}
const PASSENGER_TYPE_MAP = {
  adults: 'ADT',
  children: 'CHD',
  infants: 'INF',
  infantsSeat: 'INS',
  students: 'STD',
  thirdAge: 'YTH'
} as const;
type PassengerType = keyof typeof PASSENGER_TYPE_MAP;
// Type for the values of PASSENGER_TYPE_MAP
type PassengerCode = typeof PASSENGER_TYPE_MAP[PassengerType];

export default function PassengerInformationVol({
  type,
  index,
  globalIndex
}: PassengerInformationVolProps) {

  useEffect(() => {
    // Type guard to check if the type is a valid PassengerType
    const isValidPassengerType = (type: string): type is PassengerType => {
      return type in PASSENGER_TYPE_MAP;
    };

    if (isValidPassengerType(type)) {
      const passengerCode = PASSENGER_TYPE_MAP[type];
      dispatch(updateTraveler({
        index: globalIndex.toString(),
        data: { type: passengerCode , nationality : "Algeria", passport_scan:null }
      }));
    } else {
      console.warn(`Invalid passenger type: ${type}`);
    }
  }, [type, globalIndex]);




  const dispatch = useDispatch();
  const traveler = useSelector((state: RootState) => state.flightPayment.travelers[globalIndex]);

  const {
    register,
    formState: { errors },
    setValue,
    trigger
  } = useForm<FormData>({
    resolver: zodResolver(travellerSchema),
    defaultValues: traveler ? {
        ...traveler,
        // Convert null to undefined for passport_scan
        passport_scan: traveler.passport_scan || undefined
      } : {},
    mode: "onChange"
  });


  // Watch form values for automatic updates
  

  // Update Redux store when form values change
  const handleTravelerUpdate =async (field: keyof FormData, value: string) => {
    setValue(field as keyof FormData, value);
    const isValid = await trigger(field);
    if(isValid){
    dispatch(updateTraveler({
         index: globalIndex.toString(),
         data: { [field]: value } }));
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
      handleTravelerUpdate('passport_scan', base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card className="w-full mt-2">
      <CardContent className="w-full">
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col space-y-2 mt-4 mb-6">
            <div className="text-lg font-semibold capitalize">
              {type} {index + 1}
            </div>
          </div>
          <Separator />
          
          <div className="relative">
            <Input
              type="file"
              accept="image/*,application/pdf"
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              onChange={handleFileUpload}
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
                onChange={(e) => handleTravelerUpdate("first_name", e.target.value)}
                className={errors.first_name?'border-red-500 border-2':''}
                
                // value={formValues.first_name || ''}
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
                onChange={(e) => handleTravelerUpdate("last_name", e.target.value)}
               
                className={errors.last_name?'border-red-500 border-2':''}
                //value={formValues.last_name || ''}
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
                onValueChange={(value) => handleTravelerUpdate("gender", value)}
               
                //value={formValues.gender}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-red-500 text-xs mt-1">{errors.gender?.message}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-500">Birth Date</label>
              <Input
                {...register("birth_date")}
                type="date"
                placeholder="Select birth date"
                onChange={(e) => handleTravelerUpdate("birth_date", e.target.value)}
               // value={formValues.birth_date || ''}
               className={errors.birth_date?'border-red-500 border-2':''}

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
                onChange={(e) => handleTravelerUpdate("passport_nbr", e.target.value)}
               // value={formValues.passport_nbr || ''}
               className={errors.passport_nbr?'border-red-500 border-2':''}

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
                onChange={(e) => handleTravelerUpdate("passport_expire_at", e.target.value)}
                className={errors.passport_expire_at?'border-red-500 border-2':''}
                // value={formValues.passport_expire_at || ''}
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