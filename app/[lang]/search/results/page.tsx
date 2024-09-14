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
    // Needs styling
    <Provider store={store}>
      <div className="flex flex-row items-start justify-center p-2 sm:p-8 sm:space-x-8">
        <div className="sm:flex flex-col w-[250px]">
          {/* Alerts */}
          <div className="hidden lg:block">
            <AlertPrices />
          </div>
          {/* Sidebar */}
          <ResultsSidebar />
        </div>
        <div className="flex flex-col w-[800px]">
          {/* Options */}
          <TravelOptions />
          {/* Main content */}
          {/* Cards */}
          {[1, 2, 3, 4].map((index) => (
            <ResultCard key={index} />
          ))}
        </div>
        <div className="hidden lg:block">
          {/* Right side */}
          {/* Ads */}
          <AdComponent />
        </div>
      </div>
    </Provider>
  );
}
