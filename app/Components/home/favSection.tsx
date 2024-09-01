import React, { useRef } from 'react';
import SectionHeader from './sectionHeader';
import { Swiper as SwiperType } from 'swiper';
import DiscoverComponent from './discoverComponent';

const FavSection: React.FC = () => {
    const fakeList = [1, 2, 3, 4];

    return (
        <div className="my-10 container">
            <div className="flex justify-between items-center gap-2 flex-wrap">
                <SectionHeader title='Favorites Destinations' description='lorem ipsum dolor sit amet consectetur adipiscing elit.' />
            </div>
            <div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-8">
                {fakeList.map((person) => (
                    <DiscoverComponent key={person} image="https://images.unsplash.com/photo-1612833943307-4b3b3b3b3b3b" name="Algiers" establishment={10} />
                ))}
            </div>
        </div>
    );
};

export default FavSection;