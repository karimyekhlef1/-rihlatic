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
import { Passenger, cleanRoomData, Room, Passengers } from "@/lib/store/custom/commonSlices/omraReservationSlice";

// Helper function to transform passenger data to match API expectations
const transformPassengerData = (passenger: any) => {
  if (!passenger) return null;
  
  const {
    passport_scan,  // Extract passport_scan to handle separately
    ...passengerData
  } = passenger;

  return {
    ...passengerData,
    // Include passport_scan URL if available
    passport_scan: typeof passport_scan === 'string' ? passport_scan : null
  };
};

// Helper function to create FormData with files
const createFormDataWithFiles = (rooms: Room[], omra_departure_id: string) => {
  console.log("[Form Data] Starting to create form data");
  console.log("[Form Data] Input rooms:", rooms);
  console.log("[Form Data] Omra departure ID:", omra_departure_id);

  const formData = new FormData();
  
  // Add omra_departure_id directly
  formData.append('omra_departure_id', omra_departure_id);

  // Process each room
  rooms.forEach((room, roomIndex) => {
    // Add room base data
    formData.append(`rooms[${roomIndex}][room_id]`, room.room_id.toString());
    formData.append(`rooms[${roomIndex}][type]`, room.type);
    formData.append(`rooms[${roomIndex}][reservation_type]`, room.reservation_type);

    // Process adults
    if (room.passengers.adults?.length) {
      room.passengers.adults.forEach((passenger, passengerIndex) => {
        const prefix = `rooms[${roomIndex}][passengers][adults][${passengerIndex}]`;
        Object.entries(passenger).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            if (key === 'passport_scan' && value instanceof File) {
              console.log(`[Form Data] Adding passport scan for room ${roomIndex}, adults passenger ${passengerIndex}:`, value.name);
              formData.append(`${prefix}[passport_scan]`, value);
            } else {
              formData.append(`${prefix}[${key}]`, value.toString());
            }
          }
        });
      });
    }

    // Process children
    if (room.passengers.children?.length) {
      room.passengers.children.forEach((passenger, passengerIndex) => {
        const prefix = `rooms[${roomIndex}][passengers][children][${passengerIndex}]`;
        Object.entries(passenger).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            if (key === 'passport_scan' && value instanceof File) {
              console.log(`[Form Data] Adding passport scan for room ${roomIndex}, children passenger ${passengerIndex}:`, value.name);
              formData.append(`${prefix}[passport_scan]`, value);
            } else {
              formData.append(`${prefix}[${key}]`, value.toString());
            }
          }
        });
      });
    }

    // Process children_without_bed
    if (room.passengers.children_without_bed?.length) {
      room.passengers.children_without_bed.forEach((passenger, passengerIndex) => {
        const prefix = `rooms[${roomIndex}][passengers][children_without_bed][${passengerIndex}]`;
        Object.entries(passenger).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            if (key === 'passport_scan' && value instanceof File) {
              console.log(`[Form Data] Adding passport scan for room ${roomIndex}, children_without_bed passenger ${passengerIndex}:`, value.name);
              formData.append(`${prefix}[passport_scan]`, value);
            } else {
              formData.append(`${prefix}[${key}]`, value.toString());
            }
          }
        });
      });
    }

    // Process infants
    if (room.passengers.infants?.length) {
      room.passengers.infants.forEach((passenger, passengerIndex) => {
        const prefix = `rooms[${roomIndex}][passengers][infants][${passengerIndex}]`;
        Object.entries(passenger).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            if (key === 'passport_scan' && value instanceof File) {
              console.log(`[Form Data] Adding passport scan for room ${roomIndex}, infants passenger ${passengerIndex}:`, value.name);
              formData.append(`${prefix}[passport_scan]`, value);
            } else {
              formData.append(`${prefix}[${key}]`, value.toString());
            }
          }
        });
      });
    }
  });

  console.log("[Form Data] Finished creating FormData");
  
  // Log all form data entries for debugging
  console.log("[Form Data] Final FormData entries:");
  const entries = Array.from(formData.entries());
  entries.forEach(([key, value]) => {
    console.log(`${key}:`, value instanceof File ? `File: ${value.name}` : value);
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
        throw new Error("All passengers must have valid passport information");
      }
      if (!passenger.birth_date) {
        throw new Error("All passengers must have a birth date");
      }
      if (!passenger.sex || !['male', 'female'].includes(passenger.sex)) {
        throw new Error("All passengers must specify their sex (male/female)");
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
    console.log("[Submit] Starting Omra submission:", {
      roomCount: rooms.length,
      omra_departure_id,
      status
    });

    validateReservationData(rooms, omra_departure_id);
    console.log("[Submit] Validation passed");

    const formData = createFormDataWithFiles(rooms, omra_departure_id);
    console.log("[Submit] FormData created successfully");

    const response = await dispatch(storeOmraReservation(formData)).unwrap();
    console.log("[Submit] API Response received:", response);

    if (response.success) {
      console.log("[Submit] Reservation successful");
      toast.success(response.message);
      return response;
    } else {
      console.error("[Submit] Reservation failed:", response.message);
      toast.error(response.message || "Failed to store reservation");
      return null;
    }
  } catch (error: any) {
    console.error("[Submit] Error in handleOmraSubmit:", error);
    toast.error(error.message || "An error occurred while processing your reservation");
    return null;
  }
};
