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
import Link from "next/link";

const roomTypes = [
  { value: "single", label: "Single" },
  { value: "double", label: "Double" },
  { value: "triple", label: "Triple" },
  { value: "quadruple", label: "Quadruple" },
  { value: "quintiple", label: "Quintiple" },
];

interface Room {
  id: number;
  type: string;
  bookingType: string;
  occupants: {
    adults: number;
    children: number;
    infants: number;
  };
  note: string;
}

interface RoomDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function RoomDialog({ open = false, onOpenChange }: RoomDialogProps) {
  const [rooms, setRooms] = React.useState<Room[]>([
    {
      id: 1,
      type: "",
      bookingType: "with-bed",
      occupants: { adults: 0, children: 0, infants: 0 },
      note: "",
    },
  ]);
  const [activeRoom, setActiveRoom] = React.useState(1);

  const addRoom = () => {
    if (rooms.length < 3) {
      const newRoom: Room = {
        id: rooms.length + 1,
        type: "",
        bookingType: "with-bed",
        occupants: { adults: 0, children: 0, infants: 0 },
        note: "",
      };
      setRooms([...rooms, newRoom]);
      setActiveRoom(newRoom.id);
    }
  };

  const deleteRoom = (id: number) => {
    const newRooms = rooms.filter((room) => room.id !== id);
    setRooms(newRooms);
    setActiveRoom(newRooms[newRooms.length - 1].id);
  };

  const updateRoom = (id: number, updates: Partial<Room>) => {
    setRooms(
      rooms.map((room) => (room.id === id ? { ...room, ...updates } : room))
    );
  };

  const handleOccupantChange = (
    roomId: number,
    type: keyof Room["occupants"],
    change: number
  ) => {
    const room = rooms.find((r) => r.id === roomId);
    if (room) {
      const newOccupants = {
        ...room.occupants,
        [type]: Math.max(0, room.occupants[type] + change),
      };
      updateRoom(roomId, { occupants: newOccupants });
    }
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
                key={room.id}
                value={room.id.toString()}
                className="relative"
              >
                Room {room.id}
                {room.id !== 1 && (
                  <div
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-orange-100 text-orange-600 hover:bg-orange-200 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteRoom(room.id);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </div>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {rooms.map((room) => (
            <TabsContent key={room.id} value={room.id.toString()}>
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-4">
                    What was the reason for your cancellation?
                  </h2>

                  <RadioGroup
                    value={room.bookingType}
                    onValueChange={(value) =>
                      updateRoom(room.id, { bookingType: value })
                    }
                    className="flex gap-4 mb-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="with-bed"
                        id={`with-bed-${room.id}`}
                        className="text-orange-600 border-orange-600 focus:ring-orange-600"
                      />
                      <Label htmlFor={`with-bed-${room.id}`}>With bed</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="without-bed"
                        id={`without-bed-${room.id}`}
                        className="text-orange-600 border-orange-600 focus:ring-orange-600"
                      />
                      <Label htmlFor={`without-bed-${room.id}`}>
                        Without bed
                      </Label>
                    </div>
                  </RadioGroup>

                  <Select
                    value={room.type}
                    onValueChange={(value) =>
                      updateRoom(room.id, { type: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Please select a room type" />
                    </SelectTrigger>
                    <SelectContent>
                      {roomTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {room.type && (
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
                              handleOccupantChange(room.id, "adults", -1)
                            }
                          >
                            <MinusIcon className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {room.occupants.adults}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handleOccupantChange(room.id, "adults", 1)
                            }
                          >
                            <PlusIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5" />
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
                              handleOccupantChange(room.id, "children", -1)
                            }
                          >
                            <MinusIcon className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {room.occupants.children}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handleOccupantChange(room.id, "children", 1)
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
                              handleOccupantChange(room.id, "infants", -1)
                            }
                          >
                            <MinusIcon className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {room.occupants.infants}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handleOccupantChange(room.id, "infants", 1)
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
                  <Label htmlFor={`note-${room.id}`}>Leave a note</Label>
                  <Textarea
                    id={`note-${room.id}`}
                    className="mt-1"
                    placeholder="Add your note here..."
                    value={room.note}
                    onChange={(e) =>
                      updateRoom(room.id, { note: e.target.value })
                    }
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
          <Button variant="outline" onClick={() => onOpenChange?.(false)}>
            Cancel
          </Button>
          <Link href={"/omras/payment"}>
            <Button className="bg-orange-600 hover:bg-orange-700">
              Proceed to checkout
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
