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
import OrganizeSection from '@/app/Components/home/organizeSection';

const content =
  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores voluptate tempora reprehenderit natus in debitis voluptatibus non dolor itaque repellat? Rem dicta corrupti facere id eum nihil magni excepturi officia.';

export default function Details() {
  return (
    <div className="flex flex-col items-center overflow-x-clip">
      <GallerySlider />
      <div className="fluid-container">
        <div className="flex flex-col md:flex-row md:items-start items-center gap-4 pt-5">
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
          </div>
          <div className="lg:flex lg:flex-col items-center pt-4 sm:pt-16 gap-y-8">
            <Provider store={store}>
              <BookingPackageComponent />
            </Provider>
            <div className="pt-6 sm:pt-0">
              <AdComponent />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="w-100" id="home-page">
          <OrganizeSection />
        </div>
      </div>
    </div>
  );
}
