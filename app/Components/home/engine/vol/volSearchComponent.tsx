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
import { searchFlights } from "@/lib/store/api/vols/volsSlice";

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
    return volType === "One Way";
  };

  const [destinations, setDestinations] = useState([
    {
      id: "",
      from: "",
      to: "",
      date: {
        from: new Date(),
        to:
          volType === "One Way"
            ? new Date()
            : new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      } as DateRange,
    },
  ]);

  const addDestination = () => {
    setDestinations([
      ...destinations,
      {
        id: generateId(),
        from: "",
        to: "",
        date: {
          from: new Date(),
          to: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        } as DateRange,
      },
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

  const updateDestination = (index: number, field: string, value: any) => {
    const updatedDestinations = destinations.map((dest, i) =>
      i === index ? { ...dest, [field]: value } : dest
    );
    setDestinations(updatedDestinations);
  };

  const handleFromAirportSelect = (item: any, index: number = 0) => {
    console.log("SearchInputComponent - Sending item:", item);

    const airportCode = item.iata || item.code;
    console.log("SearchInputComponent - Sending airportCode:", airportCode);

    console.log("volSearchComponent - From airport selected:", airportCode);
    if (airportCode) {
      updateDestination(index, "from", airportCode.toUpperCase());
    }
  };

  const handleToAirportSelect = (item: any, index: number = 0) => {
    const airportCode = item.iata || item.code;
    console.log("volSearchComponent - To airport selected:", airportCode);
    if (airportCode) {
      updateDestination(index, "to", airportCode.toUpperCase());
    }
  };

  const handleSearch = () => {
    console.log(
      "volSearchComponent - Current destinations state:",
      destinations
    );

    // Validate required fields
    if (!destinations[0].from || !destinations[0].to) {
      console.error("Please select both departure and arrival airports");
      return;
    }

    // Validate airport code format
    const isValidAirportCode = (code: string) => /^[A-Z]{3}$/.test(code);
    if (
      !isValidAirportCode(destinations[0].from) ||
      !isValidAirportCode(destinations[0].to)
    ) {
      console.error(
        "Invalid airport codes. Expected IATA format (e.g., PAR, ALG)"
      );
      return;
    }

    const searchParams = {
      flightType: volType === "One Way" ? "ONE_WAY" : "ROUND_TRIP",
      flightClass: "NN", // default to non-specified
      quantityAdults: volPackage.adults || 1,
      quantityChild: volPackage.children || 0,
      quantityInfant: volPackage.infants || 0,
      quantityInfantWithSeat: 0,
      quantityStudent: 0,
      quantityYouth: 0,
      quantitySenior: 0,
      departureId: destinations[0].from.toUpperCase(),
      arrivalId: destinations[0].to.toUpperCase(),
      departureDate: dateRange?.from
        ? new Date(dateRange.from.getTime() - (dateRange.from.getTimezoneOffset() * 60000))
            .toISOString().split("T")[0]
        : null,
      arrivalDate:
        !isOnePick() && dateRange?.to
          ? new Date(dateRange.to.getTime() - (dateRange.to.getTimezoneOffset() * 60000))
              .toISOString().split("T")[0]
          : null,
      flightRefundable: false,
      flightWithBaggage: false,
      directFlightsOnly: false,
      openReturn: false,
    };

    console.log("volSearchComponent - Search params:", searchParams);
    dispatch(searchFlights(searchParams));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
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
      <div className="flex flex-col sm:flex-row justify-start gap-2">
        {volType !== "Multi Destinations" ? (
          <div className="flex flex-col md:flex-row w-full gap-2">
            <SearchInputComponent
              placeholder="City, airports or place"
              onSearch={(value) => handleFromAirportSelect(value)}
              dir="From"
              type={1}
            />
            <SearchInputComponent
              placeholder="City, airports or place"
              onSearch={(value) => handleToAirportSelect(value)}
              dir="To"
              type={1}
            />
            <DatePickerComponent
              isOnePick={isOnePick()}
              dateRange={dateRange}
              setDateRange={(value: DateRange) => dispatch(setDateRange(value))}
            />
            <Button
              onClick={handleSearch}
              variant="active"
              type="button"
              className="rounded bg-[#FF8000] text-white px-7 h-9 text-sm font-semibold w-full md:w-36"
            >
              Explore
            </Button>
          </div>
        ) : (
          destinations.map((dest: any, i: number) => (
            <div className="flex flex-col lg:flex-row w-full gap-2" key={dest.id}>
              <SearchInputComponent
                placeholder="City, airports or place"
                onSearch={(value) => handleFromAirportSelect(value, i)}
                dir="From"
                type={1}
              />
              <SearchInputComponent
                placeholder="City, airports or place"
                onSearch={(value) => handleToAirportSelect(value, i)}
                dir="To"
                type={1}
              />
              <DatePickerComponent
                isOnePick={true}
                dateRange={dest.date}
                setDateRange={(value: DateRange) => {
                  updateDestination(i, "date", value);
                }}
              />
              <div
                className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 p-4 h-9 rounded"
                onClick={() => removeDestination(i)}
              >
                <Trash2 className="text-red-500 h-4 w-4 cursor-pointer" />
              </div>
            </div>
          ))
        )}
      </div>
      {volType === "Multi Destinations" && (
        <div className="flex justify-between flex-wrap gap-2 mt-3">
          <Button
            variant="outline"
            size="sm"
            className="text-gray-600 text-sm rounded bg-gray-200 hover:bg-gray-600 hover:text-gray-200"
            onClick={addDestination}
          >
            Add Destination
          </Button>

          <Button
            onClick={handleSearch}
            variant="active"
            type="button"
            className="rounded bg-[#FF8000] text-white px-7 h-9 text-sm font-semibold w-full md:w-36"
          >
            Explore
          </Button>
        </div>
      )}
    </div>
  );
};

export default VolSearchComponent;
