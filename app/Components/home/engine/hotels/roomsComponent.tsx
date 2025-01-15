import React, { useCallback, useEffect } from "react";
import { Users, Minus, Plus, UserRound } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setHotelRooms } from "@/lib/store/engine/hotel_search_slice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Room {
  adults: number;
  children: number;
  childAges: number[];
}

interface RootState {
  hotelSearchSlice: {
    rooms: Room[];
  };
}

const MIN_ADULTS = 1;
const MIN_CHILDREN = 0;
const DEFAULT_ROOM: Room = { adults: 1, children: 0, childAges: [] };
const CHILD_AGE_RANGE = Array.from({ length: 10 }, (_, i) => i + 2); // Ages 2-11

const HotelRoomsComponent = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state: RootState) => 
    state.hotelSearchSlice?.rooms || [DEFAULT_ROOM]
  );

  // Initialize rooms with childAges if they don't exist
  useEffect(() => {
    const initializedRooms = rooms.map(room => ({
      ...room,
      childAges: Array.isArray(room.childAges) ? room.childAges : Array(room.children).fill(2)
    }));
    
    if (JSON.stringify(rooms) !== JSON.stringify(initializedRooms)) {
      updateRooms(initializedRooms);
    }
  }, []);

  const calculatePeople = useCallback((roomData: Room[]): number => {
    return roomData.reduce(
      (total, room) => total + (Number(room.adults) || 0) + (Number(room.children) || 0),
      0
    );
  }, []);

  const updateRooms = useCallback((newRooms: Room[]) => {
    dispatch(setHotelRooms(newRooms));
  }, [dispatch]);

  const addRoom = useCallback(() => {
    updateRooms([...rooms, { ...DEFAULT_ROOM }]);
  }, [rooms, updateRooms]);

  const removeRoom = useCallback(() => {
    if (rooms.length > 1) {
      updateRooms(rooms.slice(0, -1));
    }
  }, [rooms, updateRooms]);

  const updateRoom = useCallback((
    index: number,
    field: 'adults' | 'children',
    increment: boolean
  ) => {
    const newRooms = rooms.map((room, i) => {
      if (i !== index) return room;
      
      if (field === 'children') {
        const newChildrenCount = increment ? room.children + 1 : room.children - 1;
        const finalChildrenCount = Math.max(MIN_CHILDREN, newChildrenCount);
        const newChildAges = Array.isArray(room.childAges) ? [...room.childAges] : [];
        
        if (increment) {
          newChildAges.push(2); // Default age
        } else {
          newChildAges.pop();
        }

        return {
          ...room,
          children: finalChildrenCount,
          childAges: newChildAges
        };
      }

      const newValue = increment ? room[field] + 1 : room[field] - 1;
      const minValue = field === 'adults' ? MIN_ADULTS : MIN_CHILDREN;
      
      return {
        ...room,
        [field]: Math.max(minValue, newValue)
      };
    });

    updateRooms(newRooms);
  }, [rooms, updateRooms]);

  const updateChildAge = useCallback((
    roomIndex: number,
    childIndex: number,
    age: number
  ) => {
    const newRooms = rooms.map((room, i) => {
      if (i !== roomIndex) return room;
      
      const newChildAges = Array.isArray(room.childAges) ? [...room.childAges] : [];
      newChildAges[childIndex] = age;
      
      return {
        ...room,
        childAges: newChildAges
      };
    });

    updateRooms(newRooms);
  }, [rooms, updateRooms]);

  const RoomControls = ({ 
    room, 
    index, 
    field 
  }: { 
    room: Room; 
    index: number; 
    field: 'adults' | 'children';
  }) => {
    const isAdults = field === 'adults';
    const value = room[field];
    const minValue = isAdults ? MIN_ADULTS : MIN_CHILDREN;
    const label = isAdults ? 'Adults' : 'Children';
    const ageText = isAdults ? 'Ages 11 or above' : 'Ages under 11';

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-xs font-medium">{label}</p>
            <p className="text-[10px] text-gray-500">{ageText}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "h-7 w-7",
                value === minValue && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => updateRoom(index, field, false)}
              disabled={value === minValue}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-4 text-center text-xs">{value}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => updateRoom(index, field, true)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
        {!isAdults && room.children > 0 && (
          <div className="space-y-2">
            {Array.from({ length: room.children }).map((_, childIndex) => (
              <div key={childIndex} className=" items-center ">
                <span className="text-xs text-gray-500">Age of Child {childIndex + 1}</span>
                <Select
                  value={String(room.childAges[childIndex] || 2)}
                  onValueChange={(value) => updateChildAge(index, childIndex, Number(value))}
                >
                  <SelectTrigger className="h-7 w-full">
                    <SelectValue placeholder="Age" />
                  </SelectTrigger>
                  <SelectContent>
                    {CHILD_AGE_RANGE.map((age) => (
                      <SelectItem key={age} value={String(age)}>
                        {age} years
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const totalPeople = calculatePeople(rooms);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "w-[200px] h-9 justify-start text-xs bg-white border-gray-200 text-black",
            rooms.length > 1 && "border-[#FF8000] bg-orange-50"
          )}
        >
          <div className="flex items-center gap-2">
            <Users className="h-3.5 w-3.5 text-gray-500" />
            <div className="flex flex-col items-start">
              <span className="text-xs">
                {rooms.length} {rooms.length === 1 ? "Room" : "Rooms"},{" "}
                {totalPeople} {totalPeople === 1 ? "Guest" : "Guests"}
              </span>
              <span className="text-[10px] text-gray-400">Rooms & Guests</span>
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-3" align="start">
        <div className="space-y-4">
          {rooms.map((room, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center gap-2">
                <UserRound className="h-4 w-4 text-gray-500" />
                <h4 className="font-medium text-xs">Room {index + 1}</h4>
              </div>
              <Separator className="my-2" />
              <div className="space-y-3">
                <RoomControls room={room} index={index} field="adults" />
                <RoomControls room={room} index={index} field="children" />
              </div>
            </div>
          ))}
          <div className="flex justify-between pt-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-[#FF8000] text-white hover:bg-[#FF8000]/90 hover:text-white"
              onClick={addRoom}
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "bg-gray-700 text-white hover:bg-gray-700/90 hover:text-white",
                rooms.length === 1 && "opacity-50 cursor-not-allowed"
              )}
              onClick={removeRoom}
              disabled={rooms.length === 1}
            >
              <Minus className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default HotelRoomsComponent;