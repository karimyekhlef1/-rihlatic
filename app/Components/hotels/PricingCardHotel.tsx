import React from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CalendarDays, Users, CircleCheck, Calendar } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from 'next/image';

interface PricingCardProps {
  title: React.ReactNode;
  image: string;
  rooms: {
    name: string;
    adults_quantity: number;
    adults_price: number;
    children_quantity: number;
    children_price: number;
    infant_quantity: number;
    infant_price: number;
    total: number;
  }[];
  total: number;
  dates: { startDate: string; endDate: string };
  nights: number;
}

const DateInfoItem = ({ icon: Icon, color, children }: { 
  icon: React.ElementType;
  color: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center space-x-2">
    <Icon className={`h-5 w-5 ${color}`} />
    <span>{children}</span>
  </div>
);

export default function PricingCardHotel({
  title,
  image,
  rooms,
  total,
  dates,
  nights,
}: PricingCardProps) {
  return (
    <Card className="p-4 space-y-6 pt-5">
      <h2 className="text-xl font-semibold text-center">{title}</h2>
      <Separator />

      {image && (
        <div className="relative h-48 w-full rounded-2xl overflow-hidden">
          <Image
            src={image}
            alt="Hotel visual"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}

      <div className="space-y-3 font-semibold">
        <DateInfoItem icon={CalendarDays} color="text-orange-500">
          {`${dates.startDate} / ${dates.endDate}`}
        </DateInfoItem>
        <DateInfoItem icon={Calendar} color="text-blue-500">
          {`${nights} nuits / ${nights + 1} jours`}
        </DateInfoItem>
      </div>

      <Separator />

      <Accordion type="multiple" className="w-full">
        {rooms.map((room, index) => (
          <AccordionItem key={`room-${index}`} value={`room-${index}`}>
            <AccordionTrigger>Chambre {index + 1}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <CircleCheck className="text-green-500 rounded-full p-1 bg-green-100" />
                  <span>{room.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CircleCheck className="text-green-500 rounded-full p-1 bg-green-100" />
                  <span>Adulte(s): {room.adults_quantity} x {room.adults_price} DZD</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CircleCheck className="text-green-500 rounded-full p-1 bg-green-100" />
                  <span>Enfant(s): {room.children_quantity} x {room.children_price} DZD</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CircleCheck className="text-green-500 rounded-full p-1 bg-green-100" />
                  <span>Nourrisson(s): {room.infant_quantity} x {room.infant_price} DZD</span>
                </div>
                <Separator />
                <div className="pt-2 flex justify-between font-semibold">
                  <span>Total chambre {index + 1}:</span>
                  <span>{room.total} DZD</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Separator />

      <div className="flex justify-between font-bold text-xl">
        <span>Total des ventes:</span>
        <span>{total} DZD</span>
      </div>
    </Card>
  );
}
