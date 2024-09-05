'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/store/store';

import TitleComponent from '@/app/commonComponents/titleComponent';
import ContentComponent from '@/app/commonComponents/contentComponent';
import GallerySlider from '@/app/commonComponents/gallerySliderComponent';

import { Hotel, Sparkles, Bed } from 'lucide-react';

import RoomsCard from '@/app/Components/hotels/roomsCard';
import MapComponent from '@/app/Components/hotels/mapComponent';
import ExploreSection from '@/app/Components/packages/exploreSection';
import BookingHotelComponent from '@/app/Components/hotels/bookHotel';
import PopularFacilities from '@/app/Components/hotels/popularFacilities';

const content =
  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores voluptate tempora reprehenderit natus in debitis voluptatibus non dolor itaque repellat? Rem dicta corrupti facere id eum nihil magni excepturi officia. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores voluptate tempora reprehenderit natus in debitis voluptatibus non dolor itaque repellat? Rem dicta corrupti facere id eum nihil magni excepturi officia.';

export default function Details() {
  return (
    <div className="flex flex-col items-center overflow-x-clip">
      <GallerySlider />
      <div className="flex flex-row">
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
            <RoomsCard />
            <RoomsCard />
            <RoomsCard />
          </div>
          {/* This element causes problems on mobile */}
          <div>{/* <ExploreSection /> */}</div>
        </div>
        <div className="hidden lg:flex lg:flex-col items-center gap-y-8 pt-16">
          <MapComponent />
          <Provider store={store}>
            <BookingHotelComponent />
          </Provider>
        </div>
      </div>
    </div>
  );
}
