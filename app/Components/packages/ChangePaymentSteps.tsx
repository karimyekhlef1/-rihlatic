import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  previousStep,
} from "@/lib/store/custom/packagesSlices/paymentPachageSlices";
import { storePackageReservation } from "@/lib/store/api/packages/packagesSlice";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";


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

  const { currentStep } = useSelector((state: any) => state.paymentPackage);
  const { validationSteps} = useSelector((state: any) => state.paymentPackage);

  const router = useRouter();
  const departure = useSelector((state: any) => state.paymentPackage.departure);
  const [filtredRoomData, setFiltredRoomData] = useState<{ rooms: Room[] }>({
    rooms: [],
  });
  const cardToken = useSelector((state: any) => state.paymentPackage.cardToken);
  const RoomsData = useSelector((state: any) => state.paymentPackage.RoomsData);
  const rooms = useSelector((state: any) => state.paymentPackage.rooms);
  const { loading, packagesData } = useSelector((state: any) => state.packages);
  const isVerificationStep = currentStep > rooms.length;

  const handleNext = async() => {
       const currentRoom = RoomsData[currentStep - 1];

    console.log("currentRoom",currentRoom)
    try  {

    const allPassengers = [
      ...(currentRoom.passengers.adults || []),
      ...(currentRoom.passengers.children || []),
      ...(currentRoom.passengers.infants || []),
    ];
     for (const passenger of allPassengers) {
              if (!passenger.first_name || !passenger.last_name) {
                toast.error("All passengers must have first and last names");
                return;
              }
              if (!passenger.passport_nbr || !passenger.passport_expire_at) {
                toast.error("All passengers must have valid passport information");
                return;
              }
              if (!passenger.birth_date) {
                toast.error("All passengers must have a birth date");
                return;
              }
              if (!passenger.sex || !["male", "female"].includes(passenger.sex)) {
                toast.error("All passengers must specify their sex");
                return;
              }
              if (!passenger.email) {
                toast.error("All passengers must provide an email address");
                return;
              }
              // Validate email format
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(passenger.email)) {
                toast.error("Please enter a valid email address");
                return;
              }
              if (!passenger.phone) {
                toast.error("All passengers must provide a phone number");
                return;
              }
              // Validate phone format (accepts international format)
              const phoneRegex = /^\+?[0-9]{10,15}$/;
              if (!phoneRegex.test(passenger.phone)) {
                toast.error("Please enter a valid phone number");
                return;
              }
            }
    
            // Check if room has at least one adult
            if (!currentRoom.passengers.adults?.length) {
              toast.error("Each room must have at least one adult passenger");
              return;
            }
    dispatch(nextStep());
          

  }catch{

  }
    
    
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
          Object.entries(room.passengers).filter(
            ([_, value]) => value.length > 0
          )
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
        token: cardToken,
      };
      const response = await dispatch(
        storePackageReservation(bodyData)
      ).unwrap();
      if (response.success) {
        toast.success("Booking completed successfully!");
        router.push("/reservations/packages");
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

  // console.log("validationSteps",validationSteps)
  // console.log("currentStep",currentStep)
  // console.log("validationSteps==>",validationSteps[currentStep-1])


  
  

  return (
    <div className="flex justify-between w-full mx-auto my-4">
      {currentStep > 1 ? (
        <Button
          variant="outline"
          onClick={handleBack}
          className="px-10 sm:px-14"
        >
          Back
        </Button>
      ) : (
        <span></span>
      )}
      {loading ? (
        <Button
          variant={"active"}
          onClick={handleNext}
          className="px-10 sm:px-14 flex items-center justify-center"
        >
          <Loader2 className="animate-spin text-gray-200" size={24} />
        </Button>
      ) : currentStep <= rooms?.length ? (
        <Button
          variant={"active"}
          onClick={handleNext}
          className="px-10 sm:px-14"
        >
          Next
        </Button>
      ) : (
        <Button
          variant={"active"}
          onClick={handleComplete}
          className="px-10 sm:px-14"
        >
          Complete Booking
        </Button>
      )}
    </div>
  );
}
