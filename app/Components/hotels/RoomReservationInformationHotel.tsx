'use client';
import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { ScrollArea } from "@/components/ui/scroll-area";
import FnishBookingHotel from './FnishBookingHotel';
import PassengerInformationHotel from './PassengerInformationHotel';

export default function RoomReservationInformation() {
  const currentStep = useSelector((state: any) => state.hotelPayment.currentStep);
  const RoomsTypes = useSelector((state: any) => state.hotelPayment.RoomsTypes);
  if (currentStep > RoomsTypes.length ) {
    return <FnishBookingHotel />
  }
  
  const renderRoomInfo = (type: 'adults' | 'children' , count: number) => {
    return Array.from({ length: count }, (_, index) => (
      <PassengerInformationHotel
        roomId = {index}
        room_index={currentStep-1}
        key={`${type}-${index}`}
        titel={type}
        index={index}
      />
    ));
  };

  return (
    <div className="w-full">
      <ScrollArea className="">
        {renderRoomInfo('adults',  RoomsTypes[currentStep-1].adult)}
        {renderRoomInfo('children', RoomsTypes[currentStep-1].child)}
      </ScrollArea>
    </div>
  );
}
