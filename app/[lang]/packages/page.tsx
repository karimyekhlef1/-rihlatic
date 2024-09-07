'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/store/store';

import AdComponent from '@/app/commonComponents/adComponent';
import FilterComponent from '@/app/Components/packages/filtersComponent';
import PackagesComponent from '@/app/Components/packages/packagesComponent';

export default function Packages() {
  return (
    <div className="flex md:flex-row flex-col">
      <div className="px-14 flex flex-col items-center pt-10 gap-y-8 md:pb-10">
        <FilterComponent />
        <div className="hidden md:block">
          <AdComponent />
        </div>
      </div>
      <div className="px-10 pt-10 gap-y-8 pb-10">
        <Provider store={store}>
          <PackagesComponent />
        </Provider>
      </div>
    </div>
  );
}
