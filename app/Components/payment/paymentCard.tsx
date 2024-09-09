'use client';

import { RootState } from '@/lib/store/store';
import { useDispatch, useSelector } from 'react-redux';

import { setStep } from '@/lib/store/paymentSlices/paymentStepSlice';
import { setDob } from '@/lib/store/paymentSlices/dobSlice';
import { setPassportNumber } from '@/lib/store/paymentSlices/passportNumberSlice';
import { setExpirationDate } from '@/lib/store/paymentSlices/expirationDateSlice';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

export default function PaymentCardComponent() {
  const dispatch = useDispatch();

  // Select relevant state from Redux store
  const step = useSelector((state: RootState) => state.paymentStep.step);
  const dob = useSelector((state: RootState) => state.dob.dob);
  const passportNumber = useSelector(
    (state: RootState) => state.passportNumber.passportNumber
  );
  const expirationDate = useSelector(
    (state: RootState) => state.expirationDate.expirationDate
  );

  // Format date of birth for display
  const formatDob = (dateString: string | null) => {
    if (!dateString) return 'DD | Select Month | YYYY';
    const date = parse(dateString, 'yyyy-MM-dd', new Date());
    const day = format(date, 'dd');
    const month = format(date, 'MMMM');
    const year = format(date, 'yyyy');
    return `${day} | ${month} | ${year}`;
  };

  // Handle navigation between steps
  const handleNext = () => {
    dispatch(setStep('payment'));
  };

  const handleBack = () => {
    dispatch(setStep('details'));
  };

  return (
    <div>
      <Card className="w-full max-w-[840px] mx-auto mb-4">
        <CardHeader>
          {/* Hidden card title that changes based on the current step */}
          <CardTitle className="hidden">
            {step === 'details' ? 'Details' : 'Payment'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === 'details' ? (
            // Details form
            <form className="space-y-4">
              <div className="flex items-center mb-4">
                <UserIcon className="mr-2 h-5 w-5 text-gray-600" fill="black" />
                <span className="text-lg font-semibold">Adults</span>
              </div>
              <Separator />
              <div className="flex flex-col space-y-2 mt-4 mb-6">
                <div className="text-lg font-semibold">Adultes 1</div>
                <div className="flex items-center">
                  <span className="text-base">Principal</span>
                  <AlertCircle
                    className="ml-2 h-4 w-4 text-white"
                    fill="#ff8000"
                  />
                </div>
              </div>
              {/* Email and phone input fields */}
              <div className="flex flex-row gap-x-4 pb-4">
                <Input
                  id="email"
                  type="email"
                  placeholder="E-mail of passenger"
                />
                <Input id="phone" type="tel" placeholder="Phone number" />
              </div>
              <Separator />

              {/* Passport scan upload section */}
              <div className="relative">
                <Input
                  id="passport"
                  type="file"
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files && console.log(e.target.files[0])
                  }
                />
                <div className="flex items-center border rounded-md bg-background px-3 py-2 text-gray-700">
                  <Button
                    type="button"
                    size="sm"
                    variant={'outline'}
                    className="mr-2 drop-shadow-md"
                    onClick={() => document.getElementById('passport')?.click()}
                  >
                    <ScanLine className="mr-2 h-4 w-4" />
                    Scan passport
                  </Button>
                </div>
              </div>
              <p className="text-xs text-gray-400">
                We will scan your passport automatically when you upload it
              </p>

              {/* First name and last name input fields */}
              <div className="flex flex-row gap-x-4 pb-2">
                <Input id="firstName" placeholder="First name" />
                <Input id="lastName" placeholder="Last name" />
              </div>

              {/* Date of birth, passport number, and expiration date inputs */}
              <div>
                <div className="w-full space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Date of birth popover calendar */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !dob && 'text-gray-400'
                          )}
                        >
                          {formatDob(dob)}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={
                            dob
                              ? parse(dob, 'yyyy-MM-dd', new Date())
                              : undefined
                          }
                          onSelect={(date) =>
                            dispatch(
                              setDob(date ? format(date, 'yyyy-MM-dd') : null)
                            )
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    {/* Passport number input */}
                    <Input
                      type="text"
                      placeholder="Passport Number"
                      className="col-span-1"
                      value={passportNumber}
                      onChange={(e) =>
                        dispatch(setPassportNumber(e.target.value))
                      }
                    />
                  </div>

                  {/* Passport expiration date popover calendar */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !expirationDate && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {expirationDate ? (
                          format(
                            parse(expirationDate, 'yyyy-MM-dd', new Date()),
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
                          expirationDate
                            ? parse(expirationDate, 'yyyy-MM-dd', new Date())
                            : undefined
                        }
                        onSelect={(date) =>
                          dispatch(
                            setExpirationDate(
                              date ? format(date, 'yyyy-MM-dd') : null
                            )
                          )
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </form>
          ) : (
            // Payment success message
            <div className="flex flex-col justify-center items-center h-[333px] w-[559px] text-center">
              <p className="text-2xl font-bold text-green-600">
                Payment Successful
              </p>
              <p className="text-gray-600">Thank you for your purchase!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation buttons outside the Card */}
      <div className="flex justify-between max-w-[840px] mx-auto">
        <Button variant="outline" onClick={handleBack} className="px-16">
          {step === 'details' ? 'Back' : 'Back to Details'}
        </Button>
        {step === 'details' && (
          <Button variant={'active'} onClick={handleNext} className="px-16">
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
