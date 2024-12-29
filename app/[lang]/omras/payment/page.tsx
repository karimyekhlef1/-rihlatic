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
  const omraData = useSelector((state: any) => state.omras.omraData);
  const location = omraData?.result?.omra[0]?.destinations[0].country.full_name;
  const departureDate =
    omraData?.result?.omra[0]?.omraDepartures[0].departure_date;
  const returnDate = omraData?.result?.omra[0]?.omraDepartures[0].return_date;
  const month = departureDate
    ? new Date(departureDate).toLocaleString("en-US", { month: "long" })
    : "";

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-16">
      <PaymentTitleComponent
        location={location}
        month={month}
        startDate={departureDate}
        endDate={returnDate}
      />

      <OmraPaymentProgressComponent />

      <OmraRoomReservationInformation />

      <ChangeOmraPaymentSteps />
    </div>
  );
}
