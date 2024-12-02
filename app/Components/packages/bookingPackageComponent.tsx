import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CircleCheck } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { format, differenceInDays } from 'date-fns';
import { extractData } from '@/app/hooks/useExtractData';
import DropDownBookingComponent from './dropDownBooking';
import Link from 'next/link';

interface Room {
  name: string;
}

interface Departure {
  id: number;
  price_ini?: number;
  departure_date?: string;
  return_date?: string;
  pricing?: {
    rooms?: Room[];
  };
}

export default function BookingPackageComponent({ data }: { data?: Departure[] }) {
  // Ensure data is always an array
  const packageData = data || [];

  const [selectedDeparture, setSelectedDeparture] = useState<Departure | undefined>(() => {
    // If packageData is not empty, use the first item
    // Otherwise, return undefined
    return packageData.length > 0 ? packageData[0] : undefined;
  });
  const [selectedOption, setSelectedOption] = useState<string | null>('test');
  const [roomNames, setRoomNames] = useState<string[]>([]);
  const [departureNames, setDepartureNames] = useState<number[]>([]);
  
  // Derive these states directly from selectedDeparture
  const price = selectedDeparture?.price_ini;
  const startDate = selectedDeparture?.departure_date;
  const endDate = selectedDeparture?.return_date;

  const { date } = useSelector((state: RootState) => state.datePicker);

  const calculateDuration = () => {
    if (startDate && endDate) {
      try {
        const nights = differenceInDays(new Date(endDate), new Date(startDate));
        const days = nights + 1;
        return `${nights} nights / ${days} days`;
      } catch (error) {
        console.error('Error calculating duration:', error);
        return 'Invalid dates';
      }
    }
    return 'Select dates';
  };

  useEffect(() => {
    if (packageData.length > 0) {
      // Extract room names
      const roomNames = extractData(packageData, (departure) =>
        departure.pricing?.rooms?.map((room:any) => room.name) || []
      );
      
      // Extract departure IDs
      const departureIds = packageData.map((departure) => departure.id);
      
      setRoomNames(roomNames);
      setDepartureNames(departureIds);
    }
  }, [packageData]);

  const handleSelectDeparture = (id: number) => {
    const selected = packageData.find((item) => item.id === id);
    if (selected) {
      setSelectedDeparture(selected);
    }
  };

  // Render nothing if no data
  if (packageData.length === 0) {
    return <div>No package data available</div>;
  }

  return (
    <div>
      <Card className="w-[300px] rounded-xl">
        <CardContent className="px-0 py-8">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center justify-center pb-4">
              <p className="text-xs">Starting from</p>
              <p className="font-semibold text-lg">
                {price ? `${price} DZD` : 'N/A'}
              </p>
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
                    ? format(new Date(startDate), 'dd/MMM/yyyy')
                    : 'Select dates'}
                  {endDate ? ` - ${format(new Date(endDate), 'dd/MMM/yyyy')}` : ''}
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
                  <p className="font-semibold text-sm">{price ? `${price} DZD` : 'N/A'}</p>
                </div>
                <Separator />
              </>
            )}
            <div className="flex flex-col gap-y-2 pb-4 pt-4">
              <DropDownBookingComponent 
                onSelect={setSelectedOption} 
                data={roomNames} 
                title='Kind of room' 
              />
              <DropDownBookingComponent 
                onSelect={handleSelectDeparture} 
                data={departureNames} 
                title='Select a departure' 
              />
            </div>
            <Separator />
            <div className="pt-4">
              <Link href={'/payment'}>
                <Button className="px-14" variant={'rihlatic'}>
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}