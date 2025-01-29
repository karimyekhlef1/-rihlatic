'use client';
import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { ScrollArea } from "@/components/ui/scroll-area";
import FnishBookingHotel from './FnishBookingHotel';
import AdulteInformationHotel from './AdulteInformationHotel';
import { setValidationStep } from '@/lib/store/custom/packagesSlices/paymentPachageSlices';
import { useDispatch } from 'react-redux'; 

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {  roomReservationSchema } from '@/lib/schemas/packageSchema';
import { z } from 'zod';

export default function RoomReservationInformation() {
  const rooms = useSelector((state: any) => state.paymentPackage.rooms);
  const currentStep = useSelector((state: any) => state.paymentPackage.currentStep);
  const [currentRoom, setCurrentRoom] = useState<any>(null);
  const RoomsData = useSelector((state: any) => state.paymentPackage.RoomsData);
  useEffect(() => {
    if (rooms && rooms.length > 0 && currentStep) {
      const roomIndex = currentStep - 1;
      console.log("roomIndex",roomIndex)
      const room = rooms.find((_:any, index:number) => index === roomIndex);
      setCurrentRoom(room);
    }
  }, [rooms, currentStep]);
  if (!currentRoom) {
    return <FnishBookingHotel />
  }
  
  const renderRoomInfo = (type: 'adults' | 'children' | 'infants', count: number) => {
    return Array.from({ length: count }, (_, index) => (
      <AdulteInformationHotel
        roomId = {currentRoom.roomType.id}
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
        {renderRoomInfo('adults', currentRoom.adults)}
        {renderRoomInfo('children', currentRoom.children)}
        {renderRoomInfo('infants', currentRoom.infants)}
      </ScrollArea>
    </div>
  );
}
