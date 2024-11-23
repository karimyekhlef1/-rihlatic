import SwiperComponent from '@/app/commonComponents/swiperComponent';
import React, { useCallback, useRef, useState } from 'react';
import DiscoverComponent from './discoverComponent';
import SectionHeader from './sectionHeader';
import SwiperNavigation from '@/app/commonComponents/swiperNavigationComponent';
// import { useSwiper } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import TripComponent from '@/app/commonComponents/tripComponent';

const OrganizeSection = ({data}: any) => {
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
                <SectionHeader title='Organized trip' />
                <SwiperNavigation onNext={next} onPrev={prev} />
            </div>
            <SwiperComponent list={data} Component={TripComponent} swiper={swiperRef} slidesPerView={3} />
        </div>
    );
};

export default OrganizeSection;