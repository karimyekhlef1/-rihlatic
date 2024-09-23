import { Separator } from '@/components/ui/separator';
import { CircleCheck, CircleX } from 'lucide-react';

export default function HotelDetails() {
  return (
    <div className="flex flex-col p-0">
      <div className="flex flex-wrap sm:gap-0 gap-3">
        <div className="flex flex-col w-full sm:w-1/2">
          <h3 className="font-semibold text-md">Inclus</h3>
          <ul className="list-none pl-0 mt-2">
            <li className="flex items-center mb-1 font-semibold text-sm text-gray-500">
              <CircleCheck
                size={20}
                className="font-semibold text-xs text-[#5eda7f] mr-2"
                fill="#bff0cc"
              />
              Petit-déjeuner
            </li>
            <li className="flex items-center mb-1 font-semibold text-sm text-gray-500">
              <CircleCheck
                size={20}
                className="font-semibold text-xs text-[#5eda7f] mr-2"
                fill="#bff0cc"
              />
              Wi-Fi gratuit
            </li>
            <li className="flex items-center font-semibold text-sm text-gray-500">
              <CircleCheck
                size={20}
                className="font-semibold text-xs text-[#5eda7f] mr-2"
                fill="#bff0cc"
              />
              Piscine
            </li>
          </ul>
        </div>
        <div className="flex flex-col w-full sm:w-1/2">
          <h3 className="font-semibold text-md">Non inclus</h3>
          <ul className="list-none pl-0 mt-2">
            <div className="flex flex-col"></div>
            <li className="flex items-center mb-1 font-semibold text-sm text-gray-500">
              <CircleX
                size={20}
                className="font-semibold text-xs text-[#ff0004] mr-2"
                fill="#ff999b"
              />
              Parking
            </li>
            <li className="flex items-center mb-1 font-semibold text-sm text-gray-500">
              <CircleX
                size={20}
                className="font-semibold text-xs text-[#ff0004] mr-2"
                fill="#ff999b"
              />
              Service en chambre
            </li>
            <li className="flex items-center font-semibold text-sm text-gray-500">
              <CircleX
                size={20}
                className="font-semibold text-xs text-[#ff0004] mr-2"
                fill="#ff999b"
              />
              Spa
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
