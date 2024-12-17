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
import HotelDetails from "@/app/Components/packages/hotelDetails";
import TravelProgram from "@/app/Components/packages/travelProgram";
import HotelsComponent from "@/app/Components/packages/hotelsComponent";
import TripSummaryComponent from "@/app/Components/packages/tripSummary";
import BookingPackageComponent from "@/app/Components/packages/bookingPackageComponent";
import ImportantNote from "@/app/Components/packages/importantNote";
import OrganizeSection from "@/app/Components/home/organizeSection";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOmraDetails } from "@/lib/store/api/omras/omrasSlice";
import Loading from "@/app/Components/home/Loading";

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
    omrasLength: omras.length 
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
          <div className="flex flex-col flex-1">
            <div className="flex flex-col space-y-8">
              {/* Description */}
              <div>
                <TitleComponent
                  title={"Description"}
                  icon={<AlignLeft size={20} />}
                  label={""}
                />
                <ContentComponent htmlContent={omraDetails?.description} />
              </div>

              {/* Destinations */}
              <div>
                <TitleComponent
                  title={"Destinations"}
                  icon={<MapPin size={20} />}
                  label={""}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {omraDetails?.destinations?.map((dest: any, index: number) => (
                    <div key={index} className="p-4 bg-white rounded-lg shadow">
                      <h3 className="text-lg font-semibold mb-2">{dest.name}</h3>
                      <p className="text-gray-600">{dest.country?.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Départs */}
              <div>
                <TitleComponent
                  title={"Tableau des Tarifs"}
                  icon={<CalendarDays size={20} />}
                  label={""}
                />
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-white rounded-lg shadow">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="p-3 text-left">Date de départ</th>
                        <th className="p-3 text-left">Durée</th>
                        <th className="p-3 text-left">Places disponibles</th>
                        <th className="p-3 text-left">Prix</th>
                      </tr>
                    </thead>
                    <tbody>
                      {omraDetails?.omraDepartures?.map((dep: any, index: number) => (
                        <tr key={index} className="border-t">
                          <td className="p-3">
                            {new Date(dep.departure_date).toLocaleDateString()}
                          </td>
                          <td className="p-3">{dep.total_days} nuits</td>
                          <td className="p-3">{dep.remainder_seats} places</td>
                          <td className="p-3 font-semibold text-orange-500">
                            {dep.price_ini} DA
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Détails du vol */}
              <div>
                <TitleComponent
                  title={"Détails du vol"}
                  icon={<PlaneTakeoff size={20} />}
                  label={""}
                />
                {omraDetails?.omraDepartures?.map((dep: any, index: number) => (
                  dep.flight && (
                    <div key={index} className="bg-white rounded-lg shadow p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Aller</p>
                          <div className="flex items-center gap-4 mt-2">
                            <div>
                              <p className="text-sm text-gray-500">Départ</p>
                              <p>{dep.flight.departure_time}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Arrivée</p>
                              <p>{dep.flight.arrival_time}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>

              {/* Hébergement */}
              <div>
                <TitleComponent
                  title={"Hébergement"}
                  icon={<Bed size={20} />}
                  label={""}
                />
                {omraDetails?.omraDepartures?.map((item: any, index: number) => (
                  <div key={index}>
                    <ContentComponent
                      dynamicContent={<HotelsComponent data={item.hotel_stay?.[0]} />}
                    />
                  </div>
                ))}
              </div>

              {/* Programme de voyage */}
              <div>
                <TitleComponent
                  title={"Programme de voyage"}
                  icon={<Luggage size={20} />}
                  label={""}
                />
                <ContentComponent
                  dynamicContent={<TravelProgram data={omraDetails?.omraDepartures} />}
                />
              </div>

              {/* Note importante */}
              <div>
                <TitleComponent
                  title={"Note importante"}
                  icon={<CircleAlert size={20} color="orange" />}
                  label={""}
                />
                <ContentComponent
                  dynamicContent={<ImportantNote content={omraDetails?.note} />}
                />
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="md:w-1/3">
            <div className="sticky top-4 space-y-6">
              <Provider store={store}>
                <BookingPackageComponent
                  data={omraDetails?.omraDepartures || []}
                />
              </Provider>
              <div className="pt-6">
                <AdComponent />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Omras */}
      <div className="container mt-12">
        <div className="w-full" id="home-page">
          <OrganizeSection data={omras} />
        </div>
      </div>
    </div>
  );
}
