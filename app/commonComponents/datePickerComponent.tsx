import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useDispatch } from "react-redux";

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
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "w-[400px] h-9 justify-start text-xs bg-white border-gray-200",
              !dateRange && "border-[#FF8000] bg-orange-50"
            )}
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-3.5 w-3.5 text-gray-500" />
              <div className="flex flex-col items-start">
                <span className="text-xs">
                  {!isOnePick ? (
                    dateRange?.to ? (
                      <>
                        {format(dateRange?.from || new Date(), "LLL dd, y")} -{" "}
                        {format(dateRange?.to || new Date(), "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange?.from || new Date(), "LLL dd, y")
                    )
                  ) : (
                    "Pick a date"
                  )}
                </span>
                <span className="text-[10px] text-gray-400">
                  {isOnePick ? "Start" : "Start - End"}
                </span>
              </div>
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
