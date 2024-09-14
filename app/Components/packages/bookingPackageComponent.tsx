import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CircleCheck } from 'lucide-react';
import { DatePickerWithRange } from '@/app/commonComponents/datePicker';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store'; // Adjust this import path as needed
import { format, differenceInDays } from 'date-fns';

import DropDownBookingComponent from './dropDownBooking';

export default function BookingPackageComponent() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { date } = useSelector((state: RootState) => state.datePicker);
  const startDate = date?.from;
  const endDate = date?.to;

  const calculateDuration = () => {
    if (startDate && endDate) {
      const nights = differenceInDays(endDate, startDate);
      const days = nights + 1;
      return `${nights} nights / ${days} days`;
    }
    return 'Select dates';
  };

  return (
    <div>
      <Card className="w-[300px] rounded-3xl">
        <CardContent className="px-0 py-8">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center justify-center pb-4">
              <p className="text-xs">Starting from</p>
              <p className="font-semibold text-lg">149000 DZD</p>
            </div>
            <Separator />
            <div className="flex flex-col pt-4 pb-[100px]">
              <div className="flex flex-row items-center">
                <CircleCheck
                  size={15}
                  className="font-semibold text-xs text-[#43acff]"
                  fill="#b4deff"
                />
                <p className="text-sm font-semibold pl-2">
                  {calculateDuration()}
                </p>
              </div>
              <div className="flex flex-row items-center mt-2">
                <CircleCheck
                  size={15}
                  className="font-semibold text-xs text-[#ff8000]"
                  fill="#ffcc99"
                />
                <p className="text-sm font-semibold pl-2">
                  {startDate
                    ? format(startDate, 'dd-MMM-yyyy')
                    : 'Select dates'}
                  {endDate ? ` - ${format(endDate, 'dd-MMM-yyyy')}` : ''}
                </p>
              </div>
            </div>
            <Separator />
            {selectedOption && (
              <>
                <p className="text-sm font-semibold pt-4">
                  Checkout Calculation
                </p>
                <div className="flex flex-row items-center justify-between py-4 w-full px-4">
                  <p className="text-sm font-medium text-gray-500">
                    {selectedOption}
                  </p>
                  <p className="font-semibold text-sm">149000 DZD</p>
                </div>
                <Separator />
              </>
            )}
            <div className="flex flex-col gap-y-2 pb-4 pt-4">
              <DropDownBookingComponent onSelect={setSelectedOption} />
              <DatePickerWithRange />
            </div>
            <Separator />
            <div className="pt-4">
              <Button className="px-14" variant={'rihlatic'}>
                Book Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
