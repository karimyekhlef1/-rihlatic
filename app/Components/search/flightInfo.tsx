import React from 'react';
import { ChevronRight, CircleArrowRight, MoveRight } from 'lucide-react';

interface FlightInfo {
  from: string;
  to: string;
  airline: string;
  additionalInfo: boolean;
}

interface FlightInfoCardProps {
  flights: FlightInfo[];
  additionalInfo?: React.ReactNode;
}

const FlightInfoCard: React.FC<FlightInfoCardProps> = ({
  flights,
  additionalInfo,
}) => {
  return (
    <div className="px-4 py-2 max-w-3xl">
      {flights.map((flight, index) => (
        <React.Fragment key={index}>
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <p className="font-semibold text-sm flex flex-row justify-center items-center gap-x-2">
                  {flight.from} {<MoveRight size={20} />} {flight.to}
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              <div className="flex flex-col items-start text-xs font-medium">
                <span>{flight.airline}</span>
                <div className="flex flex-row justify-center items-center gap-x-1">
                  <CircleArrowRight
                    size={20}
                    className="font-semibold text-xs text-[#3279f4]"
                    fill="#cddfff"
                  />
                  <p className="font-semibold text-xs text-blue-400">
                    Direct flight
                  </p>
                </div>
                {flight.additionalInfo && (
                  <div className="pt-2">{additionalInfo}</div>
                )}
              </div>
            </div>
          </div>
          {index < flights.length - 1 && (
            <hr className="my-4 border-gray-300 border-dashed -mx-4" />
          )}
        </React.Fragment>
      ))}
      <hr className="my-4 border-gray-300 border-dashed -mx-4" />
      <button className="w-full text-left font-semibold mt-2 flex items-center">
        Show full details
        <ChevronRight size={20} className="ml-auto" />
      </button>
    </div>
  );
};

export default FlightInfoCard;
