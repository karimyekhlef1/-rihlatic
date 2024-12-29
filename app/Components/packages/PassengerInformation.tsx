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
  readOnly?: boolean;
  passengerData?: any;
};

export default function PassengerInformation({
  title,
  index,
  roomIndex,
  readOnly = false,
  passengerData,
}: PassengerInformationProps) {
  const dispatch = useDispatch();

  const passenger = useSelector(
    (state: RootState) =>
      state.omreaReservationInfos.rooms[roomIndex]?.passengers[title][index]
  );

  const currentPassenger = passengerData || passenger;

  const allRoomsData = useSelector(
    (state: RootState) => state.omreaReservationInfos
  );

  // Log data whenever it changes
  useEffect(() => {
    console.log("Current Passenger Data:", currentPassenger);
    console.log("All Rooms Data:", allRoomsData);
  }, [currentPassenger, allRoomsData]);

  const handleInputChange = (field: string, value: string | null) => {
    if (readOnly) return;
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
      <Card className={`w-full max-w-[840px] mx-auto mb-4 ${readOnly ? 'opacity-90' : ''}`}>
        <CardContent>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col space-y-2 mt-4 mb-6">
              <div className="text-lg font-semibold">
                {title[0].toUpperCase() + title.substring(1).replace(/_/g, " ")}{" "}
                {index + 1}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <Input
                  placeholder="Enter email address"
                  type="email"
                  value={currentPassenger?.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={readOnly}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <Input
                  placeholder="Enter phone number"
                  type="tel"
                  value={currentPassenger?.phone || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={readOnly}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <Input
                  placeholder="Enter first name"
                  value={currentPassenger?.first_name || ""}
                  onChange={(e) => handleInputChange("first_name", e.target.value)}
                  disabled={readOnly}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <Input
                  placeholder="Enter last name"
                  value={currentPassenger?.last_name || ""}
                  onChange={(e) => handleInputChange("last_name", e.target.value)}
                  disabled={readOnly}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">Gender</label>
                <Select
                  value={currentPassenger?.sex || ""}
                  onValueChange={(value) => handleInputChange("sex", value)}
                  disabled={readOnly}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">Passport Number</label>
                <Input
                  placeholder="Enter passport number"
                  value={currentPassenger?.passport_nbr || ""}
                  onChange={(e) => handleInputChange("passport_nbr", e.target.value)}
                  disabled={readOnly}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">Passport Expiry Date</label>
                <Input
                  type="date"
                  placeholder="Select expiry date"
                  value={currentPassenger?.passport_expire_at || ""}
                  onChange={(e) => handleDateInputChange(e, "passport_expire_at")}
                  disabled={readOnly}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                <Input
                  type="date"
                  placeholder="Select birth date"
                  value={currentPassenger?.birth_date || ""}
                  onChange={(e) => handleDateInputChange(e, "birth_date")}
                  disabled={readOnly}
                />
              </div>
              {!readOnly && (
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-gray-700">Passport Scan</label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      disabled={readOnly}
                    />
                    {currentPassenger?.passport_scan && (
                      <Button
                        variant="outline"
                        onClick={() => handleInputChange("passport_scan", null)}
                        disabled={readOnly}
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
