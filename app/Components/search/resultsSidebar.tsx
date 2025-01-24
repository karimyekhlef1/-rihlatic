import { useState, useEffect } from "react";
import { RootState } from "@/lib/store/store";
import { useSelector, useDispatch } from "react-redux";

import {
  incrementCabin,
  decrementCabin,
  incrementChecked,
  decrementChecked,
} from "@/lib/store/custom/searchSlices/baggageSlice";

import BaggageItem from "./baggageItem";
import SidebarSection from "./sidebarSection";
import { Luggage, Briefcase, Filter } from "lucide-react";
import Stops from "./stops";
import Connections from "./connections";
import AirlineCarrierSelector from "./carriers";
import BookingOptions from "./bookingOptions";
import TravelHacks from "./travelHacks";
import ExcludedCountriesSelector from "./excludeCountries";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Hours from "./hours";
import Airplanes from "./airplanes";
import Price from "./price";

export default function ResultsSidebar() {
  const dispatch = useDispatch();
  const { cabin: cabinBaggage, checked: checkedBaggage } = useSelector(
    (state: RootState) => state.baggage
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Adjust this breakpoint as needed
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const sidebarContent = (
    <>
      <SidebarSection title="Hours">
        <Hours />
      </SidebarSection>

      <SidebarSection title="Stops">
        <Stops />
      </SidebarSection>
      <SidebarSection title="Carriers">
        <AirlineCarrierSelector />
      </SidebarSection>
      <SidebarSection title="Airplanes">
        <Airplanes />
      </SidebarSection>
      <SidebarSection title="Price">
        <Price />
      </SidebarSection>
    </>
  );

  return (
    <div className="flex flex-col pt-4">
      {isMobile ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-orange-500">
                Filters
              </span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] sm:w-[340px]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-4">{sidebarContent}</div>
          </SheetContent>
        </Sheet>
      ) : (
        sidebarContent
      )}
    </div>
  );
}
