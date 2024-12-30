'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo } from 'react';
import AdComponent from '@/app/commonComponents/adComponent';
import HotelsCardsComponent from '@/app/Components/hotels/hotelsCardsComponent';
import FilterComponentHotels from '@/app/Components/hotels/FilterComponentHotels';
import HotelsSearchComponent from '@/app/Components/home/engine/hotels/hotelsSearchComponent';
import { getMaxAndMinPrices } from '@/app/hooks/useFilterHotels';
import { HotelType } from '@/app/Types/hotel/HotelDetails';
import { setMaxMinRangePrice } from '@/lib/store/custom/hotelSlices/HotelStateSlice';

export default function Hotels() {
  const dispatch = useDispatch();
  const { filterRangePrice, filterRating } = useSelector((state: any) => state.hotelState);

  useEffect(() => {
    const prices = getMaxAndMinPrices(initHotels);
    dispatch(setMaxMinRangePrice(prices));
  }, [dispatch]);

  const filteredHotels = useMemo(() => {
    return initHotels.filter(hotel => {
      const matchesPrice = hotel.rate >= filterRangePrice.min && 
                          hotel.rate <= filterRangePrice.max;
      const matchesRating = !filterRating || hotel.rating === filterRating;
      return matchesPrice && matchesRating;
    });
  }, [filterRangePrice, filterRating]);

  return (
    <div className="">
      <div className="flex justify-center py-4 mt-2 bg-white">
        <HotelsSearchComponent />
      </div>
      <div className="flex md:flex-row flex-col">
        <div className="px-14 flex flex-col items-center pt-10 gap-y-8 md:pb-10">
          <FilterComponentHotels />
          <div className="hidden md:block">
            <AdComponent />
          </div>
        </div>
        <div className="px-10 pt-10 gap-y-8 pb-10">
          <Provider store={store}>
            <HotelsCardsComponent data={filteredHotels} />
          </Provider>
        </div>
      </div>
    </div>
  );
}

// Keep initHotels constant as is


const initHotels :  HotelType[]  =[{
  supplier: "MYGO",
  supplier_logo: "https://b2b.mygo.pro/images_dir/v2019/mygo-logo.svg",
  number: "35050113422",
  ref: "155168",
  feature_image: "https://pictures.netstorming.net/common/hotels/155168/original/0.jpg",
  rate: 88387,
  highestRate: 107104,
  name: "LES MIMOSAS",
  address: "Avenue Habib Bourguiba, 8110",
  rating: 3,
  reviews: 0,
  localisation: {
      longitude: 0,
      latitude: 0
  },
  promotion: {
      name: null,
      date: null
  }
},
{
  supplier: "MYGO",
  supplier_logo: "https://b2b.mygo.pro/images_dir/v2019/mygo-logo.svg",
  number: "35050113422",
  ref: "105466",
  feature_image: "https://pictures.netstorming.net/common/hotels/105466/original/0.jpg",
  rate: 73113,
  highestRate: 122558,
  name: "DAR ISMAIL",
  address: "Zone Touristique Tabarka , Tabarka 8110",
  rating: 5,
  reviews: 0,
  localisation: {
      longitude: 0,
      latitude: 0
  },
  promotion: {
      name: null,
      date: null
  }
},
{
  supplier: "MYGO",
  supplier_logo: "https://b2b.mygo.pro/images_dir/v2019/mygo-logo.svg",
  number: "35050113422",
  ref: "220170",
  feature_image: "https://pictures.netstorming.net/common/hotels/220170/original/0.jpg",
  rate: 70132,
  highestRate: 102010,
  name: "RESIDENCE CORAIL ROYAL PLAGE",
  address: "Avenue 14 Janvier 544, 8110",
  rating: 0,
  reviews: 0,
  localisation: {
      longitude: 0,
      latitude: 0
  },
promotion: {
      name: null,
      date: null
  }
},

]