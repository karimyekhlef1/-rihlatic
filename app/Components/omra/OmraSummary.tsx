"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { User, Mail, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Passenger {
  email?: string;
  phone?: string;
  first_name: string;
  last_name: string;
  sex: string;
  birth_date?: string;
  birthdate?: string;
  birthday?: string;
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

// Utility function to safely parse and format dates
const formatDate = (passenger: Passenger) => {
  const dateString = passenger.birth_date || passenger.birthdate || passenger.birthday;
  
  if (!dateString) {
    return "N/A";
  }
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return format(date, "dd MMM yyyy");
  } catch (error) {
    return "Invalid Date";
  }
};

const PassengerInfo = ({ passenger }: { passenger: Passenger }) => {
  const getSexStyle = (sex: string) => {
    return sex.toLowerCase() === "female" 
      ? "bg-pink-100 text-pink-800"
      : "bg-blue-100 text-blue-800";
  };

  return (
    <div className="space-y-3 p-4 bg-white rounded-lg">
      <div className="flex items-center space-x-2">
        <User className="h-4 w-4 text-gray-500" />
        <span className="font-medium">
          {passenger.first_name} {passenger.last_name}
        </span>
        <span className={`text-xs px-2 py-1 rounded-full ${getSexStyle(passenger.sex)}`}>
          {passenger.sex}
        </span>
      </div>

      {passenger.email && (
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Mail className="h-4 w-4" />
          <span>{passenger.email}</span>
        </div>
      )}

      {passenger.phone && (
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Phone className="h-4 w-4" />
          <span>{passenger.phone}</span>
        </div>
      )}

      <div className="text-sm text-gray-600">
        <Label>Birth Date:</Label> {formatDate(passenger)}
      </div>
    </div>
  );
};

const PassengerGroup = ({ 
  passengers, 
  type 
}: { 
  passengers: Passenger[], 
  type: string 
}) => (
  <div className="space-y-4">
    {passengers.map((passenger, idx) => (
      <div key={idx}>
        <Label className="text-sm text-gray-500 mb-2">{type} {idx + 1}</Label>
        <PassengerInfo passenger={passenger} />
        {idx < passengers.length - 1 && (
          <div className="flex justify-center my-4">
            <Separator className="w-2/3" />
          </div>
        )}
      </div>
    ))}
  </div>
);

const RoomSummary = ({ room, index }: { room: Room; index: number }) => (
  <Card className="mb-6 shadow-sm">
    <CardHeader>
      <CardTitle className="text-lg font-medium">Room {index + 1}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <PassengerGroup passengers={room.passengers.adults} type="Adult" />
      {room.passengers.children && room.passengers.children.length > 0 && (
        <PassengerGroup passengers={room.passengers.children} type="Child" />
      )}
      {room.passengers.infants && room.passengers.infants.length > 0 && (
        <PassengerGroup passengers={room.passengers.infants} type="Infant" />
      )}
    </CardContent>
  </Card>
);

export default function OmraSummary({ rooms }: { rooms: Room[] }) {
  return (
    <div className="w-full max-w-4xl mx-auto py-4">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Booking Summary
      </h2>
      <ScrollArea className="h-[400px]">
        {rooms.map((room, index) => (
          <RoomSummary key={index} room={room} index={index} />
        ))}
      </ScrollArea>
    </div>
  );
}
