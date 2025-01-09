import React from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

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
    <Card className="max-w-md p-4 space-y-6 pt-5">
  {title}

 
   <Separator />

      {image && (
        <div className="relative h-48 w-full rounded-lg overflow-hidden">
          <img
            src={image}
            alt="Destination"
            className="object-cover w-full h-full"
          />
        </div>
      )}

    
      <div className="space-y-4">
        {rooms.map((room :any, index :number) => (
            <>
          
          <div key={index} className="">
            <h3 className="font-semibold mb-2">
              Chambre {index + 1} ({room.name})
            </h3>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Adulte(s):</span>
                <span>{room.adults_quantity} x {room.adults_price} DZD</span>
              </div>
              <div className="flex justify-between">
                <span>Enfant(s):</span>
                <span>{room.children_quantity} x {room.children_price} DZD</span>
              </div>
              <div className="flex justify-between">
                <span>Nourrisson(s):</span>
                <span>{room.infant_quantity} x {room.infant_price} DZD</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Totale chambre {index + 1}:</span>
                <span>{room.total} DZD</span>
              </div>
            </div>
          </div>
          <Separator />
            
          </>
           
        ))}
      </div>

      {/* Total Sales */}
      <div className="flex justify-between font-bold text-lg">
        <span>Total des ventes:</span>
        <span>{total} DZD</span>
      </div>
    </Card>
  );
}
