import React from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from 'next/image';
import { CalendarDays, Users, CircleCheck, Calendar } from 'lucide-react';

import ContentComponent from '@/app/commonComponents/contentComponent';
interface PricingCardProps {
    title: React.ReactNode ;  // Changed from any to ReactNode
    image: string;
    rooms: any;  // You might want to type this more specifically
    total: number;
  }
  
  export default function PricingCard({ 
    title, 
    image, 
    rooms, 
    total 
  }: PricingCardProps) {
  return (
    <Card className="p-4 space-y-6 pt-5">
  {title}

 
   <Separator />

      {image && (
        <div className="relative h-48 w-full rounded-lg overflow-hidden">
            <Image
                 src={image}
                 alt="Hotel visual"
                 layout="fill"
                 objectFit="cover"
                 className="rounded-lg"
               />
        </div>
      )}

<Accordion type="multiple" className="w-full">
  {rooms.map((room: any, index: number) => (
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
        <div className='flex justify-between w-full'>
        <span>Adulte x {room.adults_quantity} </span>
        <span>{room.adults_price} DZD</span>
          
          </div>
      </div>
    { room.children_quantity !== 0 && <div className="flex items-center space-x-2">
        <CircleCheck className="text-green-500 rounded-full p-1 bg-green-100" />
        <div className='flex justify-between w-full'>
        <span>Child x {room.children_quantity}</span>
        <span>{room.children_price} DZD</span>
          
          </div>
      </div>}
      { room.infant_quantity !== 0 && <div className="flex items-center space-x-2">
        <CircleCheck className="text-green-500 rounded-full p-1 bg-green-100" />
        <div className='flex justify-between w-full'>
        <span>Infant x {room.infant_quantity}</span>
        <span>{room.infant_price} DZD</span>
          
        </div>

      </div>}

      <Separator />
      <div className="pt-2 flex justify-between font-semibold">
        <span>Total chambre {index + 1}:</span>
        <span>{room.price} DZD</span>
      </div>
    </div>
  </AccordionContent>
</AccordionItem>
  ))}
</Accordion>


      {/* Total Sales */}
      <div className="flex justify-between font-bold text-lg">
        <span>Total des ventes:</span>
        <span>{total} DZD</span>
      </div>
    </Card>
  );
}



{/* <div className="text-sm space-y-1">
<div className="flex justify-between">
  <span>Adulte(s):</span>
  <span>
    <span className="font-bold">{room.adults_quantity}</span> x {room.adults_price} DZD
  </span>
</div>
<div className="flex justify-between">
  <span>Enfant(s):</span>
  <span>
    <span className="font-bold">{room.children_quantity}</span> x {room.children_price} DZD
  </span>
</div>
<div className="flex justify-between">
  <span>Nourrisson(s):</span>
  <span>
    <span className="font-bold">{room.infant_quantity}</span> x {room.infant_price} DZD
  </span>
</div>
<div className="flex justify-between font-semibold">
  <span>Totale chambre {index + 1}:</span>
  <span>{room.total} DZD</span>
</div>
</div> */}