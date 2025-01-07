import React, { useState } from "react";
import SearchInputComponent from "@/app/commonComponents/searchInputComponent";
import SearchSelectComponent from "../../searchSelectComponent";
import PassengersComponent from "./passangersComponent";
import VolPackageComponent from "./volPackageComponent";
import {
  setDateRange,
  setVolMethod,
  setVolType,
  volEngineMethods,
  volEngineTypes,
} from "@/lib/store/engine/vol_search_slice";
import { useDispatch, useSelector } from "react-redux";
import DatePickerComponent from "@/app/commonComponents/datePickerComponent";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";

const VolSearchComponent: React.FC = () => {
  const dispatch = useDispatch<any>();

  const volType = useSelector(
    (state: { volSearchSlice: { volType: string } }) =>
      state.volSearchSlice?.volType
  );
  const volPackage = useSelector(
    (state: { volSearchSlice: { volPackage: any } }) =>
      state.volSearchSlice?.volPackage
  );
  const dateRange = useSelector(
    (state: { volSearchSlice: { dateRange: DateRange } }) =>
      state.volSearchSlice?.dateRange
  );

  const setVolTypeFunc = (value: string) => {
    dispatch(setVolType(value));
  };

  const setMethodFunc = (value: string) => {
    dispatch(setVolMethod(value));
  };

  const isOnePick = () => {
    return !(volType === "Return" && volPackage?.openReturn);
  };

  const [destinations, setDestinations] = useState([
    { id: "", from: "", to: "", date: "" },
  ]);

  const addDestination = () => {
    setDestinations([
      ...destinations,
      { id: generateId(), from: "", to: "", date: "" },
    ]);
  };

  const removeDestination = (index: number) => {
    if (destinations.length === 1) return;
    setDestinations((prev) => {
      return prev.filter((dest: any) => dest.id !== destinations[index].id);
    });
  };

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const updateDestination = (index: number, field: string, value: string) => {
    const updatedDestinations = destinations.map((dest, i) =>
      i === index ? { ...dest, [field]: value } : dest
    );
    setDestinations(updatedDestinations);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-3">
        <SearchSelectComponent
          data={volEngineTypes}
          setSelected={setVolTypeFunc}
        />
        <SearchSelectComponent
          data={volEngineMethods}
          setSelected={setMethodFunc}
        />
        <PassengersComponent />
        <VolPackageComponent />
      </div>
      <div className="flex justify-start gap-2 flex-wrap">
        {volType !== "Multi Destinations" ? (
          <>
            <div className="flex items-center flex-wrap gap-2">
              <SearchInputComponent
                placeholder="City, airports or place"
                onSearch={(value) => console.log(value)}
                dir="From"
                type={1}
              />
              <SearchInputComponent
                placeholder="City, airports or place"
                onSearch={(value) => console.log(value)}
                dir="To"
                type={1}
              />
              <DatePickerComponent
                isOnePick={isOnePick()}
                dateRange={dateRange}
                setDateRange={(value: DateRange) =>
                  dispatch(setDateRange(value))
                }
              />
            </div>
            <Button
              variant="active"
              type="button"
              className="rounded px-2 py-2.5 text-sm font-semibold w-full sm:w-28 sm:h-9"
            >
              Search
            </Button>
          </>
        ) : (
          <>
            {destinations.map((dest: any, i: number) => (
              <div className="flex flex-wrap items-center gap-2" key={dest.id}>
                <SearchInputComponent
                  placeholder="City, airports or place"
                  onSearch={(value) => console.log(value)}
                  dir="From"
                  type={1}
                />
                <SearchInputComponent
                  placeholder="City, airports or place"
                  onSearch={(value) => console.log(value)}
                  dir="To"
                  type={1}
                />
                <DatePickerComponent isOnePick={true} />
                <div
                  className="flex items-center gap-2 bg-red-50 hover:bg-red-100 p-4 h-9 rounded"
                  onClick={() => removeDestination(i)}
                >
                  <Trash2 className="text-red-500 h-4 w-4 cursor-pointer" />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {volType === "Multi Destinations" && (
        <div className="flex justify-between flex-wrap gap-2 mt-3">
          <Button
            variant="outline"
            size="sm"
            className="text-gray-500 text-sm border rounded bg-transparent hover:bg-gray-200"
            onClick={addDestination}
          >
            Add Destination
          </Button>
          <Button
            variant="active"
            type="button"
            className="rounded px-2 py-2.5 text-sm font-semibold w-full sm:w-28 sm:h-9"
          >
            Search
          </Button>
        </div>
      )}
    </div>
  );
};

export default VolSearchComponent;
