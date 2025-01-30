import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  previousStep,
} from "@/lib/store/custom/hotelSlices/paymentHotelSlices";
import { storePackageReservation } from "@/lib/store/api/packages/packagesSlice";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChangePaymentStepsHotel() {
  const dispatch = useDispatch<any>();
  const { currentStep } = useSelector((state: any) => state.hotelPayment);
  const RoomsData = useSelector((state: any) => state.hotelPayment.RoomsData);

  const router = useRouter();

  const handleNext = async () => {
    const currentRoom = RoomsData[currentStep - 1];

    try {
      const allPassengers = [
        ...(currentRoom.passengers.adults || []),
        ...(currentRoom.passengers.children || []),
      ];
      for (const passenger of allPassengers) {
        if (!passenger.firstname) {
          toast.error("All passengers must have first name");
          return;
        }
        if (!passenger.lastname) {
          toast.error("All passengers must have last name");
          return;
        }
        if (!passenger.lastname) {
          toast.error("All passengers must have first Civility");
          return;
        }
      }

      if (!currentRoom.passengers.adults?.length) {
        toast.error("Each room must have at least one adult passenger");
        return;
      }
      dispatch(nextStep());
    } catch {}
  };

  const handleBack = () => {
    const currentRoom = RoomsData[currentStep - 1];

    dispatch(previousStep());
  };

  useEffect(() => {}, []);

  // const cleanEmptyPassengerArrays = (data: Room[]): { rooms: Room[] } => {
  //   return {
  //     rooms: data.map((room) => {
  //       const cleanedPassengers: Passengers = Object.fromEntries(
  //         Object.entries(room.passengers).filter(
  //           ([_, value]) => value.length > 0
  //         )
  //       ) as Passengers;

  //       return {
  //         room_id: room.room_id,
  //         passengers: cleanedPassengers,
  //       };
  //     }),
  //   };
  // };

  const handleComplete = async () => {
    try {
    } catch (error: any) {}
  };

  return (
    <div className="flex justify-between w-full mx-auto my-4">
      <Button
        variant="outline"
        onClick={handleBack}
        className="px-10 sm:px-14"
        disabled={currentStep <= 1}
      >
        Back
      </Button>

      {false ? (
        <Button
          variant={"active"}
          onClick={handleNext}
          className="px-10 sm:px-14 flex items-center justify-center"
        >
          <Loader2 className="animate-spin text-gray-200" size={24} />
        </Button>
      ) : currentStep <= RoomsData.length ? (
        <Button
          variant={"active"}
          onClick={handleNext}
          className="px-10 sm:px-14"
        >
          Next
        </Button>
      ) : (
        <Button
          variant={"active"}
          onClick={handleComplete}
          className="px-10 sm:px-14"
        >
          Complete Booking
        </Button>
      )}
    </div>
  );
}
