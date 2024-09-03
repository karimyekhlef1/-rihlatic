'use client';

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
import BookingPackageComponent from '@/app/Components/packages/bookingPackageComponent';
import ExploreSection from '@/app/Components/packages/exploreSection';

const content =
  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores voluptate tempora reprehenderit natus in debitis voluptatibus non dolor itaque repellat? Rem dicta corrupti facere id eum nihil magni excepturi officia.';

export default function Details() {
  return (
    <div className="flex flex-col">
      <GallerySlider />
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <TitleComponent
              title={'Description'}
              icon={<AlignLeft size={20} />}
              label={''}
            />
            <ContentComponent content={content} />{' '}
            <TitleComponent
              title={'Trip summary'}
              icon={<PlaneTakeoff size={20} />}
              label={''}
            />
            <ContentComponent content={content} />{' '}
            <TitleComponent
              title={'Hôtel(s)'}
              icon={<Bed size={20} />}
              label={''}
            />
            <ContentComponent content={content} />{' '}
            <TitleComponent title={'Hôtel Details'} label={''} />
            <ContentComponent content={content} />
            <TitleComponent
              title={'Travel program'}
              icon={<Luggage size={20} />}
              label={''}
            />
            <ContentComponent content={content} />{' '}
            <TitleComponent
              title={'important note'}
              icon={<CircleAlert size={20} color="orange" />}
              label={''}
            />
            <ContentComponent content={content} />{' '}
          </div>
          <div>{/* <ExploreSection /> */}</div>
        </div>
        <div className="md:flex flex-col hidden gap-y-8 mx-6">
          <BookingPackageComponent />
          <AdComponent />
        </div>
      </div>
    </div>
  );
}
