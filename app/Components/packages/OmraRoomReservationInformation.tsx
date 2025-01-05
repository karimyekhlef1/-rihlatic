"use client";

import PassengerInformation from "./PassengerInformation";
import { useSelector, useDispatch } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    birth_date: passenger.birthday, // Transform birthday to birth_date
    // Add any other field transformations here if needed
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

  const validateReservationData = () => {
    // Basic validation to ensure all required data is present
    if (!omra_departure_id) {
      throw new Error("No departure ID selected");
    }

    for (const room of rooms) {
      // Validate required room fields
      if (!room.room_id || !room.type || !room.reservation_type) {
        throw new Error("Missing required room information");
      }

      // Validate passengers
      if (!room.passengers.adults?.length) {
        throw new Error("Each room must have at least one adult passenger");
      }

      // Validate passenger information
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
        // Use type assertion since we know the field exists in our form
        const passengerWithBirthday = passenger as { birthday?: string };
        if (!passengerWithBirthday.birthday) {
          throw new Error("Birth date is required for all passengers");
        }
      }
    }

    // Transform the booking data
    const transformedData = {
      omra_departure_id,
      rooms: rooms.map((room) => ({
        room_id: room.room_id,
        type: room.type,
        reservation_type: room.reservation_type,
        passengers: {
          adults: room.passengers.adults.map(transformPassengerData),
          ...(room.passengers.children?.length && {
            children: room.passengers.children.map(transformPassengerData),
          }),
          ...(room.passengers.children_without_bed?.length && {
            children_without_bed: room.passengers.children_without_bed.map(
              transformPassengerData
            ),
          }),
          ...(room.passengers.infants?.length && {
            infants: room.passengers.infants.map(transformPassengerData),
          }),
        },
      })),
    };

    return transformedData;
  };

  const handleVerifyAndComplete = async () => {
    if (status === "idle") {
      try {
        // Validate and transform the data
        const bookingData = validateReservationData();

        // Log the transformed data for debugging
        console.log(
          "Transformed booking data:",
          JSON.stringify(bookingData, null, 2)
        );

        // Store the reservation
        const response = await dispatch(
          storeOmraReservation(bookingData)
        ).unwrap();

        if (response.success) {
          // Fetch updated Omra details
          await dispatch(getOmraDetails(omra_departure_id));
          toast.success("Booking completed successfully!");
        } else {
          toast.error(response.message || "Failed to complete booking");
        }
      } catch (error: any) {
        console.error("Booking error:", error);
        toast.error(error.message || "Failed to complete booking");
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6">
      <div className="text-2xl font-semibold text-gray-800">
        {isVerificationStep
          ? "Verify Your Information"
          : `Room ${currentRoomIndex + 1} (${currentRoom.type})`}
      </div>

      <div className="w-1/2">
        <Tabs defaultValue="adults">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="adults">Adults</TabsTrigger>
            <TabsTrigger value="children">Children</TabsTrigger>
            <TabsTrigger value="children_without_bed">Without Bed</TabsTrigger>
            <TabsTrigger value="infants">Infants</TabsTrigger>
          </TabsList>
          <TabsContent value="adults">{renderPassengers("adults")}</TabsContent>
          <TabsContent value="children">
            {renderPassengers("children")}
          </TabsContent>
          <TabsContent value="children_without_bed">
            {renderPassengers("children_without_bed")}
          </TabsContent>
          <TabsContent value="infants">
            {renderPassengers("infants")}
          </TabsContent>
        </Tabs>
      </div>

      {isVerificationStep && (
        <button
          onClick={handleVerifyAndComplete}
          className="px-6 py-3 bg-[#ff8000] text-white rounded-lg hover:bg-[#ff9933] transition-colors"
        >
          Complete Booking
        </button>
      )}
    </div>
  );
}
