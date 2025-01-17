'use client';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format, parse } from 'date-fns';
import { updatePassengerFieldByIndex } from '@/lib/store/custom/packagesSlices/paymentPachageSlices';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type PassengerType = 'adults' | 'children' | 'infants';
type PassengerInformationProps = {
  titel: PassengerType;
  index: number;
  roomId: number;
  room_index:number;
};

export default function PassengerInformation({ titel, index, roomId,room_index }: PassengerInformationProps) {
  useEffect(()=>{

  },[titel, index, roomId])
  const dispatch = useDispatch();
  const passenger = useSelector((state: any) => 
    state.paymentPackage.RoomsData[room_index]?.passengers[titel][index]
  );

  const handleInputChange = (key: string, value: string | null) => {
    dispatch(
      updatePassengerFieldByIndex({
        room_id: roomId,
        room_index,
        type: titel,
        index,
        field: key,
        value,
      })
    );
  };

  const formatDob = useMemo(() => (dateString: string | null) => {
    if (!dateString) return 'DD | Select Month | YYYY';
    const date = parse(dateString, 'yyyy-MM-dd', new Date());
    return `${format(date, 'dd')} | ${format(date, 'MMMM')} | ${format(date, 'yyyy')}`;
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        handleInputChange('passport_scan', base64);
      };
      reader.readAsDataURL(file);
    }
  };
  console.log("titel, index, roomId",titel, index, roomId)

  return (
    <Card className="w-full">
      <CardContent className='w-full'>
        <form className="space-y-4">
          <div className="flex flex-col space-y-2 mt-4 mb-6">
            <div className="text-lg font-semibold">
              {titel} {index + 1}
            </div>
          </div>

          {titel=="adults" && index == 0  ? <div className="flex flex-col sm:flex-row gap-4 pb-2">
            <Input
              id="email"
              type="email"
              placeholder="E-mail of passenger"
              value={passenger?.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            <Input
              id="phone"
              type="tel"
              placeholder="Phone number"
              value={passenger?.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </div>:null}
          <Separator />

          <div className="relative">
            <Input
              id="passport"
              type="file"
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              accept="image/*"
              onChange={handleFileUpload}
            />
            <div className="flex items-center border rounded-md bg-background px-3 py-2 text-gray-700">
              <Button
                type="button"
                size="sm"
                variant={'outline'}
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
              <label htmlFor="firstName" className="text-sm text-gray-500">First name</label>
              <Input
                id="firstName"
                placeholder="First name"
                value={passenger?.first_name || ''}
                onChange={(e) => handleInputChange('first_name', e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="lastName" className="text-sm text-gray-500">Last name</label>
              <Input
                id="lastName"
                placeholder="Last name"
                value={passenger?.last_name || ''}
                onChange={(e) => handleInputChange('last_name', e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm text-gray-500">Gender</label>
              <Select
                value={passenger?.sex || 'male'}
                onValueChange={(value) => handleInputChange('sex', value)}
              >
                <SelectTrigger id="sex">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="dob" className="text-sm text-gray-500">Birth date</label>
              <Input
                type="date" id="dob"
                placeholder="Select birth date"
                value={passenger?.birth_date || ""}
                onChange={(e) => handleInputChange( 'birth_date', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className='flex flex-col'>
              <label htmlFor='passport-nbr' className="text-sm text-gray-500">Passport Number</label>
              <Input
                type="text" id='passport-nbr'
                placeholder="Passport Number"
                value={passenger?.passport_nbr || ''}
                onChange={(e) => handleInputChange('passport_nbr', e.target?.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor='ex-date' className="text-sm text-gray-500">Passport expire date</label>
              <Input
                type="date" id='ex-date'
                placeholder="Select passport expire date"
                value={passenger?.passport_expire_at || ""}
                onChange={(e) => handleInputChange('passport_expire_at', e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}