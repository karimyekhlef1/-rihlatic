import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { nextStep , previousStep } from '@/lib/store/custom/packagesSlices/paymentPachageSlices';
import { storePackageReservation } from '@/lib/store/api/packages/packagesSlice';
import { toast } from 'sonner';

interface Room {
  room_id: number;
  passengers: Passengers;
}

interface Passenger {
  email?: string;
  phone?: string;
  first_name: string;
  last_name: string;
  sex: string;
  passport_nbr: string;
  passport_expire_at: string;
  birth_date: string;
}

interface Passengers {
  adults: Passenger[];
  children?: Passenger[];
  infants?: Passenger[];
}

export default function ChangePaymentSteps() {

  const dispatch = useDispatch<any>();

  const {currentStep} = useSelector((state: any) => state.paymentPackage);

  const departure = useSelector((state: any) => state.paymentPackage.departure);
  const [filtredRoomData, setFiltredRoomData] = useState<{ rooms: Room[] }>({ rooms: [] });
  const cardToken = useSelector((state: any) => state.paymentPackage.cardToken);
  const RoomsData = useSelector((state: any) => state.paymentPackage.RoomsData);
  const rooms = useSelector((state: any) => state.paymentPackage.rooms);


  const handleNext = () => {
    dispatch(nextStep());
  };

  const handleBack = () => {
    dispatch(previousStep());
  };


  useEffect(() => {
    const filteredRooms = cleanEmptyPassengerArrays(RoomsData);
    setFiltredRoomData(filteredRooms);
  }, [RoomsData, departure]);

  const cleanEmptyPassengerArrays = (data: Room[]): { rooms: Room[] } => {
    return {
      rooms: data.map((room) => {
        const cleanedPassengers: Passengers = Object.fromEntries(
          Object.entries(room.passengers).filter(([_, value]) => value.length > 0)
        ) as Passengers;
  
        return {
          room_id: room.room_id,
          passengers: cleanedPassengers,
        };
      }),
    };
  };

  const handleComplete = async () => {
    try {
      const bodyData = {
        departure_id: departure.id,
        rooms: filtredRoomData.rooms,
        token: cardToken
      };
      const response = await dispatch(storePackageReservation(bodyData)).unwrap();
      if (response.success) {
        toast.success("Booking completed successfully!");
      } else {
        toast.error(
          response.message || "Failed to complete booking. Please try again."
        );
      }
    } catch (error: any) {
      console.error("Booking error details:", error);
      toast.error("An error occurred while processing your booking");
    }
  };

  return (
    <div className="flex justify-between w-full mx-auto my-4">
      {
        currentStep > 1 ? (
          <Button variant="outline" onClick={handleBack} className="px-10 sm:px-14">
            Back
          </Button>
        ) : (<span></span>)
      }
      {
        currentStep <= rooms?.length ? (
          <Button variant={'active'} onClick={handleNext} className="px-10 sm:px-14">
            Next
          </Button>
        ) : (<Button variant={'active'} onClick={handleComplete} className="px-10 sm:px-14">
          Complete Booking
        </Button>)
      }
    </div>
  )
}
