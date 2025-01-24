import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "@/components/ui/checkbox";
import { RootState } from "@/lib/store/store";
import {
  setDepartureTimes,
  setArrivalTimes,
  toggleDepartureTime,
  toggleArrivalTime,
  setLoading,
} from "@/lib/store/custom/searchSlices/hoursSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Hours() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("departure");
  const flightsData = useSelector(
    (state: RootState) => state.vols?.flightsData || []
  );
  const {
    departureTimes,
    arrivalTimes,
    selectedDepartureTimes,
    selectedArrivalTimes,
    loading,
  } = useSelector((state: RootState) => state.hours);

  const extractUniqueTimes = (flights: any[], isDepTime: boolean) => {
    if (!flights || flights.length === 0) return [];

    const times = flights.map((flight) => {
      if (
        !flight.segments ||
        !flight.segments[0] ||
        flight.segments[0].length === 0
      )
        return null;

      const segments = flight.segments[0];
      if (isDepTime) {
        return segments[0]?.depTime;
      } else {
        return segments[segments.length - 1]?.arrTime;
      }
    });

    return Array.from(new Set(times.filter((time) => time))).sort();
  };

  useEffect(() => {
    dispatch(setLoading(true));
    const depTimes = extractUniqueTimes(flightsData, true);
    const arrTimes = extractUniqueTimes(flightsData, false);

    dispatch(setDepartureTimes(depTimes));
    dispatch(setArrivalTimes(arrTimes));
    dispatch(setLoading(false));
  }, [flightsData, dispatch]);

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!departureTimes.length && !arrivalTimes.length) {
    return (
      <div className="text-center text-gray-500 py-4">
        No flight times available
      </div>
    );
  }

  return (
    <Tabs
      defaultValue="departure"
      className="w-full"
      onValueChange={setActiveTab}
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="departure">Departure</TabsTrigger>
        <TabsTrigger value="arrival">Arrival</TabsTrigger>
      </TabsList>
      <TabsContent value="departure" className="mt-4">
        <div className="space-y-2">
          {departureTimes.map((time) => (
            <div key={time} className="flex items-center space-x-2">
              <Checkbox
                id={`dep-${time}`}
                checked={selectedDepartureTimes.includes(time)}
                onCheckedChange={() => dispatch(toggleDepartureTime(time))}
              />
              <label
                htmlFor={`dep-${time}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {formatTime(time)}
              </label>
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="arrival" className="mt-4">
        <div className="space-y-2">
          {arrivalTimes.map((time) => (
            <div key={time} className="flex items-center space-x-2">
              <Checkbox
                id={`arr-${time}`}
                checked={selectedArrivalTimes.includes(time)}
                onCheckedChange={() => dispatch(toggleArrivalTime(time))}
              />
              <label
                htmlFor={`arr-${time}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {formatTime(time)}
              </label>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
