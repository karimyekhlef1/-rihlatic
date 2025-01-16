import { Checkbox } from "@/components/ui/checkbox";
import { useSelector } from "react-redux";

export default function Hours() {
  const flightsData = useSelector((state: any) => state.vols?.flightsData || []);
  const loading = useSelector((state: any) => state.vols?.loading);
  const error = useSelector((state: any) => state.vols?.error);

  const extractUniqueTimes = (flights: any[], isDepTime: boolean) => {
    if (!flights || flights.length === 0) return [];
    
    const times = flights.map((flight) => {
      if (!flight.segments || !flight.segments[0] || flight.segments[0].length === 0) return null;
      
      const segments = flight.segments[0];
      if (isDepTime) {
        // Get departure time of first segment
        return segments[0]?.depTime;
      } else {
        // Get arrival time of last segment
        return segments[segments.length - 1]?.arrTime;
      }
    });

    // Filter out nulls and get unique times
    return Array.from(new Set(times.filter(time => time))).sort();
  };

  const departureTimes = extractUniqueTimes(flightsData, true);
  const returnTimes = extractUniqueTimes(flightsData, false);

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
                <Checkbox id={`departure-${time}`} />
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
                <Checkbox id={`return-${time}`} />
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
