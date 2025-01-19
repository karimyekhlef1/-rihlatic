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
