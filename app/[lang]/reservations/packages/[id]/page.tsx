"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DepartureInfoInBooking from "@/app/Components/packages/DepartureInfoInBooking";
import { useSelector, useDispatch } from "react-redux";
import { getPackagesReservationDetails } from "@/lib/store/api/packages/packagesSlice";
import Loading from "@/app/Components/home/Loading";
import BookingDetailsPricing from "@/app/Components/packages/BookingDetailsPricing";
import { AppDispatch } from "@/lib/store/store";
import PassengerCard from "@/app/Components/packages/PassengerCard";
import ContentComponent from "@/app/commonComponents/contentComponent";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

interface BookingDetails {
  departure: any;
  bookingDetails: any;
}

export default function PackageReservationPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, packagesData } = useSelector((state: any) => state.packages);
  const { id } = useParams();
  const [bookinPackagesDetails, setBookinPackageDetails] = useState<
    BookingDetails | undefined
  >(undefined);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await dispatch(
          getPackagesReservationDetails({
            id,
            include: "departure,departure.package,departure.flight",
          })
        );
        setBookinPackageDetails(result.payload.result.booking);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    if (id) {
      getData();
    }
  }, [id, dispatch]);

  if (loading) return <Loading />;

  return (
    <div className="bg-[#F8F8F8] flex items-start justify-center flex-wrap gap-2">
      <div>
        <DepartureInfoInBooking departure={bookinPackagesDetails?.departure} />

        <div>
          {bookinPackagesDetails?.bookingDetails.map((bookingDetail: any,index:number) => (
            <div key={bookingDetail.id}  className="">
           <div className="text-2xl text-[#ff8000]">Room {index + 1}</div>

                <div>
                  <div className="space-y-4">
              {bookingDetail.passengers.map(
                        (passenger: any) => (
                          <>
                          <PassengerCard key={passenger.id} passenger={passenger} />
                          <Separator/>
                          </>

                        )
                      )}
                
                  </div>
                </div>
             
            </div>
          ))}
        </div>
      </div>
      <BookingDetailsPricing data={bookinPackagesDetails} />
    </div>
  );
}

{/* <CardHeader className="pb-3">
</CardHeader> */}