'use client';
import { Provider } from 'react-redux';
import { store } from '@/lib/store/store';
import AdComponent from '@/app/commonComponents/adComponent';
import HotelsCardsComponent from '@/app/Components/hotels/hotelsCardsComponent';
import FilterComponentHotels from '@/app/Components/hotels/FilterComponentHotels';
import HotelsSearchComponent from '@/app/Components/home/engine/hotels/hotelsSearchComponent';
export default function Hotels() {
  const stars = 5; // Example: Max stars
  const prices = { min: "100", max: "1000" };
  return (
    <div className='  '>
      <div  className='flex justify-center py-4 mt-2 bg-white'>
      <HotelsSearchComponent />
 
      </div>

    
    <div className="flex md:flex-row flex-col">
      <div className="px-14 flex flex-col items-center pt-10 gap-y-8 md:pb-10">
      <FilterComponentHotels stars={stars} prices={prices} />
        <div className="hidden md:block">
          <AdComponent />
        </div>
      </div>
      <div className="px-10 pt-10 gap-y-8 pb-10">
        <Provider store={store}>
          <HotelsCardsComponent />
        </Provider>
      </div>
    </div>
    </div>
  );
}
