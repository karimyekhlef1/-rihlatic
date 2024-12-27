"use client";
import React, { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format, parse } from "date-fns";
import { updatePassenger } from "@/lib/store/custom/commonSlices/omraReservationSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RootState } from "@/lib/store/store";

type PassengerType = "adults" | "children" | "children_without_bed" | "infants";
type PassengerInformationProps = {
  title: PassengerType;
  index: number;
  roomIndex: number;
};

export default function PassengerInformation({
  title,
  index,
  roomIndex,
}: PassengerInformationProps) {
  const dispatch = useDispatch();

  const passenger = useSelector(
    (state: RootState) =>
      state.omreaReservationInfos.rooms[roomIndex]?.passengers[title][index]
  );

  const allRoomsData = useSelector(
    (state: RootState) => state.omreaReservationInfos
  );

  // Log data whenever it changes
  useEffect(() => {
    console.log("Current Passenger Data:", passenger);
    console.log("All Rooms Data:", allRoomsData);
  }, [passenger, allRoomsData]);

  const handleInputChange = (field: string, value: string | null) => {
    dispatch(
      updatePassenger({
        roomIndex,
        passengerType: title,
        passengerIndex: index,
        passengerData: {
          [field]: value,
        },
      })
    );
  };

  const formatDate = useMemo(
    () => (dateString: string | null) => {
      if (!dateString) return "Select Date";
      const date = parse(dateString, "yyyy-MM-dd", new Date());
      return format(date, "dd MMM yyyy");
    },
    []
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        handleInputChange("passport_scan", base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDateInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const inputValue = e.target.value;
    handleInputChange(field, inputValue);
  };

  return (
    <div>
      <Card className="w-full max-w-[840px] mx-auto mb-4">
        <CardContent>
          <form className="space-y-4">
            <div className="flex flex-col space-y-2 mt-4 mb-6">
              <div className="text-lg font-semibold">
                {title[0].toUpperCase() + title.substring(1).replace(/_/g, " ")}{" "}
                {index + 1}
              </div>
            </div>

            <div className="flex flex-row gap-x-4 pb-4">
              <Input
                id="email"
                type="email"
                placeholder="E-mail of passenger"
                value={passenger?.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              <Input
                id="phone"
                type="tel"
                placeholder="Phone number"
                value={passenger?.phone || ""}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
            <Separator />

            <div className="relative">
              <Input
                id="passport"
                type="file"
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                accept="image/*"
                onChange={handleFileUpload}
              />
              <div className="flex items-center border rounded-md bg-background px-3 py-2 text-gray-700">
                <Button
                  type="button"
                  size="sm"
                  variant={"outline"}
                  className="mr-2 drop-shadow-md"
                >
                  Scan passport
                </Button>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              We will scan your passport automatically when you upload it
            </p>

            <div className="flex flex-row gap-x-4 pb-2">
              <Input
                id="firstName"
                placeholder="First name"
                value={passenger?.first_name || ""}
                onChange={(e) =>
                  handleInputChange("first_name", e.target.value)
                }
              />
              <Input
                id="lastName"
                placeholder="Last name"
                value={passenger?.last_name || ""}
                onChange={(e) => handleInputChange("last_name", e.target.value)}
              />
            </div>

            <Select
              value={passenger?.sex || ""}
              onValueChange={(value) =>
                handleInputChange("sex", value as "male" | "female")
              }
            >
              <SelectTrigger id="sex">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Date of Birth
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="YYYY-MM-DD"
                    value={passenger?.birth_date || ""}
                    onChange={(e) => handleDateInputChange(e, "birth_date")}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Passport Expiry Date
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="YYYY-MM-DD"
                    value={passenger?.passport_expire_at || ""}
                    onChange={(e) =>
                      handleDateInputChange(e, "passport_expire_at")
                    }
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                  />
                </div>
              </div>
            </div>

            <Input
              type="text"
              placeholder="Passport Number"
              value={passenger?.passport_nbr || ""}
              onChange={(e) =>
                handleInputChange("passport_nbr", e.target.value)
              }
            />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
