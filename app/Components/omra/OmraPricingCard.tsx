import React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CircleCheck, MapPin } from "lucide-react";
import { differenceInDays } from "date-fns";
import PopularFacilitiesOmra from "./PopularFacilitiesOmra";
import Image from "next/image";

interface Passengers {
  adults: number[];
  children: number[];
  children_without_bed: number[];
  infants: number[];
}

interface OmraPricingCardProps {
  title?: React.ReactNode;
  image?: string;
  rooms: Array<{
    type: string;
    name: string;
    passengers: Passengers;
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
  facilities,
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
        <div className="relative w-full h-[200px]">
          <Image
            src={image}
            alt="Omra Destination"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Facilities Section */}
      {facilities && (
        <div className="space-y-2">
          <h3 className="font-semibold text-sm">Included Services:</h3>
          <div className="grid grid-cols-1 gap-2 text-sm">
            {facilities && (
              <PopularFacilitiesOmra
                visa={facilities.visa}
                vol={facilities.vol}
                hotel={facilities.hotel}
                transfer={facilities.transfer}
                excursion={facilities.excursion}
                cruise={facilities.cruise}
              />
            )}
          </div>
        </div>
      )}

      {/* Duration */}
      {startDate && endDate && (
        <div className="flex items-center gap-2 text-xs font-semibold">
          <CircleCheck className="text-[#43acff]" size={16} />
          <span>{calculateDuration(startDate, endDate)}</span>
        </div>
      )}

      <div className="space-y-4">
        {rooms.map((room, index) => (
          <React.Fragment key={index}>
            <div>
              <h3 className="font-semibold mb-2">
                Room {index + 1} ({room.type.toLocaleUpperCase()})
              </h3>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>
                    Adult(s) x{" "}
                    <span className="font-bold">
                      {room.passengers.adults.length}
                    </span>
                    :
                  </span>
                  <span>{room.adults_price} DZD</span>
                </div>
                <div className="flex justify-between">
                  <span>
                    Child(ren) x{" "}
                    <span className="font-bold">
                      {room.passengers.children.length}
                    </span>
                    :
                  </span>
                  <span>{room.children_price} DZD</span>
                </div>
                <div className="flex justify-between">
                  <span>
                    Child(ren) without bed x{" "}
                    <span className="font-bold">
                      {room.passengers.children_without_bed.length}
                    </span>
                    :
                  </span>
                  <span>{room.children_price} DZD</span>
                </div>
                <div className="flex justify-between">
                  <span>
                    Infant(s)x{" "}
                    <span className="font-bold">
                      {room.passengers.infants.length}
                    </span>
                    :
                  </span>
                  <span>{room.infant_price} DZD</span>
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
