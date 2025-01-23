import Image from "next/image";

interface AirlineCompanyProps {
  logo: string;
  name: string;
}

export default function AirlineCompanyComponent({
  logo,
  name,
}: AirlineCompanyProps) {
  return (
    <div className="flex items-center bg-gray-100 rounded-2xl px-1 py-1.5">
      <div className="relative w-5 h-5">
        <Image
          src={logo}
          alt={`${name} logo`}
          width={20}
          height={20}
          className="object-contain rounded-full"
        />
      </div>
      <span className="ml-2 text-xs text-gray-800">{name}</span>
    </div>
  );
}
