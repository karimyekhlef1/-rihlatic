import React from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CircleCheck, MapPin } from 'lucide-react';
import { differenceInDays } from 'date-fns';

interface OmraPricingCardProps {
  title?: React.ReactNode;
  image?: string;
  rooms: Array<{
    name: string;
    adults_quantity: number;
    adults_price: number;
    children_quantity: number;
    children_price: number;
    infant_quantity: number;
    infant_price: number;
    total: number;
  }>;
  total: number;
  startDate?: string;
  endDate?: string;
  facilities?: {
    visa: boolean;
    vol: boolean;
    hotel: boolean;
    transfer: boolean;
    excursion: boolean;
    cruise: boolean;
  };
}

export default function OmraPricingCard({
  title,
  image,
  rooms,
  total,
  startDate,
  endDate,
  facilities
}: OmraPricingCardProps) {
  const calculateDuration = (start: string, end: string) => {
    if (start && end) {
      try {
        const nights = differenceInDays(new Date(end), new Date(start));
        const days = nights + 1;
        return `${nights} nights / ${days} days`;
      } catch (error) {
        console.error("Error calculating duration:", error);
        return "Invalid dates";
      }
    }
    return "";
  };

  return (
    <Card className="p-4 space-y-6 pt-5">
      {title}
      <Separator />

      {image && (
        <div className="relative h-48 w-full rounded-lg overflow-hidden">
          <img
            src={image}
            alt="Omra Destination"
            className="object-cover w-full h-full"
          />
        </div>
      )}

      {/* Facilities Section */}
      {facilities && (
        <div className="space-y-2">
          <h3 className="font-semibold text-sm">Included Services:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {facilities.visa && (
              <div className="flex items-center gap-2">
                <CircleCheck className="text-[#43acff]" size={16} />
                <span>Visa</span>
              </div>
            )}
            {facilities.vol && (
              <div className="flex items-center gap-2">
                <CircleCheck className="text-[#43acff]" size={16} />
                <span>Flight</span>
              </div>
            )}
            {facilities.hotel && (
              <div className="flex items-center gap-2">
                <CircleCheck className="text-[#43acff]" size={16} />
                <span>Hotel</span>
              </div>
            )}
            {facilities.transfer && (
              <div className="flex items-center gap-2">
                <CircleCheck className="text-[#43acff]" size={16} />
                <span>Transfer</span>
              </div>
            )}
            {facilities.excursion && (
              <div className="flex items-center gap-2">
                <CircleCheck className="text-[#43acff]" size={16} />
                <span>Excursion</span>
              </div>
            )}
            {facilities.cruise && (
              <div className="flex items-center gap-2">
                <CircleCheck className="text-[#43acff]" size={16} />
                <span>Cruise</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Duration */}
      {startDate && endDate && (
        <div className="flex items-center gap-2 text-sm">
          <CircleCheck className="text-[#43acff]" size={16} />
          <span>{calculateDuration(startDate, endDate)}</span>
        </div>
      )}

      <div className="space-y-4">
        {rooms.map((room, index) => (
          <React.Fragment key={index}>
            <div>
              <h3 className="font-semibold mb-2">
                Room {index + 1} ({room.name})
              </h3>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Adult(s):</span>
                  <span>{room.adults_quantity} x {room.adults_price} DZD</span>
                </div>
                <div className="flex justify-between">
                  <span>Child(ren):</span>
                  <span>{room.children_quantity} x {room.children_price} DZD</span>
                </div>
                <div className="flex justify-between">
                  <span>Infant(s):</span>
                  <span>{room.infant_quantity} x {room.infant_price} DZD</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Room {index + 1} Total:</span>
                  <span>{room.total} DZD</span>
                </div>
              </div>
            </div>
            <Separator />
          </React.Fragment>
        ))}
      </div>

      {/* Total */}
      <div className="flex justify-between font-bold text-lg">
        <span>Total:</span>
        <span>{total} DZD</span>
      </div>
    </Card>
  );
}
