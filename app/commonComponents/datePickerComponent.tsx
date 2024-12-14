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

interface SearchInputProps {
  isOnePick?: boolean;
}

const DatePickerComponent: React.FC<SearchInputProps> = ({
  isOnePick,
}) => {
  const dateRange = {
    from: new Date(),
    to: new Date(),
  };

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'search'}
            className={cn(
              'w-[545px] h-[43px] justify-start text-left font-normal rounded',
              !dateRange && 'text-muted-foreground',
              'focus:z-[1] focus:border-orange-500 focus:text-orange-500 focus:border-2'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {!isOnePick ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, 'LLL dd, y')} -{' '}
                  {format(dateRange.to, 'LLL dd, y')}
                </>
              ) : (
                format(dateRange.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
            <div className="text-sm text-gray-400 pl-8">
              {isOnePick ? '( Start date )' : '( Start date - End date )'}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={(newDateRange: DateRange | undefined) => {
              // if (isOnePick) {
              //   dispatch(setDateRange(newDateRange));
              // } else {
              //   dispatch(setDateRange(newDateRange));
              // }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerComponent;
