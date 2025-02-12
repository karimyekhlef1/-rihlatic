"use client"

import PaymentTitleComponent from "@/app/Components/payment/paymentTitle";
import PaymentCardComponent from "@/app/Components/payment/paymentCard";
import PaymentProgressComponent from "@/app/Components/payment/paymentProgress";
import Loading from "@/app/Components/home/Loading";
import { useSelector, useDispatch } from "react-redux";
import RoomReservationInformation from "@/app/Components/packages/RoomReservationInformation";
import ChangePaymentSteps from "@/app/Components/packages/ChangePaymentSteps";
import PricingCard from "@/app/Components/packages/PricingCard";
import { getPricingBookingCard } from "@/lib/store/api/packages/packagesSlice";
import { useEffect, useState } from "react";
import { AppDispatch } from "@/lib/store/store";
import { differenceInDays } from "date-fns";
import { CircleCheck, MapPin } from "lucide-react";

export default function PaymentPage() {
  const dispatch = useDispatch<AppDispatch>();
  const departure = useSelector((state: any) => state.paymentPackage.departure);
  const rooms = useSelector((state: any) => state.paymentPackage.rooms);
  const pkg = useSelector((state: any) => state.paymentPackage.package);
  const cardToken = useSelector((state: any) => state.paymentPackage.cardToken);
  
  const [pricing, setPricing] = useState<any>(null);

  const calculateDuration = (startDate: Date, endDate: Date) => {
    if (startDate && endDate) {
      try {
        const nights = differenceInDays(new Date(endDate), new Date(startDate));
        const days = nights + 1;
        return `${nights} nights / ${days} days`;
      } catch (error) {
        console.error("Error calculating duration:", error);
        return "Invalid dates";
      }
    }
    return "Select dates";
  };

  useEffect(() => {
    const getPricing = async () => {
      try {
        const result = await dispatch(
          getPricingBookingCard(cardToken)
        ).unwrap();

        setPricing(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPricing();
  }, []);

  if (!departure || !rooms || !pkg || !pricing) {
    return <Loading />;
  }

  const getMonthName = (date: Date) => {
    return date.toLocaleString("default", { month: "long" });
  };

  return (
    <div className="container">
      <div className="flex flex-col sm:flex-row gap-4 py-10">
        <div className="w-full md:w-2/3 flex flex-col items-center">
          <PaymentTitleComponent
            location={pkg.name}
            address={pkg.address}
            month={getMonthName(departure.departure_date)}
            startDate={departure.departure_date}
            endDate={departure.return_date}
          />
          <PaymentProgressComponent />
          <RoomReservationInformation /> 
          <ChangePaymentSteps /> 
        </div>
        <div className="w-full md:w-1/3">
          <PricingCard
            title={
              <div className=" flex flex-col items-start justify-start space-y-1">
                <div className="flex flex-row items-center ">
                  <MapPin fill="gray" color="#ffffff" size={16}/>
                  <p className="text-sm font-semibold pl-2 text-gray-500 ">
                    {pkg.destinations[0].name}
                  </p>
                </div>

                <div className="flex flex-row items-center ">
                  <CircleCheck
                  size={16}
                    className="font-semibold text-xs text-[#43acff]"
                    fill="#b4deff"
                  />
                  <p className="text-sm font-semibold pl-2">
                    {calculateDuration(
                      departure.departure_date,
                      departure.return_date
                    )}
                  </p>
                </div>
              </div>
            }
            image={pkg.url_featured_image}
            rooms={pricing.rooms}
            total={pricing.total}
          />
        </div>
      </div>
    </div>
  );
}
