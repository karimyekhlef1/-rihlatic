import React from 'react';
import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatFlightDate, formatFlightTime, calculateTotalDuration, calculateArrivalTime } from '@/lib/utils/dateUtils';
import airlogo1 from '@/public/images/air_alg.png';
import airlogo2 from '@/public/images/air_fr.png';

interface FlightSegment {
  fareBasis: string;
  boardAirport: string;
  boardAirportName: {
    id: number;
    name: string;
  };
  offAirport: string;
  offAirportName: {
    id: number;
    name: string;
  };
  boardTime?: string;
  offTime?: string;
  depDate?: string;
  depTime?: string;
  arrDate?: string;
  arrTime?: string;
  duration: string;
  airLine?: {
    iata: string;
    name: string;
  };
  airLineOperating?: {
    iata: string;
    name: string;
  };
  authorizeConfirmed: boolean;
}

interface FlightInfosProps {
  segments?: FlightSegment[][];
  type: 'outbound' | 'inbound';
}

const FlightInfos: React.FC<FlightInfosProps> = ({ segments, type }) => {
  if (!segments?.length || !segments[0]?.length) {
    return null;
  }

  const allSegments = segments.flat();
  const firstSegment = allSegments[0];
  const lastSegment = allSegments[allSegments.length - 1];
  const totalDuration = calculateTotalDuration(allSegments.map(s => s.duration));
  const stops = allSegments.length - 1;

  // Calculate arrival time based on departure time and total duration
  const calculatedArrivalTime = calculateArrivalTime(firstSegment.depTime || '', totalDuration.replace('h ', ':').replace('m', ''));

  return (
    <div className="pb-4 relative">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-gray-400">
          {formatFlightDate(firstSegment.depDate || '')} • {type === 'outbound' ? 'Outbound' : 'Inbound'}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative z-10 pr-2 bg-white cursor-help">
                <div className="text-lg font-semibold">{firstSegment.boardAirport}</div>
                <div className="text-base">{formatFlightTime(firstSegment.depTime || '')}</div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{firstSegment.boardAirportName.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="text-center relative z-10 bg-white">
          <div className="flex items-center space-x-1">
            <div className="bg-gray-100 rounded-full px-2 py-1 text-xs text-black font-medium">
              {stops === 0 ? 'Direct' : `${stops} stop${stops > 1 ? 's' : ''}`}
            </div>
          </div>
          <div className="text-[10px] font-semibold text-muted-foreground mt-1">
            {totalDuration}
          </div>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative z-10 pl-2 bg-white cursor-help">
                <div className="text-lg font-semibold">{lastSegment.offAirport}</div>
                <div className="text-base">{calculatedArrivalTime}</div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{lastSegment.offAirportName.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div
        className="absolute left-0 right-0 h-px bg-gray-200"
        style={{ top: 'calc(50% - 8px)' }}
      ></div>
    </div>
  );
};

export default FlightInfos;
