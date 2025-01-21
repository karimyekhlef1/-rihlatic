"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOmraReservationDetails } from "@/lib/store/api/omras/omrasSlice";
import Loading from "@/app/Components/home/Loading";
import { useParams } from "next/navigation";
import { AppDispatch } from "@/lib/store/store";

interface Activity {
  id: number;
  description: string;
  created_at: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

interface Room {
  id: number;
  name: string;
  type: string;
}

interface BookingDetail {
  id: number;
  extras: any;
  room: Room;
  passenger: {
    id: number;
    first_name: string;
    last_name: string;
    passport_number: string;
  };
}

interface Departure {
  id: number;
  departure_date: string;
  return_date: string;
  itinerary: string[];
  visa: boolean;
  vol: boolean;
  hotel: boolean;
  transfer: boolean;
  excursion: boolean;
  cruise: boolean;
}

interface Reservation {
  id: number;
  ref: string;
  reference: string;
  departure: Departure;
  total_price: string;
  total_price_agency: string;
  total_paid: string;
  commissions_total: string;
  status: string;
  activities: Activity[];
  bookingDetails: BookingDetail[];
  total_adults: number;
  adults_price: string;
  total_children: number;
  children_price: string;
}

export default function OmraReservationSummaryPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: any) => state.omras);
  const [reservationDetails, setReservationDetails] = useState<Reservation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await dispatch(getOmraReservationDetails({})).unwrap();
        
        console.log('API Response:', response);

        if (!response?.success) {
          setError('Failed to fetch reservation details');
          return;
        }

        if (!response?.result?.bookings) {
          setError('No booking data found');
          return;
        }

        // Find the specific booking by ID
        const booking = response.result.bookings.find(
          (booking: Reservation) => booking.id === Number(id)
        );

        if (!booking) {
          setError(`No booking found with ID: ${id}`);
          return;
        }

        console.log('Found booking:', booking);
        setReservationDetails(booking);
      } catch (error: any) {
        console.error('Error fetching reservation details:', error);
        setError(error.response?.data?.message || 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      getData();
    }
  }, [dispatch, id]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB");
  };

  if (loading || isLoading) return <Loading />;
  
  if (error) {
    return (
      <div className="h-full flex-col items-center flex pt-8 pb-20 bg-[#f8f8f8]">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="h-full flex-col items-center flex pt-8 pb-20 bg-[#f8f8f8]">
      {reservationDetails ? (
        <div className="w-full max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold mb-4">Reservation Summary</h1>
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Reference:</p>
                <p>{reservationDetails.reference}</p>
              </div>
              <div>
                <p className="font-semibold">Status:</p>
                <p>{reservationDetails.status}</p>
              </div>
              <div>
                <p className="font-semibold">Total Price:</p>
                <p>{reservationDetails.total_price}</p>
              </div>
              <div>
                <p className="font-semibold">Amount Paid:</p>
                <p>{reservationDetails.total_paid}</p>
              </div>
            </div>

            {/* Travel Details */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Travel Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Departure Date:</p>
                  <p>{formatDate(reservationDetails.departure.departure_date)}</p>
                </div>
                <div>
                  <p className="font-semibold">Return Date:</p>
                  <p>{formatDate(reservationDetails.departure.return_date)}</p>
                </div>
                <div>
                  <p className="font-semibold">Itinerary:</p>
                  <p>{reservationDetails.departure.itinerary.join(" → ")}</p>
                </div>
              </div>
            </div>

            {/* Passengers */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Passengers</h2>
              <div className="space-y-2">
                {reservationDetails.bookingDetails.map((detail) => (
                  <div key={detail.id} className="bg-gray-50 p-3 rounded">
                    <p>
                      <span className="font-semibold">Name:</span>{" "}
                      {detail.passenger.first_name} {detail.passenger.last_name}
                    </p>
                    <p>
                      <span className="font-semibold">Passport:</span>{" "}
                      {detail.passenger.passport_number}
                    </p>
                    <p>
                      <span className="font-semibold">Room:</span>{" "}
                      {detail.room.name} ({detail.room.type})
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Activities</h2>
              <div className="space-y-2">
                {reservationDetails.activities.map((activity) => (
                  <div key={activity.id} className="text-sm">
                    <span className="font-medium">
                      {formatDate(activity.created_at)}:
                    </span>{" "}
                    {activity.description}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No reservation details available</div>
      )}
    </div>
  );
}
