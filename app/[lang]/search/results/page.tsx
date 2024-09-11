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
      {/* Alerts */}
      <AlertPrices />
      {/* Options */}
      <TravelOptions />
      {/* Sidebar */}
      <ResultsSidebar />
      {/* Main content */}
      {/* Cards */}
      {[1, 2, 3, 4].map((index) => (
        <ResultCard key={index} />
      ))}
      {/* Right side */}
      {/* Ads */}
      <AdComponent />
    </Provider>
  );
}
