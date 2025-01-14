import SwiperComponent from '@/app/commonComponents/swiperComponent';
import React, { useCallback, useRef } from 'react';
import DiscoverComponent from './discoverComponent';
import SectionHeader from './sectionHeader';
import SwiperNavigation from '@/app/commonComponents/swiperNavigationComponent';
import { Swiper as SwiperType } from 'swiper';
import image4 from '@/public/images/home/four.jpeg';
import { getScreenElementSize } from '@/app/Helper/engine';

const DiscoverSection= ({data}: any) => {
    const fakeList = [
        {
            image: image4.src,
            name: 'Algiers',
            establishment: 10
        },
        {
            image: image4.src,
            name: 'Oran',
            establishment: 10
        },
        {
            image: image4.src,
            name: 'Algiers',
            establishment: 10
        },
        {
            image: image4.src,
            name: 'Algiers',
            establishment: 10
        },
        {
            image: image4.src,
            name: 'Algiers',
            establishment: 10
        },
        {
            image: image4.src,
            name: 'Algiers',
            establishment: 10
        },
        {
            image: image4.src,
            name: 'Algiers',
            establishment: 10
        },
        {
            image: image4.src,
            name: 'Algiers',
            establishment: 10
        }
    ];
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
                <SectionHeader title='Discover Algeria' description='lorem ipsum dolor sit amet consectetur adipiscing elit.' />
                <SwiperNavigation onNext={next} onPrev={prev} />
            </div>
            <SwiperComponent list={fakeList} Component={DiscoverComponent} swiper={swiperRef} slidesPerView={getScreenElementSize()} />
        </div>
    );
};

export default DiscoverSection;