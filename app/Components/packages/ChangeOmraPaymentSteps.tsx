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
  const currentStep = useSelector((state: RootState) => state.paymentOmra.currentStep);
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
    <div className="flex justify-between w-1/2 mx-auto my-4">
      {currentStep > 1 && (
        <Button variant="outline" onClick={handleBack} className="px-16">
          Back
        </Button>
      )}
      <Button 
        variant="active" 
        onClick={handleNext} 
        className={`px-16 ${currentStep === 1 ? "ml-auto" : ""}`}
        disabled={status === "loading"}
      >
        {isVerificationStep 
          ? status === "loading" 
            ? "Saving..." 
            : "Confirm Reservation"
          : "Next"
        }
      </Button>
    </div>
  );
}
