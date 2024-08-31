'use client';

import React from 'react';
import DiscoverSection from '@/app/Components/home/discoverSection';
import ServiceSection from '@/app/Components/home/serviceSection';
import FavSection from '@/app/Components/home/favSection';
import OrganizeSection from '@/app/Components/home/organizeSection';
import PopularSection from '@/app/Components/home/popularSection';
import FlightsSection from '@/app/Components/home/flightsSection';

const HomePage: React.FC = () => {

    return (
        <div id="home-page">
            <ServiceSection />
            <br />
            <hr style={{border: '1px solid #e5e7eb40'}} />
            <DiscoverSection />
            <FavSection />
            <OrganizeSection />
            <PopularSection />
            <FlightsSection />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    );
};

export default HomePage;