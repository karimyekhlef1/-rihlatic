import React from 'react';
import { ChevronRight, CircleArrowRight, MoveRight } from 'lucide-react';

interface FlightInfoCardProps {
  from: string;
  to: string;
  airline: string;
  additionalInfo: boolean;
}

const FlightInfoCard: React.FC<FlightInfoCardProps> = ({
  from,
  to,
  airline,
  additionalInfo,
}) => {
  return (
    <div className="px-4 py-2 max-w-3xl">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="font-semibold text-sm flex flex-row justify-center items-center gap-x-2">
              {from} {<MoveRight size={20} />} {to}
            </p>
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {airline}
          {additionalInfo && (
            <>
              <span className="mx-2">•</span>
              <span>Additional flight info</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightInfoCard;
