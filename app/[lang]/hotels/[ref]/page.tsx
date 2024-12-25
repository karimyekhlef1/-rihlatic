'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/store/store';

import TitleComponent from '@/app/commonComponents/titleComponent';
import ContentComponent from '@/app/commonComponents/contentComponent';
import GallerySlider from '@/app/commonComponents/gallerySliderComponent';

import { Hotel, Sparkles, Bed } from 'lucide-react';

import RoomsCard from '@/app/Components/hotels/roomsCard';
import HotelFooter from '@/app/Components/hotels/hotelFooter';
import MapComponent from '@/app/Components/hotels/mapComponent';
import BookingHotelComponent from '@/app/Components/hotels/bookHotel';
import PopularFacilities from '@/app/Components/hotels/popularFacilities';
import OrganizeSection from '@/app/Components/home/organizeSection';
import { getHotelsDetails } from '@/lib/store/api/hotels/hotelsSlice';
import { useEffect , useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Loading from '@/app/Components/home/Loading';
import { HotelDetails } from '@/app/Types/hotel/HotelDetails';
const body={
  "supplier":"CNG",
  "checkin": "2025-01-01",
  "checkout": "2025-01-05",
  "city":{
      "mygo":{
          "id" : "TABR"
      },
      "cng":{
          "id":"109"
      } ,
      "hb":{
          "id":null
      }       
  }, 
  "hotel" : "911",
  "room" :{
      "0":{
      "adult" : 1,
      "children" : 0,
      "count" : 1 ,
      "Age" : null
      },
      "1":
      {"adult" : 1,
      "children" : 0,
      "count" : 1 ,
      "Age" : null
      }
  }

}


export default function Details() {
  const dispatch = useDispatch<any>();
  const { loading, hotelData } = useSelector((state: any) => state.hotels);
   const [hotelDetails, setHotelDetails] = useState<HotelDetails | undefined>(undefined);
 



   useEffect(() => {
      const getData = async () => {
        const result = await dispatch(getHotelsDetails(body));
        console.log("hotel", result.payload.result.hotel)
        setHotelDetails(result.payload.result.hotel);
        // dispatch(setPackage(result.payload.result.package) )
    
      };
      getData();
    }, []);


    if (loading) return <Loading />;

  return (
    <div className="flex flex-col items-center overflow-x-clip">
      <GallerySlider data={hotelDetails} page={"hotel"} />
      <div className="fluid-container ">
        <div className="flex flex-col md:flex-row md:items-start items-center gap-4 pt-5">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <TitleComponent
                title={'Hotel Description'}
                icon={<Hotel size={20} />}
                label={''}
              />
              <ContentComponent htmlContent={hotelDetails?.infos.description} />

              <TitleComponent
                title={'Most popular facilities'}
                icon={<Sparkles size={20} />}
                label={''}
              />
              <ContentComponent dynamicContent={<PopularFacilities data={hotelDetails?.facilities} />} />

              <TitleComponent
                title={'Rooms Availability'}
                icon={<Bed size={20} />}
                label={''}
              />
              {[...Array(3)].map((_, index) => (
                <RoomsCard key={index} />
              ))}
            </div>
          </div>
          <div className="md:hidden lg:flex lg:flex-col items-center pt-4 sm:pt-16 gap-y-8 space-y-8 sm:space-y-0">
            <MapComponent />
            <Provider store={store}>
              <BookingHotelComponent />
            </Provider>
          </div>
        </div>
        <div className="hidden lg:hidden md:flex md:pt-8 md:gap-x-8 md:justify-center md:items-center">
          <MapComponent />
          <Provider store={store}>
            <BookingHotelComponent />
          </Provider>
        </div>
      </div>
      <div className="container">
        <div className="w-100" id="home-page">
          <OrganizeSection />
        </div>
      </div>
      <div className="pt-0 sm:pt-8">
        <HotelFooter />
      </div>
    </div>
  );
}
