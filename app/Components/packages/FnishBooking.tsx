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

const PassengerField = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <Label className="text-gray-600 text-xs uppercase tracking-wide">{label}</Label>
    <p className="font-medium text-sm">{value}</p>
  </div>
);

const PassengerCard = ({ passenger }: { passenger: Passenger }) => (
  <div className="mb-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
    <div className="flex justify-between items-center mb-4">
      <h4 className="text-lg font-semibold text-gray-900">
        {passenger.first_name} {passenger.last_name}
      </h4>
      <span className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
        {passenger.sex}
      </span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {passenger.email && (
        <PassengerField label="Email" value={passenger.email} />
      )}
      {passenger.phone && (
        <PassengerField label="Phone" value={passenger.phone} />
      )}
      <PassengerField label="Passport Number" value={passenger.passport_nbr} />
      <PassengerField 
        label="Passport Expiry" 
        value={format(new Date(passenger.passport_expire_at), "dd MMM yyyy")} 
      />
      <PassengerField 
        label="Birth Date" 
        value={format(new Date(passenger.birth_date), "dd MMM yyyy")} 
      />
    </div>
  </div>
);

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
  const dispatch = useDispatch<AppDispatch>();
  const RoomsData = useSelector((state: any) => state.paymentPackage.RoomsData);
  const departure = useSelector((state: any) => state.paymentPackage.departure);
  const [filtredRoomData, setFiltredRoomData] = useState<{ rooms: Room[] }>({ rooms: [] });
  const cardToken = useSelector((state: any) => state.paymentPackage.cardToken);


  useEffect(() => {
    const filteredRooms = cleanEmptyPassengerArrays(RoomsData);
    setFiltredRoomData(filteredRooms);
  }, [RoomsData, departure]);

  const handleComplete = async () => {
    try {
      const bodyData = {
        departure_id: departure.id,
        rooms: filtredRoomData.rooms,
        token:cardToken
      };
      const response = await dispatch(storePackageReservation(bodyData)).unwrap();
      if (response.success) {
        toast.success("Booking completed successfully!");
      } else {
        toast.error(
          response.message || "Failed to complete booking. Please try again."
        );
      }
    } catch (error: any) {
      console.error("Booking error details:", error);
      toast.error("An error occurred while processing your booking");
    }
  };

  console.log("  RoomsData",  RoomsData)

  console.log("filtredRoomData",filtredRoomData)

  return (
    <div className="w-full mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Booking Summary</h2>
      {/* <ScrollArea className="h-[calc(100vh-250px)] px-1"> */}
        <div className="pr-4">
          {filtredRoomData.rooms.map((room: Room, index: number) => (
            <RoomCard key={`room-${index}`} room={room} index={index} />
          ))}
        </div>
        {/* <ScrollBar /> */}
      {/* </ScrollArea> */}
      {/* <div className="mt-8 flex justify-center">
        <Button onClick={handleComplete} className="px-16">
          Complete Booking
        </Button>
      </div> */}
    </div>
  );
}
