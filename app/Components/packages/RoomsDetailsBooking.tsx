import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { ScrollArea } from "@/components/ui/scroll-area";
import DropDownBookingComponent from "./dropDownBooking";
import NumberOfPeople from "./numberOfPeople";
import { CiTrash } from "react-icons/ci";
import { TfiUser } from "react-icons/tfi";
import { MdChildCare } from "react-icons/md";
import { LuBaby } from "react-icons/lu";
import { useSelector } from "react-redux";
import { useBookingPackage } from "@/app/hooks/useBookingPackage";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedDeparture: any;
  selectedRoom: any;
}

const CHILD_AGE_RANGE = { min: 2, max: 12 };
const MAX_ROOMS = 3;
const MIN_ADULT = 1;

const RoomsDetailsBooking: React.FC<Props> = ({ 
  isOpen, 
  setIsOpen, 
  selectedDeparture, 
  selectedRoom 
}) => {
  const { loadingCard } = useSelector((state: any) => state.packages);
  const {
    rooms,
    roomOptions,
    handleAddRoom,
    handleRoomTypeChange,
    handleGuestChange,
    handleRemoveRoom,
    handleChildAgeChange,
    handleNoteChange,
    handleBooking
  } = useBookingPackage(selectedDeparture, selectedRoom);

  const RoomCard = ({ room, index }: { room: any; index: number }) => (
    <Card className="w-full bg-white mb-4 shadow-sm p-4">
      <CardTitle className="text-lg text-gray-800 flex justify-between mb-4">
        <div>Chambre: {index + 1}</div>
        {rooms.length > 1 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleRemoveRoom(index)}
            className="text-red-500"
          >
            <CiTrash />
          </Button>
        )}
      </CardTitle>

      <DropDownBookingComponent
        data={roomOptions.map(({ name, id }: any) => ({ label: name, id }))}
        title={room.roomType?.name || "Type de chambre"}
        onSelect={(selected) => handleRoomTypeChange(index, selected)}
      />

      {room.roomType && (
        <CardContent className="mt-4 space-y-4">
          {[
            { icon: <TfiUser />, label: "Adulte", type: "adults", value: room.adults, min: MIN_ADULT, max: room.roomType.capacity_adult },
            { icon: <MdChildCare />, label: "Enfant", type: "children", value: room.children, min: 0, max: room.roomType.capacity_child },
            { icon: <LuBaby />, label: "Nourrisson", type: "infants", value: room.infants, min: 0, max: room.roomType.capacity_bebe }
          ].map(({ icon, label, type, value, min, max }) => (
            <NumberOfPeople
              key={type}
              icon={icon}
              label={label}
              value={value}
              onIncrement={() => handleGuestChange(index, type as any, "increment")}
              onDecrement={() => handleGuestChange(index, type as any, "decrement")}
              max={max}
              min={min}
            />
          ))}

          {room.childrenAges.map((age: number, childIndex: number) => (
            <div key={childIndex} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Age of Child {childIndex + 1} ({CHILD_AGE_RANGE.min}-{CHILD_AGE_RANGE.max} years)
              </label>
              <Input
                type="number"
                min={CHILD_AGE_RANGE.min}
                max={CHILD_AGE_RANGE.max}
                value={age || ''}
                onChange={(e) => handleChildAgeChange(index, childIndex, parseInt(e.target.value))}
                className="border rounded p-2 w-full"
              />
            </div>
          ))}

          <div className="space-y-2 mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Note
            </label>
            <Input
              type="text"
              value={room.note}
              onChange={(e) => handleNoteChange(index, e.target.value)}
              placeholder="Enter additional notes"
              className="border rounded p-2 w-full"
            />
          </div>
        </CardContent>
      )}
    </Card>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-2xl bg-gray-100">
        <DialogHeader className="text-xl font-semibold">Chambres</DialogHeader>
        
        <ScrollArea className="overflow-y-auto max-h-[80vh] scrollbar-hide">
          {rooms.map((room :any, index :any) => (
            <RoomCard key={index} room={room} index={index} />
          ))}

          <Button
            onClick={handleAddRoom}
            disabled={rooms.length >= MAX_ROOMS}
            className="w-full bg-[#ff8000] bg-opacity-20 text-[#ff8000] hover:bg-[#ff8000] hover:text-white mt-6"
          >
            Ajouter une chambre
          </Button>
        </ScrollArea>

        <DialogFooter className="flex gap-4">
          <Button 
            onClick={() => setIsOpen(false)} 
            className="flex-1 bg-[#ff8000] hover:bg-[#ff8000]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleBooking}
            disabled={rooms.length < 1 || !rooms[0].roomType}
            className="flex-1 bg-[#ff8000] hover:bg-[#ff8000]"
          >
            {loadingCard ? "..." : "Booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RoomsDetailsBooking;