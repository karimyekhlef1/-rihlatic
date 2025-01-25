"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CircleCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format, differenceInDays } from "date-fns";
import {
  incrementAdults,
  decrementAdults,
  incrementChildren,
  decrementChildren,
} from "@/lib/store/custom/hotelSlices/bookingSlice";
import { RootState } from "@/lib/store/store";
import { Room } from "@/app/Types/hotel/HotelDetails";

interface BookingHotelComponentProps {
  selectedRoom: Room[] | undefined;
  multiple?: boolean;
}

const BookingHotelComponent: React.FC<BookingHotelComponentProps> = ({
  selectedRoom,
  multiple,
}) => {
  const dispatch = useDispatch();
  const { adults, children } = useSelector((state: RootState) => state.booking);
  const dateRange = useSelector(
    (state: RootState) => state.hotelSearchSlice?.dateRange
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const calculateDuration = () => {
    if (dateRange?.from && dateRange?.to) {
      const nights = differenceInDays(
        new Date(dateRange.to),
        new Date(dateRange.from)
      );
      const days = nights + 1;
      return `${nights} nights / ${days} days`;
    }
    return "Select dates";
  };

  const isBookButtonDisabled = !selectedRoom || selectedRoom.length === 0;

  const handleBookClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <div>
      <Card className="w-[300px] rounded-3xl">
        <CardContent className="px-0 py-8">
          <div className="flex flex-col items-center">
            {selectedRoom && multiple && selectedRoom.length > 0 && (
              <div className="flex flex-col items-center justify-center pb-4">
                <p className="text-xs">Total</p>
                <span className="font-semibold text-lg">{`${selectedRoom[0].rate} DZD`}</span>
              </div>
            )}
            <Separator />

            <div className="flex flex-col pt-4 pb-[100px]">
              <div className="flex items-center">
                <CircleCheck
                  size={15}
                  className="text-[#43acff]"
                  fill="#b4deff"
                />
                <p className="text-sm font-semibold pl-2">
                  {calculateDuration()}
                </p>
              </div>
              <div className="flex items-center mt-2">
                <CircleCheck
                  size={15}
                  className="text-[#ff8000]"
                  fill="#ffcc99"
                />
                <p className="text-sm font-semibold pl-2">
                  {dateRange?.from &&
                    format(new Date(dateRange.from), "dd/MMM/yyyy")}
                  {dateRange?.to &&
                    ` - ${format(new Date(dateRange.to), "dd/MMM/yyyy")}`}
                </p>
              </div>
            </div>

            <Separator />
            <div className="flex flex-col items-center gap-y-2 pt-4">
              <Button
                onClick={handleBookClick}
                size="sm"
                variant="rihlatic"
                className="h-[40px] w-[250px]"
                disabled={isBookButtonDisabled}
              >
                Book Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <RoomsDetailsDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        data={selectedRoom}
      />
    </div>
  );
};

interface RoomsDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  data?: Room[];
}

const RoomsDetailsDialog: React.FC<RoomsDetailsDialogProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-2xl bg-gray-100 p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold mb-4">
            Details
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="overflow-y-auto max-h-[80vh]">
          {data?.map((room, roomIndex) => (
            <div key={roomIndex}>
              {room.boardings.map((boarding, boardingIndex) => (
                <Card key={boardingIndex} className=" p-4 my-2">
                  <h3 className="text-lg font-bold mb-2">{room.room_name}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Rate: {room.rate} DZD
                  </p>

                  <h4 className="text-md font-semibold mb-2">
                    Cancellation Policy
                  </h4>
                  <table className="w-full border-collapse border border-gray-300 mb-4">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border px-4 py-2 text-sm font-medium">
                          From
                        </th>
                        <th className="border px-4 py-2 text-sm font-medium">
                          Penalty %
                        </th>
                        <th className="border px-4 py-2 text-sm font-medium">
                          Penalty
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {boarding?.cancellation_policy.map((policy, index) => (
                        <tr key={index}>
                          <td className="border px-4 py-2 text-sm">
                            {policy.date_from}
                          </td>
                          <td className="border px-4 py-2 text-sm">
                            {policy.percentage} %
                          </td>
                          <td className="border px-4 py-2 text-sm text-red-600 font-semibold">
                            {`You pay ${policy.amount} DZD`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <h4 className="text-md font-semibold mb-2">
                    Special Offers & Notes
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 mb-2">
                    {room.boardings[0]?.notes.map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                  <Separator />
                  <div className=" flex justify-between font-semibold mt-2">
                    <div>Tarif de 1 chambre</div>
                    <div>{`${boarding.bookingDetails.room_rate} DZD`}</div>
                  </div>
                </Card>
              ))}
            </div>
          ))}
        </ScrollArea>

        <DialogFooter className=" flex justify-between font-semibold mt-2 ">
          <div className=" flex  w-full space-x-2">
            <div>Total</div>
            <div>
              {`${data?.reduce((total: number, room: Room) => total + (room.rate || 0), 0)} DZD`}
            </div>
          </div>
          <Button variant="rihlatic">Complete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingHotelComponent;
