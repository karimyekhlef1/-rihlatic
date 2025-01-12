"use client";

import ResultCard from "@/app/Components/search/resultCard";
import ResultsSidebar from "@/app/Components/search/resultsSidebar";
import { Provider } from "react-redux";
import { store } from "@/lib/store/store";
import AdComponent from "@/app/commonComponents/adComponent";
import TravelOptions from "@/app/Components/search/travelOptions";
import AlertPrices from "@/app/Components/search/alertPrices";
import TravelOptions2 from "@/app/Components/search/travelOptions2";
import TripDetails from "@/app/Components/search/tripDetails";
import TripSummaryComponent from "@/app/Components/packages/tripSummary";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchFlights,
  closeDialogSummary,
} from "@/lib/store/api/vols/volsSlice";
import { Flight } from "@/lib/types/flight";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Separate component for the flights results content
function FlightsResultsContent() {
  const dispatch = useDispatch<any>();

  const searchData = useSelector(
    (state: { volSearchSlice: { searchData: any } }) =>
      state.volSearchSlice?.searchData
  );

  const { flightsData, loading, error } = useSelector(
    (state: {
      vols: { flightsData: Flight[]; loading: boolean; error: string | null };
    }) => state.vols
  );

  const selectedFlight = useSelector(
    (state: { vols: { selectedFlight: Flight | null } }) =>
      state.vols.selectedFlight
  );

  const isSummaryOpen = useSelector(
    (state: { vols: { isSummaryOpen: boolean } }) => state.vols.isSummaryOpen
  );

  useEffect(() => {
    if (searchData) {
      dispatch(searchFlights(searchData));
    }
  }, [searchData, dispatch]);

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start justify-center p-2 sm:p-8 sm:space-x-8">
        {/* Mobile layout for filters and travel options */}
        <div className="flex w-full mb-4 sm:hidden">
          <div className="w-1/2">
            <ResultsSidebar />
          </div>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden sm:flex flex-col w-[250px]">
          <div className="hidden lg:block">
            <h2 className="text-xs font-semibold text-gray-500">
              {loading
                ? "Searching flights..."
                : error
                  ? "Error finding flights"
                  : `Nous avons trouvé ${flightsData.length} vols pour vous`}
            </h2>
          </div>
          <ResultsSidebar />
        </div>

        {/* Main content */}
        <div className="flex flex-col w-full space-y-4 sm:space-y-0 sm:w-[650px]">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : flightsData.length > 0 ? (
            flightsData.map((flight, index) => (
              <ResultCard key={index} flight={flight} />
            ))
          ) : (
            <div>No flights found</div>
          )}
        </div>

        {/* Desktop ads */}
        <div className="hidden lg:block">
          <AdComponent />
        </div>
      </div>
      <TripDetails flight={selectedFlight || undefined} />
      <Dialog
        open={isSummaryOpen}
        onOpenChange={() => dispatch(closeDialogSummary())}
      >
        <DialogContent>
          {selectedFlight && <TripSummaryComponent flightInfo={selectedFlight} />}
        </DialogContent>
      </Dialog>
    </>
  );
}

// Main component that provides the Redux store
export default function FlightsResults() {
  return (
    <Provider store={store}>
      <FlightsResultsContent />
    </Provider>
  );
}
