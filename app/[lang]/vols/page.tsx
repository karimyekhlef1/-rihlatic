"use client";

import ResultCard from "@/app/Components/search/resultCard";
import ResultCardSkeleton from "@/app/Components/search/resultCardSkeleton";
import ResultsSidebar from "@/app/Components/search/resultsSidebar";
import TripDetails from "@/app/Components/search/tripDetails";
import AdComponent from "@/app/commonComponents/adComponent";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { selectFilteredFlights } from "@/lib/store/selectors/flightSelectors";
import Image from "next/image";
import NoResults from "@/public/images/NoResults.png";
import VolSearchComponent from "@/app/Components/home/engine/vol/volSearchComponent";
function FlightResults() {
  const { loading } = useSelector((state: RootState) => state.vols);
  const filteredFlights = useSelector(selectFilteredFlights);
  const { dataOfSearch } = useSelector(
    (state: RootState) => state.flightPayment
  );
  console.log("dataOfSearch",dataOfSearch)
  return (
    <div className="">
      <div  className='bg-white w-full'>
    <div className="  py-4 mt-2 w-full container">
    <VolSearchComponent  />
    </div>
    </div>
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
              {`Nous avons trouvé ${filteredFlights.length} vols pour vous`}
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
            <div className="space-y-4">
              <ResultCardSkeleton />
              <ResultCardSkeleton />
              <ResultCardSkeleton />
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFlights.map((flight: any, index: number) => (
                <ResultCard key={index} flightData={flight} />
              ))}
              {filteredFlights.length === 0 && (
                <div className="text-center py-8">
                  <div className="flex justify-center mb-4">
                    <Image
                      src={NoResults.src}
                      alt="No results"
                      width={300}
                      height={300}
                    />
                  </div>
                  <h3 className="text-gray-800 font-semibold">
                    No flights found
                  </h3>
                  <p className="text-gray-500 text-xs">
                    No flights found matching your filters.There are currently
                    no flights for your selected filters, try searching again
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Desktop ads */}
        <div className="hidden lg:block">
          <AdComponent />
        </div>
      </div>
      <TripDetails />
    </div>
  );
}

export default function FlightsResults() {
  return (
    <FlightResults />
  );
}
