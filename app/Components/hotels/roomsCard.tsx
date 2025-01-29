"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UserRound, ShieldX, ShieldAlert } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { differenceInDays } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import roomImg from '@/public/images/roomImg.jpg';
import { Room } from "@/app/Types/hotel/HotelDetails";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TfiUser } from "react-icons/tfi";
import { MdChildCare } from "react-icons/md";
import { LuBaby } from "react-icons/lu";
interface RoomsCardProps {
  multiple: boolean;
  dateRange: any;
  data: Room;
  onSelect: (room: Room, isChecked: boolean) => void;
  selectedRoom: Room[] | undefined;
}

const RoomsCard: React.FC<RoomsCardProps> = ({ data, onSelect, selectedRoom, dateRange, multiple }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (selectedRoom) {
      const val = selectedRoom.some(room => room.room_id === data.room_id);
      setIsChecked(val);
    }
  }, [selectedRoom, data.room_id]);

  const handleSelect = (checked: boolean) => {
    setIsChecked(checked);
    onSelect(data, checked);
  };

  const calculateDuration = () => {
    if (dateRange) {
      const nights = differenceInDays(dateRange.to, dateRange.from);
      return `${nights} nights`;
    }
    return null;
  };

  const handleDisplayCheckbox = () => {
    if (multiple) {
      return selectedRoom && selectedRoom.length > 0 && !isChecked;
    }
    return false;
  };

  return (
    <div className="px-4 pt-4">
      <Card className="sm:max-w-[425px] md:max-w-5xl overflow-hidden min-h-56">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Image column */}
            <div className="w-full md:w-1/4 h-48  md:h-auto relative">
              <Image src={roomImg} alt="Room"  />
            </div>

            {/* Information column */}
            <div className="w-full md:w-2/4 p-4 flex flex-col justify-between ">
              <div>
                <h2 className="text-xl font-bold mb-4 truncate">{data.room_name}</h2>
                {data.boardings.map((item, index) => (
                  <div key={index} className="flex flex-row space-x-2 mb-2">
                    <Button variant="outline" className="text-xs text-gray-500" size="sm">
                      <TfiUser size={14} />
                      <span className="pl-1 text-[10px]">x{item.adults}</span>
                    </Button>
                    <Button variant="outline" className="text-xs text-gray-500" size="sm">
                      <LuBaby size={14} />
                      <span className="pl-1 text-[10px]">x{item.children}</span>
                    </Button>
                  </div>
                ))}
              </div>
              
              <Badge variant={'rihlatic'} className="text-xs sm:text-sm text-green-500">
                <ShieldX /> {`Annulation gratuite avant le ${data.boardings[0].cancellation_policy[0].date_from}`}
              </Badge>
              <Badge variant={'rihlatic'} className="text-xs sm:text-sm text-green-500">
                <ShieldX /> {`Annulation gratuite avant le ${data.boardings[0].availability ? "yes ": "no"}`}
              </Badge>
            </div>

            {/* Price column */}
            <div className="w-full md:w-1/4 pt-0 pb-4 flex flex-col items-center justify-center">
              <div className="text-center">
                <Checkbox
                  defaultChecked={isChecked}
                  id="book"
                  className="w-6 h-6 mb-2"
                  onCheckedChange={handleSelect}
                  disabled={handleDisplayCheckbox()}
                />
                <label htmlFor="book" className="block text-lg sm:text-2xl font-bold">
                  {`${data.rate || data.boardings[0]?.rate} DZD`}
                </label>
                <span className="text-xs sm:text-sm text-gray-600">{calculateDuration()}</span>
              </div>
              <Button
                className="bg-white hover:bg-white text-center text-orange-500 font-semibold hover:font-bold hover:underline flex"
                onClick={() => setIsDialogOpen(true)}
              >
                <ShieldAlert />
                Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialog for Room Details */}
      <RoomsDetailsDialog 
      isOpen={isDialogOpen} 
      onClose={() => setIsDialogOpen(false)} data={data} />
    </div>
  );
};

interface RoomsDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  data: Room;
}


const RoomsDetailsDialog: React.FC<RoomsDetailsDialogProps> = ({ isOpen, onClose, data }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-2xl bg-gray-100 p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold mb-4">Détails</DialogTitle>
        </DialogHeader>

        <ScrollArea className="overflow-y-auto max-h-[80vh] scrollbar-hide">          {/* Room Name */}
          <h3 className="text-lg font-bold mb-2">{data.room_name}</h3>

          {/* Rate */}
          <p className="text-sm text-gray-600 mb-4">
            {`Rate: ${data.rate || data.boardings[0]?.rate} DZD`}
          </p>

          {/* Cancellation Policy Section */}
          <h4 className="text-md font-semibold mb-2">Politique annulation</h4>
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">
                  À partir de
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">
                  Pénalité %
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">
                  Pénalité
                </th>
              </tr>
            </thead>
            <tbody>
              {data.boardings[0].cancellation_policy.map(
                (policy: any, index: number) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2 text-sm">
                      {policy.date_from}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">
                      {policy.percentage} %
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-red-600 font-semibold">
                      {`Vous payez ${policy.amount} DZD`}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          {/* Special Offers and Remarks Section */}
          <h4 className="text-md font-semibold mb-2">Offre spéciale et remarques</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
  {data.boardings.map((item) =>
    item.notes.map((note, index) => (
      <li key={index}>{note}</li>
    ))
  )}
</ul>

        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default RoomsCard;