import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateTraveler, setContactInfo } from "@/lib/store/custom/flightSlices/flightPaymentSlice";
import PassengerInformationVol from "./PassengerInformationVol";
import { volContact } from "@/lib/schemas/volSchemas";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from "react";

interface FlightReservationInformationProps {
  flight: any; // TODO: Add proper flight type
}
interface PassengerInfo {
  type: string;
  index: number;
}
type FormData = z.infer<typeof volContact>;

export default function FlightReservationInformation({ flight }: FlightReservationInformationProps) {
  const dispatch = useDispatch();
  const { email, phone, mobileCountry, dataOfSearch } = useSelector(
    (state: RootState) => state.flightPayment
  );
  useEffect(()=>{

  },[dataOfSearch])
console.log("dataOfSearch.volPassanger",dataOfSearch.volPassanger)
  const {
    register,
    formState: { errors },
    setValue,
    trigger
  } = useForm<FormData>({
    resolver: zodResolver(volContact),
    mode: "all",
    defaultValues: {
      email,
      phone
    },
    });

  const passengers: PassengerInfo[] = Object.entries(dataOfSearch.volPassanger).reduce<PassengerInfo[]>(
    (acc, [type, count]) => [
      ...acc,
      ...Array(count).fill(null).map((_, index) => ({
        type,
        index
      }))
    ],
    []
  );


  const handleContactUpdate =async (field: "phone" | "email" | "mobileCountry", value: string) => {
   setValue(field , value)
    const isValid = await trigger(field);
    if (isValid) {

    dispatch(
      setContactInfo({
        email: field === "email" ? value : email,
        phone: field === "phone" ? value : phone,
        mobileCountry: field === "mobileCountry" ? value : mobileCountry,
      })
    );
  }
  };

  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
          {...register("email")}

              id="email"
              onChange={(e) => handleContactUpdate("email", e.target.value)}
              placeholder="Enter your email"
              className={errors.email?'border-red-500 border-2':''}
              defaultValue={email}

            />
             {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <div className="flex gap-2">
              <Select
                value={mobileCountry}
                onValueChange={(value) => handleContactUpdate("mobileCountry", value)}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Code" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+213">+213</SelectItem>
                  {/* Add more country codes as needed */}
                </SelectContent>
              </Select>
              <div>
              <Input
          {...register("phone")}

                id="phone"
                defaultValue={phone}

                onChange={(e) => handleContactUpdate("phone", e.target.value)}
                placeholder="Enter phone number"
                className={errors.phone?'border-red-500 border-2':''}

                />
                 {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                  )}
                  </div>
            </div>
          </div>
        </div>
      </Card>

      {passengers.map(({ type, index }, globalIndex) => (
        <PassengerInformationVol
          key={`${type}-${index}`} 
          type={type}
          index={index}
          globalIndex={globalIndex}
        />
      ))}
     
    </div>
  );
}

