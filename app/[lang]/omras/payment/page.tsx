"use client";

import PaymentTitleComponent from "@/app/Components/payment/paymentTitle";
import OmraPaymentProgressComponent from "@/app/Components/omra/OmraPaymentProgress";
import OmraRoomReservationInformation from "@/app/Components/packages/OmraRoomReservationInformation";
import ChangeOmraPaymentSteps from "@/app/Components/packages/ChangeOmraPaymentSteps";
import OmraPricingCard from "@/app/Components/omra/OmraPricingCard";
import OmraSummary from "@/app/Components/omra/OmraSummary";
import { useDispatch, useSelector } from "react-redux";
import { CircleCheck, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getOmraDetails,
  getOmraReservationDetails,
} from "@/lib/store/api/omras/omrasSlice";
import { useParams } from "next/navigation";

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
  const currentStep = useSelector(
    (state: any) => state.paymentOmra.currentStep
  );
  const dispatch = useDispatch<any>();
  const [facilities, setFacilities] = useState<any>(null);
  const [omraDetails, setOmraDetails] = useState<any>(undefined);
  const [omras, setOmras] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const isVerificationStep = currentStep > rooms.length;
  const omra = omraData?.result?.omra?.[0];
  const location = omra?.destinations?.[0]?.country?.full_name;
  const departure = omra?.omraDepartures?.[0];
  const departureDate = departure?.departure_date;
  const returnDate = departure?.return_date;
  const month = departureDate
    ? new Date(departureDate).toLocaleString("en-US", { month: "long" })
    : "";

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const result = await dispatch(
          getOmraDetails({
            id,
            include:
              "omraDepartures,media,omraDepartures.flight,omraDepartures.media,omraDepartures.omraDepartureSchedules,omraDepartures.pricing,agencies,destinations,destinations.airport",
          })
        ).unwrap();

        const omraFacilities = await dispatch(
          getOmraReservationDetails({
            include: "omraDeparture,omraDeparture.pricing",
          })
        ).unwrap();

        // Extract facilities from the first booking
        if (omraFacilities?.result?.bookings?.[0]?.departure) {
          const { visa, vol, hotel, transfer, excursion, cruise } =
            omraFacilities.result.bookings[0].departure;
          setFacilities({ visa, vol, hotel, transfer, excursion, cruise });
        }

        if (result?.success && result?.result?.omra) {
          const specificOmra = result.result.omra.find(
            (omra: any) => omra.id === Number(id)
          );

          if (specificOmra) {
            setOmraDetails(specificOmra);
          }
        }

        const allResult = await dispatch(
          getOmraDetails({
            include: "omraDepartures,media",
          })
        ).unwrap();

        if (allResult?.success && allResult?.result?.omra) {
          setOmras(allResult.result.omra);
        }
      } catch (error) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [dispatch, id]);

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
          {isVerificationStep ? (
            <OmraSummary rooms={rooms} />
          ) : (
            <OmraRoomReservationInformation />
          )}
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
            facilities={facilities}
          />
        </div>
      </div>
    </div>
  );
}
