import React from "react";
import { CheckCircle, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

export default function ReservationSummary({ data }: any) {
  console.log("ReservationSummary", data);
  if (!data) {
    return <div>No reservation data available.</div>;
  }
  return (
    <Card className="max-w-md p-4 space-y-4 pt-5 w-full mb-4">
      {/* Header */}
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <CheckCircle className="text-green-500" size={20} />
          <span className="text-sm">Réf Réservation {data?.reference}</span>
        </div>
      </div>

      {/* Payment Status */}
      <div className="flex justify-between items-center">
  <span className="text-sm font-medium">Paiement</span>
  <span
    className={`px-3 py-1 rounded-full text-sm ${
      data?.payment_status === "Paid"
        ? "bg-green-100 text-green-700"
        : "bg-orange-100 text-orange-700"
    }`}
  >
    {data?.payment_status === "Paid" ? "Paid" : "Not Paid"}
  </span>
</div>

{/* Reservation Status */}
<div className="flex justify-between items-center">
  <span className="text-sm font-medium">Statut</span>
  <span
    className={`px-3 py-1 rounded-full text-sm ${
      data?.status === "Accepted"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {data?.status === "Accepted" ? (
      <>
        <CheckCircle size={16} className="inline mr-1" />
        Accepted
      </>
    ) : (
      <>
        <X size={16} className="inline mr-1" />
        Cancelled
      </>
    )}
  </span>
</div>


      {data?.image && (
        <div className="relative h-48 w-full rounded-lg overflow-hidden">
          <img
            src={data?.image}
            alt="Destination"
            className="object-cover w-full h-full"
          />
        </div>
      )}

      {/* Booking Details Accordion */}
      <Accordion type="multiple" className="w-full">
  {data?.bookingDetails.map((bookingDetail: any, index: number) => (
    <AccordionItem key={bookingDetail.id} value={`room-${index}`}>
      <AccordionTrigger className="font-semibold ">
        Chambre {index + 1} ({bookingDetail.room.name})
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>
              Adulte(s) x{" "}
              <span className="font-bold">{bookingDetail.adults_quantity}</span>:
            </span>
            <span>{bookingDetail.adults_price} DZD</span>
          </div>
          <div className="flex justify-between">
            <span>
              Enfant(s) x{" "}
              <span className="font-bold">{bookingDetail.children_quantity}</span>:
            </span>
            <span>{bookingDetail.children_price} DZD</span>
          </div>
          <div className="flex justify-between">
            <span>
              Nourrisson(s) x{" "}
              <span className="font-bold">{bookingDetail.infant_quantity}</span>:
            </span>
            <span>{bookingDetail.infant_price} DZD</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Totale chambre {index + 1}:</span>
            <span>{bookingDetail.total_price} DZD</span>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  ))}
</Accordion>

      <div className="">
        <div className="flex justify-between ">
          <span>adults</span>
          <span>{data.total_adults}</span>
        </div>
        <div className="flex justify-between ">
          <span>children</span>
          <span>{data.total_children}</span>
        </div>
        <div className=" flex justify-between font-bold">
          <span className="font-medium">Total:</span> {data.total_price} DZD
        </div>
      </div>
    </Card>
  );
}
