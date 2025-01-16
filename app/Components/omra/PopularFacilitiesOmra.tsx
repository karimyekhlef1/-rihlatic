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
  visa: boolean;
  vol: boolean;
  hotel: boolean;
  transfer: boolean;
  excursion: boolean;
  cruise: boolean;
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
    isAvailable: boolean,
    Icon: React.ComponentType<any>
  ) => (
    <Badge
      variant="outline"
      className={`
        ${isAvailable ? "bg-green-200 hover:bg-green-300" : "bg-red-200 hover:bg-red-300"} 
        inline-flex items-center gap-x-1.5 px-2 py-1 text-xs
      `}
    >
      <Icon size={14} className="shrink-0" />
      {label}
    </Badge>
  );

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
