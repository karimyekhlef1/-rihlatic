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
import { RootState } from "@/lib/store/store";
import { Room } from "@/app/Types/hotel/HotelDetails";
import { openDialogSignUp } from "@/lib/store/custom/mainSlices/dialogSlice";
import { useRouter } from "next/navigation";
import { setHotel , setRooms} from "@/lib/store/custom/hotelSlices/paymentHotelSlices";
import { hotelPrebook } from "@/lib/store/api/hotels/hotelsSlice";
 import RoomsDetailsDialog from "./RoomsDetailsDialog";
interface BookingHotelComponentProps {
  hotelDetails:any
  selectedRoom: Room[] | undefined;
  multiple?: boolean;
}

const BookingHotelComponent: React.FC<BookingHotelComponentProps> = ({
  hotelDetails,
  selectedRoom,
  multiple,
}) => {
  const dispatch = useDispatch();
  const { adults, children } = useSelector((state: RootState) => state.booking);
  const dateRange = useSelector(
    (state: RootState) => state.hotelSearchSlice?.dateRange
  );
  const { success, userData, isInitialized } = useSelector(
    (state: RootState) => state.signIn
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
    if (success && userData && isInitialized ){
    setIsDialogOpen(true);
    dispatch(setHotel(hotelDetails))
    if(selectedRoom){
      
      dispatch(setRooms(selectedRoom))

    }

    
    
    }else{
    dispatch(openDialogSignUp());
    }
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

export default BookingHotelComponent;
