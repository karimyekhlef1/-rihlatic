import React from "react";
import { Users2, Plane, Ticket, Luggage } from "lucide-react";

interface FlightInfoFooterProps {
  segment: {
    availability: string;
    equipmentType: string;
    bookClass: string;
    cabinClass: string;
    baggage: string;
  };
}

const FlightInfoFooter: React.FC<FlightInfoFooterProps> = ({ segment }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 flex-wrap">
      <div className="h-[26px] bg-white rounded-full px-3 sm:px-4 py-2 text-xs sm:text-[11px] leading-none text-gray-700 font-medium flex items-center border border-gray-200">
        <Users2 className="h-4 w-4 sm:h-[13px] sm:w-[13px] mr-1 stroke-[1.75]" />
        <span className="hidden sm:inline whitespace-nowrap">Availability</span>{" "}
        <span className="sm:hidden">Availability </span> {segment.availability}
      </div>
      <div className="h-[26px] bg-white rounded-full px-2.5 py-0.5 text-xs sm:text-[11px] leading-none text-gray-700 font-medium flex items-center border border-gray-200">
        <Plane className="h-4 w-4 sm:h-[13px] sm:w-[13px] mr-1 stroke-[1.75]" />{" "}
        <span className="whitespace-nowrap">{segment.equipmentType}</span>
      </div>
      <div className="h-[26px] bg-white rounded-full px-2.5 py-0.5 text-xs sm:text-[11px] leading-none text-gray-700 font-medium flex items-center border border-gray-200">
        <Ticket className="h-4 w-4 sm:h-[13px] sm:w-[13px] mr-1 stroke-[1.75]" />
        <span className="hidden sm:inline whitespace-nowrap">Class</span>{" "}
        <span className="sm:hidden">Class </span> {segment.bookClass}
      </div>
      <div className="h-[26px] bg-white rounded-full px-2.5 py-0.5 text-xs sm:text-[11px] leading-none text-gray-700 font-medium flex items-center border border-gray-200">
        <Ticket className="h-4 w-4 sm:h-[13px] sm:w-[13px] mr-1 stroke-[1.75]" />
        <span className="hidden sm:inline whitespace-nowrap">Cabin</span>{" "}
        <span className="sm:hidden">Cabin </span> {segment.cabinClass}
      </div>
      <div className="h-[26px] bg-red-50 rounded-full px-2.5 py-0.5 text-xs sm:text-[11px] leading-none text-red-600 font-medium flex items-center">
        <Luggage className="h-4 w-4 sm:h-[13px] sm:w-[13px] mr-1 stroke-[1.75]" />{" "}
        <span className="whitespace-nowrap">{segment.baggage}</span>
      </div>
    </div>
  );
};

export default FlightInfoFooter;
