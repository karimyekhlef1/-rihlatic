'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { useDispatch, useSelector } from 'react-redux';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RootState } from '@/lib/store/store';
import { setDateRange } from '@/lib/store/custom/commonSlices/calendarSlice';

export function DatePickerHome() {
  const dispatch = useDispatch();
  const dateRange = useSelector((state: RootState) => state.calendar.dateRange);

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'search'}
            className={cn(
              'w-[545px] h-[43px] justify-start text-left font-normal',
              !dateRange && 'text-muted-foreground',
              'focus:z-[1] focus:border-orange-500 focus:text-orange-500 focus:border-2'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
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
              ( Departure - Return )
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={(newDateRange: DateRange | undefined) =>
              dispatch(setDateRange(newDateRange))
            }
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
