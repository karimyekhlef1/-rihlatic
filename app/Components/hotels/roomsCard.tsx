import Image from 'next/image';
import { UserRound } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

import imgage1 from '@/public/images/home/four.jpeg';
export default function RoomsCard() {
  return (
    <div className="px-8 pt-4">
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
                <div className="flex flex-row mb-4">
                  <h2 className="text-xl font-bold text-nowrap mr-8">
                    Single Room
                  </h2>
                  <div className="flex flex-row space-x-2">
                    <Button
                      variant="outline"
                      className="text-xs text-gray-500"
                      size="sm"
                    >
                      <UserRound size={10} />
                      <span className="pl-1 text-[10px]">x1</span>
                    </Button>{' '}
                    <Button
                      variant="outline"
                      className="text-xs text-gray-500"
                      size="sm"
                    >
                      <UserRound size={10} />
                      <span className="pl-1 text-[10px]">x1</span>
                    </Button>
                  </div>
                </div>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <Checkbox id="item1" className="mr-2" />
                    <label htmlFor="item1">Checkbox item 1</label>
                  </li>
                  <li className="flex items-center">
                    <Checkbox id="item2" className="mr-2" />
                    <label htmlFor="item2">Checkbox item 2</label>
                  </li>
                  <li className="flex items-center">
                    <Checkbox id="item3" className="mr-2" />
                    <label htmlFor="item3">Checkbox item 3</label>
                  </li>
                </ul>
              </div>
              <p className="text-sm text-nowrap text-green-500">
                Annulation gratuite avant le 24/09/2024
              </p>
            </div>

            {/* Price column - 1/3 width on medium screens and above */}
            <div className="w-full md:w-1/3 p-4 flex items-center justify-center">
              <div className="text-center">
                <Checkbox id="book" className="w-6 h-6 mb-2" />
                <label htmlFor="book" className="block text-2xl font-bold">
                  97 263 DZD 
                </label>
                <span className="text-sm text-gray-600">4 nuits</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
