import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import DropDownBookingComponent from "./dropDownBooking";
import { FiMinus, FiPlus } from "react-icons/fi";
import NumberOfPeople from "./numberOfPeople";
import { MdPerson } from "react-icons/md";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { CiTrash } from "react-icons/ci";
import { LuBaby } from "react-icons/lu";
import { MdChildCare } from "react-icons/md";
import { TfiUser } from "react-icons/tfi";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setDeparture ,setRooms , clearStoredState} from "@/lib/store/custom/packagesSlices/paymentPachageSlices";
import { set } from "date-fns";
import { useRouter } from "next/navigation";

interface RoomsDetailsBookingProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedDeparture: any;
  selectedRoom:any
}

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

const RoomsDetailsBooking = ({
  isOpen,
  setIsOpen,
  selectedDeparture,
  selectedRoom
}: RoomsDetailsBookingProps) => {
  const dispatch = useDispatch ()
  const router = useRouter()
  const [createdRooms, setCreatedRooms] = useState<RoomState[]>([]);
  const [roomsOptions, setRoomOptions] = useState<RoomOption[]>();

  useEffect(() => {
    if (selectedDeparture) {
      // dispatch(clearStoredState())
      dispatch(setDeparture(selectedDeparture))
      setRoomOptions(selectedDeparture.pricing.rooms);
    }
    if (selectedRoom) {
      const initialRoom: RoomState = {
        roomType: selectedRoom,
        adults: selectedRoom.capacity_adult || 1, 
        children: selectedRoom.capacity_child || 0,
        infants: selectedRoom.capacity_bebe || 0
      };
      setCreatedRooms([initialRoom]);
    }
  }, [selectedDeparture , selectedRoom]);

  const roomNames = roomsOptions?.map(({ name, id }) => ({ label: name, id }));
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
    const selectedRoomType = roomsOptions?.find((room) => room.id === selectedRoom.id) || null;
    updatedRooms[index].roomType = selectedRoomType;
    // Ensure numeric fields have default values
    updatedRooms[index].adults = selectedRoomType?.capacity_adult || 0;
    updatedRooms[index].children = selectedRoomType?.capacity_child || 0;
    updatedRooms[index].infants = selectedRoomType?.capacity_bebe || 0;

    
    

  
    setCreatedRooms(updatedRooms);

    // dispatch(setRooms(updatedRooms))

    
  };
  const handleGuestChange = (
    index: number,
    type: "adults" | "children" | "infants",
    action: "increment" | "decrement"
  ) => {
    const updatedRooms = [...createdRooms];
  
    if (updatedRooms[index]) {
      const currentCount = updatedRooms[index][type];
      const roomType = updatedRooms[index].roomType;
  
      // Determine min and max capacities
      const min = type === "adults" ? 1 : 0; // Minimum 1 adult, others can be 0
      const max =
        type === "adults"
          ? roomType?.capacity_adult || 0
          : type === "children"
          ? roomType?.capacity_child || 0
          : roomType?.capacity_bebe || 0;
  
      // Perform the increment or decrement
      if (action === "increment" && currentCount < max) {
        updatedRooms[index][type] += 1;
      } else if (action === "decrement" && currentCount > min) {
        updatedRooms[index][type] -= 1;
      }
  
      setCreatedRooms(updatedRooms);
    }
  };

  const handleRemoveRoom = (index: number) => {
    const updatedRooms = [...createdRooms];
    updatedRooms.splice(index, 1);
    setCreatedRooms(updatedRooms);
  };
const handlePayment = () =>{
  dispatch(setDeparture(selectedDeparture))
  dispatch(setRooms(createdRooms))
  router.push('/packages/payment')
  
}
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-2xl bg-gray-100">
        <DialogHeader className="text-xl font-semibold">Chambres</DialogHeader>

        <ScrollArea className="overflow-y-auto max-h-[80vh] scrollbar-hide">
          {createdRooms.map((room, index) => (
            <Card key={index} className="w-full bg-white mb-4 shadow-sm p-4">
              <CardTitle className="text-lg text-gray-800 flex justify-between mb-4">
                <div>Chambre: {index + 1}</div>

                <Button
                  variant="ghost"
                  size='icon'
                  onClick={() => handleRemoveRoom(index)}
                  className="text-red-500"
                >
                  <CiTrash />
                </Button>
              </CardTitle>
              <DropDownBookingComponent
                data={roomNames}
                title={room.roomType?.name?room.roomType?.name :"Type de chambre"}
                onSelect={(selectedRoom) =>
                  handleRoomTypeChange(index, selectedRoom)
                }
              />
              <CardContent className="mt-4 space-y-4">
                {room.roomType ? (
                  <>
                    <NumberOfPeople
                      icon={<TfiUser />}
                      label="Adulte"
                      value={room.adults}
                      onIncrement={() => handleGuestChange(index, "adults", "increment")}
                      onDecrement={() => handleGuestChange(index, "adults", "decrement")}
                      max={10}
                      min={room.roomType.capacity_adult}
                    />

                    <NumberOfPeople
                      icon={<MdChildCare />}
                      label="Enfant"
                      value={room.children}
                      onIncrement={() => handleGuestChange(index, "children", "increment")}
                      onDecrement={() => handleGuestChange(index, "children", "decrement")}
                      max={room.roomType.capacity_child}
                      min={room.roomType.capacity_child}
                    />
                              <NumberOfPeople
                      icon={<LuBaby />}
                      label="Nourrisson"
                      value={room.infants}
                      onIncrement={() => handleGuestChange(index, "infants", "increment")}
                      onDecrement={() => handleGuestChange(index, "infants", "decrement")}
                      max={room.roomType.capacity_bebe}
                      min={0}
                    />

                  </>
                ) : null}
              </CardContent>
            </Card>
          ))}
          <div className="mt-6">
            <Button
            disabled={createdRooms.length === 3}
              onClick={handleAddRoom}
              className="w-full bg-[#ff8000] bg-opacity-20 text-[#ff8000] hover:bg-[#ff8000] hover:text-white"
            >
              Ajouter une chambre
            </Button>
          </div>
        </ScrollArea>
        <DialogFooter className=" flex">
          <Button className="w-full bg-[#ff8000] hover:bg-[#ff8000] ">cancel</Button>
          <Button 
            disabled={createdRooms.length < 1 ||  ! createdRooms[0].roomType }

          onClick={handlePayment} 
          className="w-full bg-[#ff8000] hover:bg-[#ff8000]" 
           
          >
         
            Booking

          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RoomsDetailsBooking;
