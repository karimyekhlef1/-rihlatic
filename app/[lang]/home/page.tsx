'use client';

import React, { useEffect , useState } from 'react';
import DiscoverSection from '@/app/Components/home/discoverSection';
import ServiceSection from '@/app/Components/home/serviceSection';
import FavSection from '@/app/Components/home/favSection';
import OrganizeSection from '@/app/Components/home/organizeSection';
import PopularSection from '@/app/Components/home/popularSection';
import FlightsSection from '@/app/Components/home/flightsSection';
import { useDispatch, useSelector } from 'react-redux';
import { HomeFunc } from '@/lib/store/api/home/homeSlice';
import Loading from '@/app/Components/home/Loading';
import { RootState } from '@/lib/store/store';
import SearchSectionComponent from '@/app/Components/home/searchSectionComponent';
import TripComponent from '@/app/commonComponents/tripComponent';
const HomePage: React.FC = () => {

    const { loading, homeData } = useSelector((state: RootState) => state.home);
    const dispatch = useDispatch<any>();
    useEffect(() => {
        const getData = async () => {
            try {
                await dispatch(HomeFunc({ include: 'departures' }));
            } catch (e) {
                console.log(e);
            }
        };
        getData();
    }, []);

    if (loading) {
        return <Loading/>;
    }

    return (
        <div id="home-page">
            <SearchSectionComponent />
            <ServiceSection  />
            <br />
            <hr style={{border: '1px solid #e5e7eb70'}} />
            <DiscoverSection data={homeData?.discoverAlgeria}  />
            <FavSection data={homeData?.favoriteDestinations} />
            <OrganizeSection data={homeData?.organzidTrip} comp ={TripComponent}/>
            <PopularSection data={homeData?.popularFromAlgiers}/>
            <FlightsSection data={homeData?.popularFlights}  />
        </div>
    );
};

export default HomePage;