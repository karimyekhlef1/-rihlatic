import React from 'react';
import SectionHeader from './sectionHeader';
import FlightComponent from './flightComponent';

const FlightsSection = ({list}: any) => {
    return (
        <div className="flights py-5">
            <div className="my-5 container">
                <div className="flex justify-between items-center gap-2 flex-wrap">
                    <SectionHeader title='Popular flights' description='Check these popular routes on Rihlatik.' />
                    <a href="" className='text-[#FF9020]'>See more popular ...</a>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-5">
                    {
                        list?.map((item: any, index: number) => (
                            <FlightComponent key={index} item={item} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default FlightsSection;