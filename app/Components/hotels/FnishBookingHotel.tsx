import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function FnishBookingHotel() {
  const resultPreBook = useSelector((state: any) => state.hotelPayment.resultPreBook);

  return (
    <ScrollArea className="overflow-y-auto max-h-[80vh] p-4">
      {resultPreBook?.rooms?.map((room:any, roomIndex:number) => (
        <Card key={roomIndex} className="p-4 my-2">
          {/* Cancellation Policy */}
          <h4 className="text-md font-semibold mb-2">Cancellation</h4>
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2 text-sm font-medium">From</th>
                <th className="border px-4 py-2 text-sm font-medium">Penalty %</th>
                <th className="border px-4 py-2 text-sm font-medium">Penalty</th>
              </tr>
            </thead>
            <tbody>
              {room.boarding?.cancelation?.map((policy:any, policyIndex:number) => (
                <tr key={policyIndex}>
                  <td className="border px-4 py-2 text-sm">{policy.date}</td>
                  <td className="border px-4 py-2 text-sm">{policy.percentage}</td>
                  <td className="border px-4 py-2 text-sm text-red-600 font-semibold">
                    {`You pay ${policy.fee} DZD`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Special Offers & Notes */}
          <h4 className="text-md font-semibold mb-2">Special Offers & Notes</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 mb-2">
            {room.boarding?.note && <li>{room.boarding.note}</li>}
          </ul>

          <Separator />
        </Card>
      ))}
    </ScrollArea>
  );
}
