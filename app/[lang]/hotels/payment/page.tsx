"use client"

import React from 'react'
import { useDispatch } from "react-redux";
import PaymentTitleComponent from '@/app/Components/payment/paymentTitle';
import PaymentProgressComponent from '@/app/Components/hotels/PaymentProgressComponent';
import { useSelector } from 'react-redux';
import { format } from "date-fns";
import ChangePaymentStepsHotel from '@/app/Components/hotels/ChangePaymentStepsHotel';

import PricingCardHotel from '@/app/Components/hotels/PricingCardHotel';
export default function PaymentPage() {
  const hotel= useSelector((state:any)=>state.hotelPayment.hotel)
  const dateRange = useSelector((state: { hotelSearchSlice: { dateRange: any } }) => state.hotelSearchSlice?.dateRange);

  return (
    <div className="container">
    <div className="flex flex-col sm:flex-row gap-4 py-10">
      <div className="w-full md:w-2/3 flex flex-col items-center">
        <PaymentTitleComponent
          location={hotel.infos.name}
          month={hotel.infos.address}
          startDate={format(dateRange.from,"yyyy-MM-dd")}
          endDate={format(dateRange.to,"yyyy-MM-dd")}
        />
        <PaymentProgressComponent />
        {/* <RoomReservationInformation />  */}
        <ChangePaymentStepsHotel /> 
      </div>
      <div className="w-full md:w-1/3">
      <PricingCardHotel
  title="Your Booking"
  image={hotel.feature_image}
  rooms={[
    {
      name: 'SGL',
      adults_quantity: 1,
      adults_price: 10000,
      children_quantity: 0,
      children_price: 0,
      infant_quantity: 0,
      infant_price: 0,
      total: 32709,
    },
    {
      name: 'DBL',
      adults_quantity: 2,
      adults_price: 15000,
      children_quantity: 1,
      children_price: 5000,
      infant_quantity: 0,
      infant_price: 0,
      total: 32709,
    },
  ]}
  total={65418}
  dates={{ startDate: format(dateRange.from,"yyyy-MM-dd"), endDate:format(dateRange.to,"yyyy-MM-dd") }}
  nights={3}
/>

      </div>
    </div>
  </div>
  )
}
