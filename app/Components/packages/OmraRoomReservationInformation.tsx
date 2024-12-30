"use client";
import PassengerInformation from "./PassengerInformation";
import { useSelector, useDispatch } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RootState } from "@/lib/store/store";
import { toast } from "sonner";
import { storeOmraReservation, getOmraDetails } from "@/lib/store/api/omras/omrasSlice";
import { AppDispatch } from "@/lib/store/store";
import { Passenger } from "@/lib/store/custom/commonSlices/omraReservationSlice";

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

  const handleVerifyAndComplete = async () => {
    if (status === "idle") {
      try {
        if (!omra_departure_id) {
          toast.error(
            "No departure ID selected. Please select a departure first."
          );
          return;
        }

        // Log detailed room information for debugging
        console.log(
          "Room details before transform:",
          rooms.map((room) => ({
            type: room.type,
            reservation_type: room.reservation_type,
            occupancy: {
              adults: room.passengers.adults.length,
              children: room.passengers.children.length,
              children_without_bed: room.passengers.children_without_bed.length,
              infants: room.passengers.infants.length,
            },
          }))
        );

        // Transform the booking data based on room type
        const transformedRooms = rooms.map((room) => {
          const basePassengers: {
            adults: Passenger[];
            children?: Passenger[];
            children_without_bed?: Passenger[];
            infants?: Passenger[];
          } = {
            adults: room.passengers.adults,
          };

          // For non-single rooms, include child-related arrays only if they have items
          if (room.type !== "single") {
            if (room.passengers.children?.length > 0) {
              basePassengers.children = room.passengers.children;
            }
            if (room.passengers.children_without_bed?.length > 0) {
              basePassengers.children_without_bed =
                room.passengers.children_without_bed;
            }
            if (room.passengers.infants?.length > 0) {
              basePassengers.infants = room.passengers.infants;
            }
          }

          return {
            room_id: room.room_id,
            type: room.type,
            reservation_type: room.reservation_type,
            passengers: basePassengers,
          };
        });

        const bookingData = {
          omra_departure_id,
          rooms: transformedRooms,
        };

        console.log("Final booking data after transform:", bookingData);

        const response = await dispatch(
          storeOmraReservation(bookingData)
        ).unwrap();

        if (response.success) {
          // After successful booking, fetch the updated omra details
          await dispatch(getOmraDetails({ id: omra_departure_id })).unwrap();
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

        // Extract and format validation errors
        const validationErrors = error?.response?.data?.errors;
        if (validationErrors) {
          const errorMessages = Object.entries(validationErrors)
            .map(([key, messages]: [string, any]) => {
              const messageList = Array.isArray(messages)
                ? messages
                : [messages];
              return `${key}: ${messageList.join(", ")}`;
            })
            .join("; ");

          toast.error(
            errorMessages || "Validation failed. Please check your input."
          );
        } else {
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            "An error occurred while saving your booking.";
          toast.error(errorMessage);
        }
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
