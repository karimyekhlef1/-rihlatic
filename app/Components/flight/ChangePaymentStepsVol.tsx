import React from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  previousStep,
} from "@/lib/store/custom/packagesSlices/paymentPachageSlices";
import { storePackageReservation } from "@/lib/store/api/packages/packagesSlice";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { setCurrentStep } from "@/lib/store/custom/flightSlices/flightPaymentSlice";
import { RootState } from "@/lib/store/store";
import { storeReservationFlight } from "@/lib/store/api/vols/volsSlice";
import { clearState } from "@/lib/store/custom/flightSlices/flightPaymentSlice";
export default function ChangePaymentStepsVol() {
  const dispatch = useDispatch<any>();
  const {
    currentStep,
    selectedFlight,
    travelers,
    dataOfSearch,
    email,
    phone,
    mobileCountry,

  } = useSelector((state: RootState) => state.flightPayment);
  const router = useRouter();
  const { loading } = useSelector((state: RootState) => state.vols);

  const handleChangeStep = (stepOffset: number) => {
    dispatch(setCurrentStep(currentStep + stepOffset));
  };

  const handleComplete = async () => {
    const dataBody = {
      email,
      phone,
      mobileCountry,
//
      paymentMethod:0,
      validTicket:false,
      terms: 1,
      captchaToken:"required",
//


      flightType:dataOfSearch.flightType,
      flightClass:dataOfSearch.flightClass,
quantityAdults:dataOfSearch.quantityAdults,
quantityChild:dataOfSearch.quantityChild,
quantityInfant:dataOfSearch.quantityInfant,
quantityInfantWithSeat:dataOfSearch.quantityInfantWithSeat,
quantityStudent:dataOfSearch.quantityStudent,
quantityYouth:dataOfSearch.quantityYouth,
quantitySenior:dataOfSearch.quantitySenior,

flightRefundable:dataOfSearch.flightRefundable,
directFlightsOnly:dataOfSearch.directFlightsOnly,
flightWithBaggage:dataOfSearch.flightWithBaggage,
openReturn:dataOfSearch.openReturn,

      departureDate:dataOfSearch.departureDate,
     arrivalDate:dataOfSearch.arrivalDate,
     arrivalId:dataOfSearch.arrivalId,
     travellers: travelers,
      price_agency:selectedFlight.price_agency,
      detail_price:selectedFlight.detail_price,
      price:selectedFlight.price,
      tax_price:selectedFlight.tax_price,
      segments: selectedFlight.segments,
    };
    try {
      const response = await dispatch(
        storeReservationFlight(dataBody)
      ).unwrap();
      console.log("response=====>",response)
      if (response.success) {
        router.push("/reservations/vols");
        toast.success("Booking completed successfully!");
        dispatch(clearState()) 
      } else {
        toast.error(
          response.message || "Failed to complete booking. Please try again."
        );
      }
    } catch (error: any) {
      console.error("Booking error details:", error);
      toast.error("An error occurred while processing your booking");
    }
  };

  return (
    <div className="flex justify-between w-full mx-auto my-4">
      <Button
        variant="outline"
        onClick={() => handleChangeStep(-1)}
        className="px-10 sm:px-14"
        disabled={currentStep == 2}
      >
        Back
      </Button>

      {loading ? ( // Replace with a real loading state if needed
        <Button
          variant="active"
          className="px-10 sm:px-14 flex items-center justify-center"
        >
          <Loader2 className="animate-spin text-gray-200" size={24} />
        </Button>
      ) : currentStep < 3 ? (
        <Button
          variant="active"
          onClick={() => handleChangeStep(1)}
          className="px-10 sm:px-14"
        >
          Next
        </Button>
      ) : (
        <Button
          variant="active"
          onClick={handleComplete}
          className="px-10 sm:px-14"
        >
          Complete Booking
        </Button>
      )}
    </div>
  );
}
