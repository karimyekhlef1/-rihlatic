import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin } from "lucide-react";
import { CircleCheck } from "lucide-react";
import { format, differenceInDays } from "date-fns";

import PopularFacilitiesPackage from "./PopularFacilitiesPackage";
export default function DepartureInfoInBookingCard({ departure }: any) {
  const startDate = departure?.departure_date;
  const endDate = departure?.return_date;

  const calculateDuration = (startDate: Date, endDate: Date) => {
    if (startDate && endDate) {
      try {
        const nights = differenceInDays(new Date(endDate), new Date(startDate));
        const days = nights + 1;
        return `${nights} nights / ${days} days`;
      } catch (error) {
        console.error("Error calculating duration:", error);
        return "Invalid dates";
      }
    }
    return "Select dates";
  };

  return (
    <Card className="border-none rounded-xl pt-4 pb-4 w-full sm:max-w-[600px] md:max-w-[768px] lg:max-w-[950px]">
      <CardContent>
        <div className="flex flex-col pb-3">
          <div className="flex flex-row items-center">
            <h2 className="textarabic text-xl text-wrap font-bold text-orange-500">
              {departure?.package.name}
            </h2>
          </div>

          <div className="flex flex-row items-center">
            <div>
              <MapPin size={17} fill="gray" color="#ffffff" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold">
                {departure?.package.destinations[0].name}-
                {departure?.package.destinations[0].country.name}
              </p>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col pt-4">
          <div className="flex flex-row items-center my-3">
            <CircleCheck
              size={15}
              className="font-semibold text-xs text-[#43acff]"
              fill="#b4deff"
            />
            <p className="text-sm font-semibold pl-2">
              {calculateDuration(startDate, endDate)}
            </p>
          </div>
          <Separator />

          <div className="flex flex-row items-center my-3">
            <CircleCheck
              size={15}
              className="font-semibold text-xs text-[#ff8000]"
              fill="#ffcc99"
            />
            <p className="text-sm font-semibold pl-2">
              {startDate
                ? format(new Date(startDate), "dd/MMM/yyyy")
                : "Select dates"}
              {endDate ? ` - ${format(new Date(endDate), "dd/MMM/yyyy")}` : ""}
            </p>
          </div>
        </div>
        <Separator />
        {departure && (
          <PopularFacilitiesPackage
            visa={departure.visa}
            vol={departure.vol}
            hotel={departure.hotel}
            transfer={departure.transfer}
            excursion={departure.excursion}
            cruise={departure.cruise}
          />
        )}
      </CardContent>
    </Card>
  );
}
