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
    <div className="flex items-center gap-2">
      <div className="h-[26px] bg-white rounded-full px-4 py-2 text-[11px] leading-none text-gray-700 font-medium flex items-center border border-gray-200">
        <Users2 className="h-[13px] w-[13px] mr-1 stroke-[1.75]" />
        <span className="whitespace-nowrap">
          Availability {segment.availability}
        </span>
      </div>
      <div className="h-[26px] bg-white rounded-full px-2.5 py-0.5 text-[11px] leading-none text-gray-700 font-medium flex items-center border border-gray-200">
        <Plane className="h-[13px] w-[13px] mr-1 stroke-[1.75]" />
        <span className="whitespace-nowrap">{segment.equipmentType}</span>
      </div>
      <div className="h-[26px] bg-white rounded-full px-2.5 py-0.5 text-[11px] leading-none text-gray-700 font-medium flex items-center border border-gray-200">
        <Ticket className="h-[13px] w-[13px] mr-1 stroke-[1.75]" />
        <span className="whitespace-nowrap">Class {segment.bookClass}</span>
      </div>
      <div className="h-[26px] bg-white rounded-full px-2.5 py-0.5 text-[11px] leading-none text-gray-700 font-medium flex items-center border border-gray-200">
        <Ticket className="h-[13px] w-[13px] mr-1 stroke-[1.75]" />
        <span className="whitespace-nowrap">Cabin {segment.cabinClass}</span>
      </div>
      <div className="h-[26px] bg-red-50 rounded-full px-2.5 py-0.5 text-[11px] leading-none text-red-600 font-medium flex items-center">
        <Luggage className="h-[13px] w-[13px] mr-1 stroke-[1.75]" />
        <span className="whitespace-nowrap">{segment.baggage}</span>
      </div>
    </div>
  );
};

export default FlightInfoFooter;
