'use client';
import React, { useEffect,useState } from 'react';
import AdulteInformation from './AdulteInformation';
import { useSelector } from 'react-redux';
import { ScrollArea } from "@/components/ui/scroll-area";
import FnishBooking from './FnishBooking';
export default function RoomReservationInformation() {
  const rooms = useSelector((state: any) => state.paymentPackage.rooms);
  const currentStep = useSelector((state: any) => state.paymentPackage.currentStep);
  const [currentRoom, setCurrentRoom] = useState<any>(null);
  const RoomsData = useSelector((state: any) => state.paymentPackage.RoomsData);
  

  // const currentRoom = rooms.find((room:any, index: number) => index === currentStep - 1);
  useEffect(() => {
    if (rooms && rooms.length > 0 && currentStep) {
      const roomIndex = currentStep - 1;
      console.log("roomIndex",roomIndex)
      const room = rooms.find((_:any, index:number) => index === roomIndex);
      setCurrentRoom(room);
    }
  }, [rooms, currentStep]);


  // console.log("currentStep/////////",currentStep)
  // console.log("currentRoom/////////",currentRoom)
  console.log("rooms////////",rooms)
  console.log("roomsRoomsData=========>",RoomsData)


  if (!currentRoom) {
    return <FnishBooking />
  }
  
  const renderRoomInfo = (type: 'adults' | 'children' | 'infants', count: number) => {
    return Array.from({ length: count }, (_, index) => (
      <AdulteInformation
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
