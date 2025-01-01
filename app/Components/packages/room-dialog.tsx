"use client";

import * as React from "react";
import { MinusIcon, PlusIcon, User, Baby, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  addRoom as addRoomToStore,
  Room as StoreRoom,
  resetReservation,
  setOmraDepartureId,
} from "@/lib/store/custom/commonSlices/omraReservationSlice";
import { resetStep } from "@/lib/store/custom/omraSlices/paymentOmraSlice";
import { RootState } from "@/lib/store/store";
import { store } from "@/lib/store/store";

interface Passenger {
  email: string | null;
  phone: string | null;
  first_name: string;
  last_name: string;
  sex: "male" | "female";
  passport_nbr: string;
  passport_expire_at: string;
  passport_scan: string | null;
  birth_date: string;
}

interface Passengers {
  adults: Passenger[];
  children: Passenger[];
  children_without_bed: Passenger[];
  infants: Passenger[];
}

interface RoomType {
  value: string;
  label: string;
  maxOccupants: number;
}

const roomTypes: Record<string, RoomType[]> = {
  "with-bed": [
    { value: "quadruple", label: "Quadruple", maxOccupants: 4 },
    { value: "quintiple", label: "Quintiple", maxOccupants: 5 },
  ],
  "with-room": [
    { value: "single", label: "Single", maxOccupants: 1 },
    { value: "double", label: "Double", maxOccupants: 2 },
    { value: "triple", label: "Triple", maxOccupants: 3 },
    { value: "quadruple", label: "Quadruple", maxOccupants: 4 },
    { value: "quintiple", label: "Quintiple", maxOccupants: 5 },
  ],
};

interface Room {
  room_id: number;
  type: string;
  reservation_type: string;
  passengers: Passengers;
}

interface RoomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RoomDialog({ open, onOpenChange }: RoomDialogProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const reservationState = useSelector(
    (state: RootState) => state.omreaReservationInfos
  );
  const [rooms, setRooms] = React.useState<Room[]>([
    {
      room_id: 1,
      type: "quadruple",
      reservation_type: "with-bed",
      passengers: {
        adults: [],
        children: [],
        children_without_bed: [],
        infants: [],
      },
    },
  ]);
  const [activeRoom, setActiveRoom] = React.useState(1);

  const addRoom = () => {
    if (rooms.length < 3) {
      const newRoomId = rooms.length + 1;
      const newRoom: Room = {
        room_id: newRoomId,
        type: "quadruple",
        reservation_type: "with-bed",
        passengers: {
          adults: [],
          children: [],
          children_without_bed: [],
          infants: [],
        },
      };
      setRooms([...rooms, newRoom]);
      setActiveRoom(newRoom.room_id);
    }
  };

  const deleteRoom = (id: number) => {
    const newRooms = rooms.filter((room) => room.room_id !== id);
    setRooms(newRooms);
    setActiveRoom(newRooms[newRooms.length - 1].room_id);
  };

  const updateRoom = (id: number, updates: Partial<Room>) => {
    setRooms(
      rooms.map((room) => {
        if (room.room_id === id) {
          const updatedRoom = { ...room, ...updates };
          if (updates.reservation_type) {
            updatedRoom.passengers = {
              adults: [],
              children: [],
              children_without_bed: [],
              infants: [],
            };
          }
          return updatedRoom;
        }
        return room;
      })
    );
  };

  const handleOccupantChange = (
    roomId: number,
    type: keyof Passengers,
    change: number
  ) => {
    const room = rooms.find((r) => r.room_id === roomId);
    if (room) {
      const maxOccupants =
        roomTypes[room.reservation_type].find(
          (t) => t.value === room.type.toLowerCase()
        )?.maxOccupants || 0;
      const currentTotal = Object.values(room.passengers).reduce(
        (sum, arr) => sum + arr.length,
        0
      );
      const newTotal = currentTotal + change;

      if (newTotal <= maxOccupants && newTotal >= 0) {
        const newPassengers = { ...room.passengers };
        if (change > 0) {
          newPassengers[type].push({
            email: null,
            phone: null,
            first_name: "",
            last_name: "",
            sex: "male",
            passport_nbr: "",
            passport_expire_at: "",
            passport_scan: null,
            birth_date: "",
          });
        } else if (change < 0 && newPassengers[type].length > 0) {
          newPassengers[type].pop();
        }
        updateRoom(roomId, { passengers: newPassengers });
      }
    }
  };

  const saveRoomsAndProceed = async () => {
    // Store the current omra_departure_id before resetting
    const currentOmraDepartureId = reservationState.omra_departure_id;
    
    // Reset the reservation state
    dispatch(resetReservation());
    
    // Restore the omra_departure_id
    if (currentOmraDepartureId) {
      dispatch(setOmraDepartureId(currentOmraDepartureId));
    }

    // Add rooms to store
    for (const room of rooms) {
      const storeRoom: StoreRoom = {
        room_id: room.room_id,
        type: room.type,
        reservation_type: room.reservation_type,
        passengers: room.passengers,
      };
      dispatch(addRoomToStore(storeRoom));
      console.log("Added room to store:", storeRoom);
    }

    // Wait for a moment to ensure state updates are processed
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Log the final state from the store directly
    const finalState = store.getState().omreaReservationInfos;
    console.log("Final reservation state:", finalState);

    onOpenChange(false);
    router.push("/en/omras/payment");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Rooms</DialogTitle>
        </DialogHeader>
        <Tabs
          value={activeRoom.toString()}
          onValueChange={(value) => setActiveRoom(parseInt(value))}
        >
          <TabsList className="grid grid-cols-3 mb-4">
            {rooms.map((room) => (
              <TabsTrigger
                key={room.room_id}
                value={room.room_id.toString()}
                className="relative"
              >
                Room {room.room_id}
                {room.room_id !== 1 && (
                  <div
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-orange-100 text-orange-600 hover:bg-orange-200 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteRoom(room.room_id);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </div>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {rooms.map((room) => (
            <TabsContent key={room.room_id} value={room.room_id.toString()}>
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-4">
                    What type of room do you want?
                  </h2>

                  <RadioGroup
                    value={room.reservation_type}
                    onValueChange={(value) => {
                      updateRoom(room.room_id, {
                        reservation_type: value,
                        type: value === "with-bed" ? "quadruple" : "single",
                      });
                    }}
                    className="flex gap-4 mb-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="with-bed"
                        id={`with-bed-${room.room_id}`}
                        className="text-orange-600 border-orange-600 focus:ring-orange-600"
                      />
                      <Label htmlFor={`with-bed-${room.room_id}`}>
                        With bed
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="with-room"
                        id={`without-bed-${room.room_id}`}
                        className="text-orange-600 border-orange-600 focus:ring-orange-600"
                      />
                      <Label htmlFor={`without-bed-${room.room_id}`}>
                        With room
                      </Label>
                    </div>
                  </RadioGroup>

                  <Select
                    value={room.type.toLowerCase()}
                    onValueChange={(value) =>
                      updateRoom(room.room_id, { type: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Please select a room type" />
                    </SelectTrigger>
                    <SelectContent>
                      {roomTypes[room.reservation_type].map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {room.reservation_type && (
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5" />
                          <div>
                            <div className="font-medium">Adult</div>
                            <div className="text-sm text-muted-foreground">
                              Over 12 years
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handleOccupantChange(room.room_id, "adults", -1)
                            }
                          >
                            <MinusIcon className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {room.passengers.adults.length}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handleOccupantChange(room.room_id, "adults", 1)
                            }
                          >
                            <PlusIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Baby className="h-5 w-5" />
                          <div>
                            <div className="font-medium">Child</div>
                            <div className="text-sm text-muted-foreground">
                              2 to 12 years
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handleOccupantChange(room.room_id, "children", -1)
                            }
                          >
                            <MinusIcon className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {room.passengers.children.length}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handleOccupantChange(room.room_id, "children", 1)
                            }
                          >
                            <PlusIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Baby className="h-5 w-5" />
                          <div>
                            <div className="font-medium">Child without bed</div>
                            <div className="text-sm text-muted-foreground">
                              2 to 12 years
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handleOccupantChange(
                                room.room_id,
                                "children_without_bed",
                                -1
                              )
                            }
                          >
                            <MinusIcon className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {room.passengers.children_without_bed.length}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handleOccupantChange(
                                room.room_id,
                                "children_without_bed",
                                1
                              )
                            }
                          >
                            <PlusIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Baby className="h-5 w-5" />
                          <div>
                            <div className="font-medium">Infant</div>
                            <div className="text-sm text-muted-foreground">
                              Under 2 years
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handleOccupantChange(room.room_id, "infants", -1)
                            }
                          >
                            <MinusIcon className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {room.passengers.infants.length}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handleOccupantChange(room.room_id, "infants", 1)
                            }
                          >
                            <PlusIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor={`note-${room.room_id}`}>Leave a note</Label>
                  <Textarea
                    id={`note-${room.room_id}`}
                    className="mt-1"
                    placeholder="Add your note here..."
                    onChange={() => {}}
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {rooms.length < 3 && (
          <Button
            variant="ghost"
            className="w-full mt-4 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
            onClick={addRoom}
          >
            + Add another room
          </Button>
        )}

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-orange-600 hover:bg-orange-700"
            onClick={saveRoomsAndProceed}
          >
            Proceed to checkout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
