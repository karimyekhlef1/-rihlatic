import Image from 'next/image';

interface AirlineCompanyProps {
  logo: string;
  name: string;
}

export default function AirlineCompanyComponent({
  logo,
  name,
}: AirlineCompanyProps) {
  return (
    <div className="flex items-center bg-[#f8f8f8] rounded-full px-1">
      <Image src={logo} alt={name} width={18} height={18} className="mr-2" />
      <p className="text-xs font-medium text-gray-500">{name}</p>
    </div>
  );
}
