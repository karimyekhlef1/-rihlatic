'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateEmailAndPhone } from '@/lib/store/custom/hotelSlices/paymentHotelSlices';
import { RoomsContact } from '@/lib/schemas/hotelSchemas';
import { z } from 'zod';
import { Card, CardContent } from '@/components/ui/card';

interface EmailForBookProps {
  room_index: number;
  readOnly?: boolean;
}

// Define the form data type based on the schema
type FormData = z.infer<typeof RoomsContact>;

export default function EmailForBook({ room_index, readOnly = false }: EmailForBookProps) {
  const dispatch = useDispatch();
  
  const roomsData = useSelector((state: any) => state.hotelPayment.RoomsData[room_index]);
  const { email, phone } = roomsData 

  const {
    register,
    formState: { errors },
    trigger
  } = useForm<FormData>({
    resolver: zodResolver(RoomsContact),
    mode: "onChange",
    defaultValues: {
      email,
      phone
    }
  });

  const handleInputChange = async (field: "email" | "phone", value: string) => {
    const isValid = await trigger(field);
    if (isValid) {
      dispatch(
        updateEmailAndPhone({
          roomIndex: room_index,
          field,
          value
        })
      );
    }
  };

  if (room_index!==0){
    return null
  }
  return (
    <Card className='w-full mt-2'>
        <CardContent>

    
    <div className="flex flex-col sm:flex-row gap-4 pb-2 mt-2">
      <div className="flex flex-col w-full">
        <label className="text-sm text-gray-500">Email</label>
        <Input
          {...register("email")}
          type="email"
          placeholder="E-mail of passenger"
          defaultValue={email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          disabled={readOnly}
          className={errors.email?'border-red-500 border-2':''}

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
          defaultValue={phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          disabled={readOnly}
          className={errors.phone?'border-red-500 border-2':''}

        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>
    </div>
    </CardContent>
    </Card>
  );
}