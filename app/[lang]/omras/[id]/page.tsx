"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/store/store";

import ContentComponent from "@/app/commonComponents/contentComponent";
import TitleComponent from "@/app/commonComponents/titleComponent";
import GallerySlider from "@/app/commonComponents/OmraGallerySliderComponent";

import {
  AlignLeft,
  PlaneTakeoff,
  Bed,
  Luggage,
  CircleAlert,
  CalendarDays,
} from "lucide-react";
import AdComponent from "@/app/commonComponents/adComponent";
import ImportantNote from "@/app/Components/packages/importantNote";
import OrganizeSection from "@/app/Components/home/organizeSection";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getOmraDetails,
  getOmraReservationDetails,
} from "@/lib/store/api/omras/omrasSlice";
import Loading from "@/app/Components/home/Loading";
import PricingTable from "@/app/commonComponents/pricing-table";
import TripSummaryComponent from "@/app/Components/packages/tripSummary";
import OmraTravelProgram from "@/app/Components/packages/OmratravelProgram";
import OmraHotelDetails from "@/app/Components/packages/OmrahotelDetails";
import OmraHotelsComponent from "@/app/Components/packages/OmrahotelsComponent";
import BookingOmraComponent from "@/app/Components/packages/bookingOmraComponent";
import OmraTripComponent from "@/app/commonComponents/OmratripComponent";
import { calculateDuration } from "@/app/utils/timeUtils";

export default function OmraDetails() {
  const dispatch = useDispatch<any>();
  const { loading } = useSelector((state: any) => state.omras);
  const [omraDetails, setOmraDetails] = useState<any>(undefined);
  const [omras, setOmras] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [facilities, setFacilities] = useState<any>(null);
  const [selectedDeparture, setSelectedDeparture] = useState<any>(
    omraDetails?.omraDepartures?.[0] || null
  );
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const result = await dispatch(
          getOmraDetails({
            id,
            include:
              "omraDepartures,media,omraDepartures.flight,omraDepartures.media,omraDepartures.omraDepartureSchedules,omraDepartures.pricing,agencies,destinations,destinations.airport",
          })
        ).unwrap();

        // Set initial facilities from the first departure if available
        if (result?.success && result?.result?.omra) {
          const specificOmra = result.result.omra.find(
            (omra: any) => omra.id === Number(id)
          );

          if (specificOmra?.omraDepartures?.[0]) {
            const firstDeparture = specificOmra.omraDepartures[0];
            // Extract facilities with safe fallbacks for initial load
            const defaultFacilities = { visa: null, vol: null, hotel: null, transfer: null, excursion: null, cruise: null };
            const { visa, vol, hotel, transfer, excursion, cruise } = firstDeparture || {};
            setFacilities({
              ...defaultFacilities,
              visa: typeof visa === 'boolean' ? visa : null,
              vol: typeof vol === 'boolean' ? vol : null,
              hotel: typeof hotel === 'boolean' ? hotel : null,
              transfer: typeof transfer === 'boolean' ? transfer : null,
              excursion: typeof excursion === 'boolean' ? excursion : null,
              cruise: typeof cruise === 'boolean' ? cruise : null
            });
            setSelectedDeparture(firstDeparture);
          }
        }

        if (result?.success && result?.result?.omra) {
          const specificOmra = result.result.omra.find(
            (omra: any) => omra.id === Number(id)
          );

          if (specificOmra) {
            setOmraDetails(specificOmra);
          }
        }

        const allResult = await dispatch(
          getOmraDetails({
            include: "omraDepartures,media",
          })
        ).unwrap();

        if (allResult?.success && allResult?.result?.omra) {
          setOmras(allResult.result.omra);
        }
      } catch (error) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [dispatch, id]);

  const handleDepartureSelect = (departure: any) => {
    setSelectedDeparture(departure);
    // Update facilities when departure changes
    if (departure) {
      // Extract facilities with safe fallbacks
      const defaultFacilities = { visa: null, vol: null, hotel: null, transfer: null, excursion: null, cruise: null };
      const { visa, vol, hotel, transfer, excursion, cruise } = departure || {};
      setFacilities({
        ...defaultFacilities,
        visa: typeof visa === 'boolean' ? visa : null,
        vol: typeof vol === 'boolean' ? vol : null,
        hotel: typeof hotel === 'boolean' ? hotel : null,
        transfer: typeof transfer === 'boolean' ? transfer : null,
        excursion: typeof excursion === 'boolean' ? excursion : null,
        cruise: typeof cruise === 'boolean' ? cruise : null
      });
    } else {
      // Reset facilities if no departure selected
      setFacilities(null);
    }
  };

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
                    {selectedDeparture?.flight?.bounds?.[0] && (
                      <TripSummaryComponent
                        flightInfo={{
                          from: selectedDeparture.flight.bounds[0].segments[0]
                            .departure_airport.city,
                          to: selectedDeparture.flight.bounds[0].segments[0]
                            .arrival_airport.city,
                          duration: (() => {
                            const dep =
                              selectedDeparture.flight.bounds[0].departure_date
                                .split(" ")[1]
                                .substring(0, 5);
                            const arr =
                              selectedDeparture.flight.bounds[0].arrival_date
                                .split(" ")[1]
                                .substring(0, 5);
                            const { hours, minutes } = calculateDuration(
                              dep,
                              arr
                            );
                            return `${hours}h ${minutes}m`;
                          })(),
                          departureTime:
                            selectedDeparture.flight.bounds[0].departure_date
                              .split(" ")[1]
                              .substring(0, 5),
                          departureDate: selectedDeparture.departure_date,
                          arrivalTime:
                            selectedDeparture.flight.bounds[0].arrival_date
                              .split(" ")[1]
                              .substring(0, 5),
                          arrivalDate:
                            selectedDeparture.flight.bounds[0].arrival_date?.split(
                              " "
                            )?.[0] || "N/A",
                          departureCity:
                            selectedDeparture.flight.bounds[0].segments[0]
                              .departure_airport.city,
                          departureAirport:
                            selectedDeparture.flight.bounds[0].segments[0]
                              .departure_airport.name,
                          airline:
                            selectedDeparture.flight.bounds[0].segments[0]
                              ?.operating_carrier?.name ||
                            selectedDeparture.flight.bounds[0].segments[0]
                              ?.operating_airline?.name ||
                            "Airline information not available",
                          flightNumber:
                            selectedDeparture.flight.bounds[0].segments[0]
                              ?.flight_number ||
                            selectedDeparture.flight.bounds[0].segments[0]
                              ?.flight_or_train_number ||
                            "N/A",
                        }}
                      />
                    )}
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
                  {selectedDeparture?.hotel_stay?.[0] && (
                    <ContentComponent
                      dynamicContent={
                        <OmraHotelsComponent
                          data={selectedDeparture.hotel_stay[0]}
                        />
                      }
                    />
                  )}
                </div>
              </div>

              <TitleComponent title={"Hôtel Details"} label={""} />
              <ContentComponent
                dynamicContent={
                  <OmraHotelDetails
                    includes={selectedDeparture?.includes}
                    excludes={selectedDeparture?.excludes}
                  />
                }
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
                    <OmraTravelProgram schedule={selectedDeparture?.schedule} />
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
                <div className="textarabic rtl">
                  <ContentComponent
                    dynamicContent={
                      <ImportantNote
                        content={selectedDeparture?.note || omraDetails?.note}
                      />
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Booking Section - Desktop */}
          <div className="md:hidden lg:flex lg:flex-col items-center pt-4 sm:pt-16 gap-y-8">
            <Provider store={store}>
              <BookingOmraComponent
                data={omraDetails?.omraDepartures}
                facilities={facilities}
                onDepartureSelect={handleDepartureSelect}
              />
            </Provider>
            <div className="pt-6 sm:pt-0">
              <AdComponent />
            </div>
          </div>

          {/* Booking Section - Tablet */}
          <div className="hidden lg:hidden md:flex md:pt-8 md:gap-x-8 md:justify-center md:items-center">
            <Provider store={store}>
              <BookingOmraComponent
                data={omraDetails?.omraDepartures}
                facilities={facilities}
                onDepartureSelect={handleDepartureSelect}
              />
            </Provider>
            <div className="pt-6 sm:pt-0">
              <AdComponent />
            </div>
          </div>
        </div>

        {/* Related Omras */}
        <div className="container textarabic">
          <div className="w-100" id="home-page">
            <OrganizeSection data={omras} comp={OmraTripComponent} />
          </div>
        </div>
      </div>
    </div>
  );
}
