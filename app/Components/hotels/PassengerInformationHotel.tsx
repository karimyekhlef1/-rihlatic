// PassengerInformationHotel.tsx
'use client';
import React ,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { updatePassenger } from '@/lib/store/custom/hotelSlices/paymentHotelSlices';
import { passengerSchema } from '@/lib/schemas/hotelSchemas';

type FormData = z.infer<typeof passengerSchema>;
type PassengerType = 'adults' | 'children';

interface PassengerInformationProps {
  titel: PassengerType;
  index: number;
  roomId: number;
  room_index: number;
  readOnly?: boolean;
}


export default function PassengerInformationHotel({
  titel,
  index,
  roomId,
  room_index,
  readOnly = false
}: PassengerInformationProps) {
  const dispatch = useDispatch();
  const passenger = useSelector((state: any) => 
    state.hotelPayment.RoomsData[room_index]?.passengers[titel][index]
  );
  const roomData = useSelector((state: any) => 
    state.hotelPayment.RoomsData[room_index]
  );


  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(passengerSchema),
    defaultValues: passenger,
    mode: "onChange"
  });
  useEffect(() => {
    if (passenger) {
      Object.entries(passenger).forEach(([key, value]) => {
        setValue(key as keyof FormData, value as string);
      });
    }
  }, [passenger, setValue]);

  const handleFieldChange = (field: keyof FormData, value: any) => {
    if (readOnly) return;

    const updatedData = {
      ...roomData,
      [field]: value
    };

    dispatch(updatePassenger({
      roomIndex: room_index,
      type: titel,
      passengerData: updatedData,
      index,
      field,
      value
    }));
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
          <div>



          </div>

          <div className="flex flex-col sm:flex-row gap-4 pb-2">
          <div className="flex flex-col w-full">
              <label className="text-sm text-gray-500">Mr</label>
              <Controller
                name="civility"
                control={control}
                render={({ field }) => (
                  <Select
                  disabled={readOnly}
                  value={field.value || "Mr"} // Ensures "Mr" is default if field.value is empty
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleFieldChange("civility", value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Title" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mr">Mr</SelectItem>
                    <SelectItem value="Ms">Ms</SelectItem>
                    <SelectItem value="Mrs">Mrs</SelectItem>
                  </SelectContent>
                </Select>
                
                )}
              />
              {errors.civility && (
                <p className="text-red-500 text-xs mt-1">{errors.civility.message}</p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label className="text-sm text-gray-500">First Name</label>
              <Controller
                name="firstname"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="First name"
                    disabled={readOnly}
                    onChange={(e) => {
                      field.onChange(e);
                      handleFieldChange('firstname', e.target.value);
                    }}
                 className={errors.firstname?'border-red-500 border-2':''}

                  />
                )}
              />
              {errors.firstname && (
                <p className="text-red-500 text-xs mt-1">{errors.firstname.message}</p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label className="text-sm text-gray-500">Last Name</label>
              <Controller
                name="lastname"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Last name"
                    disabled={readOnly}
                    onChange={(e) => {
                      field.onChange(e);
                      handleFieldChange('lastname', e.target.value);
                    }}
                 className={errors.lastname?'border-red-500 border-2':''}

                  />
                )}
              />
              {errors.lastname && (
                <p className="text-red-500 text-xs mt-1">{errors.lastname.message}</p>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}