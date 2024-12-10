import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
interface BookingOption {
  label: string;
  id: number;
}
interface DropDownBookingComponentProps {
  onSelect: (option: any) => void;
  data?: BookingOption[];
  title?: string;
}

export default function DropDownBookingComponent({
  onSelect,
  data,
  title,
}: DropDownBookingComponentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<BookingOption | null>(
    null
  );

  useEffect(()=>{

  },[data])
  const handleSelect = (option: BookingOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-sm font-medium px-8 py-2 bg-white text-[#ff8000] border-2 border-[#ff8000] rounded-xl cursor-pointer flex items-center justify-center"
      >
        <span>{selectedOption ? selectedOption.label : title}</span>
        <ChevronDown
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""} ml-2`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border-2 border-[#ff8000] rounded-xl overflow-hidden transition-all duration-300 ease-in-out max-h-60">
          {data?.map((item) => (
            <div
              key={item.id}
              className="text-sm text-center font-semibold px-8 py-2 text-[#ff8000] cursor-pointer hover:bg-[#fff0e0] transition-colors duration-200"
              onClick={() => handleSelect(item)}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
