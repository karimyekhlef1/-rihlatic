import React from 'react';
import { CircleArrowRight, Clock, MoveRight } from 'lucide-react';

interface FlightDurationProps {
  flightFrom: string;
  flightTo: string;
  flightDuration: string;
  isDirectFlight?: boolean;
}

const FlightDuration: React.FC<FlightDurationProps> = ({
  flightFrom,
  flightTo,
  flightDuration,
  isDirectFlight = true,
}) => {
  return (
    <div className="flex flex-wrap flex-row justify-between">
      {/* From and To locations */}
      <div className="flex flex-row justify-center items-center gap-x-1">
        <p className="font-semibold text-sm flex flex-row justify-center items-center gap-x-2">
          {flightFrom} {<MoveRight size={20} />} {flightTo}
        </p>
        {isDirectFlight && (
          <div className="flex flex-row justify-center items-center px-2 gap-x-1">
            <CircleArrowRight
              size={20}
              className="font-semibold text-xs text-[#3279f4]"
              fill="#cddfff"
            />
            <p className="font-semibold text-xs text-blue-400">Direct flight</p>
          </div>
        )}
      </div>
      {/* Flight duration */}
      <div className="flex flex-row justify-center items-center gap-x-1">
        <Clock size={15} color="gray" />
        <p className="text-xs text-gray-500">Duration:</p>
        <p className="text-xs text-black font-semibold">{flightDuration}</p>
      </div>
    </div>
  );
};

export default FlightDuration;
