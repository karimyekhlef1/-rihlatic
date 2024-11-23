'use client';

import React, { useEffect , useState } from 'react';
import DiscoverSection from '@/app/Components/home/discoverSection';
import ServiceSection from '@/app/Components/home/serviceSection';
import FavSection from '@/app/Components/home/favSection';
import OrganizeSection from '@/app/Components/home/organizeSection';
import PopularSection from '@/app/Components/home/popularSection';
import FlightsSection from '@/app/Components/home/flightsSection';
import SearchSectionComponent from '@/app/Components/home/searchSectionComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { HomeFunc } from '@/lib/store/api/home/homeSlice';
import Loading from '@/app/Components/home/Loading';

const HomePage: React.FC = () => {

    const { loading, homeData } = useSelector((state: any) => state.home);
    const dispatch = useDispatch<any>();
    const [homeDate , setHomeData] = useState()
    useEffect(() => {
        const getData = async () => {
            const result = await dispatch(HomeFunc({ include: 'departures' }));
            setHomeData(result.payload)

   
        };
        getData();
    }, []);

    if (loading) {
        return <Loading/>

    }







console.log("homeData",homeData)
    return (
        <div id="home-page">
    
    {/* <Loading/> */}
            <SearchSectionComponent />
            <ServiceSection  />
            <br />
            <hr style={{border: '1px solid #e5e7eb40'}} />
            <DiscoverSection data={homeData?.discoverAlgeria}  />
           <FavSection data={homeData?.favoriteDestinations} />
             <OrganizeSection data={homeData?.organzidTrip}/>
            {/* <PopularSection data={homeData?.popularFromAlgiers}/> */}
            <FlightsSection data={homeData?.popularFlights}  />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    );
};

export default HomePage;