import React from 'react';
import { RiMapPin2Line } from 'react-icons/ri';
import TripTagComponent from './tripTagComponent';
import { FaStar } from 'react-icons/fa';
import { BsFillPeopleFill } from 'react-icons/bs';

import Image from 'next/image';
import packageImage from '@/public/images/packages/image_2.jpg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Router } from 'lucide-react';

interface TripComponentProps {
id:number
name:string
url_featured_image:string
category:string
departures_count:number
departures:any
destinations:any
}

const TripComponent: React.FC<TripComponentProps> = ({id, destinations  ,url_featured_image,name,category,departures_count,departures }:TripComponentProps) => {
  const router = useRouter()
  const useGoToPackagesDetails =()=>{
    router.push(`packages/${id}`)
    

  }
  return (
    <div 
    className="tripComponent rounded-3xl shadow-lg my-3 max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl"
 
    >
      <div className="image">
        {/* <img
          src="https://via.placeholder.com/400"
          alt="trip"
          className="h-48 sm:h-52 md:h-60 w-full object-cover rounded-t-2xl"
        /> */}
        <img
        // width="100"
        // height="100"
                // objectFit='cover'
      
          src={url_featured_image}
          alt="trip"
          className="h-48 sm:h-52 md:h-60 w-full object-cover rounded-t-2xl"
        />
      </div>
      <div className="info p-3 sm:p-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
          <RiMapPin2Line />
          <p>{destinations?.length > 0 && destinations[0]?.name}</p>
        </div>
        <div className="flex gap-2 flex-wrap mt-2">
          <TripTagComponent
            text={`${departures_count} depart`}
            background="#FF8000"
            iconColor="white"
            textColor="white"
          />
          <TripTagComponent
            text={`${destinations?.length > 0 && departures[0]?.total_days} nuits`}
            background="#FF800030"
            iconColor="#FF8000"
            textColor="#FF8000"
          />
          <TripTagComponent
            text={destinations?.length > 0 && departures[0]?.remainder_seats}
            background="#FF800000"
            iconColor="#646469"
            textColor="#646469"
            icon={<BsFillPeopleFill />}
          />
        </div>
        <div className="name">
          <p className="text-base sm:text-lg font-semibold mt-2">
            {name}
          </p>
        </div>
        <div className="hotel flex items-center gap-2">
          <FaStar style={{ color: '#FFE500' }} />{destinations.length > 0 && departures[0]?.hotel_stay[0].rate}
          <p className="text-xs sm:text-sm mt-2">
            {destinations?.length > 0 && departures[0]?.hotel_stay[0].name}
          </p>
        </div>
        <div className="pricing">
          <p className="text-base sm:text-lg font-semibold mt-2">
            <span className="text-gray-600">From </span>
            {`${destinations?.length > 0 && departures[0]?.price_ini} DZD`}
          </p>
        </div>
        <Link href={`/packages/${id}`} >
          <button className="btn w-full p-2 rounded-xl text-[#FF8000] bg-[#FF800033] mt-2 text-sm sm:text-base">
              {/* // onClick={useGoToPackagesDetails}> */}
            {'View Details'}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TripComponent;
