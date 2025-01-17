"use client";

import PassengerInformation from "./PassengerInformation";
import { useSelector, useDispatch } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RootState } from "@/lib/store/store";
import { toast } from "sonner";
import {
  storeOmraReservation,
  getOmraDetails,
} from "@/lib/store/api/omras/omrasSlice";
import { AppDispatch } from "@/lib/store/store";
import { Passenger } from "@/lib/store/custom/commonSlices/omraReservationSlice";

// Helper function to transform passenger data to match API expectations
const transformPassengerData = (passenger: any) => {
  if (!passenger) return passenger;
  
  return {
    ...passenger,
    birth_date: passenger.birthday,
  };
};

export default function OmraRoomReservationInformation() {
  const { rooms, status, omra_departure_id } = useSelector(
    (state: RootState) => state.omreaReservationInfos
  );
  const currentStep = useSelector(
    (state: RootState) => state.paymentOmra.currentStep
  );

  const dispatch = useDispatch<AppDispatch>();

  // Calculate current room index and verification step
  const isVerificationStep = currentStep > rooms.length;
  const currentRoomIndex = isVerificationStep
    ? rooms.length - 1
    : currentStep - 1;
  const currentRoom = rooms[currentRoomIndex];

  if (!currentRoom) {
    return <p className="text-center text-gray-500 mt-4">No room found.</p>;
  }

  const renderPassengers = (
    type: "adults" | "children" | "children_without_bed" | "infants"
  ) => {
    const passengers = currentRoom.passengers[type];
    if (!passengers?.length) return null;

    return passengers.map((passenger, index) => (
      <PassengerInformation
        key={`${type}-${index}`}
        title={type}
        index={index}
        roomIndex={currentRoomIndex}
        readOnly={isVerificationStep}
        passengerData={passenger}
      />
    ));
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <ScrollArea className="h-[400px] px-4 rounded-lg">
        <div className="space-y-6">
          {renderPassengers("adults")}
          {renderPassengers("children")}
          {renderPassengers("children_without_bed")}
          {renderPassengers("infants")}
        </div>
      </ScrollArea>
    </div>
  );
}

// Helper function to validate reservation data
const validateReservationData = (rooms: any[], omra_departure_id: string) => {
  if (!omra_departure_id) {
    throw new Error("No departure ID selected");
  }

  for (const room of rooms) {
    if (!room.room_id || !room.type || !room.reservation_type) {
      throw new Error("Missing required room information");
    }

    if (!room.passengers.adults?.length) {
      throw new Error("Each room must have at least one adult passenger");
    }

    const allPassengers = [
      ...room.passengers.adults,
      ...(room.passengers.children || []),
      ...(room.passengers.children_without_bed || []),
      ...(room.passengers.infants || []),
    ];

    for (const passenger of allPassengers) {
      if (!passenger.first_name || !passenger.last_name) {
        throw new Error("All passengers must have first and last names");
      }
      if (!passenger.passport_nbr || !passenger.passport_expire_at) {
        throw new Error(
          "All passengers must have valid passport information"
        );
      }
      const passengerWithBirthday = passenger as { birthday?: string };
      if (!passengerWithBirthday.birthday) {
        throw new Error("All passengers must have a birth date");
      }
    }
  }
};

// Export the handleSubmit function to be used by ChangeOmraPaymentSteps
export const handleOmraSubmit = async (
  dispatch: AppDispatch,
  rooms: any[],
  omra_departure_id: string,
  status: string
) => {
  try {
    validateReservationData(rooms, omra_departure_id);

    const transformedRooms = rooms.map((room: any) => ({
      ...room,
      passengers: {
        adults: room.passengers.adults?.map(transformPassengerData),
        children: room.passengers.children?.map(transformPassengerData),
        children_without_bed: room.passengers.children_without_bed?.map(transformPassengerData),
        infants: room.passengers.infants?.map(transformPassengerData),
      },
    }));

    await dispatch(
      storeOmraReservation({
        omra_departure_id,
        rooms: transformedRooms,
      })
    ).unwrap();

    await dispatch(getOmraDetails(omra_departure_id)).unwrap();
    toast.success("Reservation saved successfully!");
    return true;
  } catch (error: any) {
    toast.error(error.message || "Failed to save reservation");
    return false;
  }
};
