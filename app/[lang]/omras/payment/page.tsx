"use client";

import PaymentTitleComponent from "@/app/Components/payment/paymentTitle";
import OmraPaymentProgressComponent from "@/app/Components/omra/OmraPaymentProgress";
import OmraRoomReservationInformation from "@/app/Components/packages/OmraRoomReservationInformation";
import ChangeOmraPaymentSteps from "@/app/Components/packages/ChangeOmraPaymentSteps";
import OmraPricingCard from "@/app/Components/omra/OmraPricingCard";
import { useSelector } from "react-redux";
import { CircleCheck, MapPin } from "lucide-react";

/**
 * The OmraPaymentPage component renders the payment page for an Omra (Umrah) package.
 *
 * It displays the package details, payment progress, room reservation information, and a button to change the payment steps.
 *
 * @returns The JSX element for the OmraPaymentPage component.
 */
export default function OmraPaymentPage() {
  const { loading, omraData } = useSelector((state: any) => state.omras);
  const { rooms, total } = useSelector(
    (state: any) => state.omreaReservationInfos
  );
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
    <div className="container">
      <div className="flex flex-col sm:flex-row gap-4 py-10">
        <div className="w-full md:w-2/3 flex flex-col items-center">
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

        <div className="w-full md:w-1/3">
          <OmraPricingCard
            title={
              <div className="flex flex-col items-start justify-start">
                <div className="flex flex-row items-center">
                  <MapPin fill="gray" color="#ffffff" />
                  <p className="text-sm font-semibold pl-2 text-gray-500">
                    {location}
                  </p>
                </div>
                <div className="flex flex-row items-center">
                  <CircleCheck
                    className="font-semibold text-xs text-[#43acff]"
                    fill="#b4deff"
                  />
                  <p className="text-sm font-semibold pl-2">
                    {departureDate && returnDate
                      ? `${new Date(departureDate).toLocaleDateString()} - ${new Date(
                          returnDate
                        ).toLocaleDateString()}`
                      : ""}
                  </p>
                </div>
              </div>
            }
            image={omra?.url_featured_image}
            rooms={rooms || []}
            total={total || 0}
            startDate={departureDate}
            endDate={returnDate}
            facilities={omra?.facilities}
          />
        </div>
      </div>
    </div>
  );
}
