"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/store/store";

import ContentComponent from "@/app/commonComponents/contentComponent";
import TitleComponent from "@/app/commonComponents/titleComponent";
import GallerySlider from "@/app/commonComponents/gallerySliderComponent";

import {
  AlignLeft,
  PlaneTakeoff,
  Bed,
  Luggage,
  CircleAlert,
} from "lucide-react";
import AdComponent from "@/app/commonComponents/adComponent";
import HotelDetails from "@/app/Components/packages/hotelDetails";
import TravelProgram from "@/app/Components/packages/travelProgram";
import HotelsComponent from "@/app/Components/packages/hotelsComponent";
import TripSummaryComponent from "@/app/Components/packages/tripSummary";
import BookingPackageComponent from "@/app/Components/packages/bookingPackageComponent";
import ImportantNote from "@/app/Components/packages/importantNote";
import { outboundFlights } from "@/app/Data/flightInfos";
import OrganizeSection from "@/app/Components/home/organizeSection";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { packagesFunc } from "@/lib/store/api/packages/packagesSlice";
import Loading from "@/app/Components/home/Loading";
import { PackageDetails } from "@/app/Types/package/packageDetails";
import { setPackage } from "@/lib/store/custom/packagesSlices/paymentPachageSlices";
import TripComponent from "@/app/commonComponents/tripComponent";
import { Departure } from '@/app/Types/package/packageDetails';

export default function Details() {
  const dispatch = useDispatch<any>();
  const [selectedDeparture, setSelectedDeparture] = useState<Departure | undefined>();
  const { loading, packagesData } = useSelector((state: any) => state.packages);
  const [packagesDetails, setPackageDetails] = useState<PackageDetails | undefined>(undefined);
  const [packages, setPackages] = useState<any[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const result = await dispatch(
        packagesFunc({
          id,
          include:
            "departures,media,departures.flight,departures.media,departures.departureSchedules,departures.pricing,agencies,destinations.airport",
        })
      );
      setPackageDetails(result.payload.result.package);
      dispatch(setPackage(result.payload.result.package) )
      const all =  await dispatch(packagesFunc({ include: 'departures' }));
      setPackages(all.payload.result.packages)
    };
    getData();
  }, []);
  if (loading) return <Loading />;
  const currentDeparture = selectedDeparture || packagesDetails?.departures[0];
const onSelectedDeparture=(item :Departure)=>{
  setSelectedDeparture(item)
}
  return (
    <div className="flex flex-col items-center overflow-x-clip">
      <GallerySlider data={packagesDetails} page={"package"} />
      <div className="fluid-container">
        <div className="flex flex-col md:flex-row md:items-start items-center gap-4 pt-5">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <TitleComponent
                title={"Description"}
                icon={<AlignLeft size={20} />}
                label={""}
              />
              <ContentComponent htmlContent={packagesDetails?.description} />
        
              {
                packagesDetails?.departures[0].flight != null && (
                  <> 
                    <TitleComponent
                      title={"Trip summary"}
                      icon={<PlaneTakeoff size={20} />}
                      label={""}
                    />
                    <ContentComponent
                      dynamicContent={
                        <TripSummaryComponent flightInfo={outboundFlights[0]} />
                      }
                    />
                  </>
                )
              }

              {currentDeparture &&
                currentDeparture.hotel_stay.length > 0 && (
                  <>
                    <TitleComponent
                      title={"Hôtel(s)"}
                      icon={<Bed size={20} />}
                      label={""}
                    />
              {/* {currentDeparture?.hotel_stay[0].name} */}
                    
                    {currentDeparture?.hotel_stay?.map((item: any, index: number) => (
                      <div key={index}>
                        <ContentComponent
                          dynamicContent={<HotelsComponent data={item} />}
                        />
                      </div>
                    ))}
                  </>
                )
              }

              <TitleComponent title={"Hôtel Details"} label={""} />
              <ContentComponent dynamicContent={<HotelDetails data={packagesDetails?.departures}/>} />
        
              <TitleComponent
                title={"Travel program"}
                icon={<Luggage size={20} />}
                label={""}
              />

              <ContentComponent dynamicContent={<TravelProgram data={currentDeparture?.schedule ?? []} />} />
              <TitleComponent
                title={"important note"}
                icon={<CircleAlert size={20} color="orange" />}
                label={""}
              />
              <ContentComponent
                dynamicContent={<ImportantNote content={packagesDetails?.note} />}
              />
            </div>
          </div>
          <div className="md:hidden lg:flex lg:flex-col items-center pt-4 sm:pt-16 gap-y-8">
            <Provider store={store}>
              <BookingPackageComponent 
            onSelectedDeparture={onSelectedDeparture}
              data={packagesDetails?.departures ?? []}  />
            </Provider>
            <div className="pt-6 sm:pt-0">
              <AdComponent />
            </div>
          </div>
        </div>
        <div className="hidden lg:hidden md:flex md:pt-8 md:gap-x-8 md:justify-center md:items-center">
          <Provider store={store}>
            <BookingPackageComponent 
            onSelectedDeparture={onSelectedDeparture}
             data={packagesDetails?.departures ?? []} />
          </Provider>
          <div className="pt-6 sm:pt-0">
            <AdComponent />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="w-100" id="home-page">
          <OrganizeSection data={packages}  comp={TripComponent} />
        </div>
      </div>
    </div>
  );
}
