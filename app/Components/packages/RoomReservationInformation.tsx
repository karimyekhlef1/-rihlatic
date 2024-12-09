'use client';
import React, { useEffect } from 'react';
import AdulteInformation from './AdulteInformation';
import { useSelector } from 'react-redux';

export default function RoomReservationInformation() {
  const rooms = useSelector((state: any) => state.paymentPackage.rooms);
  const currentStep = useSelector((state: any) => state.paymentPackage.currentStep);
  const currentRoom = rooms.find((room:any, index: number) => index === currentStep - 1);
  if (!currentRoom) {
    return <p>No room found for this step.</p>; 
  }
  const renderRoomInfo = (type: string, count: number) => {
    return Array.from({ length: count }, (_, index) => (
      <AdulteInformation
        key={`${type}-${index}`}
        titel={type}
        index={index + 1}
      />
    ));
  };

  return (
    <div className="h-[90vh] overflow-y-auto ">
      <h3>Room Reservation Information</h3>
      {renderRoomInfo('Adult', currentRoom.adults)}
      {renderRoomInfo('Child', currentRoom.children)}
      {renderRoomInfo('Infant', currentRoom.infants)}
    </div>
  );
}
