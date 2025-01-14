import { Checkbox } from "@/components/ui/checkbox";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleDepartureTime,
  toggleReturnTime,
} from "@/lib/store/custom/searchSlices/timeFiltersSlice";
import { RootState } from "@/lib/store/store";

export default function Hours() {
  const dispatch = useDispatch();
  const flightsData = useSelector(
    (state: any) => state.vols?.flightsData || []
  );
  const loading = useSelector((state: any) => state.vols?.loading);
  const error = useSelector((state: any) => state.vols?.error);
  const selectedDepartureTimes = useSelector(
    (state: RootState) => state.timeFilters.selectedDepartureTimes
  );
  const selectedReturnTimes = useSelector(
    (state: RootState) => state.timeFilters.selectedReturnTimes
  );

  const extractUniqueTimes = (flights: any[], isDepTime: boolean) => {
    console.log('Flights received:', flights);
    
    if (!flights || flights.length === 0) {
      console.log('No flights data available');
      return [];
    }

    const times = flights.map((flight) => {
      console.log('Processing flight:', flight);
      
      if (!flight.segments || !flight.segments[0] || flight.segments[0].length === 0) {
        console.log('Invalid segments structure:', flight.segments);
        return null;
      }
      
      const segments = flight.segments[0];
      console.log('First segment group:', segments);
      
      if (isDepTime) {
        // Get departure time of first segment
        const firstSegment = segments[0];
        console.log('First segment for departure:', firstSegment);
        // Let's log all properties to find the time field
        console.log('Available properties:', Object.keys(firstSegment));
        return firstSegment?.depTime;
      } else {
        // Get arrival time of last segment
        const lastSegment = segments[segments.length - 1];
        console.log('Last segment for arrival:', lastSegment);
        // Let's log all properties to find the time field
        console.log('Available properties:', Object.keys(lastSegment));
        return lastSegment?.arrTime;
      }
    });

    const uniqueTimes = Array.from(new Set(times.filter((time) => time))).sort();
    console.log(`Unique ${isDepTime ? 'departure' : 'arrival'} times:`, uniqueTimes);
    return uniqueTimes;
  };

  const departureTimes = extractUniqueTimes(flightsData, true);
  const returnTimes = extractUniqueTimes(flightsData, false);

  console.log('Final times:', { departureTimes, returnTimes });

  const handleDepartureTimeChange = (time: string) => {
    dispatch(toggleDepartureTime(time));
  };

  const handleReturnTimeChange = (time: string) => {
    dispatch(toggleReturnTime(time));
  };

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-4">
        Loading flight times...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-4">
        Error loading flight times: {error}
      </div>
    );
  }

  if (!departureTimes.length && !returnTimes.length) {
    return (
      <div className="text-center text-gray-500 py-4">
        No flight times available
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {departureTimes.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xm font-medium text-muted-foreground">
            Select your preferred departure time
          </h3>
          <div className="space-y-2">
            {departureTimes.map((time) => (
              <div key={time} className="flex items-center space-x-2">
                <Checkbox
                  id={`departure-${time}`}
                  checked={selectedDepartureTimes.includes(time)}
                  onCheckedChange={() => handleDepartureTimeChange(time)}
                />
                <label
                  htmlFor={`departure-${time}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {time}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {returnTimes.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xm font-medium text-muted-foreground">
            Select your preferred return time
          </h3>
          <div className="space-y-2">
            {returnTimes.map((time) => (
              <div key={time} className="flex items-center space-x-2">
                <Checkbox
                  id={`return-${time}`}
                  checked={selectedReturnTimes.includes(time)}
                  onCheckedChange={() => handleReturnTimeChange(time)}
                />
                <label
                  htmlFor={`return-${time}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {time}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
