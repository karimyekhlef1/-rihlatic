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
      {/* <SidebarSection title="Bags">
        <BaggageItem
          icon={<Luggage size={20} className="mr-2" />}
          type="Cabin baggage"
          count={cabinBaggage}
          onIncrement={() => dispatch(incrementCabin())}
          onDecrement={() => dispatch(decrementCabin())}
        />
        <BaggageItem
          icon={<Briefcase size={20} className="mr-2" />}
          type="Checked baggage"
          count={checkedBaggage}
          onIncrement={() => dispatch(incrementChecked())}
          onDecrement={() => dispatch(decrementChecked())}
        />
      </SidebarSection> */}
      <SidebarSection title="Hours">
        <Hours />
      </SidebarSection>
      <SidebarSection title="Stops">
        <Stops />
      </SidebarSection>
      {/* <SidebarSection title="Connections">
        <Connections />
      </SidebarSection> */}
      <SidebarSection title="Carriers">
        <AirlineCarrierSelector />
      </SidebarSection>
      <SidebarSection title="Airplanes">
        <Airplanes />
      </SidebarSection>
      <SidebarSection title="Price">
        <Price />
      </SidebarSection>
      {/* <SidebarSection title="Booking options">
        <BookingOptions />
      </SidebarSection>
      <SidebarSection title="★ Travel hacks">
        <TravelHacks />
      </SidebarSection>
      <SidebarSection title="Exclude countries">
        <ExcludedCountriesSelector />
      </SidebarSection> */}
    </>
  );

  return (
    <div className="flex flex-col pt-4">
      {isMobile ? (
        <Sheet>
          <SheetTrigger>
            <Button variant="ghost2" className="p-0">
              <Filter size={15} className="text-orange-500" />
              <span className="ml-2 text-xs font-semibold text-orange-500">
                Filters
              </span>
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"}>{sidebarContent}</SheetContent>
        </Sheet>
      ) : (
        sidebarContent
      )}
    </div>
  );
}
