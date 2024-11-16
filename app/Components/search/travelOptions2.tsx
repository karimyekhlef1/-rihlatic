import { useState, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Option {
  id: string;
  label: string;
  price: string;
  duration: string;
}

const options: Option[] = [
  { id: 'best', label: 'Best', price: '$90', duration: '3h 40m' },
  { id: 'cheapest', label: 'Cheapest', price: '$90', duration: '3h 40m' },
  { id: 'fastest', label: 'Fastest', price: '$90', duration: '3h 40m' },
];

export default function ResponsiveOptionCard() {
  const [selectedOption, setSelectedOption] = useState<string>('best');
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const normalContent = () => (
    <div className="flex rounded-xl bg-white border border-gray-200 drop-shadow-sm h-16 w-full items-center overflow-hidden">
      {options.map((option, index) => (
        <button
          key={option.id}
          className={`flex-1 p-3 text-left text-sm transition-all duration-300 ease-in-out relative ${
            selectedOption === option.id
              ? 'text-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
          onClick={() => setSelectedOption(option.id)}
        >
          <div className="font-semibold">{option.label}</div>
          <div>
            {option.price} · {option.duration}
          </div>
          <div
            className={`absolute bottom-0 left-0 right-0 h-1 transition-all duration-300 ease-in-out ${
              selectedOption === option.id
                ? 'bg-blue-600'
                : 'bg-transparent group-hover:bg-blue-600'
            } ${index === 0 ? 'rounded-bl-xl' : ''} ${
              index === options.length - 1 ? 'rounded-br-xl' : ''
            }`}
          ></div>
        </button>
      ))}
    </div>
  );

  const OptionsContent = () => (
    <RadioGroup
      value={selectedOption}
      onValueChange={setSelectedOption}
      className="space-y-2"
    >
      {options.map((option) => (
        <div key={option.id} className="flex items-center space-x-2">
          <RadioGroupItem value={option.id} id={option.id} />
          <Label htmlFor={option.id} className="flex justify-between w-full">
            <span>{option.label}</span>
            <span>
              {option.price} · {option.duration}
            </span>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger>
          <Button variant="ghost2" className="pt-9">
            <SlidersHorizontal size={15} className="text-orange-500" />
            <span className="ml-2 text-xs font-semibold text-orange-500">
              Prices
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent side={'right'}>
          <SheetHeader>
            <SheetTitle>Sort by</SheetTitle>
          </SheetHeader>
          <OptionsContent />
        </SheetContent>
      </Sheet>
    );
  }

  return normalContent();
}
