"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import FlightPaymentProgress from "@/app/Components/flight/FlightPaymentProgress";
import FlightPricingCard from "@/app/Components/flight/FlightPricingCard";
import FlightSummary from "@/app/Components/flight/FlightSummary";
import FlightReservationInformation from "@/app/Components/flight/FlightReservationInformation";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FlightPaymentPage() {
  const router = useRouter();
  const { currentStep, selectedFlight, travelers } = useSelector(
    (state: RootState) => state.flightPayment
  );

  // Get price details from the selected flight
  const price = selectedFlight?.price || 0;
  const tax_price = selectedFlight?.tax_price || 0;

  // Redirect if no flight is selected
  useEffect(() => {
    if (!selectedFlight) {
      router.push("/vols");
    }
  }, [selectedFlight, router]);

  if (!selectedFlight) {
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <FlightPaymentProgress />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {currentStep === 1 && (
            <FlightReservationInformation flight={{ ...selectedFlight }} />
          )}
          {currentStep === 2 && (
            <FlightSummary flight={selectedFlight} travelers={travelers} />
          )}
          {currentStep === 3 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                Booking Confirmed!
              </h2>
              <p className="text-gray-600">
                Your flight has been successfully booked. You will receive a
                confirmation email shortly.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <FlightPricingCard
              flight={selectedFlight}
              price={price}
              tax_price={tax_price}
            />
            {currentStep < 3 && (
              <Button
                className="w-full mt-4"
                size="lg"
                variant={"rihlatic"}
                // TODO: Implement payment logic
                onClick={() => {
                  // Handle payment
                }}
              >
                {currentStep === 1 ? "Continue to Payment" : "Confirm and Pay"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
