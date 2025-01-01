"use client"
import React , {useState} from 'react';
import Image from 'next/image';
import { UserRound } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

import { LuBaby } from "react-icons/lu";
import { MdChildCare } from "react-icons/md";
import { TfiUser } from "react-icons/tfi";

import imgage1 from '@/public/images/home/four.jpeg';
import { Room } from '@/app/Types/hotel/HotelDetails';
interface RoomsCardProps {
  data: Room;
  onSelect: (room: Room, isChecked: boolean) => void;
  selectedRoom:Room | undefined
}
export default function RoomsCard({ data, onSelect,selectedRoom }: RoomsCardProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleSelect = (checked: any) => {
    setIsChecked(checked);
    onSelect(data, checked);
  };
  return (
    <div className="px-4 pt-4 ">
      <Card className="w-full overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Image column - 1/3 width on medium screens and above */}
            <div className="w-full md:w-1/3 h-48 md:h-auto relative">
              <Image src={imgage1} alt="Room" layout="fill" objectFit="cover" />
            </div>

            {/* Information column - 1/3 width on medium screens and above */}
            <div className="w-full md:w-1/3 p-4 flex flex-col justify-between">
              <div>
                <div className="flex flex-col mb-4">
                  <h2 className="text-xl font-bold text-nowrap mr-8">
                   {`${data?.room_name}`}
                  </h2>
                  <div className="flex flex-row space-x-2">
                    <Button
                      variant="outline"
                      className="text-xs text-gray-500"
                      size="sm"
                    >
                      <UserRound size={10} />
                      <span className="pl-1 text-[10px]">{`x${data.adults}`}</span>
                    </Button>{' '}
                    <Button
                      variant="outline"
                      className="text-xs text-gray-500"
                      size="sm"
                    >
                      <UserRound size={10} />
                      <span className="pl-1 text-[10px]">{`x${data.children}`}</span>
                    </Button>
                  </div>
                </div>
  
              </div>
              <p className="text-xs sm:text-sm text-nowrap text-green-500">
                Annulation gratuite avant le 24/09/2024
              </p>
            </div>

            {/* Price column - 1/3 width on medium screens and above */}
            <div className="w-full md:w-1/3 pt-0 pb-4 flex items-center justify-center">
              <div className="text-center">
                <Checkbox 
                id="book" 
                className="w-6 h-6 mb-2"
                onCheckedChange={(isChecked) => handleSelect(isChecked)}
                disabled={selectedRoom ? !isChecked : false }
                />
                <label
                  htmlFor="book"
                  className="block text-lg sm:text-2xl font-bold"
                >
                  {`${data.rate || data.boardings.rate} DZD `}
                </label>
                <span className="text-xs sm:text-sm text-gray-600">
                  4 nuits
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
