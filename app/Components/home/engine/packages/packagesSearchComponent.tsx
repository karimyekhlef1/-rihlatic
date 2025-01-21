import React from "react";
import SearchInputComponent from "@/app/commonComponents/searchInputComponent";
import DatePickerComponent from "@/app/commonComponents/datePickerComponent";
import SearchSelectComponent from "../../searchSelectComponent";
import {
  packageEngineTypes,
  setDateRange,
} from "@/lib/store/engine/package_search_slice";
import { DateRange } from "react-day-picker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigateHelper } from "@/app/hooks/useNavigateHelper";
import {
  setSelectedDestinationId,
  setPackageType,
  setSelectedDestinationName
} from "@/lib/store/engine/package_search_slice";

interface PackagesSearchComponentProps {
  onSearch: () => Promise<void>; // Define the onSearch prop type
}

const PackagesSearchComponent: React.FC<PackagesSearchComponentProps> = ({ onSearch }) => {
  const dateRange = useSelector(
    (state: { packageSearchSlice: { dateRange: DateRange } }) =>
      state.packageSearchSlice?.dateRange
  );
  
  const selectedDestinationName = useSelector((state: any) => state.packageSearchSlice.selectedDestinationName);
  const dispatch = useDispatch<any>();
  const { handleClickExplore } = useNavigateHelper({onSearch});

  const handleSelectionType = (item: any) => {
    dispatch(setPackageType(item));
  };
  const handleSelectionDestination = (item: any) => {
    dispatch(setSelectedDestinationName(item.name));
    dispatch(setSelectedDestinationId(item.id));
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3">
        <SearchSelectComponent
          data={packageEngineTypes}
          setSelected={handleSelectionType}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex flex-col md:flex-row items-center gap-2 w-full">
          <SearchInputComponent
            placeholder="City, airports or place"
            onSearch={handleSelectionDestination}
            dir="To"
            type={2}
            selected={selectedDestinationName}
          />
          <DatePickerComponent
            isOnePick={false}
            dateRange={dateRange}
            setDateRange={(value: DateRange) => dispatch(setDateRange(value))}
          />
          <button
            type="button"
            className="rounded bg-[#FF8000] text-white px-7 h-9 text-sm font-semibold w-full md:w-36"
            onClick={() => handleClickExplore("packages")}
          >
            Exploire
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackagesSearchComponent;
