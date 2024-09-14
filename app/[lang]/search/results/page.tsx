'use client';

import ResultCard from '@/app/Components/search/resultCard';
import ResultsSidebar from '@/app/Components/search/resultsSidebar';
import { Provider } from 'react-redux';
import { store } from '@/lib/store/store';
import AdComponent from '@/app/commonComponents/adComponent';
import TravelOptions from '@/app/Components/search/travelOptions';
import AlertPrices from '@/app/Components/search/alertPrices';

export default function SearchResults() {
  return (
    <Provider store={store}>
      <div className="flex flex-col sm:flex-row items-start justify-center p-2 sm:p-8 sm:space-x-8">
        {/* Mobile layout for filters and travel options */}
        <div className="flex w-full mb-4 sm:hidden">
          <div className="w-1/2">
            <ResultsSidebar />
          </div>
          <div className="w-1/2">
            <TravelOptions />
          </div>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden sm:flex flex-col w-[250px]">
          <div className="hidden lg:block">
            <AlertPrices />
          </div>
          <ResultsSidebar />
        </div>

        {/* Main content */}
        <div className="flex flex-col w-full space-y-4 sm:space-y-0 sm:w-[800px]">
          <div className="hidden sm:block">
            <TravelOptions />
          </div>
          {[1, 2, 3, 4].map((index) => (
            <ResultCard key={index} />
          ))}
        </div>

        {/* Desktop ads */}
        <div className="hidden lg:block">
          <AdComponent />
        </div>
      </div>
    </Provider>
  );
}
