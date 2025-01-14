import React from 'react'
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { nextStep , previousStep } from '@/lib/store/custom/packagesSlices/paymentPachageSlices';
import { storePackageReservation } from '@/lib/store/api/packages/packagesSlice';
import { toast } from 'sonner';

export default function ChangePaymentSteps() {

  const dispatch = useDispatch<any>();

  const {currentStep, departure, RoomsData } = useSelector((state: any) => state.paymentPackage);

  const handleNext = () => {
    dispatch(nextStep());
  };

  const handleBack = () => {
    dispatch(previousStep());
  };

  const handleComplete = async () => {
    try {
      const bodyData = {
        departure_id: departure.id,
        rooms: RoomsData,
      };
      const response = await dispatch(storePackageReservation(bodyData)).unwrap();
      if (response.success) {
        toast.success("Booking completed successfully!");
      } else {
        toast.error(
          response.message || "Failed to complete booking. Please try again."
        );
      }
    } catch (error: any) {
      toast.error("An error occurred while processing your booking");
    }
  };

  return (
    <div className="flex justify-between w-1/2  mx-auto my-4">
      {
        currentStep > 1 ? (
          <Button variant="outline" onClick={handleBack} className="px-16">
            Back
          </Button>
        ) : (<span></span>)
      }
      {
        currentStep <= 1 ? (
          <Button variant={'active'} onClick={handleNext} className="px-16">
            Next
          </Button>
        ) : (<Button variant={'active'} onClick={handleComplete} className="px-16">
          Complete Booking
        </Button>)
      }
   
  </div>
  )
}
