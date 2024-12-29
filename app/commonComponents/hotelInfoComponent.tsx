import React from 'react';
import { RiMapPin2Line } from 'react-icons/ri';
import TripTagComponent from './tripTagComponent';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import { BsFillPeopleFill } from 'react-icons/bs';
import Image from 'next/image';
import hotelImage from '@/public/images/home/four.jpeg';
import Link from 'next/link';

interface HotelInfoComponentProps {
  data: {
    supplier: string;
    supplier_logo: string;
    number: string;
    ref: string;
    feature_image: string;
    rate: number;
    highestRate: number;
    name: string;
    address: string;
    rating: number;
    reviews: number;
    localisation: {
      longitude: number;
      latitude: number;
    };
    promotion: {
      name: string | null;
      date: string | null;
    };
  };
}

const HotelInfoComponent: React.FC<HotelInfoComponentProps> = ({ data }) => {
  return (
    <div className="tripComponent rounded-3xl shadow-lg my-3 max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl">
      <div className="image relative">
        <Image
          width={500}
          height={300}
          src={data.feature_image}
          alt="trip"
          className="h-48 sm:h-52 md:h-60 w-full object-cover rounded-t-2xl"
        />
        {data.rating >0 ? (
          <div
            className="absolute top-2 right-2 bg-white/20 rounded-full p-2 flex items-center justify-center"
            style={{
              border: '1px solid #FFFFFF',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
            }}
          >
            <FaStar className="text-[#ffe500] mr-1" size={12} />
            <span className="text-xs text-[#ffe500] font-semibold">{data.rating}</span>
          </div>
        ): null}
      </div>
      <div className="info p-3 sm:p-4">
        <div className="name">
          <p className="text-base sm:text-lg font-semibold mt-2">
            {data.name}
          </p>
        </div>
        <div className="hotel flex items-center gap-2">
          <p className="text-xs text-gray-600 text-wrap w-[300px] sm:text-sm mt-2">
            {data.address}
          </p>
        </div>
        <div className="pricing">
          <p className="text-base sm:text-md font-semibold mt-2">
            <span className="text-gray-600">From </span>
            {data.rate} DZD
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 py-4">{data.reviews} Avis</p>
        </div>
        <Link
          href={{
            pathname: `hotels/${data.ref}`,
            query: {
              supplier: data.supplier
            }
          }}
        >
          <div className="flex justify-center">
            <button className="btn w-[90%] rounded-xl text-[#FF8000] bg-[#FF800033] mt-2 text-xs py-3">
              {'Details'}
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HotelInfoComponent;