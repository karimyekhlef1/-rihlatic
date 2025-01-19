"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { format } from "date-fns";
import { storePackageReservation } from "@/lib/store/api/packages/packagesSlice";
import { AppDispatch } from "@/lib/store/store";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import PassengerCard from "./PassengerCard";
interface Passenger {
  email?: string;
  phone?: string;
  first_name: string;
  last_name: string;
  sex: string;
  passport_nbr: string;
  passport_expire_at: string;
  birth_date: string;
}

interface Passengers {
  adults: Passenger[];
  children?: Passenger[];
  infants?: Passenger[];
}

interface Room {
  room_id: number;
  passengers: Passengers;
}



const RoomCard = ({ room, index }: { room: Room; index: number }) => (
  <div className="mb-6">
    <CardHeader className="pb-3">
      <CardTitle className="text-2xl text-[#ff8000]">Room {index + 1}</CardTitle>
    </CardHeader>
    <CardContent>
      {room.passengers.adults && room.passengers.adults.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-4 text-[#ff8000] uppercase tracking-wide">
            Adults
          </h3>
          {room.passengers.adults.map((passenger, idx) => (
            <PassengerCard key={`adult-${idx}`} passenger={passenger} />
          ))}
        </div>
      )}

      {room.passengers.children && room.passengers.children.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-4 text-[#ff8000] uppercase tracking-wide">
            Children
          </h3>
          {room.passengers.children.map((passenger, idx) => (
            <PassengerCard key={`child-${idx}`} passenger={passenger} />
          ))}
        </div>
      )}

      {room.passengers.infants && room.passengers.infants.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-4 text-[#ff8000] uppercase tracking-wide">
            Infants
          </h3>
          {room.passengers.infants.map((passenger, idx) => (
            <PassengerCard key={`infant-${idx}`} passenger={passenger} />
          ))}
        </div>
      )}
    </CardContent>
  </div>
);

const cleanEmptyPassengerArrays = (data: Room[]): { rooms: Room[] } => {
  return {
    rooms: data.map((room) => {
      const cleanedPassengers: Passengers = Object.fromEntries(
        Object.entries(room.passengers).filter(([_, value]) => value.length > 0)
      ) as Passengers;

      return {
        room_id: room.room_id,
        passengers: cleanedPassengers,
      };
    }),
  };
};

export default function FinishBooking() {
  const RoomsData = useSelector((state: any) => state.paymentPackage.RoomsData);
  const departure = useSelector((state: any) => state.paymentPackage.departure);
  const [filtredRoomData, setFiltredRoomData] = useState<{ rooms: Room[] }>({ rooms: [] });
  useEffect(() => {
    const filteredRooms = cleanEmptyPassengerArrays(RoomsData);
    setFiltredRoomData(filteredRooms);
  }, [RoomsData, departure]);

  return (
    <div className="w-full mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Booking Summary</h2>
        <div className="pr-4">
          {filtredRoomData.rooms.map((room: Room, index: number) => (
            <RoomCard key={`room-${index}`} room={room} index={index} />
          ))}
        </div>
    
    </div>
  );
}
