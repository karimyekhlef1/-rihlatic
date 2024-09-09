import React from 'react';
import { RiMapPin2Line } from 'react-icons/ri';
import TripTagComponent from './tripTagComponent';
import { FaStar } from 'react-icons/fa';
import { BsFillPeopleFill } from 'react-icons/bs';

import Image from 'next/image';
import packageImage from '@/public/images/packages/image_2.jpg';

interface TripComponentProps {
  text: string;
}

const TripComponent: React.FC<TripComponentProps> = ({ text }) => {
  return (
    <div className="tripComponent rounded-3xl shadow-lg my-3 max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl">
      <div className="image">
        {/* <img
          src="https://via.placeholder.com/400"
          alt="trip"
          className="h-48 sm:h-52 md:h-60 w-full object-cover rounded-t-2xl"
        /> */}
        <Image
          src={packageImage}
          alt="trip"
          className="h-48 sm:h-52 md:h-60 w-full object-cover rounded-t-2xl"
        />
      </div>
      <div className="info p-3 sm:p-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
          <RiMapPin2Line />
          <p>Lorem, ipsum dolor.</p>
        </div>
        <div className="flex gap-2 flex-wrap mt-2">
          <TripTagComponent
            text="1 depart"
            background="#FF8000"
            iconColor="white"
            textColor="white"
          />
          <TripTagComponent
            text="09 nuits"
            background="#FF800030"
            iconColor="#FF8000"
            textColor="#FF8000"
          />
          <TripTagComponent
            text="08"
            background="#FF800000"
            iconColor="#646469"
            textColor="#646469"
            icon={<BsFillPeopleFill />}
          />
        </div>
        <div className="name">
          <p className="text-base sm:text-lg font-semibold mt-2">
            {'Voyage Sharm el sheikh Août'}
          </p>
        </div>
        <div className="hotel flex items-center gap-2">
          <FaStar style={{ color: '#FFE500' }} />
          <p className="text-xs sm:text-sm mt-2">
            {'Hotel Amarina Sun Resort &Aquapark 5'}
          </p>
        </div>
        <div className="pricing">
          <p className="text-base sm:text-lg font-semibold mt-2">
            <span className="text-gray-600">From </span>
            {' 1000 DZD'}
          </p>
        </div>
        <button className="btn w-full p-2 rounded-xl text-[#FF8000] bg-[#FF800033] mt-2 text-sm sm:text-base">
          {'View Details'}
        </button>
      </div>
    </div>
  );
};

export default TripComponent;
