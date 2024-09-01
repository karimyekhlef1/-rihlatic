import React from 'react';
import SectionHeader from './sectionHeader';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import image4 from '@/public/images/home/four.jpeg';
import FlightComponent from './flightComponent';

const FlightsSection: React.FC = () => {
    const fakeList: any[] = [
        1, 3, 4, 5, 7, 8, 9, 10
    ];
    return (
        <div className="flights py-5">
            <div className="my-5 container">
                <div className="flex justify-between items-center gap-2 flex-wrap">
                    <SectionHeader title='Popular flights' description='Check these popular routes on Rihlatik.' />
                    <a href="" className='text-[#FF9020]'>See more popular ...</a>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-5">
                    {
                        fakeList.map((item, index) => (
                            <FlightComponent key={index} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default FlightsSection;