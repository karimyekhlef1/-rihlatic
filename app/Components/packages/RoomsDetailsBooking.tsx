import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import DropDownBookingComponent from "./dropDownBooking";
import { FiMinus, FiPlus } from "react-icons/fi";
import NumberOfPeople from "./numberOfPeople";
import { MdPerson } from "react-icons/md";

type RoomOption = {
  id: number;
  type: string;
  name: string;
  description: string;
  capacity_adult: number;
  capacity_child: number;
  capacity_bebe: number;
};

type RoomState = {
  roomType: RoomOption | null;
  adults: number;
  children: number;
  infants: number;
};

const RoomsDetailsBooking: React.FC = () => {
  const [createdRooms, setCreatedRooms] = useState<RoomState[]>([]);

  // Predefined room types
  const roomsType: RoomOption[] = [
    {
      id: 1,
      type: "Single",
      name: "Single",
      description: "Single avec bébé de 0 à 2 ans",
      capacity_adult: 1,
      capacity_child: 0,
      capacity_bebe: 1,
    },
    {
      id: 2,
      type: "Double",
      name: "Double + 2CHD (Enfants sans lits)",
      description: "Double avec enfants sans lits.",
      capacity_adult: 2,
      capacity_child: 2,
      capacity_bebe: 1,
    },
    {
      id: 3,
      type: "Twin",
      name: "Twin",
      description: "Twin avec un bébé de 0 à 2 ans.",
      capacity_adult: 2,
      capacity_child: 0,
      capacity_bebe: 1,
    },
  ];

  // Dropdown options
  const roomNames = roomsType.map(({ name, id }) => ({ label: name, id }));

  // Handlers
  const handleAddRoom = () => {
    setCreatedRooms([
      ...createdRooms,
      {
        roomType: null,
        adults: 1,
        children: 0,
        infants: 0,
      },
    ]);
  };

  const handleRoomTypeChange = (index: number, selectedRoom: RoomOption) => {
    const updatedRooms = [...createdRooms];
    updatedRooms[index].roomType = selectedRoom;
    
    // Reset guest counts to match room type constraints
    if (selectedRoom.id === 2) {
      updatedRooms[index].adults = 2;
      updatedRooms[index].children = 0;
      updatedRooms[index].infants = 0;
    }
    
    setCreatedRooms(updatedRooms);
  };

  const handleGuestChange = (
    index: number,
    guestType: "adults" | "children" | "infants",
    increment: boolean
  ) => {
    const updatedRooms = [...createdRooms];
    const room = updatedRooms[index];
    const roomType = room.roomType;

    // Special handling for room type 2 (Double)
    if (roomType && roomType.id === 2) {
      switch (guestType) {
        case "adults":
          // For room type 2, adults are fixed at 2
          return;
        case "children":
          // For room type 2, children max is 2
          if (increment && room.children >= 2) return;
          if (!increment && room.children <= 0) return;
          break;
        case "infants":
          // For room type 2, infants max is 1
          if (increment && room.infants >= 1) return;
          if (!increment && room.infants <= 0) return;
          break;
      }
    }

    // General guest change logic
    updatedRooms[index][guestType] += increment ? 1 : -1;
    if (updatedRooms[index][guestType] < 0) updatedRooms[index][guestType] = 0;
    
    setCreatedRooms(updatedRooms);
  };

  const handleRemoveRoom = (index: number) => {
    const updatedRooms = [...createdRooms];
    updatedRooms.splice(index, 1);
    setCreatedRooms(updatedRooms);
  };

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px] md:max-w-2xl bg-gray-100">
        <DialogTitle className="text-xl font-semibold">Chambres</DialogTitle>
        <div className='overflow-y-auto'>
          {createdRooms.map((room, index) => (
            <Card key={index} className="w-full bg-white mb-4 shadow-sm p-4">
              <CardTitle className="text-lg text-gray-800">Chambre: {index + 1}</CardTitle>
              <DropDownBookingComponent
                data={roomNames}
                title="Type de chambre"
                onSelect={(selectedRoom) => handleRoomTypeChange(index, selectedRoom)}
              />
              <CardContent className="mt-4 space-y-4">
                { room.roomType ?
                <>
                <NumberOfPeople
                    icon={ <MdPerson/>}
                      label="Adulte"
                      value={room.adults}
                    //   onIncrement={() =>
                    //     handleGuestChange(index, "adults", true)
                    //   }
                    //   onDecrement={() =>
                    //     handleGuestChange(index, "adults", false)
                    //   }
                      max={room.roomType.capacity_adult}
                    />
               
                
           
                </>:null}
              </CardContent>
              <div className="text-right mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveRoom(index)}
                  className="text-red-500"
                >
                  Supprimer
                </Button>
              </div>
            </Card>
          ))}
          <div className="mt-6">
            <Button onClick={handleAddRoom} className="w-full bg-[#ff8000]">
              Ajouter une chambre
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoomsDetailsBooking;