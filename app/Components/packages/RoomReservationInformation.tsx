'use client';
import React, { useEffect } from 'react';
import AdulteInformation from './AdulteInformation';
import { useSelector } from 'react-redux';
import { ScrollArea } from "@/components/ui/scroll-area";
import FnishBooking from './FnishBooking';
export default function RoomReservationInformation() {
  const rooms = useSelector((state: any) => state.paymentPackage.rooms);
  const currentStep = useSelector((state: any) => state.paymentPackage.currentStep);
  const currentRoom = rooms.find((room:any, index: number) => index === currentStep - 1);

  if (!currentRoom) {
    return <FnishBooking />
  }
  
  const renderRoomInfo = (type: 'adults' | 'children' | 'infants', count: number) => {
    return Array.from({ length: count }, (_, index) => (
      <AdulteInformation
        roomId = {currentRoom.roomType.id}
        key={`${type}-${index}`}
        titel={type}
        index={index}
      />
    ));
  };

  return (
    <div className="w-full">
      <ScrollArea className=" max-h-[80vh]">
        {renderRoomInfo('adults', currentRoom.adults)}
        {renderRoomInfo('children', currentRoom.children)}
        {renderRoomInfo('infants', currentRoom.infants)}
      </ScrollArea>
    </div>
  );
}
