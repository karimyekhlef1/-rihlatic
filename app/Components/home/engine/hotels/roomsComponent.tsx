import React, { useEffect, useRef, useState } from "react";
import { Users, Minus, Plus, User, UserRound } from "lucide-react";
import { useDispatch } from "react-redux";
import { setVolPassanger } from "@/lib/store/engine/vol_search_slice";
import { setHotelRooms } from "@/lib/store/engine/hotel_search_slice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const HotelRoomsComponent = () => {
  const dispatch = useDispatch<any>();

  const [pdata, setPdata] = useState<any>([{ adults: 1, children: 0 }]);
  const [show, setShow] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const calculatePeople = () => {
    return pdata.reduce(
      (total: number, room: any) => total + room.adults + room.children,
      0
    );
  };

  const addRoom = () => {
    setPdata((prev: any) => [...prev, { adults: 1, children: 0 }]);
  };

  const removeRoom = () => {
    if (pdata.length > 1) {
      setPdata((prev: any) => prev.slice(0, -1));
    }
  };

  const updateRoom = (index: number, field: "adults" | "children", increment: boolean) => {
    setPdata((prev: any) => {
      const updatedRooms = [...prev];
      const updatedRoom = { ...updatedRooms[index] };

      if (increment) {
        updatedRoom[field]++;
      } else if (updatedRoom[field] > 0 && (field !== "adults" || updatedRoom[field] > 1)) {
        updatedRoom[field]--;
      }

      updatedRooms[index] = updatedRoom;
      return updatedRooms;
    });

    dispatch(setHotelRooms(pdata));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "w-[200px] h-9 justify-start text-xs bg-white border-gray-200",
            pdata.length > 1 && "border-[#FF8000] bg-orange-50"
          )}
        >
          <div className="flex items-center gap-2">
            <Users className="h-3.5 w-3.5 text-gray-500" />
            <div className="flex flex-col items-start">
              <span className="text-xs">
                {pdata.length} {pdata.length === 1 ? "Room" : "Rooms"},{" "}
                {calculatePeople()} {calculatePeople() === 1 ? "Guest" : "Guests"}
              </span>
              <span className="text-[10px] text-gray-400">Rooms & Guests</span>
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-3" align="start">
        <div className="space-y-4">
          {pdata.map((room: any, index: number) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center gap-2">
                <UserRound className="h-4 w-4 text-gray-500" />
                <h4 className="font-medium text-xs">Room {index + 1}</h4>
              </div>
              <Separator className="my-2" />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-xs font-medium">Adults</p>
                    <p className="text-[10px] text-gray-500">Ages 11 or above</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className={cn(
                        "h-7 w-7",
                        room.adults === 1 && "opacity-50 cursor-not-allowed"
                      )}
                      onClick={() => updateRoom(index, "adults", false)}
                      disabled={room.adults === 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-4 text-center text-xs">{room.adults}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateRoom(index, "adults", true)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-xs font-medium">Children</p>
                    <p className="text-[10px] text-gray-500">Ages under 11</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className={cn(
                        "h-7 w-7",
                        room.children === 0 && "opacity-50 cursor-not-allowed"
                      )}
                      onClick={() => updateRoom(index, "children", false)}
                      disabled={room.children === 0}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-4 text-center text-xs">{room.children}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateRoom(index, "children", true)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
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
                pdata.length === 1 && "opacity-50 cursor-not-allowed"
              )}
              onClick={removeRoom}
              disabled={pdata.length === 1}
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
