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
export default function Packages() {
  const { loading, packagesData } = useSelector((state: any) => state.packages);
  const dispatch = useDispatch<any>();
  const [packagesDate , setPackageData] = useState()
  useEffect(() => {
      const getData = async () => {
          const result = await dispatch(packagesFunc({ include: 'departures' }));
          console.log("result ", result)
          setPackageData(result.payload.result.packages)

 
      };
      getData();
  }, []);

  return (
    <div className="flex md:flex-row flex-col">
      <div className="px-14 flex flex-col items-center pt-10 gap-y-8 md:pb-10">
        <FilterComponent />
        <div className="hidden md:block">
          <AdComponent />
        </div>
      </div>
      <div className="px-10 pt-10 gap-y-8 pb-10 w-full">
        <Provider store={store}>
          {loading ? <Loading/> :
            <PackagesComponent data={packagesDate} />
          }
        </Provider>
      </div>
    </div>
  );
}
