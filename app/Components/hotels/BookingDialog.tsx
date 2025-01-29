"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CircleCheck } from "lucide-react";
import { hotelPrebook } from "@/lib/store/api/hotels/hotelsSlice";
import { toast } from "react-hot-toast";
import { Room, Policy } from "@/app/Types/hotel/HotelDetails";

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRoom: Room[] | undefined;
  dateRange: any;
  onComplete: () => void;
}

const CancellationTable: React.FC<{ policies: Policy[] }> = ({ policies }) => (
  <>
    <h4 className="text-md font-semibold mb-2">Cancellation Policy</h4>
    <table className="w-full border-collapse border border-gray-300 mb-4">
      <thead>
        <tr className="bg-gray-200">
          <th className="border px-4 py-2 text-sm font-medium">From</th>
          <th className="border px-4 py-2 text-sm font-medium">Penalty %</th>
          <th className="border px-4 py-2 text-sm font-medium">Penalty</th>
        </tr>
      </thead>
      <tbody>
        {policies.map((policy, index) => (
          <tr key={index}>
            <td className="border px-4 py-2 text-sm">{policy.date_from}</td>
            <td className="border px-4 py-2 text-sm">{policy.percentage}%</td>
            <td className="border px-4 py-2 text-sm text-red-600 font-semibold">
              You pay {policy.amount} DZD
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
);

const RoomCard: React.FC<{ room: Room }> = ({ room }) => (
  <>
    {room.boardings.map((boarding, index) => (
      <Card key={index} className="p-4 my-2">
        <h3 className="text-lg font-bold mb-2">{room.room_name}</h3>
        <p className="text-sm text-gray-600 mb-4">Rate: {room.rate} DZD</p>

        <CancellationTable policies={boarding.cancellation_policy} />

        <h4 className="text-md font-semibold mb-2">Special Offers & Notes</h4>
        <ul className="list-disc list-inside text-sm text-gray-700 mb-2">
          {boarding.notes.map((note, idx) => (
            <li key={idx}>{note}</li>
          ))}
        </ul>
        
        <Separator />
        <div className="flex justify-between font-semibold mt-2">
          <div>Room Rate</div>
          <div>{boarding.bookingDetails.room_rate} DZD</div>
        </div>
      </Card>
    ))}
  </>
);

const BookingDialog: React.FC<BookingDialogProps> = ({
  isOpen,
  onClose,
  selectedRoom,
  dateRange,
  onComplete
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isOpen || !selectedRoom?.length) return;

    const prebookRoom = async () => {
      try {
        const result = await dispatch(hotelPrebook({
          // Add your prebook parameters here
        })).unwrap();
        
        if (result.hotel) {
          // Handle successful prebook
        }
      } catch (error) {
        toast.error("Failed to prebook room");
        onClose();
      }
    };

    prebookRoom();
  }, [isOpen, selectedRoom, dispatch, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-2xl bg-gray-100 p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold mb-4">Details</DialogTitle>
        </DialogHeader>

        <ScrollArea className="overflow-y-auto max-h-[80vh]">
          {selectedRoom?.map((room, index) => (
            <RoomCard key={index} room={room} />
          ))}
        </ScrollArea>

        <DialogFooter className="flex justify-between font-semibold mt-2">
          <div className="flex w-full space-x-2">
            <div>Total</div>
            <div>{selectedRoom?.reduce((total, room) => total + (room.rate || 0), 0)} DZD</div>
          </div>
          <Button variant="rihlatic" onClick={onComplete}>Complete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;