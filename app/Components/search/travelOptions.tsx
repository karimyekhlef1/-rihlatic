import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { setSelectedOption } from '@/lib/store/searchSlices/travelOptionsSlice';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';

type Option = {
  type: string;
  price: string;
  duration: string;
};

const options: Option[] = [
  { type: 'Best', price: '$558', duration: '26h 00m' },
  { type: 'Cheapest', price: '$541', duration: '37h 05m' },
  { type: 'Fastest', price: '$1,341', duration: '17h 20m' },
];

export default function TravelOptions() {
  const selectedOption = useSelector(
    (state: RootState) => state.travelOptions.selectedOption
  );
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 640);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const OptionsContent = () => (
    <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 pt-4 sm:pt-0">
      {options.map((option) => (
        <button
          key={option.type}
          className={cn(
            'w-full sm:flex-1 px-3 py-2 rounded-md transition-all duration-200 ease-in-out',
            'hover:shadow-md focus:outline-none text-sm sm:text-base',
            selectedOption === option.type
              ? 'bg-white text-blue-600 border-2 border-blue-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
          onClick={() => dispatch(setSelectedOption(option.type))}
        >
          <div className="text-left">
            <div className="font-semibold">{option.type}</div>
            <div className="text-xs sm:text-sm">
              {option.price} · {option.duration}
            </div>
          </div>
        </button>
      ))}
    </div>
  );

  if (!isMobile) {
    return <OptionsContent />;
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost2" className="p-0">
          <SlidersHorizontal size={15} className="text-orange-500" />
          <span className="ml-2 text-xs font-semibold text-orange-500">
            Prices
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent side={'right'}>
        <OptionsContent />
      </SheetContent>
    </Sheet>
  );
}
