'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/store/store';

import ContentComponent from '@/app/commonComponents/contentComponent';
import TitleComponent from '@/app/commonComponents/titleComponent';
import GallerySlider from '@/app/commonComponents/gallerySliderComponent';

import {
  AlignLeft,
  PlaneTakeoff,
  Bed,
  Luggage,
  CircleAlert,
} from 'lucide-react';

import AdComponent from '@/app/commonComponents/adComponent';
import HotelDetails from '@/app/Components/packages/hotelDetails';
import TravelProgram from '@/app/Components/packages/travelProgram';
import ExploreSection from '@/app/Components/packages/exploreSection';
import HotelsComponent from '@/app/Components/packages/hotelsComponent';
import TripSummaryComponent from '@/app/Components/packages/tripSummary';
import BookingPackageComponent from '@/app/Components/packages/bookingPackageComponent';
import ImportantNote from '@/app/Components/packages/importantNote';
import { outboundFlights } from '@/app/Data/flightInfos';

const content =
  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores voluptate tempora reprehenderit natus in debitis voluptatibus non dolor itaque repellat? Rem dicta corrupti facere id eum nihil magni excepturi officia.';

export default function Details() {
  return (
    <div className="flex flex-col items-center overflow-x-clip">
      <GallerySlider />
      <div className="flex flex-row pt-8">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <TitleComponent
              title={'Description'}
              icon={<AlignLeft size={20} />}
              label={''}
            />
            <ContentComponent content={content} />

            <TitleComponent
              title={'Trip summary'}
              icon={<PlaneTakeoff size={20} />}
              label={''}
            />
            <ContentComponent
              dynamicContent={
                <Provider store={store}>
                  <TripSummaryComponent flightInfo={outboundFlights[0]} />
                </Provider>
              }
            />

            <TitleComponent
              title={'Hôtel(s)'}
              icon={<Bed size={20} />}
              label={''}
            />
            <ContentComponent dynamicContent={<HotelsComponent />} />

            <TitleComponent title={'Hôtel Details'} label={''} />
            <ContentComponent dynamicContent={<HotelDetails />} />

            <TitleComponent
              title={'Travel program'}
              icon={<Luggage size={20} />}
              label={''}
            />
            <ContentComponent dynamicContent={<TravelProgram />} />

            <TitleComponent
              title={'important note'}
              icon={<CircleAlert size={20} color="orange" />}
              label={''}
            />
            <ContentComponent
              dynamicContent={<ImportantNote content={content} />}
            />
          </div>
          {/* This element causes problems on mobile */}
          <div>{/* <ExploreSection /> */}</div>
        </div>
        <div className="hidden lg:flex lg:flex-col items-center pt-16 gap-y-8">
          <Provider store={store}>
            <BookingPackageComponent />
          </Provider>
          <AdComponent />
        </div>
      </div>
    </div>
  );
}
