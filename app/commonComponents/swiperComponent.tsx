'use client';

import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination } from 'swiper/modules';


export default function SwiperComponent({swiper, list, Component, slidesPerView}: {swiper?: any, list: any[], Component: React.ElementType, slidesPerView?: number}) {
  return (
      <Swiper
        slidesPerView={slidesPerView || 1}
        spaceBetween={30}
        pagination={{
          type: 'fraction',
        }}
        modules={[Pagination]}
        className="mySwiper mt-5"
        onBeforeInit={(sw) => {
            swiper.current = sw;
        }}
      >
        {
            list?.map((item, index) => (
           
                <SwiperSlide key={index}>
                  <Component {...item} />
                </SwiperSlide>
            ))
        }
      </Swiper>
  );
}
