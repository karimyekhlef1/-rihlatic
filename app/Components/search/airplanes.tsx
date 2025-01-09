import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";

export default function Airplanes() {
  const airlines = [
    "President Airlines",
    "Alitalia",
    "Nouvel Air Tunisie",
    "Iberia Airlines",
    "Air France",
    "Air Algerie",
    "Turkish Airlines",
    "Lufthansa",
    "Tunisair",
  ];

  const [selectedAirlines, setSelectedAirlines] = useState<string[]>(airlines);

  const handleSelectAll = (checked: boolean) => {
    setSelectedAirlines(checked ? airlines : []);
  };

  const handleAirlineToggle = (airline: string, checked: boolean) => {
    setSelectedAirlines((prev) =>
      checked ? [...prev, airline] : prev.filter((a) => a !== airline)
    );
  };

  const allSelected = selectedAirlines.length === airlines.length;

  return (
    <div className="space-y-4">
      <h3 className="text-xm font-medium text-muted-foreground">
        Select your preferred airline
      </h3>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="select-all"
          checked={allSelected}
          onCheckedChange={handleSelectAll}
        />
        <label
          htmlFor="select-all"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Select All
        </label>
      </div>

      <div className="space-y-2">
        {airlines.map((airline) => (
          <div key={airline} className="flex items-center space-x-2">
            <Checkbox
              id={airline}
              checked={selectedAirlines.includes(airline)}
              onCheckedChange={(checked) =>
                handleAirlineToggle(airline, checked as boolean)
              }
            />
            <label
              htmlFor={airline}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {airline}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
