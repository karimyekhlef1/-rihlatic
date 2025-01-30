"use client";

import React from "react";
import { useDispatch } from "react-redux";
import PaymentTitleComponent from "@/app/Components/payment/paymentTitle";
import PaymentProgressComponent from "@/app/Components/hotels/PaymentProgressComponent";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import ChangePaymentStepsHotel from "@/app/Components/hotels/ChangePaymentStepsHotel";
import RoomReservationInformation from "@/app/Components/hotels/RoomReservationInformationHotel";
import PricingCardHotel from "@/app/Components/hotels/PricingCardHotel";
export default function PaymentPage() {
  const hotel = useSelector((state: any) => state.hotelPayment.hotel);
  const dateRange = useSelector(
    (state: { hotelSearchSlice: { dateRange: any } }) =>
      state.hotelSearchSlice?.dateRange
  );
  const resultPreBook = useSelector((state: any) => state.hotelPayment.resultPreBook);
  const transformedRooms = resultPreBook.rooms.map((room:any )=> ({
    adult:room.adult,
    child:room.child,
    name: room.name,
    price:room.boarding.rate
}));
  return (
    <div className="container">
      <div className="flex flex-col sm:flex-row gap-4 py-10">
        <div className="w-full md:w-2/3 flex flex-col items-center">
          <PaymentTitleComponent
            location={hotel.infos.name}
            month={hotel.infos.address}
            startDate={format(dateRange.from, "yyyy-MM-dd")}
            endDate={format(dateRange.to, "yyyy-MM-dd")}
          />
          <PaymentProgressComponent />
          <RoomReservationInformation />
          <ChangePaymentStepsHotel />
        </div>
        <div className="w-full md:w-1/3">
          <PricingCardHotel
            title="Your Booking"
            image={hotel.feature_image}
            rooms={transformedRooms}
            total={65418}
            dates={{
              startDate: format(resultPreBook.checkin, "yyyy-MM-dd"),
              endDate: format(resultPreBook.checkout, "yyyy-MM-dd"),
            }}
            nights={3}
          />
        </div>
      </div>
    </div>
  );
}
