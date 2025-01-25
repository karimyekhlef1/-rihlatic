'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AppDispatch } from '@/lib/store/store'; // Make sure this type exists in your store file
import AdComponent from '@/app/commonComponents/adComponent';
import HotelsCardsComponent from '@/app/Components/hotels/hotelsCardsComponent';
import FilterComponentHotels from '@/app/Components/hotels/FilterComponentHotels';
import HotelsSearchComponent from '@/app/Components/home/engine/hotels/hotelsSearchComponent';
import { HotelType } from '@/app/Types/hotel/HotelDetails';
import { setMaxMinRangePrice , setFilterRangePrice } from '@/lib/store/custom/hotelSlices/HotelStateSlice';
import { getHotels } from '@/lib/store/api/hotels/hotelsSlice';
import Loading from '@/app/Components/home/Loading';
import { format } from "date-fns";
import EmptyComponent from '@/app/commonComponents/emptyComponent';
interface Room {
  adults: number;
  children: number;
  childAges:number[]
}

interface HotelState {
  filterRangePrice: {
    min: number;
    max: number;
  };
  filterRating: number | null;
}

interface HotelSearchState {
  rooms: Room[];
}

export default function Hotels() {
  
  const dispatch = useDispatch<AppDispatch>();
  const dateRange = useSelector((state: { hotelSearchSlice: { dateRange: any } }) => state.hotelSearchSlice?.dateRange);
  const selectedDestination = useSelector((state: any) => state.hotelSearchSlice.selectedDestination);

  const { filterRangePrice, filterRating } = useSelector<any, HotelState>((state) => state.hotelState);
  const rooms = useSelector<any>((state) => state.hotelSearchSlice.rooms);
  const { loading, hotelData } = useSelector((state: any) => state.hotels);
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const [error, setError] = useState<string | null>(null);


  const formatRoomsQuery = useCallback((rooms: any): Record<string, string | number | null> => {
    return rooms.reduce((acc :any, room :Room, index:number) => ({
      ...acc,
      [`room[${index}][adult]`]: room.adults,
      [`room[${index}][children]`]: room.children,
      [`room[${index}][ages]`]:room.childAges.length> 0 ? room.childAges.join('-'):"null",
      [`room[${index}][count]`]: 1,
    }), {});
  }, []);

  const fetchHotels = (async () => {
    try {
  

      const roomsQuery = formatRoomsQuery(rooms);
      const response = await dispatch(
        getHotels({
               checkin:  dateRange.from?format(dateRange.from,"yyyy-MM-dd"):"",
               checkout: dateRange.to ?format(dateRange.to,"yyyy-MM-dd"):"",
               'city[mygo][id]':selectedDestination.mygo_code ,
               'city[cng][id]':selectedDestination.cng_code,
               ...roomsQuery
        })
      ).unwrap(); // Use unwrap() to handle the AsyncThunkAction 
      if (!response?.result?.Hotels) {
        throw new Error('Invalid response format');
      }

      const fetchedHotels = response.result.Hotels;
      setHotels(fetchedHotels);

      if (response.result.filters.prices) {

        const prices = {
          min: Math.min(response.result.filters.prices.max, response.result.filters.prices.min),
          max: Math.max(response.result.filters.prices.min, response.result.filters.prices.max),
        };
      
        console.log("prices",response.result.filters)
        dispatch(setMaxMinRangePrice(prices));
        dispatch(setFilterRangePrice(prices));

      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch hotels');
      console.error('Error fetching hotels:', err);
    }
  });


  const filteredHotels = useMemo(() => {
    return hotels.filter(hotel => {
      const matchesPrice = 
        hotel.rate >= filterRangePrice.min &&
        hotel.rate <= filterRangePrice.max;
        
      const matchesRating = 
        !filterRating || 
        hotel.rating === filterRating;
        
      return matchesPrice && matchesRating;
    });
  }, [hotels, filterRangePrice, filterRating]);



  if (loading){
    return <Loading />
  }
  

return (
  <div className="">
    <div className="flex justify-center py-4 mt-2 bg-white">
    <HotelsSearchComponent 
       onSearch={fetchHotels} />
    </div>

    <div className="flex md:flex-row flex-col">
      <div className="px-14 flex flex-col items-center pt-10 gap-y-8 md:pb-10">
      <FilterComponentHotels/>
        <div className="hidden md:block">
          <AdComponent />
        </div>
      </div>
      <div className="px-10 pt-10 gap-y-8 pb-10 w-full">
         {
           filteredHotels.length === 0 ? (
             <EmptyComponent message='No hotels found' />
           ) : (
             <HotelsCardsComponent 
               data={filteredHotels}
             />
           )
         }
      </div>
    </div>
  </div>
);
}

