"use client";

import ResultCard from "@/app/Components/search/resultCard";
import ResultCardSkeleton from "@/app/Components/search/resultCardSkeleton";
import ResultsSidebar from "@/app/Components/search/resultsSidebar";
import TripDetails from "@/app/Components/search/tripDetails";
import { Provider } from "react-redux";
import { store } from "@/lib/store/store";
import AdComponent from "@/app/commonComponents/adComponent";
import TravelOptions from "@/app/Components/search/travelOptions";
import AlertPrices from "@/app/Components/search/alertPrices";
import TravelOptions2 from "@/app/Components/search/travelOptions2";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";

function FlightResults() {
  const { flightsData, loading } = useSelector((state: RootState) => state.vols);

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start justify-center p-2 sm:p-8 sm:space-x-8">
        {/* Mobile layout for filters and travel options */}
        <div className="flex w-full mb-4 sm:hidden">
          <div className="w-1/2">
            <ResultsSidebar />
          </div>
          {/* <div className="w-1/2">
            <TravelOptions />
          </div> */}
        </div>

        {/* Desktop sidebar */}
        <div className="hidden sm:flex flex-col w-[250px]">
          <div className="hidden lg:block">
            {/* <AlertPrices /> */}
            <h2 className="text-xs font-semibold text-gray-500">
              {`Nous avons trouvé ${flightsData.length} vols pour vous`}
            </h2>
          </div>
          <ResultsSidebar />
        </div>

        {/* Main content */}
        <div className="flex flex-col w-full space-y-4 sm:space-y-0 sm:w-[650px]">
          {/* <div className="hidden sm:block">
            <TravelOptions2 />
          </div> */}
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <span className="text-gray-500">Loading flights...</span>
            </div>
          ) : flightsData.length > 0 ? (
            flightsData.map((flight, index) => (
              <ResultCard key={index} flightData={flight} />
            ))
          ) : (
            <div className="flex justify-center items-center h-40">
              <span className="text-gray-500">No flights found</span>
            </div>
          )}
        </div>

        {/* Desktop ads */}
        <div className="hidden lg:block">
          <AdComponent />
        </div>
      </div>
      <TripDetails />
    </>
  );
}

export default function FlightsResults() {
  return (
    <Provider store={store}>
      <FlightResults />
    </Provider>
  );
}
