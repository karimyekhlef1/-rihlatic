"use client";
import PassengerInformation from "./PassengerInformation";
import { useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RootState } from "@/lib/store/store";
import { toast } from "sonner";

export default function OmraRoomReservationInformation() {
  const { rooms, status } = useSelector(
    (state: RootState) => state.omreaReservationInfos
  );
  const currentStep = useSelector(
    (state: RootState) => state.paymentOmra.currentStep
  );

  // Calculate current room index and verification step
  const isVerificationStep = currentStep > rooms.length;
  const currentRoomIndex = isVerificationStep ? rooms.length - 1 : currentStep - 1;
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

  const handleVerifyAndComplete = () => {
    if (status === "idle") {
      // Log all rooms data
      console.log("All Rooms Data:", {
        rooms: rooms.map(room => ({
          room_id: room.room_id,
          type: room.type,
          reservation_type: room.reservation_type,
          passengers: {
            adults: room.passengers.adults,
            children: room.passengers.children,
            children_without_bed: room.passengers.children_without_bed,
            infants: room.passengers.infants
          }
        }))
      });
      
      toast.success("Booking completed successfully!");
      // Here you would typically make an API call to save the data
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6">
      <div className="text-2xl font-semibold text-gray-800">
        {isVerificationStep ? (
          "Verify Your Information"
        ) : (
          `Room ${currentRoomIndex + 1} (${currentRoom.type})`
        )}
      </div>
      
      <div className="w-1/2">
        <Tabs defaultValue="adults">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="adults">Adults</TabsTrigger>
            <TabsTrigger value="children">Children</TabsTrigger>
            <TabsTrigger value="children_without_bed">Without Bed</TabsTrigger>
            <TabsTrigger value="infants">Infants</TabsTrigger>
          </TabsList>
          <TabsContent value="adults">
            {renderPassengers("adults")}
          </TabsContent>
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
