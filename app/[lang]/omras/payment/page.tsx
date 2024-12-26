"use client";

import PaymentTitleComponent from "@/app/Components/payment/paymentTitle";

import RoomReservationInformation from "@/app/Components/packages/RoomReservationInformation";
import ChangePaymentSteps from "@/app/Components/packages/ChangePaymentSteps";
import OmraPaymentProgress from "@/app/Components/omra/OmraPaymentProgress";

export default function OmraPaymentPage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-16">
      <PaymentTitleComponent
        location={"location"}
        month={"month"}
        startDate={"startDate"}
        endDate={"startDate"}
      />
      <OmraPaymentProgress />
      <RoomReservationInformation />

      <ChangePaymentSteps />
    </div>
  );
}
