import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  TicketsPlane,
  PlaneTakeoff,
  Building2,
  Car,
  Backpack,
  Ship,
} from "lucide-react";

interface PopularFacilitiesOmraProps {
  visa?: boolean | null;
  vol?: boolean | null;
  hotel?: boolean | null;
  transfer?: boolean | null;
  excursion?: boolean | null;
  cruise?: boolean | null;
}

export default function PopularFacilitiesOmra({
  visa,
  vol,
  hotel,
  transfer,
  excursion,
  cruise,
}: PopularFacilitiesOmraProps) {
  const renderBadge = (
    label: string,
    isAvailable: boolean | null | undefined,
    Icon: React.ComponentType<any>
  ) => {
    // If the value is undefined or null, treat it as not available
    const available = !!isAvailable;

    return (
      <Badge
        variant="outline"
        className={`
          ${
            available
              ? "bg-green-100 text-green-700 border-green-500 hover:bg-green-200"
              : "bg-red-100 text-red-700 border-red-500 hover:bg-red-200"
          } 
          inline-flex items-center gap-x-1.5 px-2 py-1 text-xs font-medium transition-colors duration-200
        `}
      >
        <Icon
          size={14}
          className={`shrink-0 ${available ? "text-green-600" : "text-red-600"}`}
        />
        {label}
      </Badge>
    );
  };

  return (
    <div className="flex flex-wrap gap-2 my-3 px-2">
      {renderBadge("Visa", visa, TicketsPlane)}
      {renderBadge("Vol", vol, PlaneTakeoff)}
      {renderBadge("Hotel", hotel, Building2)}
      {renderBadge("Transfer", transfer, Car)}
      {renderBadge("Excursion", excursion, Backpack)}
      {renderBadge("Cruise", cruise, Ship)}
    </div>
  );
}
