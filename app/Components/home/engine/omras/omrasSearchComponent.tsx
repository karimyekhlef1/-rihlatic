import React from "react";
import SearchInputComponent from "@/app/commonComponents/searchInputComponent";
import DatePickerComponent from "@/app/commonComponents/datePickerComponent";
import { useDispatch, useSelector } from "react-redux";
import { DateRange } from "react-day-picker";
import { setDateRange } from "@/lib/store/engine/omra_search_slice";
import { Button } from "@/components/ui/button";

const OmrasSearchComponent: React.FC = () => {
  const dispatch = useDispatch<any>();
  const dateRange = useSelector(
    (state: { omraSearchSlice: { dateRange: DateRange } }) =>
      state.omraSearchSlice?.dateRange
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-start gap-2 flex-wrap">
        <div className="flex items-center flex-wrap gap-2">
          <SearchInputComponent
            placeholder="Search for a Omra"
            onSearch={(value) => console.log(value)}
            dir="To"
            type={4}
          />
          <DatePickerComponent
            isOnePick={false}
            dateRange={dateRange}
            setDateRange={(value: DateRange) => dispatch(setDateRange(value))}
          />
          <Button
            variant="active"
            type="button"
            className="rounded px-4 h-9 text-sm font-semibold w-28"
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OmrasSearchComponent;
