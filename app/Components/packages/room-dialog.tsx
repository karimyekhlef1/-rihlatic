"use client";

import * as React from "react";
import { X } from "lucide-react";
import { TfiUser } from "react-icons/tfi";
import { MdChildCare } from "react-icons/md";
import { LuBaby } from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  addRoom as addRoomToStore,
  Room as StoreRoom,
  resetReservation,
  setOmraDepartureId,
  updatePricing,
  RoomWithPricing
} from "@/lib/store/custom/commonSlices/omraReservationSlice";
import { resetStep } from "@/lib/store/custom/omraSlices/paymentOmraSlice";
import { RootState, AppDispatch } from "@/lib/store/store";
import { store } from "@/lib/store/store";
import DropDownBookingComponent from "./dropDownBooking";
import NumberOfPeople from "./numberOfPeople";
import { 
  storeShoppingCard,
  pricingShoppingCard 
} from "@/lib/store/api/omras/omrasSlice";

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
  id: number;
  value: string;
  label: string;
  maxOccupants: number;
}

interface PricingRoom {
  room_id: number;
  name: string;
  capacity_adult: number;
  capacity_child: number;
  capacity_child_without_bed: number;
  capacity_bebe: number;
  adults_price: number;
  children_price: number;
  infant_price: number;
  total: number;
}

interface PricingResponse {
  data: {
    rooms: PricingRoom[];
    total: number;
  }
}

const roomTypes: Record<string, RoomType[]> = {
  "with-bed": [
    { id: 1, value: "quadruple", label: "Quadruple", maxOccupants: 4 },
    { id: 2, value: "quintiple", label: "Quintiple", maxOccupants: 5 },
  ],
  "with-room": [
    { id: 3, value: "single", label: "Single", maxOccupants: 1 },
    { id: 4, value: "double", label: "Double", maxOccupants: 2 },
    { id: 5, value: "triple", label: "Triple", maxOccupants: 3 },
    { id: 6, value: "quadruple", label: "Quadruple", maxOccupants: 4 },
    { id: 7, value: "quintiple", label: "Quintiple", maxOccupants: 5 },
  ],
};

interface RoomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RoomDialog({ open, onOpenChange }: RoomDialogProps) {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const reservationState = useSelector(
    (state: RootState) => state.omreaReservationInfos
  );
  const [room, setRoom] = React.useState<{
    type: string;
    reservation_type: string;
    passengers: Passengers;
    note?: string;
  }>({
    type: "quadruple",
    reservation_type: "with-bed",
    passengers: {
      adults: [
        {
          // Start with one adult
          email: null,
          phone: null,
          first_name: "",
          last_name: "",
          sex: "male",
          passport_nbr: "",
          passport_expire_at: "",
          passport_scan: null,
          birth_date: "",
        },
      ],
      children: [],
      children_without_bed: [],
      infants: [],
    },
    note: "",
  });

  const handleGuestChange = (
    type: keyof Passengers,
    action: "increment" | "decrement"
  ) => {
    const currentTotal = Object.values(room.passengers).reduce(
      (sum, arr) => sum + arr.length,
      0
    );

    const maxOccupants =
      roomTypes[room.reservation_type].find(
        (t) => t.value === room.type.toLowerCase()
      )?.maxOccupants || 0;

    const newPassengers = { ...room.passengers };

    if (action === "increment" && currentTotal < maxOccupants) {
      newPassengers[type] = [
        ...newPassengers[type],
        {
          email: null,
          phone: null,
          first_name: "",
          last_name: "",
          sex: "male",
          passport_nbr: "",
          passport_expire_at: "",
          passport_scan: null,
          birth_date: "",
        },
      ];
      setRoom({ ...room, passengers: newPassengers });
    } else if (action === "decrement" && newPassengers[type].length > 0) {
      newPassengers[type] = newPassengers[type].slice(0, -1);
      setRoom({ ...room, passengers: newPassengers });
    }
  };

  const handleRoomTypeChange = (selected: { id: number; label: string }) => {
    console.log("[Room Dialog] Room type changed to:", selected.label);
    const selectedRoomType = roomTypes[room.reservation_type].find(
      (type) => type.id === selected.id
    );

    if (selectedRoomType) {
      setRoom({
        ...room,
        type: selectedRoomType.value,
        passengers: {
          adults: [room.passengers.adults[0]], // Keep first adult
          children: [],
          children_without_bed: [],
          infants: [],
        },
      });
    }
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRoom({ ...room, note: e.target.value });
  };

  const saveRoomAndProceed = async () => {
    console.log("[Room Dialog] Starting room save process");
    console.log("[Room Dialog] Current room state:", room);
    console.log("[Room Dialog] Current reservation state:", reservationState);

    const currentOmraDepartureId = reservationState.omra_departure_id;
    console.log(
      "[Room Dialog] Current omra departure ID:",
      currentOmraDepartureId
    );

    dispatch(resetReservation());
    console.log("[Room Dialog] Reservation reset");

    if (currentOmraDepartureId) {
      dispatch(setOmraDepartureId(currentOmraDepartureId));
      console.log("[Room Dialog] Restored omra departure ID after reset");
    }

    const storeRoom: StoreRoom = {
      room_id: 1,
      type: room.type,
      reservation_type: room.reservation_type,
      passengers: room.passengers,
    };

    console.log("[Room Dialog] Storing room data:", storeRoom);
    dispatch(addRoomToStore(storeRoom));

    try {
      // First, store the shopping card data
      const shoppingCardData = {
        departure_id: currentOmraDepartureId,
        rooms: [
          {
            room_id: storeRoom.room_id,
            note: room.note,
            capacity_adult: room.passengers.adults.length,
            capacity_child: room.passengers.children.length,
            capacity_child_without_bed:
              room.passengers.children_without_bed.length,
            capacity_bebe: room.passengers.infants.length,
          },
        ],
      };

      console.log("[Room Dialog] Storing shopping card:", shoppingCardData);
      const shoppingCardResponse: { data: { token: string } } = await dispatch(
        storeShoppingCard(shoppingCardData)
      ).unwrap();

      if (shoppingCardResponse?.data?.token) {
        console.log(
          "[Room Dialog] Got shopping card token:",
          shoppingCardResponse.data.token
        );

        // Use the token to get pricing
        const pricingResponse: PricingResponse = await dispatch(
          pricingShoppingCard(shoppingCardResponse.data.token)
        ).unwrap();
        console.log("[Room Dialog] Pricing data fetched successfully");

        // Update the reservation info with pricing data
        if (pricingResponse?.data) {
          dispatch(updatePricing({
            rooms: pricingResponse.data.rooms.map((room: PricingRoom): RoomWithPricing => ({
              ...storeRoom,
              name: room.name,
              adults_quantity: room.capacity_adult,
              adults_price: room.adults_price,
              children_quantity: room.capacity_child + room.capacity_child_without_bed,
              children_price: room.children_price,
              infant_quantity: room.capacity_bebe,
              infant_price: room.infant_price,
              total: room.total
            })),
            total: pricingResponse.data.total
          }));
        }
      }

      console.log(
        "[Room Dialog] Updated reservation state:",
        store.getState().omreaReservationInfos
      );

      onOpenChange(false);
      console.log("[Room Dialog] Dialog closed, redirecting to payment page");
      router.push("/en/omras/payment");
    } catch (error) {
      console.error("[Room Dialog] Error in shopping card process:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Room Details</DialogTitle>
        </DialogHeader>

        <Card className="w-full bg-white shadow-sm p-4">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Room Type</h2>
              <RadioGroup
                value={room.reservation_type}
                onValueChange={(value) => {
                  console.log(
                    "[Room Dialog] Reservation type changed to:",
                    value
                  );
                  setRoom({
                    ...room,
                    reservation_type: value,
                    type: value === "with-bed" ? "quadruple" : "single",
                    passengers: {
                      adults: [room.passengers.adults[0]], // Keep first adult
                      children: [],
                      children_without_bed: [],
                      infants: [],
                    },
                  });
                }}
                className="flex gap-4 mb-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="with-bed"
                    id="with-bed"
                    className="text-orange-600 border-orange-600 focus:ring-orange-600"
                  />
                  <Label htmlFor="with-bed">With bed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="with-room"
                    id="with-room"
                    className="text-orange-600 border-orange-600 focus:ring-orange-600"
                  />
                  <Label htmlFor="with-room">With room</Label>
                </div>
              </RadioGroup>

              <DropDownBookingComponent
                data={roomTypes[room.reservation_type].map(({ id, label }) => ({
                  id,
                  label,
                }))}
                title="Select Room Type"
                onSelect={handleRoomTypeChange}
              />
            </div>

            <CardContent className="space-y-4 pt-4">
              <NumberOfPeople
                icon={<TfiUser />}
                label="Adult"
                value={room.passengers.adults.length}
                onIncrement={() => handleGuestChange("adults", "increment")}
                onDecrement={() => handleGuestChange("adults", "decrement")}
                min={1}
                max={
                  roomTypes[room.reservation_type].find(
                    (t) => t.value === room.type.toLowerCase()
                  )?.maxOccupants || 1
                }
              />

              <NumberOfPeople
                icon={<MdChildCare />}
                label="Child"
                value={
                  room.passengers.children.length +
                  room.passengers.children_without_bed.length
                }
                onIncrement={() => handleGuestChange("children", "increment")}
                onDecrement={() => {
                  const lastChildIndex = room.passengers.children.length - 1;
                  if (lastChildIndex >= 0) {
                    handleGuestChange("children", "decrement");
                  } else {
                    handleGuestChange("children_without_bed", "decrement");
                  }
                }}
                min={0}
                max={
                  roomTypes[room.reservation_type].find(
                    (t) => t.value === room.type.toLowerCase()
                  )?.maxOccupants || 0
                }
              />
              {/* Child bed toggles */}
              <div className="space-y-2 pl-8">
                {[
                  ...Array(
                    room.passengers.children.length +
                      room.passengers.children_without_bed.length
                  ),
                ].map((_, index) => {
                  const isWithoutBed = index >= room.passengers.children.length;
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-gray-600">
                        Child {index + 1}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                          {isWithoutBed ? "Without Bed" : "With Bed"}
                        </span>
                        <Switch
                          checked={isWithoutBed}
                          onCheckedChange={(checked) => {
                            const newPassengers = { ...room.passengers };
                            const childToMove = checked
                              ? newPassengers.children[index]
                              : newPassengers.children_without_bed[
                                  index - newPassengers.children.length
                                ];

                            if (checked) {
                              newPassengers.children =
                                newPassengers.children.filter(
                                  (_, i) => i !== index
                                );
                              newPassengers.children_without_bed.push(
                                childToMove
                              );
                            } else {
                              newPassengers.children_without_bed =
                                newPassengers.children_without_bed.filter(
                                  (_, i) =>
                                    i !== index - newPassengers.children.length
                                );
                              newPassengers.children.push(childToMove);
                            }

                            setRoom({ ...room, passengers: newPassengers });
                          }}
                          className="data-[state=checked]:bg-orange-600"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <NumberOfPeople
                icon={<LuBaby />}
                label="Infant"
                value={room.passengers.infants.length}
                onIncrement={() => handleGuestChange("infants", "increment")}
                onDecrement={() => handleGuestChange("infants", "decrement")}
                min={0}
                max={2}
              />
            </CardContent>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <Textarea
                placeholder="Add any special requests or notes..."
                value={room.note}
                onChange={handleNoteChange}
                className="min-h-[100px]"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                onClick={saveRoomAndProceed}
                className="bg-orange-500 text-white hover:bg-orange-600"
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
