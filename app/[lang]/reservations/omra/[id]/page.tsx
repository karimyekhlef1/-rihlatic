"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getOmraReservationDetails,
  cancelOmraPenalty,
} from "@/lib/store/api/omras/omrasSlice";
import Loading from "@/app/Components/home/Loading";
import { useParams } from "next/navigation";
import { AppDispatch } from "@/lib/store/store";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Timeline, TimelineItem } from "@/app/Components/common/Timeline";
import OmraFacilities from "@/app/Components/omra/OmraFacilities";
import OmraSummary from "@/app/Components/omra/OmraSummary";
import { toast } from "sonner";

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
  const [reservationDetails, setReservationDetails] =
    useState<Reservation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      console.log("🚀 Starting getData function");
      console.log("📝 Current ID:", id);

      setIsLoading(true);
      setError(null);

      try {
        console.log("📡 Making API request...");
        const response = await dispatch(getOmraReservationDetails({})).unwrap();
        console.log("📦 Full API Response:", JSON.stringify(response, null, 2));

        if (!response?.success) {
          console.error("❌ API request failed:", response);
          setError("Failed to fetch reservation details");
          return;
        }

        if (!response?.result?.bookings) {
          console.error("❌ No bookings found in response:", response.result);
          setError("No booking data found");
          return;
        }

        console.log("📋 All bookings:", response.result.bookings);

        const booking = response.result.bookings.find(
          (booking: Reservation) => booking.id === Number(id)
        );

        if (!booking) {
          console.error(`❌ No booking found with ID: ${id}`);
          console.log(
            "🔍 Available booking IDs:",
            response.result.bookings.map((b: Reservation) => b.id)
          );
          setError(`No booking found with ID: ${id}`);
          return;
        }

        console.log(
          "✅ Found matching booking:",
          JSON.stringify(booking, null, 2)
        );
        console.log("🏨 Departure details:", booking.departure);
        console.log("👥 Booking details:", booking.bookingDetails);
        console.log("📅 Activities:", booking.activities);
        console.log("💰 Pricing:", {
          total_price: booking.total_price,
          total_paid: booking.total_paid,
          adults: {
            count: booking.total_adults,
            price: booking.adults_price,
          },
          children: {
            count: booking.total_children,
            price: booking.children_price,
          },
        });

        setReservationDetails(booking);
      } catch (error: any) {
        console.error("🔥 Error in getData:", error);
        console.error("Error details:", {
          message: error.message,
          response: error.response?.data,
          stack: error.stack,
        });
        setError(error.response?.data?.message || "An error occurred");
      } finally {
        console.log("🏁 getData function completed");
        setIsLoading(false);
      }
    };

    if (id) {
      console.log("🔄 Effect triggered with ID:", id);
      getData();
    } else {
      console.warn("⚠️ No ID provided");
    }
  }, [dispatch, id]);

  const handleCancelBooking = async () => {
    try {
      if (!reservationDetails?.id) {
        console.error("No reservation ID found:", reservationDetails);
        return;
      }

      // Check if reservation is already cancelled
      if (reservationDetails.status.toLowerCase() === "cancelled") {
        toast.error("This reservation is already cancelled", {
          description: `Reservation #${reservationDetails.reference} cannot be cancelled again.`,
        });
        return;
      }

      // Optimistically update UI
      setReservationDetails((prev) =>
        prev ? { ...prev, status: "cancelled" } : prev
      );

      console.log(
        "Attempting to cancel reservation with ID:",
        reservationDetails.id
      );
      try {
        await dispatch(
          cancelOmraPenalty({
            data: {
              reservation_id: reservationDetails.id,
              reference: reservationDetails.reference,
            },
            id: reservationDetails.id.toString(),
          })
        ).unwrap();

        console.log("Successfully cancelled reservation");
        toast.success("Reservation Cancelled", {
          description: `Successfully cancelled reservation #${reservationDetails.reference}`,
        });

        // Fetch fresh data
        const response = await dispatch(getOmraReservationDetails({})).unwrap();
        if (response.success && response.result.bookings) {
          const updatedBooking = response.result.bookings.find(
            (booking: Reservation) => booking.id === reservationDetails.id
          );
          if (updatedBooking) {
            setReservationDetails(updatedBooking);
          }
        }
      } catch (error) {
        console.error("Cancel API error:", error);
        toast.error("Failed to cancel reservation", {
          description:
            "There was an error cancelling your reservation. Please try again.",
        });
        // Revert optimistic update on error
        const response = await dispatch(getOmraReservationDetails({})).unwrap();
        if (response.success && response.result.bookings) {
          const originalBooking = response.result.bookings.find(
            (booking: Reservation) => booking.id === reservationDetails.id
          );
          if (originalBooking) {
            setReservationDetails(originalBooking);
          }
        }
      }
    } catch (error: any) {
      console.error("Error in handleCancelBooking:", error);
      console.error("Error details:", {
        message: error?.message,
        status: error?.response?.status,
        data: error?.response?.data,
      });
      toast.error("Error", {
        description: "An unexpected error occurred. Please try again.",
      });
      // Revert optimistic update on error
      const response = await dispatch(getOmraReservationDetails({})).unwrap();
      if (response.success && response.result.bookings) {
        const originalBooking = response.result.bookings.find(
          (booking: Reservation) => booking.id === reservationDetails?.id
        );
        if (originalBooking) {
          setReservationDetails(originalBooking);
        }
      }
    }
  };

  if (loading || isLoading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!reservationDetails) return <div>No reservation details found</div>;

  return (
    <div className="bg-[#F8F8F8] flex items-start justify-center flex-wrap gap-4 p-4">
      <div className="w-full max-w-3xl space-y-4">
        {/* Header Card */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                Reservation{" "}
                <span className="font-semibold text-orange-500">
                  #{reservationDetails.reference}
                </span>
              </h2>
              <Badge
                variant={
                  reservationDetails.status === "Accepted" ||
                  reservationDetails.status === "accepted"
                    ? "Accepted"
                    : reservationDetails.status === "cancelled" ||
                        reservationDetails.status === "Cancelled"
                      ? "cancelled"
                      : "destructive"
                }
              >
                {reservationDetails.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {/* Travel Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Departure Date</p>
                  <p className="font-medium">
                    {format(
                      new Date(reservationDetails.departure.departure_date),
                      "dd MMM yyyy"
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Return Date</p>
                  <p className="font-medium">
                    {format(
                      new Date(reservationDetails.departure.return_date),
                      "dd MMM yyyy"
                    )}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Itinerary</p>
                <p className="font-medium">
                  {reservationDetails.departure.itinerary.join(" → ")}
                </p>
              </div>

              {/* Facilities */}
              <OmraFacilities facilities={reservationDetails.departure} />
            </div>
          </CardContent>
        </Card>

        {/* Passengers Card */}
        <Card>
          <CardHeader>
            <h3 className="text-2xl font-bold">Passengers information</h3>
          </CardHeader>
          <CardContent>
            <OmraSummary
              rooms={reservationDetails.bookingDetails.map((detail) => ({
                room_id: detail.room.id,
                passengers: {
                  adults: [
                    {
                      ...detail.passenger,
                      sex: "male", // You might want to get this from your API or form data
                    },
                  ],
                  children: [],
                },
              }))}
            />
          </CardContent>
        </Card>

        {/* Activities Timeline */}
        <Card>
          <CardHeader>
            <h3 className="text-2xl font-bold">Booking History</h3>
          </CardHeader>
          <CardContent>
            <Timeline>
              {reservationDetails.activities.map((activity) => (
                <TimelineItem key={activity.id}>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-600">
                      {format(
                        new Date(activity.created_at),
                        "dd MMM yyyy HH:mm"
                      )}
                    </span>
                    <p>{activity.description}</p>
                    <span className="text-sm text-gray-500">
                      by {activity.user.name}
                    </span>
                  </div>
                </TimelineItem>
              ))}
            </Timeline>
          </CardContent>
        </Card>

        {/* Cancel Button */}
        {reservationDetails.status !== "cancelled" && (
          <div className="flex justify-end">
            <Button
              variant="destructive"
              onClick={handleCancelBooking}
              className="flex items-center gap-2"
            >
              <AlertCircle className="h-4 w-4" />
              Cancel Booking
            </Button>
          </div>
        )}
      </div>

      {/* Pricing Card */}
      <Card className="w-full md:w-80 sticky top-4">
        <CardHeader>
          <h3 className="text-xl font-semibold">Price Details</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reservationDetails.total_adults > 0 && (
              <div className="flex justify-between">
                <span>Adults ({reservationDetails.total_adults})</span>
                <span>{reservationDetails.adults_price}</span>
              </div>
            )}

            {reservationDetails.total_children > 0 && (
              <div className="flex justify-between">
                <span>Children ({reservationDetails.total_children})</span>
                <span>{reservationDetails.children_price}</span>
              </div>
            )}

            <Separator />

            <div className="flex justify-between font-bold">
              <span>Total Price</span>
              <span>{reservationDetails.total_price}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Amount Paid</span>
              <span>{reservationDetails.total_paid}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
