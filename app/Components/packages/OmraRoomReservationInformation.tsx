"use client";
import PassengerInformation from "./PassengerInformation";
import { useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RootState } from "@/lib/store/store";

export default function OmraRoomReservationInformation() {
  const rooms = useSelector(
    (state: RootState) => state.omreaReservationInfos.rooms
  );
  const currentRoom = rooms[0]; // Since we're handling one room at a time

  if (!currentRoom) {
    return <p>No room found.</p>;
  }

  const renderPassengers = (
    type: "adults" | "children" | "children_without_bed" | "infants"
  ) => {
    const passengers = currentRoom.passengers[type];
    if (!passengers) return null;

    return passengers.map((_, index) => (
      <PassengerInformation
        key={`${type}-${index}`}
        title={type}
        index={index}
        roomIndex={0}
      />
    ));
  };

  return (
    <div className="w-full flex justify-center">
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
    </div>
  );
}
