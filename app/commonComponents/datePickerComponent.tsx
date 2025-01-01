import React from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';

interface SearchInputProps {
  isOnePick?: boolean;
  dateRange?: DateRange | undefined;
  setDateRange?: (dateRange: DateRange) => any;
}

const DatePickerComponent: React.FC<SearchInputProps> = ({
  isOnePick,
  dateRange,
  setDateRange,
}) => {
  
  const dispatch = useDispatch<any>();  

  return (
    <div className="w-full sm:w-[500px]">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'search'}
            className={cn(
              'w-full sm:w-[500px] h-[42px] justify-start text-left font-normal rounded',
              !dateRange && 'text-muted-foreground',
              'focus:z-[1] focus:border-orange-500 focus:text-orange-500 focus:border-2'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {!isOnePick ? (
              dateRange?.to ? (
                <>
                  {format(dateRange?.from || new Date(), 'LLL dd, y')} -{' '}
                  {format(dateRange?.to || new Date(), 'LLL dd, y')}
                </>
              ) : (
                format(dateRange?.from || new Date(), 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
            <div className="text-sm text-gray-400 pl-8">
              {isOnePick ? '( Start )' : '( Start-End )'}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            // defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={(newDateRange: DateRange | undefined) => {
              if (newDateRange) {
                setDateRange && setDateRange(newDateRange);
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerComponent;
