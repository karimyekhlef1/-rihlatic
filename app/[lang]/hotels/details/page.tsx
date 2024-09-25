'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/store/store';

import TitleComponent from '@/app/commonComponents/titleComponent';
import ContentComponent from '@/app/commonComponents/contentComponent';
import GallerySlider from '@/app/commonComponents/gallerySliderComponent';

import { Hotel, Sparkles, Bed } from 'lucide-react';

import RoomsCard from '@/app/Components/hotels/roomsCard';
import HotelFooter from '@/app/Components/hotels/hotelFooter';
import MapComponent from '@/app/Components/hotels/mapComponent';
import BookingHotelComponent from '@/app/Components/hotels/bookHotel';
import PopularFacilities from '@/app/Components/hotels/popularFacilities';
import OrganizeSection from '@/app/Components/home/organizeSection';

const content =
  'This is just a place holder. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores voluptate tempora reprehenderit natus in debitis voluptatibus non dolor itaque repellat? Rem dicta corrupti facere id eum nihil magni excepturi officia. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores voluptate tempora reprehenderit natus in debitis voluptatibus non dolor itaque repellat? Rem dicta corrupti facere id eum nihil magni excepturi officia.';

export default function Details() {
  return (
    <div className="flex flex-col items-center overflow-x-clip">
      <GallerySlider />
      <div className="fluid-container">
        <div className="flex flex-col md:flex-row md:items-start items-center gap-4 pt-5">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <TitleComponent
                title={'Hotel Description'}
                icon={<Hotel size={20} />}
                label={''}
              />
              <ContentComponent content={content} />

              <TitleComponent
                title={'Most popular facilities'}
                icon={<Sparkles size={20} />}
                label={''}
              />
              <ContentComponent dynamicContent={<PopularFacilities />} />

              <TitleComponent
                title={'Rooms Availability'}
                icon={<Bed size={20} />}
                label={''}
              />
              {[...Array(3)].map((_, index) => (
                <RoomsCard key={index} />
              ))}
            </div>
          </div>
          <div className="flex flex-col lg:hidden items-center gap-y-8 pt-2 w-full">
            <MapComponent />
            <Provider store={store}>
              <BookingHotelComponent />
            </Provider>
          </div>
          <div className="hidden lg:flex lg:flex-col items-center gap-y-8 lg:pt-16">
            <MapComponent />
            <Provider store={store}>
              <BookingHotelComponent />
            </Provider>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="w-100" id="home-page">
          <OrganizeSection />
        </div>
      </div>
      <div className="pt-0 sm:pt-8">
        <HotelFooter />
      </div>
    </div>
  );
}
