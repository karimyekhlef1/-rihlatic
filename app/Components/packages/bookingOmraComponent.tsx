import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CircleCheck, ArrowRight, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setOmraDepartureId } from "@/lib/store/custom/commonSlices/omraReservationSlice";

import { RoomDialog } from "@/app/Components/packages/room-dialog";

import PopularFacilitiesOmra from "../omra/PopularFacilitiesOmra";

interface DepartureOption {
  id: number;
  label: string;
  data: any;
}

interface BookingOmraComponentProps {
  data: any;
  facilities?: {
    visa: boolean;
    vol: boolean;
    hotel: boolean;
    transfer: boolean;
    excursion: boolean;
    cruise: boolean;
  };
  onDepartureSelect?: (departure: any) => void;
}

export default function BookingOmraComponent({
  data,
  facilities,
  onDepartureSelect,
}: BookingOmraComponentProps) {
  const dispatch = useDispatch();

  // Safely parse dates with validation
  const parseDateSafely = (dateString: string | undefined) => {
    if (!dateString) return new Date();
    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return new Date();
      }
      return date;
    } catch (error) {
      return new Date();
    }
  };

  const [selectedDeparture, setSelectedDeparture] =
    useState<DepartureOption | null>(null);
  const [selectedDepartureData, setSelectedDepartureData] = useState(
    data?.[0] || null
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRoomDialogOpen, setIsRoomDialogOpen] = useState(false);

  const departure_date = parseDateSafely(selectedDepartureData?.departure_date);
  const return_date = parseDateSafely(selectedDepartureData?.return_date);
  const formattedDeparture_date = format(departure_date, "dd-MMMM-yyyy", {
    locale: fr,
  });
  const formattedReturn_date = format(return_date, "dd-MMMM-yyyy", {
    locale: fr,
  });

  const departureOptions: DepartureOption[] = data
    ?.filter((item: any) => item?.departure_date != null)
    ?.map((item: any, index: number) => ({
      id: item.id,
      label: format(new Date(item.departure_date), "dd-MMMM-yyyy", {
        locale: fr,
      }),
      data: item,
    })) || [];

  const handleDepartureSelect = (option: DepartureOption) => {
    setSelectedDeparture(option);
    setSelectedDepartureData(option.data);
    setIsDropdownOpen(false);
    dispatch(setOmraDepartureId(option.id));
    onDepartureSelect?.(option.data);
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
                {selectedDepartureData?.price_ini} DZD
              </p>
            </div>
            <Separator />

            {facilities && (
              <PopularFacilitiesOmra
                visa={facilities.visa}
                vol={facilities.vol}
                hotel={facilities.hotel}
                transfer={facilities.transfer}
                excursion={facilities.excursion}
                cruise={facilities.cruise}
              />
            )}
            <div className="flex flex-col pt-4 pb-8">
              <div className="flex flex-row items-center">
                <CircleCheck
                  size={15}
                  className="font-semibold text-xs text-[#43acff]"
                  fill="#b4deff"
                />
                <p className="text-xs text-gray-700 font-medium pl-2">
                  {selectedDepartureData?.total_days} nights{" "}
                  <span className="text-xs text-gray-700 font-bold">/</span>{" "}
                  {selectedDepartureData?.total_days + 1} days
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
                className="w-full text-sm font-medium px-8 py-2 bg-white text-[#ff8000] border-2 border-[#ff8000] rounded-xl cursor-pointer flex items-center justify-center transition-colors duration-200 hover:bg-orange-50"
              >
                <span>
                  {selectedDeparture
                    ? selectedDeparture.label
                    : "Select departure"}
                </span>
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
