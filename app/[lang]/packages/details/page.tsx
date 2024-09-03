'use client';

import ContentComponent from '@/app/commonComponents/contentComponent';
import TitleComponent from '@/app/commonComponents/titleComponent';
import GallerySlider from '@/app/commonComponents/gallerySliderComponent';

import { AlignLeft } from 'lucide-react';

const content =
  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores voluptate tempora reprehenderit natus in debitis voluptatibus non dolor itaque repellat? Rem dicta corrupti facere id eum nihil magni excepturi officia.';

export default function Details() {
  return (
    <div className="flex flex-col">
      <GallerySlider />
      <div className="flex flex-col">
        <div>
          {/* <AlignLeft size={20} />
          <h1 className="font-semibold pl-1 align-middle leading-[18px]">
            Description
          </h1> */}
          <TitleComponent
            title={'Description'}
            icon={<AlignLeft size={20} />}
            label={''}
          />
        </div>
        <ContentComponent content={content} />
      </div>
    </div>
  );
}
