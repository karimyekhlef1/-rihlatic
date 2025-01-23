import React from "react";
import Image from "next/image";
import { AIRLINE_IMAGE_URL } from "@/app/Constant/urls";
import { format, parseISO } from "date-fns";

interface FlightInfosProps {
  segments: any[];
  type: "outbound" | "return";
}

const FlightInfos: React.FC<FlightInfosProps> = ({ segments, type }) => {
  if (!segments || segments.length === 0) return null;

  // Get first and last segment for departure and arrival info
  const firstSegment = segments[0];
  const lastSegment = segments[segments.length - 1];

  // Calculate total duration
  const totalDuration = segments.reduce((total, segment) => {
    const [hours, minutes] = segment.duration.split(":").map(Number);
    return total + hours * 60 + minutes;
  }, 0);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Format departure date - use current date as fallback if depDate is not provided
  const currentDate = new Date();
  const formattedDate = format(currentDate, "EEE dd MMM");

  // Helper function to format time
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
  };

  return (
    <div className="pb-4 relative">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-gray-400">
          {firstSegment.depDate
            ? format(parseISO(firstSegment.depDate), "EEE dd MMM")
            : ""}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <div className="relative z-10 pr-2 bg-white">
          <div className="text-lg font-semibold">
            {firstSegment.boardAirport}
          </div>
          <div className="text-base">{formatTime(firstSegment.depTime)}</div>
        </div>
        <div className="text-center relative z-10 bg-white">
          <div className="flex items-center space-x-1">
            <div className="bg-gray-100 rounded-full px-2 py-1 text-xs text-black font-medium">
              {segments.length > 1 ? `${segments.length - 1} stops` : "Direct"}
            </div>
            <div className="flex -space-x-2">
              {segments.map((segment, index) => (
                <Image
                  key={index}
                  src={`${AIRLINE_IMAGE_URL}/${segment.airLine.iata}.png`}
                  alt={segment.airLine.name}
                  width={26}
                  height={26}
                  className={`relative z-${10 + index} object-contain rounded-md shadow-md`}
                />
              ))}
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {formatDuration(totalDuration)}
          </div>
        </div>
        <div className="relative z-10 pl-2 bg-white">
          <div className="text-lg font-semibold">{lastSegment.offAirport}</div>
          <div className="text-base">{formatTime(lastSegment.arrTime)}</div>
        </div>
      </div>
      <div
        className="absolute left-0 right-0 h-px bg-gray-200"
        style={{ top: "calc(50% - 8px)" }}
      ></div>
    </div>
  );
};

export default FlightInfos;
