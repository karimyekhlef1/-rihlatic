import React from 'react';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import image4 from '@/public/images/home/four.jpeg';

const FlightComponent = ({item}: {item: any}) => {
    return (
        <div className="flex items-center w-full">
            <img src={image4.src} alt="flight" className='w-36 h-20 object-cover rounded-l-xl' />
            <div className="flex justify-between items-center px-3 w-full h-full bg-white rounded-r-xl">
                <span className='font-semibold'>{item?.departure_airport?.city}</span>
                <HiOutlineSwitchHorizontal />
                <span className='font-semibold'>{item?.arrival_airport?.city}</span>
            </div>
        </div>
    );
};

export default FlightComponent;