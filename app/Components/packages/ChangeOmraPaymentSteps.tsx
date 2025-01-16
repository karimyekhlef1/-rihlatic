import React from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  previousStep,
} from "@/lib/store/custom/omraSlices/paymentOmraSlice";
import { RootState } from "@/lib/store/store";

export default function ChangeOmraPaymentSteps() {
  const dispatch = useDispatch();
  const currentStep = useSelector((state: RootState) => state.paymentOmra.currentStep);

  const handleNext = () => {
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
      >
        Next
      </Button>
    </div>
  );
}
