import React from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  previousStep,
} from "@/lib/store/custom/omraSlices/paymentOmraSlice";
import { RootState } from "@/lib/store/store";
import { AppDispatch } from "@/lib/store/store";
import { handleOmraSubmit } from "./OmraRoomReservationInformation";
import { toast } from "sonner";

export default function ChangeOmraPaymentSteps() {
  const dispatch = useDispatch<AppDispatch>();
  const currentStep = useSelector(
    (state: RootState) => state.paymentOmra.currentStep
  );
  const { rooms, status, omra_departure_id } = useSelector(
    (state: RootState) => state.omreaReservationInfos
  );
  const isVerificationStep = currentStep > rooms.length;

  const handleNext = async () => {
    try {
      // Validate current room data before proceeding
      if (!isVerificationStep) {
        const currentRoom = rooms[currentStep - 1];
        if (
          !currentRoom.room_id ||
          !currentRoom.type ||
          !currentRoom.reservation_type
        ) {
          toast.error("Please fill in all room information");
          return;
        }

        const allPassengers = [
          ...(currentRoom.passengers.adults || []),
          ...(currentRoom.passengers.children || []),
          ...(currentRoom.passengers.children_without_bed || []),
          ...(currentRoom.passengers.infants || []),
        ];

        // Check if any required passenger fields are empty
        for (const passenger of allPassengers) {
          if (!passenger.first_name || !passenger.last_name) {
            toast.error("All passengers must have first and last names");
            return;
          }
          if (!passenger.passport_nbr || !passenger.passport_expire_at) {
            toast.error("All passengers must have valid passport information");
            return;
          }
          if (!passenger.birth_date) {
            toast.error("All passengers must have a birth date");
            return;
          }
          if (!passenger.sex || !["male", "female"].includes(passenger.sex)) {
            toast.error("All passengers must specify their sex");
            return;
          }
          if (!passenger.email) {
            toast.error("All passengers must provide an email address");
            return;
          }
          // Validate email format
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(passenger.email)) {
            toast.error("Please enter a valid email address");
            return;
          }
          if (!passenger.phone) {
            toast.error("All passengers must provide a phone number");
            return;
          }
          // Validate phone format (accepts international format)
          const phoneRegex = /^\+?[0-9]{10,15}$/;
          if (!phoneRegex.test(passenger.phone)) {
            toast.error("Please enter a valid phone number");
            return;
          }
        }

        // Check if room has at least one adult
        if (!currentRoom.passengers.adults?.length) {
          toast.error("Each room must have at least one adult passenger");
          return;
        }
      }

      // Handle verification step
      if (isVerificationStep) {
        if (!omra_departure_id) {
          toast.error("No departure ID selected");
          return;
        }
        const success = await handleOmraSubmit(
          dispatch,
          rooms,
          omra_departure_id.toString(),
          status
        );
        if (!success) return;
      }
      dispatch(nextStep());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const handleBack = () => {
    dispatch(previousStep());
  };

  return (
    <div className="flex justify-center gap-8 md:gap-16 max-w-3xl w-full mx-auto my-4">
      <div className="flex-1 flex justify-end">
        {currentStep > 1 ? (
          <Button
            variant="outline"
            onClick={handleBack}
            className="w-32 md:w-48"
          >
            Back
          </Button>
        ) : (
          <div className="w-32 md:w-48"></div>
        )}
      </div>

      <div className="flex-1 flex justify-start">
        <Button
          variant="active"
          onClick={handleNext}
          className="w-48 md:w-64"
          disabled={status === "loading"}
        >
          {isVerificationStep
            ? status === "loading"
              ? "Saving..."
              : "Confirm Reservation"
            : "Next"}
        </Button>
      </div>
    </div>
  );
}
