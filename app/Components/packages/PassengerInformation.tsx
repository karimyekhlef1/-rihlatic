"use client";

import React, { useEffect } from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passengerSchema } from "@/lib/schemas/omraSchemas";
import type { z } from "zod";
import { toast } from "sonner";

type PassengerType = "adults" | "children" | "children_without_bed" | "infants";
type PassengerInformationProps = {
  title: PassengerType;
  index: number;
  roomIndex: number;
  readOnly?: boolean;
  passengerData?: any;
};

type FormData = z.infer<typeof passengerSchema>;

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(passengerSchema),
    defaultValues: currentPassenger || {},
    mode: "onChange"
  });

  useEffect(() => {
    if (currentPassenger) {
      Object.entries(currentPassenger).forEach(([key, value]) => {
        setValue(key as keyof FormData, value as string);
      });
    }
  }, [currentPassenger, setValue]);

  const handleInputChange = async (field: keyof FormData, value: string) => {
    if (readOnly) return;

    setValue(field, value);
    const isValid = await trigger(field);

    if (isValid) {
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
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (1MB = 1024 * 1024 bytes)
    if (file.size > 1024 * 1024) {
      toast.error("File too large. Please select a file smaller than 1MB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/") && !file.type.startsWith("application/pdf")) {
      toast.error("Invalid file type. Please select an image or PDF file");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      await handleInputChange("passport_scan", base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <Card className={`w-full max-w-[840px] mx-auto mb-4 ${readOnly ? "opacity-90" : ""}`}>
        <CardContent>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold capitalize">
                {title.replace("_", " ")} #{index + 1}
              </h2>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">First Name</label>
                <Input
                  {...register("first_name")}
                  onChange={(e) => handleInputChange("first_name", e.target.value)}
                  disabled={readOnly}
                  className="mt-1"
                />
                {errors.first_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Last Name</label>
                <Input
                  {...register("last_name")}
                  onChange={(e) => handleInputChange("last_name", e.target.value)}
                  disabled={readOnly}
                  className="mt-1"
                />
                {errors.last_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Gender</label>
                <Select
                  disabled={readOnly}
                  onValueChange={(value: "male" | "female") => handleInputChange("sex", value)}
                  defaultValue={currentPassenger?.sex || ""}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                {errors.sex && (
                  <p className="text-red-500 text-xs mt-1">{errors.sex.message}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Nationality</label>
                <Input
                  {...register("nationality")}
                  onChange={(e) => handleInputChange("nationality", e.target.value)}
                  disabled={readOnly}
                  className="mt-1"
                />
                {errors.nationality && (
                  <p className="text-red-500 text-xs mt-1">{errors.nationality.message}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Date of Birth</label>
                <Input
                  {...register("birthday")}
                  type="date"
                  onChange={(e) => handleInputChange("birthday", e.target.value)}
                  disabled={readOnly}
                  className="mt-1"
                />
                {errors.birthday && (
                  <p className="text-red-500 text-xs mt-1">{errors.birthday.message}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Phone Number</label>
                <Input
                  {...register("phone")}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={readOnly}
                  className="mt-1"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  {...register("email")}
                  type="email"
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={readOnly}
                  className="mt-1"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Passport Number</label>
                <Input
                  {...register("passport_nbr")}
                  onChange={(e) => handleInputChange("passport_nbr", e.target.value)}
                  disabled={readOnly}
                  className="mt-1"
                />
                {errors.passport_nbr && (
                  <p className="text-red-500 text-xs mt-1">{errors.passport_nbr.message}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Passport Expiry Date</label>
                <Input
                  {...register("passport_expire_at")}
                  type="date"
                  onChange={(e) => handleInputChange("passport_expire_at", e.target.value)}
                  disabled={readOnly}
                  className="mt-1"
                />
                {errors.passport_expire_at && (
                  <p className="text-red-500 text-xs mt-1">{errors.passport_expire_at.message}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Passport Scan</label>
                <Input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileUpload}
                  disabled={readOnly}
                  className="mt-1"
                />
                {currentPassenger?.passport_scan && (
                  <p className="text-green-500 text-xs mt-1">Passport scan uploaded</p>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
