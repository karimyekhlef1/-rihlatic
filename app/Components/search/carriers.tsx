import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import {
  setSearchTerm,
  toggleCarrier,
  toggleSelectAll,
  toggleShowAll,
} from "@/lib/store/custom/searchSlices/carrierSlice";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import Image from "next/image";
import { AIRLINE_IMAGE_URL } from "@/app/Constant/urls";

export default function AirlineCarrierSelector() {
  const dispatch = useDispatch();
  const { carriers, searchTerm, selectedCarriers, showAll } = useSelector(
    (state: RootState) => state.carriers
  );

  console.log("Carriers:", carriers);
  console.log("Selected Carriers:", selectedCarriers);
  console.log("Search Term:", searchTerm);

  const filteredCarriers = carriers.filter((carrier) =>
    carrier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleCarriers = showAll
    ? filteredCarriers
    : filteredCarriers.slice(0, 4);

  const handleCarrierToggle = (carrierCode: string) => {
    dispatch(toggleCarrier(carrierCode));
  };

  const handleSelectAll = () => {
    dispatch(toggleSelectAll());
  };

  if (!carriers.length) {
    return (
      <div className="w-full max-w-sm p-4">
        <p className="text-sm text-gray-500">No airlines available</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm p-4">
      <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-3 w-3 text-gray-400" />
        <Input
          type="text"
          placeholder="Search airlines"
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          className="pl-7 text-xs font-semibold"
        />
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold">Airlines</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSelectAll}
          className="text-xs font-semibold"
        >
          {selectedCarriers.length === carriers.length
            ? "Deselect all"
            : "Select all"}
        </Button>
      </div>
      <div className="space-y-2">
        {visibleCarriers.map((carrier, index) => (
          <div
            key={carrier.code}
            className={`flex items-center space-x-2 ${index === 3 && !showAll ? "opacity-50" : ""}`}
          >
            <Checkbox
              id={carrier.code}
              checked={selectedCarriers.includes(carrier.code)}
              onCheckedChange={() => handleCarrierToggle(carrier.code)}
              className="h-3 w-3"
            />
            <div className="flex items-center space-x-2">
              <div className="relative w-6 h-6">
                <Image
                  src={`${AIRLINE_IMAGE_URL}/${carrier.code}.png?default=airline.png`}
                  alt={carrier.name}
                  width={24}
                  height={24}
                  className="object-contain rounded-md border border-transparent"
                />
              </div>
              <Label htmlFor={carrier.code} className="text-xs font-semibold">
                {carrier.name}
              </Label>
            </div>
          </div>
        ))}
      </div>
      {filteredCarriers.length > 4 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch(toggleShowAll())}
          className="mt-2 w-full text-xs font-semibold"
        >
          {showAll ? "Show less" : "Show all airlines"}
        </Button>
      )}
    </div>
  );
}
