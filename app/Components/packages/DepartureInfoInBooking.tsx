import React from "react";
import TitleComponent from "@/app/commonComponents/titleComponent";
import ContentComponent from "@/app/commonComponents/contentComponent";
import HotelsComponent from "./hotelsComponent";
import HotelDetails from "./hotelDetails";
import {
  AlignLeft,
  PlaneTakeoff,
  Bed,
  Luggage,
  CircleAlert,
} from "lucide-react";
import TripSummaryComponent from "./tripSummary";
import { CircleCheck, CircleX } from "lucide-react";
import DepartureInfoInBookingCard from "./DepartureInfoInBookingCard";
import { Departure } from "@/app/Types/package/packageDetails";
type Props = {
    departure: Departure;
  };
  
  export default function DepartureInfoInBooking({ departure }: Props) {
  return (
    <div className="flex flex-col items-center overflow-x-clip">
      <div className="fluid-container">
        <div className="flex flex-col md:flex-row md:items-start items-center gap-4 pt-5">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <DepartureInfoInBookingCard departure={departure} />

              <TitleComponent
                title={"Trip summary"}
                icon={<PlaneTakeoff size={20} />}
                label={""}
              />
              {/* <ContentComponent
                dynamicContent={
                    <TripSummaryComponent flightInfo={outboundFlights[0]} />
                }
              /> */}

              <TitleComponent
                title={"Hôtel(s)"}
                icon={<Bed size={20} />}
                label={""}
              />

              <div>
                {/* <ContentComponent
                    dynamicContent={<HotelsComponent data={departure.hotel_stay[0]} />}
                  /> */}
              </div>

              <TitleComponent title={"Hôtel Details"} label={""} />
              <ContentComponent
                dynamicContent={
                  <div className="flex flex-wrap sm:gap-0 gap-3">
                    <div className="flex flex-col w-full sm:w-1/2">
                      <h3 className="font-semibold text-md">Inclus</h3>
                      <ul className="list-none pl-0 mt-2">
                        {departure?.includes ?.map((item:any, index:any) => (
                          <li
                            key={item}
                            className="flex items-center mb-1 font-semibold text-sm text-gray-500"
                          >
                            <CircleCheck
                              size={20}
                              className="font-semibold text-xs text-[#5eda7f] mr-2"
                              fill="#bff0cc"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col w-full sm:w-1/2">
                      <h3 className="font-semibold text-md">Non inclus</h3>
                      <ul className="list-none pl-0 mt-2">
                        <div className="flex flex-col"></div>
                        {departure?.excludes?.map((item:any, index:any) => (
                          <li
                            key={item}
                            className="flex items-center mb-1 font-semibold text-sm text-gray-500"
                          >
                            <CircleX
                              size={20}
                              className="font-semibold text-xs text-[#ff0004] mr-2"
                              fill="#ff999b"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                }
              />
            </div>
          </div>
          <div className="md:hidden lg:flex lg:flex-col items-center pt-4 sm:pt-16 gap-y-8">
            {/* <Provider store={store}> */}
            {/* <BookingPackageComponent data={packagesDetails?.departures ?? []}  /> */}
            {/* </Provider> */}
          </div>
        </div>
      </div>
    </div>
  );
}
