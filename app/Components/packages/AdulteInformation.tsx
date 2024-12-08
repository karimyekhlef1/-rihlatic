'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';
import { format, parse } from 'date-fns';
import { ScanLine, CalendarIcon, UserIcon, AlertCircle } from 'lucide-react';

interface ReservationFormState {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  dob: string | null;
  passportNumber: string;
  expirationDate: string | null;
}
type AdulteInformationProps = {
    titel: string;
    index: number; // Optional: If you want to display the index
  };
export default function  AdulteInformation({ titel, index }: AdulteInformationProps) {
  const [formData, setFormData] = useState<ReservationFormState>({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    dob: null,
    passportNumber: '',
    expirationDate: null,
  });

  const handleInputChange = (
    key: keyof ReservationFormState, 
    value: string | null
  ) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const formatDob = (dateString: string | null) => {
    if (!dateString) return 'DD | Select Month | YYYY';
    const date = parse(dateString, 'yyyy-MM-dd', new Date());
    return `${format(date, 'dd')} | ${format(date, 'MMMM')} | ${format(date, 'yyyy')}`;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Uploaded file:', file);
      // Add file processing logic here
    }
  };

  const triggerPassportUpload = () => {
    document.getElementById('passport')?.click();
  };

  return (
    <div>
      <Card className="w-full max-w-[840px] mx-auto mb-4">
        {/* <CardHeader>
          <CardTitle className="sr-only">Room Reservation</CardTitle>
        </CardHeader> */}
        <CardContent>
          <form className="space-y-4">
            {/* Adults Section */}
            <div className="flex items-center mb-4">
              <UserIcon className="mr-2 h-5 w-5 text-gray-600" fill="black" />
              <span className="text-lg font-semibold">Adults</span>
            </div>
            <Separator />

            {/* Principal Adult Details */}
            <div className="flex flex-col space-y-2 mt-4 mb-6">
              <div className="text-lg font-semibold">{titel} {index}</div>
              <div className="flex items-center">
                <span className="text-base">Principal</span>
                <AlertCircle
                  className="ml-2 h-4 w-4 text-white"
                  fill="#ff8000"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="flex flex-row gap-x-4 pb-4">
              <Input
                id="email"
                type="email"
                placeholder="E-mail of passenger"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
              <Input 
                id="phone" 
                type="tel" 
                placeholder="Phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>
            <Separator />

            {/* Passport Scan Upload */}
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
                  onClick={triggerPassportUpload}
                >
                  <ScanLine className="mr-2 h-4 w-4" />
                  Scan passport
                </Button>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              We will scan your passport automatically when you upload it
            </p>

            {/* Name Inputs */}
            <div className="flex flex-row gap-x-4 pb-2">
              <Input 
                id="firstName" 
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
              />
              <Input 
                id="lastName" 
                placeholder="Last name"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
              />
            </div>

            {/* Date of Birth and Passport Details */}
            <div className="w-full space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Date of Birth Popover */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !formData.dob && 'text-gray-400'
                      )}
                    >
                      {formatDob(formData.dob)}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={
                        formData.dob
                          ? parse(formData.dob, 'yyyy-MM-dd', new Date())
                          : undefined
                      }
                      onSelect={(date) => 
                        handleInputChange('dob', date ? format(date, 'yyyy-MM-dd') : null)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                {/* Passport Number Input */}
                <Input
                  type="text"
                  placeholder="Passport Number"
                  className="col-span-1"
                  value={formData.passportNumber}
                  onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                />
              </div>

              {/* Passport Expiration Date Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !formData.expirationDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.expirationDate ? (
                      format(
                        parse(formData.expirationDate, 'yyyy-MM-dd', new Date()),
                        'PPP'
                      )
                    ) : (
                      <span>Passport Expiration Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={
                      formData.expirationDate
                        ? parse(formData.expirationDate, 'yyyy-MM-dd', new Date())
                        : undefined
                    }
                    onSelect={(date) => 
                      handleInputChange('expirationDate', date ? format(date, 'yyyy-MM-dd') : null)
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
