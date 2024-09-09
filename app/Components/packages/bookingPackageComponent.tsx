import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CircleCheck } from 'lucide-react';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { DatePickerWithRange } from '@/app/commonComponents/datePicker';

import { Provider } from 'react-redux';
import { store } from '@/lib/store/store';

export default function BookingPackageComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('');

  const rooms = [
    { value: '', label: 'Kind of room' },
    { value: 'single', label: 'Single room' },
    { value: 'double', label: 'Double room' },
    { value: 'triple', label: 'Triple room' },
    { value: 'suite', label: 'Suite' },
  ];

  return (
    <div>
      <Card className="w-[300px] rounded-3xl">
        <CardContent className="px-0 py-8">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center justify-center pb-4">
              <p className="text-xs">Starting from</p>
              <p className="font-semibold text-lg">149000 DZD</p>
            </div>
            <Separator />
            <div className="flex flex-col pt-4 pb-[100px]">
              <div className="flex flex-row items-center">
                <CircleCheck
                  size={15}
                  className="font-semibold text-xs text-[#43acff]"
                  fill="#b4deff"
                />
                <p className="text-sm font-semibold pl-2">8 nights / 9 days</p>
              </div>
              <div className="flex flex-row items-center mt-2">
                <CircleCheck
                  size={15}
                  className="font-semibold text-xs text-[#ff8000]"
                  fill="#ffcc99"
                />
                <p className="text-sm font-semibold pl-2">12-August-2024</p>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-y-2 pb-4 pt-4">
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full text-sm text-center font-medium px-8 py-2 bg-white text-[#ff8000] border-2 border-[#ff8000] rounded-xl cursor-pointer flex items-center justify-between"
                >
                  {selectedRoom || 'Kind of room'}
                  <ChevronDown
                    className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border-2 border-[#ff8000] rounded-xl overflow-hidden transition-all duration-300 ease-in-out max-h-48">
                    {rooms.map((room) => (
                      <div
                        key={room.value}
                        className="text-sm text-center font-semibold px-8 py-2 text-[#ff8000] cursor-pointer hover:bg-[#fff0e0] transition-colors duration-200"
                        onClick={() => {
                          setSelectedRoom(room.label);
                          setIsOpen(false);
                        }}
                      >
                        {room.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Provider store={store}>
                <DatePickerWithRange />
              </Provider>
            </div>
            <Separator />
            <div className="pt-4">
              <Button className="px-14" variant={'rihlatic'} disabled>
                Book Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
