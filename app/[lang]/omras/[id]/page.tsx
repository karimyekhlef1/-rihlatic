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
  CalendarDays,
  MapPin,
} from "lucide-react";
import AdComponent from "@/app/commonComponents/adComponent";
import TravelProgram from "@/app/Components/packages/travelProgram";
import HotelsComponent from "@/app/Components/packages/hotelsComponent";
import BookingPackageComponent from "@/app/Components/packages/bookingPackageComponent";
import ImportantNote from "@/app/Components/packages/importantNote";
import OrganizeSection from "@/app/Components/home/organizeSection";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOmraDetails } from "@/lib/store/api/omras/omrasSlice";
import Loading from "@/app/Components/home/Loading";
import { Button } from "@/components/ui/button";
import PricingTable from "@/app/commonComponents/pricing-table";
import TripSummaryComponent from "@/app/Components/packages/tripSummary";
import { outboundFlights } from "@/app/Data/flightInfos";
import HotelDetails from "@/app/Components/packages/hotelDetails";

export default function OmraDetails() {
  const dispatch = useDispatch<any>();
  const { loading } = useSelector((state: any) => state.omras);
  const [omraDetails, setOmraDetails] = useState<any>(undefined);
  const [omras, setOmras] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        console.log("Fetching omra details for ID:", id);
        const result = await dispatch(
          getOmraDetails({
            id,
            include:
              "omraDepartures,media,omraDepartures.flight,omraDepartures.media,omraDepartures.omraDepartureSchedules,omraDepartures.pricing,agencies,destinations,destinations.airport",
          })
        ).unwrap();

        console.log("Full omra details response:", result);

        if (result?.success && result?.result?.omra) {
          // Find the specific omra by ID
          const specificOmra = result.result.omra.find(
            (omra: any) => omra.id === Number(id)
          );

          if (specificOmra) {
            console.log("Found specific omra:", specificOmra);
            setOmraDetails(specificOmra);
          } else {
            console.log("No omra found with ID:", id);
          }
        }

        const allResult = await dispatch(
          getOmraDetails({ include: "omraDepartures,media" })
        ).unwrap();

        if (allResult?.success && allResult?.result?.omra) {
          // For all omras, we can use the array directly
          setOmras(allResult.result.omra);
        }
      } catch (error) {
        console.error("Error fetching omra details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [dispatch, id]);

  // Add debug logging
  console.log("Component state:", {
    isLoading,
    loading,
    hasOmraDetails: !!omraDetails,
    omraDetailsKeys: omraDetails ? Object.keys(omraDetails) : [],
    omrasLength: omras.length,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!omraDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">No Omra details found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center overflow-x-clip">
      <GallerySlider data={omraDetails} />
      <div className="fluid-container">
        <div className="flex flex-col md:flex-row md:items-start items-center gap-4 pt-5">
          <div className="flex flex-col">
            <div className="flex flex-col">
              {/* Description */}
              <div>
                <TitleComponent
                  title={"Description"}
                  icon={<AlignLeft size={20} />}
                  label={""}
                />
                <div className="textarabic" dir="rtl">
                  <ContentComponent htmlContent={omraDetails?.description} />
                </div>
              </div>

              {/* Tableau des Tarifs */}
              <div>
                <TitleComponent
                  title={"Tableau des Tarifs"}
                  icon={<CalendarDays size={20} />}
                  label={""}
                />
                <ContentComponent dynamicContent={<PricingTable />} />
              </div>

              {/* Flight Details */}
              <TitleComponent
                title={"Trip summary"}
                icon={<PlaneTakeoff size={20} />}
                label={""}
              />
              <ContentComponent
                dynamicContent={
                  <Provider store={store}>
                    <TripSummaryComponent flightInfo={outboundFlights[0]} />
                  </Provider>
                }
              />

              {/* Hotels */}
              <div>
                <TitleComponent
                  title={"Hébergement"}
                  icon={<Bed size={20} />}
                  label={""}
                />
                <div className="textarabic">
                  {omraDetails?.omraDepartures?.map(
                    (item: any, index: number) => (
                      <div key={index}>
                        <ContentComponent
                          dynamicContent={
                            <HotelsComponent data={item.hotel_stay?.[0]} />
                          }
                        />
                      </div>
                    )
                  )}
                </div>
              </div>

              <TitleComponent title={"Hôtel Details"} label={""} />
              <ContentComponent
                dynamicContent={<HotelDetails data={["", ""]} />}
              />

              {/* Travel Program */}
              <div>
                <TitleComponent
                  title={"Programme de voyage"}
                  icon={<Luggage size={20} />}
                  label={""}
                />
                <ContentComponent
                  dynamicContent={
                    <TravelProgram data={omraDetails?.omraDepartures} />
                  }
                />
              </div>

              {/* Important Note */}
              <div>
                <TitleComponent
                  title={"Note importante"}
                  icon={<CircleAlert size={20} color="orange" />}
                  label={""}
                />
                <div className="textarabic">
                  <ContentComponent
                    dynamicContent={
                      <ImportantNote content={omraDetails?.note} />
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Booking Section - Desktop */}
          <div className="md:hidden lg:flex lg:flex-col items-center pt-4 sm:pt-16 gap-y-8">
            <Provider store={store}>
              <BookingPackageComponent
                data={omraDetails?.omraDepartures ?? []}
              />
            </Provider>
            <div className="pt-6 sm:pt-0">
              <AdComponent />
            </div>
          </div>
        </div>

        {/* Booking Section - Tablet */}
        <div className="hidden lg:hidden md:flex md:pt-8 md:gap-x-8 md:justify-center md:items-center">
          <Provider store={store}>
            <BookingPackageComponent data={omraDetails?.omraDepartures ?? []} />
          </Provider>
          <div className="pt-6 sm:pt-0">
            <AdComponent />
          </div>
        </div>
      </div>

      {/* Related Omras */}
      <div className="container textarabic">
        <div className="w-100" id="home-page">
          <OrganizeSection data={omras} />
        </div>
      </div>
    </div>
  );
}
