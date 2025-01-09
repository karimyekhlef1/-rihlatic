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
    <div className="flex flex-row items-center">
      <Badge 
        variant="outline" 
        className={`
          ${isAvailable ? 'bg-green-200 hover:bg-green-300' : 'bg-red-200 hover:bg-red-300'} 
          flex items-center gap-x-2 transition-colors duration-200
        `}
      >
        <Icon size={16} />
        {label}
      </Badge>
    </div>
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