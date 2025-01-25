import React from 'react';
import { Badge } from '@/components/ui/badge';
import { 
    TicketsPlane , 
  PlaneTakeoff, 
  Building2, 
  Car, 
  Backpack, 
  Ship 
} from 'lucide-react';

type FacilitiesProps = {
  visa: boolean;
  vol: boolean;
  hotel: boolean;
  transfer: boolean;
  excursion: boolean;
  cruise: boolean;
};

export default function PopularFacilitiesPackage({
  visa,
  vol,
  hotel,
  transfer,
  excursion,
  cruise,
}: FacilitiesProps) {
  console.log("visa", visa);
  console.log("vol", vol);

  const renderBadge = (label: string, isAvailable: boolean, Icon: React.ComponentType<any>) => (
     <Badge
            variant="outline"
            className={`
              ${
                isAvailable
                  ? "bg-green-100 text-green-700 border-green-500 hover:bg-green-200"
                  : "bg-red-100 text-red-700 border-red-500 hover:bg-red-200"
              } 
              inline-flex items-center gap-x-1.5 px-2 py-1 text-xs font-medium transition-colors duration-200
            `}
          >
            <Icon
              size={14}
              className={`shrink-0 ${isAvailable ? "text-green-600" : "text-red-600"}`}
            />
            {label}
          </Badge>
  );

  return (
    <div className="flex flex-wrap  space-x-2 space-y-2 my-2 p-2  items-baseline ">
      {renderBadge('Visa', visa, TicketsPlane)}
      {renderBadge('Vol', vol, PlaneTakeoff)}
      {renderBadge('Hotel', hotel, Building2)}
      {renderBadge('Transfer', transfer, Car)}
      {renderBadge('Excursion', excursion, Backpack)}
      {renderBadge('Cruise', cruise, Ship)}
    </div>
  );
}