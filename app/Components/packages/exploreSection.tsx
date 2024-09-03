import SwiperComponent from '@/app/commonComponents/swiperComponent';
import React, { useCallback, useRef, useState } from 'react';

import SwiperNavigation from '@/app/commonComponents/swiperNavigationComponent';
// import { useSwiper } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import TripComponent from '@/app/commonComponents/tripComponent';
import SectionHeader from '../home/sectionHeader';

const ExploreSection: React.FC = () => {
  const fakeList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const swiperRef = useRef<SwiperType | null>(null);

  const prev = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current?.slidePrev();
  }, []);

  const next = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current?.slideNext();
  }, []);

  return (
    <div className="my-10 container">
      <div className="flex justify-between items-center gap-2 flex-wrap">
        <SectionHeader title="Explore more options" />
        <SwiperNavigation onNext={next} onPrev={prev} />
      </div>
      <SwiperComponent
        list={fakeList}
        Component={TripComponent}
        swiper={swiperRef}
        slidesPerView={4}
      />
    </div>
  );
};

export default ExploreSection;
