import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropDownBookingComponentProps {
  onSelect: (option: string) => void;
  data: string[];
  label?:string 
  title?:string
}

export default function DropDownBookingComponent({
  onSelect, data , title
}: DropDownBookingComponentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('');

  // const rooms = [
  //   { value: 'single', label: 'Single room' },
  //   { value: 'double', label: 'Double room' },
  //   { value: 'triple', label: 'Triple room' },
  //   { value: 'suite', label: 'Suite' },
  // ];

  const handleSelect = (option: string) => {
    setSelectedRoom(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-sm font-medium px-8 py-2 bg-white text-[#ff8000] border-2 border-[#ff8000] rounded-xl cursor-pointer flex items-center justify-center"
      >
        <span className="flex-grow text-center">
          {selectedRoom || title}
        </span>
        <ChevronDown
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} ml-2`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border-2 border-[#ff8000] rounded-xl overflow-hidden transition-all duration-300 ease-in-out max-h-48">
          {data.map((room) => (
            <div
              key={room}
              className="text-sm text-center font-semibold px-8 py-2 text-[#ff8000] cursor-pointer hover:bg-[#fff0e0] transition-colors duration-200"
              onClick={() => handleSelect(room)}
            >
              {room}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
