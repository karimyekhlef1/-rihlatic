import React from "react";
import { Plane, Hotel, Bus, Ship, TicketsPlane, Map } from "lucide-react";
import { CheckCircle2, XCircle } from "lucide-react";

interface FacilityProps {
  active: boolean;
  label: string;
  icon: React.ReactNode;
}

const Facility = ({ active, label, icon }: FacilityProps) => (
  <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
    <div className="text-gray-600">{icon}</div>
    {active ? (
      <CheckCircle2 className="h-5 w-5 text-green-500" />
    ) : (
      <XCircle className="h-5 w-5 text-red-500" />
    )}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

interface OmraFacilitiesProps {
  facilities: {
    visa: boolean;
    vol: boolean;
    hotel: boolean;
    transfer: boolean;
    excursion: boolean;
    cruise: boolean;
  };
}

export default function OmraFacilities({ facilities }: OmraFacilitiesProps) {
  const facilityItems = [
    {
      key: "visa",
      label: "Visa",
      icon: <TicketsPlane size={20} />,
      active: facilities.visa,
    },
    {
      key: "vol",
      label: "Flight",
      icon: <Plane size={20} />,
      active: facilities.vol,
    },
    {
      key: "hotel",
      label: "Hotel",
      icon: <Hotel size={20} />,
      active: facilities.hotel,
    },
    {
      key: "transfer",
      label: "Transfer",
      icon: <Bus size={20} />,
      active: facilities.transfer,
    },
    {
      key: "excursion",
      label: "Excursion",
      icon: <Map size={20} />,
      active: facilities.excursion,
    },
    {
      key: "cruise",
      label: "Cruise",
      icon: <Ship size={20} />,
      active: facilities.cruise,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {facilityItems.map((facility) => (
        <Facility
          key={facility.key}
          active={facility.active}
          label={facility.label}
          icon={facility.icon}
        />
      ))}
    </div>
  );
}
