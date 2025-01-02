"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge, type BadgeProps } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOmraReservationDetails,
  cancelOmraPenalty,
} from "@/lib/store/api/omras/omrasSlice";
import { AppDispatch } from "@/lib/store/store";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Activity {
  id: number;
  description: string;
  created_at: string;
  user: User;
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
}

interface Reservation {
  id: number;
  ref: string;
  reference: string;
  departure: Departure;
  total_price: string;
  status: string;
  activities: Activity[];
  bookingDetails: BookingDetail[];
}

export default function FlightsTable() {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [expandedPassengers, setExpandedPassengers] = useState<number | null>(
    null
  );
  const [expandedActivities, setExpandedActivities] = useState<number | null>(
    null
  );
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReservations = async () => {
    try {
      setIsLoading(true);
      const response = await dispatch(getOmraReservationDetails({})).unwrap();
      if (response.success && response.result.bookings) {
        setReservations(response.result.bookings);
      }
    } catch (error) {
      console.error("Failed to fetch reservations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [dispatch]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB");
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status === selectedStatus ? "" : status);
  };

  const getLatestActivityDescription = (activities: Activity[]) => {
    return (
      activities[activities.length - 1]?.description || "No activity recorded"
    );
  };

  const togglePassengers = (id: number) => {
    setExpandedPassengers(expandedPassengers === id ? null : id);
  };

  const toggleActivities = (id: number) => {
    setExpandedActivities(expandedActivities === id ? null : id);
  };

  const getPassengerFullName = (passenger: BookingDetail["passenger"]) => {
    return `${passenger.first_name} ${passenger.last_name}`;
  };

  const getStatusVariant = (status: string) => {
    const statusMap: { [key: string]: BadgeProps["variant"] } = {
      accepted: "Accepted",
      reserved: "reserved",
      cancelled: "cancelled",
    };
    return statusMap[status.toLowerCase()] || "default";
  };

  const cancelWithPenalty = async (reservation: Reservation) => {
    try {
      console.log('Reservation ID:', reservation.id);
      console.log('Full reservation:', reservation);
      
      if (!reservation.id) {
        console.error("No reservation ID found:", reservation);
        return;
      }

      // Optimistically update UI
      setReservations(prev => 
        prev.map(res => 
          res.id === reservation.id 
            ? { ...res, status: 'cancelled' }
            : res
        )
      );

      console.log('Attempting to cancel reservation with ID:', reservation.id);
      try {
        await dispatch(cancelOmraPenalty({ 
          data: {
            reservation_id: reservation.id,
            reference: reservation.reference
          }, 
          id: reservation.id.toString() 
        })).unwrap();
        
        console.log('Successfully cancelled reservation. Refreshing data...');
        // Fetch fresh data after cancellation
        await fetchReservations();
      } catch (error) {
        console.error('Cancel API error:', error);
        // Revert optimistic update on error
        await fetchReservations();
        return;
      }
    } catch (error: any) {
      console.error("Error in cancelWithPenalty:", error);
      console.error("Error details:", {
        message: error?.message,
        status: error?.response?.status,
        data: error?.response?.data
      });
      // Revert optimistic update on error
      await fetchReservations();
    }
  };

  return (
    <div className="overflow-x-auto">
      <Card>
        <CardContent>
          <Table className="min-w-full">
            <TableCaption>A list of your recent reservations.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-black font-bold">ID</TableHead>
                <TableHead className="text-black font-bold flex-nowrap">
                  Reference
                </TableHead>
                <TableHead className="text-black font-bold">
                  Passengers
                </TableHead>
                <TableHead className="text-black font-bold hidden md:table-cell">
                  Itinerary
                </TableHead>
                <TableHead className="text-black font-bold hidden sm:table-cell">
                  Depart
                </TableHead>
                <TableHead className="text-black font-bold hidden sm:table-cell">
                  Return
                </TableHead>
                <TableHead className="text-black font-bold hidden md:table-cell">
                  Price
                </TableHead>
                <TableHead className="text-black font-bold">Status</TableHead>
                <TableHead className="text-black font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                reservations.map((reservation) => (
                  <>
                    <TableRow key={reservation.id}>
                      <TableCell className="font-medium text-xs">
                        {reservation.id}
                      </TableCell>
                      <TableCell className="font-medium text-wrap text-xs">
                        {reservation.reference}
                      </TableCell>
                      <TableCell
                        className="font-medium text-wrap text-xs cursor-pointer hover:bg-gray-50"
                        onClick={() => togglePassengers(reservation.id)}
                      >
                        {reservation.bookingDetails[0]?.passenger
                          ? getPassengerFullName(
                              reservation.bookingDetails[0].passenger
                            )
                          : "No passengers"}
                        <ChevronDown className="inline ml-1 h-4 w-4" />
                      </TableCell>
                      <TableCell className="font-medium text-xs hidden md:table-cell">
                        {reservation.departure?.itinerary || "N/A"}
                      </TableCell>
                      <TableCell className="font-medium text-xs hidden sm:table-cell">
                        {formatDate(reservation.departure?.departure_date)}
                      </TableCell>
                      <TableCell className="font-medium text-xs hidden sm:table-cell">
                        {formatDate(reservation.departure?.return_date)}
                      </TableCell>
                      <TableCell className="font-medium text-xs hidden md:table-cell">
                        {reservation.total_price} DZD
                      </TableCell>
                      <TableCell className="font-medium text-xs">
                        <Badge variant={getStatusVariant(reservation.status)}>
                          {reservation.status || "Confirmed"}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className="flex items-center gap-2 font-medium text-xs cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleActivities(reservation.id)}
                      >
                        {expandedActivities === reservation.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                        <Trash2
                          className="h-4 w-4 text-red-500 hover:text-red-700 ml-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            cancelWithPenalty(reservation);
                          }}
                        />
                      </TableCell>
                    </TableRow>

                    {expandedPassengers === reservation.id && (
                      <TableRow>
                        <TableCell colSpan={9}>
                          <div className="p-4 bg-gray-50">
                            <h4 className="font-semibold mb-2">Passengers:</h4>
                            <ul className="space-y-2">
                              {reservation.bookingDetails.map((detail) => (
                                <li key={detail.id} className="text-sm">
                                  <span className="font-medium">
                                    {getPassengerFullName(detail.passenger)}
                                  </span>{" "}
                                  - Passport: {detail.passenger.passport_number}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                    {expandedActivities === reservation.id && (
                      <TableRow>
                        <TableCell colSpan={9}>
                          <div className="p-4 bg-gray-50">
                            <h4 className="font-semibold mb-2">Activities:</h4>
                            <ul className="space-y-2">
                              {reservation.activities.map((activity) => (
                                <li key={activity.id} className="text-sm">
                                  <span className="font-medium">
                                    {formatDate(activity.created_at)}:
                                  </span>{" "}
                                  {activity.description}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
