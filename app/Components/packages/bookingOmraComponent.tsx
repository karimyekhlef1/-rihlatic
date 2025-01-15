import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CircleCheck, ArrowRight, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setOmraDepartureId } from "@/lib/store/custom/commonSlices/omraReservationSlice";

import Link from "next/link";
import { RoomDialog } from "@/app/Components/packages/room-dialog";

interface DepartureOption {
  id: number;
  label: string;
}

export default function BookingPackageComponent(data: any) {
  const dispatch = useDispatch();
  const departure_date = new Date(data?.data?.[0]?.departure_date);
  const return_date = new Date(data?.data?.[0]?.return_date);
  const formattedDeparture_date = format(departure_date, "dd-MMMM-yyyy", {
    locale: fr,
  });
  const formattedReturn_date = format(return_date, "dd-MMMM-yyyy", {
    locale: fr,
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDeparture, setSelectedDeparture] = useState<DepartureOption | null>(null);
  const [isRoomDialogOpen, setIsRoomDialogOpen] = useState(false);

  const departureOptions: DepartureOption[] = [
    {
      id: 4,
      label: formattedDeparture_date,
    },
  ];

  const handleDepartureSelect = (option: DepartureOption) => {
    setSelectedDeparture(option);
    setIsDropdownOpen(false);
    dispatch(setOmraDepartureId(option.id));
  };

  const handleBookNowClick = () => {
    if (selectedDeparture) {
      setIsRoomDialogOpen(true);
    }
  };

  return (
    <div>
      <Card className="w-[300px] rounded-xl">
        <CardContent className="px-0 py-8">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center justify-center pb-4">
              <p className="text-xs">Starting from</p>
              <p className="font-semibold text-lg">
                {data?.data?.[0]?.price_ini} DZD
              </p>
            </div>
            <Separator />
            <div className="flex flex-col pt-4 pb-8">
              <div className="flex flex-row items-center">
                <CircleCheck
                  size={15}
                  className="font-semibold text-xs text-[#43acff]"
                  fill="#b4deff"
                />
                <p className="text-xs text-gray-700 font-medium pl-2">
                  {data?.data?.[0]?.total_days} nights{" "}
                  <span className="text-xs text-gray-700 font-bold">/</span>{" "}
                  {data?.data?.[0]?.total_days + 1} days
                </p>
              </div>
              <div className="flex flex-row items-center mt-2">
                <CircleCheck
                  size={15}
                  className="font-semibold text-xs text-[#ff8000]"
                  fill="#ffcc99"
                />
                <p className="flex flex-row items-center text-xs text-gray-700 font-medium pl-2">
                  {formattedDeparture_date}
                  <ArrowRight size={15} strokeWidth={3} />
                  {formattedReturn_date}
                </p>
              </div>
            </div>
            <div className="pb-4 relative w-[80%]">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full text-sm font-medium px-8 py-2 bg-white text-[#ff8000] border-2 border-[#ff8000] rounded-xl cursor-pointer flex items-center justify-center"
              >
                <span>{selectedDeparture ? selectedDeparture.label : "Select departure"}</span>
                <ChevronDown
                  className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""} ml-2`}
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border-2 border-[#ff8000] rounded-xl overflow-hidden transition-all duration-300 ease-in-out">
                  {departureOptions.map((option) => (
                    <div
                      key={option.id}
                      className="text-sm text-center font-semibold px-8 py-2 text-[#ff8000] cursor-pointer hover:bg-[#fff0e0] transition-colors duration-200"
                      onClick={() => handleDepartureSelect(option)}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Separator className="w-[90%]" />
            <div className="pt-4">
              <Button
                className="px-20"
                variant={"rihlatic"}
                disabled={!selectedDeparture}
                onClick={handleBookNowClick}
              >
                Book Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <RoomDialog
        open={isRoomDialogOpen}
        onOpenChange={(open) => setIsRoomDialogOpen(open)}
      />
    </div>
  );
}
