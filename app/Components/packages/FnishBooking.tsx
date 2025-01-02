"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { storePackageReservation } from "@/lib/store/api/packages/packagesSlice";
import { AppDispatch } from "@/lib/store/store";
import { toast } from "sonner";

interface Passenger {
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  sex: string;
  passport_nbr: string;
  passport_expire_at: string;
  passport_scan: string | null;
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

const cleanEmptyPassengerArrays = (data: Room[]): any => {
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

export default function FnishBooking() {
  const dispatch = useDispatch<AppDispatch>();

  const RoomsData = useSelector((state: any) => state.paymentPackage.RoomsData);
  const departure = useSelector((state: any) => state.paymentPackage.departure);
  const [filtredRoomData, setFiltredRoomData] = useState<any>([]);

  useEffect(() => {
    const filteredRooms = cleanEmptyPassengerArrays(RoomsData);
    setFiltredRoomData(filteredRooms);
  }, [RoomsData, departure]);

  const handleComplet = async () => {
    try {
      const bodyData = {
        departure_id: departure.id,
        rooms: filtredRoomData.rooms,
      };
      const response = await dispatch(storePackageReservation(bodyData)).unwrap();
      console.log("result", response);
      if (response.success) {
        toast.success("Booking completed successfully!");
      } else {
        toast.error(
          response.message || "Failed to complete booking. Please try again."
        );
      }
    } catch (error: any) {
      console.error("Booking error details:", {
        error: error,
        response: error?.response,
        data: error?.response?.data,
        message: error?.message,
      });
    }
  };
  return (
    <div>
      <Button variant={"active"} onClick={handleComplet} className="px-16">
        Complet
      </Button>
    </div>
  );
}
