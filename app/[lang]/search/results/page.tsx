'use client';

import ResultCard from '@/app/Components/search/resultCard';
import ResultsSidebar from '@/app/Components/search/resultsSidebar';
import { Provider } from 'react-redux';
import { store } from '@/lib/store/store';
import AdComponent from '@/app/commonComponents/adComponent';

export default function SearchResults() {
  return (
    <div className="container mx-auto p-4 flex flex-row">
      {/* Sidebar */}
      <Provider store={store}>
        <ResultsSidebar />
      </Provider>

      {/* Main content */}
      <div className="flex-grow">
        {[1, 2, 3, 4].map((index) => (
          <ResultCard key={index} />
        ))}
      </div>

      {/* Ads */}
      <AdComponent />
    </div>
  );
}
