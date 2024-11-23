import React from 'react';
import SectionHeader from './sectionHeader';
import Newsletter from './newsletter';
import PopularDestinationComponent from './popularDestinationComponent';
const PopularSection = ({data}: any) => {
    // console.log("PopularSection",

    return (
        <div className="my-10 container">
            <div className="flex justify-between items-center gap-2 flex-wrap">
                <SectionHeader title='Popular destinations from algiers' description='These alluring destinations from Algiers‎ +15… are picked just for you.' />
                <a href="" className='text-[#FF9020]'>See more popular ...</a>
            </div>
            <div className="mt-10 isolate mx-auto grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                <div className="flex flex-col gap-3">
                    <PopularDestinationComponent data={data && data[0]}  />
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <PopularDestinationComponent data={data[1]}/>
                        <PopularDestinationComponent data={data[2]}/>
                    </div>
                </div>
                <Newsletter />
            </div>
        </div>
    );
};

export default PopularSection;