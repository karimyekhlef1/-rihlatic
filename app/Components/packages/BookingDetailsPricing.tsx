import React from 'react';
import { CheckCircle, X } from 'lucide-react';
import { Card } from '@/components/ui/card';

type ReservationDetailsProps = {
  referenceNumber: string;
  isPaid: boolean;
  status?: string;
  imageUrl?: string;
  roomDetails: {
    adults: number;
    children: number;
    infants: number;
    totalPrice: number;
  };
  currency?: string;
};

export default function ReservationSummary({
  referenceNumber,
  isPaid = false,
  imageUrl = "http://localhost:3000/_next/image?url=https%3A%2F%2Fapi.dsonetech.com%2Fstorage%2Fpackages%2FfeaturedImages%2F10_2024_670d141267cd9.jpg&w=1200&q=75",
  roomDetails,
  currency = "DZD"
}: ReservationDetailsProps) {
  return (
    <Card className="max-w-md p-4 space-y-4 pt-5">
      {/* Header */}
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <CheckCircle className="text-green-500" size={20} />
          <span className="text-sm">Réf Réservation {referenceNumber}</span>
        </div>
      </div>

      {/* Payment Status */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Paiement</span>
        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
          Non payé
        </span>
      </div>

      {/* Status */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Statut</span>
        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
          <X size={16} className="inline mr-1" />
        </span>
      </div>

      {/* Image */}
      <div className="relative h-48 w-full rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          alt="Destination"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Room Details */}
      <div className="space-y-2">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="font-medium">Chambre 1 ( Single+1CHD )</h3>
          <button className="text-gray-500">
            <X size={16} />
          </button>
        </div>

        {/* Occupants */}
        {/* <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>1×Adulte</span>
            <span>0 {currency}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>1×Enfants</span>
            <span>0 {currency}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>1×Nourrissons</span>
            <span>0 {currency}</span>
          </div>
          <div className="flex justify-between text-sm font-medium border-t pt-2">
            <span>Totale chambre 1</span>
            <span>0 {currency}</span>
          </div>
        </div> */}

        {/* Total */}
        {/* <div className="flex justify-between font-medium border-t pt-4">
          <span>Total des ventes</span>
          <span>0 {currency}</span>
        </div> */}
      </div>
    </Card>
  );
}