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
import { Passenger, cleanRoomData } from "@/lib/store/custom/commonSlices/omraReservationSlice";

// Helper function to transform passenger data to match API expectations
const transformPassengerData = (passenger: any) => {
  if (!passenger) return null;
  
  // Create a new object without birthday field
  const {
    birthday,  // Extract and remove birthday field
    passport_scan, // Extract passport_scan to handle separately
    ...passengerData
  } = passenger;

  return {
    ...passengerData,
    birth_date: passenger.birth_date || birthday,
    // Set passport_scan to null in JSON data
    passport_scan: null
  };
};

// Helper function to create FormData with files
const createFormDataWithFiles = (rooms: any[], omra_departure_id: string) => {
  const formData = new FormData();

  // Add the basic reservation data
  console.log("Adding omra_departure_id to FormData:", omra_departure_id);
  formData.append('omra_departure_id', omra_departure_id);
  
  // Process each room
  rooms.forEach((room, roomIndex) => {
    // Add room data
    formData.append(`rooms[${roomIndex}][room_id]`, room.room_id.toString());
    formData.append(`rooms[${roomIndex}][type]`, room.type);
    formData.append(`rooms[${roomIndex}][reservation_type]`, room.reservation_type);

    // Process passengers with type safety
    if (room.passengers) {
      Object.entries(room.passengers).forEach(([type, value]) => {
        const passengers = Array.isArray(value) ? value : [];
        if (!passengers.length) return;

        passengers.forEach((passenger, passengerIndex) => {
          const prefix = `rooms[${roomIndex}][passengers][${type}][${passengerIndex}]`;
          
          // Add passenger data
          const transformedData = transformPassengerData(passenger);
          if (transformedData) {
            Object.entries(transformedData).forEach(([key, value]) => {
              if (value !== null && value !== undefined) {
                formData.append(`${prefix}[${key}]`, value.toString());
              }
            });
          }

          // Add passport scan file if exists
          if (passenger.passport_scan instanceof File) {
            formData.append(`${prefix}[passport_scan]`, passenger.passport_scan);
          }
        });
      });
    }
  });

  return formData;
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
  console.log("Validating reservation data:", { rooms, omra_departure_id });

  if (!omra_departure_id) {
    throw new Error("No departure ID selected");
  }

  for (const room of rooms) {
    console.log("Validating room:", room);

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

    console.log("All passengers in room:", allPassengers);

    for (const passenger of allPassengers) {
      if (!passenger.first_name || !passenger.last_name) {
        throw new Error("All passengers must have first and last names");
      }
      if (!passenger.passport_nbr || !passenger.passport_expire_at) {
        throw new Error(
          "All passengers must have valid passport information"
        );
      }
      if (!passenger.birth_date) {
        throw new Error("All passengers must have a birth date");
      }
    }
  }
};

export const handleOmraSubmit = async (
  dispatch: AppDispatch,
  rooms: any[],
  omra_departure_id: string,
  status: string
) => {
  try {
    console.log("Starting Omra submission with:", {
      rooms,
      omra_departure_id,
      status
    });

    validateReservationData(rooms, omra_departure_id);

    // Create FormData with files - pass omra_departure_id directly
    const formData = createFormDataWithFiles(rooms, omra_departure_id);
    console.log("Prepared FormData for API submission");

    const response = await dispatch(
      storeOmraReservation(formData)
    ).unwrap();

    console.log("API Response:", response);

    if (response.success) {
      toast.success(response.message);
      return response;
    } else {
      toast.error(response.message || "Failed to store reservation");
      return null;
    }
  } catch (error: any) {
    console.error("Error in handleOmraSubmit:", error);
    toast.error(error.message || "An error occurred while processing your reservation");
    return null;
  }
};
