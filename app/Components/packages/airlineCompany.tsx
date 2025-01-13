import Image from 'next/image';
import { generateAirlineColor } from '@/lib/utils/flightUtils';

interface AirlineCompanyProps {
  iata: string;
  name: string;
}

export default function AirlineCompanyComponent({
  iata,
  name,
}: AirlineCompanyProps) {
  const colors = generateAirlineColor(iata);

  return (
    <div className="flex items-center bg-[#f8f8f8] rounded-full px-1">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center mr-2"
        style={{ backgroundColor: colors.bg }}
      >
        <span className="text-sm font-semibold" style={{ color: colors.text }}>
          {iata}
        </span>
      </div>
      <span className="text-xs font-medium text-gray-600">{name}</span>
    </div>
  );
}
