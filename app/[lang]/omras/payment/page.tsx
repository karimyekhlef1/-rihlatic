"use client";

import PaymentTitleComponent from "@/app/Components/payment/paymentTitle";
import OmraPaymentProgressComponent from "@/app/Components/omra/OmraPaymentProgress";
import OmraRoomReservationInformation from "@/app/Components/packages/OmraRoomReservationInformation";
import ChangeOmraPaymentSteps from "@/app/Components/packages/ChangeOmraPaymentSteps";

import { useSelector } from "react-redux";

/**
 * The OmraPaymentPage component renders the payment page for an Omra (Umrah) package.
 *
 * It displays the package details, payment progress, room reservation information, and a button to change the payment steps.
 *
 * @returns The JSX element for the OmraPaymentPage component.
 */
export default function OmraPaymentPage() {
  const { loading, omraData } = useSelector((state: any) => state.omras);
  const omra = omraData?.result?.omra?.[0];
  const location = omra?.destinations?.[0]?.country?.full_name;
  const departure = omra?.omraDepartures?.[0];
  const departureDate = departure?.departure_date;
  const returnDate = departure?.return_date;
  const month = departureDate
    ? new Date(departureDate).toLocaleString("en-US", { month: "long" })
    : "";

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
        <p className="mt-4 text-gray-600">Loading your booking details...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-16">
      {location && departureDate && returnDate ? (
        <PaymentTitleComponent
          location={location}
          month={month}
          startDate={departureDate}
          endDate={returnDate}
        />
      ) : null}

      <OmraPaymentProgressComponent />

      <OmraRoomReservationInformation />

      <ChangeOmraPaymentSteps />
    </div>
  );
}
