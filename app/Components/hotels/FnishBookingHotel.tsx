import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
export default function FnishBookingHotel() {
  const resultPreBook = useSelector((state: any) => state.hotelPayment.resultPreBook);
  
  // Collect all notes from all rooms
  const allNotes = resultPreBook?.rooms?.flatMap((room: any) => 
    room.boarding?.note ? [room.boarding.note] : []
  ) || [];

  return (
    <ScrollArea className="overflow-y-auto max-h-[80vh] p-4">
      <Card className="p-4">
        <CardContent>
          <h4 className="text-md font-semibold mb-2">Cancellation Policies</h4>
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2 text-sm font-medium">Room</th>
                <th className="border px-4 py-2 text-sm font-medium">From</th>
                <th className="border px-4 py-2 text-sm font-medium">Penalty %</th>
                <th className="border px-4 py-2 text-sm font-medium">Penalty</th>
              </tr>
            </thead>
            <tbody>
              {resultPreBook?.rooms?.flatMap((room: any, roomIndex: number) => {
                const policies = room.boarding?.cancelation || [];
                const policyCount = policies.length;

                return policies.map((policy: any, policyIndex: number) => (
                  <tr key={`${roomIndex}-${policyIndex}`}>
                    {policyIndex === 0 && (
                      <td rowSpan={policyCount} className="border px-4 py-2 text-sm">
                        Room {roomIndex + 1}
                      </td>
                    )}
              
                    <td className="border px-4 py-2 text-sm">{format(policy.date, "yyyy-MM-dd")}</td>
                    <td className="border px-4 py-2 text-sm">{policy.percentage} </td>
                    <td className="border px-4 py-2 text-sm text-red-600 font-semibold">
                      You pay {policy.fee} DZD
                    </td>
                  </tr>
                ));
              })}
            </tbody>
          </table>

          {allNotes.length > 0 && (
            <div>
              <h4 className="text-md font-semibold mb-2">Special Offers & Notes</h4>
              <ul className="list-disc list-inside pl-4 text-sm text-gray-700">
                {allNotes.map((note: string, index: number) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </ScrollArea>
  );
}