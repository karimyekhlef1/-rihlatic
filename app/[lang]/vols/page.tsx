"use client";

import ResultCard from "@/app/Components/search/resultCard";
import ResultCardSkeleton from "@/app/Components/search/resultCardSkeleton";
import NoFlightsFound from "@/app/Components/search/noFlightsFound";
import ResultsSidebar from "@/app/Components/search/resultsSidebar";
import { Provider } from "react-redux";
import { RootState, store } from "@/lib/store/store";
import AdComponent from "@/app/commonComponents/adComponent";
import TravelOptions from "@/app/Components/search/travelOptions";
import AlertPrices from "@/app/Components/search/alertPrices";
import TravelOptions2 from "@/app/Components/search/travelOptions2";
import TripDetails from "@/app/Components/search/tripDetails";
import TripSummaryComponent from "@/app/Components/packages/tripSummary";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { cn, buttonVariants } from "@/lib/utils";

import { useEffect, useState } from "react";
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

  const selectedDepartureTimes = useSelector(
    (state: RootState) => state.timeFilters.selectedDepartureTimes
  );
  const selectedReturnTimes = useSelector(
    (state: RootState) => state.timeFilters.selectedReturnTimes
  );

  const selectedStopFilter = useSelector(
    (state: RootState) => state.stopsFilter.selectedStopFilter
  );

  const selectedCarriers = useSelector(
    (state: RootState) => state.carriers.selectedCarriers
  );

  const selectedFlight = useSelector(
    (state: { vols: { selectedFlight: Flight | null } }) =>
      state.vols.selectedFlight
  );

  const isSummaryOpen = useSelector(
    (state: { vols: { isSummaryOpen: boolean } }) => state.vols.isSummaryOpen
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Add debug logging for first flight
  useEffect(() => {
    if (flightsData.length > 0) {
      const firstFlight = flightsData[0];
      console.log('Flight Structure Debug:', {
        firstSegment: firstFlight?.segments?.[0]?.[0],
        segmentProperties: firstFlight?.segments?.[0]?.[0] ? 
          Object.entries(firstFlight.segments[0][0]).filter(([key, value]) => 
            typeof value === 'string' && value.length <= 3
          ) : []
      });
    }
  }, [flightsData]);

  // Filter flights based on selected times, stops, and carriers
  const filteredFlights = flightsData.filter((flight) => {
    if (
      !flight.segments ||
      !flight.segments[0] ||
      flight.segments[0].length === 0
    ) {
      return false;
    }

    const segments = flight.segments[0];
    const departureTime = segments[0]?.depTime;
    const arrivalTime = segments[segments.length - 1]?.arrTime;

    // Check if flight matches all selected departure times
    const matchesDeparture =
      selectedDepartureTimes.length === 0 ||
      (departureTime && selectedDepartureTimes.includes(departureTime));

    // Check if flight matches all selected return times
    const matchesReturn =
      selectedReturnTimes.length === 0 ||
      (arrivalTime && selectedReturnTimes.includes(arrivalTime));

    // Calculate number of stops
    const numberOfStops = segments.length - 1;

    // Check if flight matches selected stop filter
    let matchesStops = true;
    switch (selectedStopFilter) {
      case "direct":
        matchesStops = numberOfStops === 0;
        break;
      case "up-to-1-stop":
        matchesStops = numberOfStops <= 1;
        break;
      case "up-to-2-stops":
        matchesStops = numberOfStops === 2;
        break;
      case "any":
      default:
        matchesStops = true;
        break;
    }

    // Check if any segment's carrier matches selected carriers
    const matchesCarrier =
      selectedCarriers.length === 0 ||
      segments.some(segment => selectedCarriers.includes(segment.marketCompany));

    return matchesDeparture && matchesReturn && matchesStops && matchesCarrier;
  });

  // Calculate pagination values
  const totalPages = Math.ceil(filteredFlights.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFlights = filteredFlights.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (searchData) {
      dispatch(searchFlights(searchData));
    }
  }, [searchData, dispatch]);

  useEffect(() => {
    if (flightsData.length > 0) {
      const firstFlight = flightsData[0];
      const firstSegment = firstFlight?.segments?.[0]?.[0];
      console.log('First Flight Segment:', firstSegment);
      console.log('All segment properties:', Object.keys(firstSegment || {}));
    }
  }, [flightsData]);

  useEffect(() => {
    if (flightsData.length > 0) {
      const firstFlight = flightsData[0];
      console.log('Flight Carrier Debug:', {
        flight: firstFlight,
        segments: firstFlight.segments?.[0]?.map(segment => ({
          carrier: segment.carrier,
          airlineCode: segment.airlineCode,
          airline: segment.airline,
          // Log all properties that might contain carrier info
          allProps: Object.entries(segment).filter(([key]) => 
            key.toLowerCase().includes('carrier') || 
            key.toLowerCase().includes('airline')
          )
        }))
      });
    }
  }, [flightsData]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDepartureTimes, selectedReturnTimes, selectedStopFilter, selectedCarriers]);

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
                  : `Nous avons trouvé ${filteredFlights.length} vols pour vous`}
            </h2>
          </div>
          <ResultsSidebar />
        </div>

        {/* Main content */}
        <div className="flex flex-col w-full space-y-4 sm:space-y-0 sm:w-[650px]">
          {loading ? (
            // Show 6 skeleton items during loading
            Array.from({ length: 6 }).map((_, index) => (
              <ResultCardSkeleton key={index} />
            ))
          ) : error ? (
            <div>Error: {error}</div>
          ) : filteredFlights.length > 0 ? (
            <>
              {currentFlights.map((flight, index) => (
                <ResultCard key={index} flight={flight} />
              ))}

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination className="my-4">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "hover:bg-orange-100 hover:text-orange-500",
                          currentPage === 1 && "pointer-events-none opacity-50"
                        )}
                        onClick={() => handlePageChange(currentPage - 1)}
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }).map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          className={cn(
                            buttonVariants({ variant: "outline" }),
                            "hover:bg-orange-100 hover:text-orange-500",
                            currentPage === i + 1 &&
                              "bg-orange-500 text-white hover:bg-orange-600 hover:text-white"
                          )}
                          onClick={() => handlePageChange(i + 1)}
                          isActive={currentPage === i + 1}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "hover:bg-orange-100 hover:text-orange-500",
                          currentPage === totalPages &&
                            "pointer-events-none opacity-50"
                        )}
                        onClick={() => handlePageChange(currentPage + 1)}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          ) : (
            <NoFlightsFound />
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
          {selectedFlight && (
            <TripSummaryComponent flightInfo={selectedFlight} />
          )}
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
