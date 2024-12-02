'use client';
import { useEffect , useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/lib/store/store';

import AdComponent from '@/app/commonComponents/adComponent';
import FilterComponent from '@/app/Components/packages/filtersComponent';
import PackagesComponent from '@/app/Components/packages/packagesComponent';
import Loading from '@/app/Components/home/Loading';
import { useSelector , useDispatch } from 'react-redux';
import { packagesFunc } from '@/lib/store/api/packages/packagesSlice';
import { extractData } from '@/app/hooks/useExtractData';
export default function Packages() {
  const { loading, packagesData } = useSelector((state: any) => state.packages);
  const dispatch = useDispatch<any>();
  const [packages, setPackage] = useState<any[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  useEffect(() => {
      const getData = async () => {
          const result = await dispatch(packagesFunc({ include: 'departures' }));
          setPackage(result.payload.result.packages)
      };
      getData();
  }, []);
  if(loading) return <Loading/>
 
  const packageCategories = extractData(packages, (pkg) => pkg.category);
  const countryNames = extractData(packages, (pkg) =>
    pkg.destinations.map((dest:any) => dest.country.name)
  );
 


  return (
    <div className="flex md:flex-row flex-col">
      <div className="px-14 flex flex-col items-center pt-10 gap-y-8 md:pb-10">
        <FilterComponent 
        packageCategories={packageCategories} 
        countryNames={countryNames}
        selectedCountries={selectedCountries}
        selectedCategories={selectedCategories}
        setSelectedCountries={setSelectedCountries}
        setSelectedCategories={setSelectedCategories}
        />
        <div className="hidden md:block">
          <AdComponent />
        </div>
      </div>
      <div className="px-10 pt-10 gap-y-8 pb-10 w-full">
        <Provider store={store}>
            <PackagesComponent data={packages} />
        </Provider>
      </div>
    </div>
  );
}
