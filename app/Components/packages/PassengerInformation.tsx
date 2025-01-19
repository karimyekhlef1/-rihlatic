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

    if (file.size > 1024 * 1024) {
      toast.error("File too large. Please select a file smaller than 1MB");
      return;
    }

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
    <Card
      className={`w-full ${
        title === "children_without_bed"
          ? "border-orange-200 bg-orange-50"
          : ""
      }`}
    >
      <CardContent className="space-y-4 p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold capitalize flex items-center gap-2">
            {title.replace(/_/g, " ")}
            {title === "children_without_bed" && (
              <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
                No Bed
              </span>
            )}
          </h3>
          <span className="text-sm text-gray-500">#{index + 1}</span>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col space-y-2 mt-4 mb-6">
            <div className="text-lg font-semibold capitalize">
              {title.replace("_", " ")} {index + 1}
            </div>
          </div>

          {title === "adults" && index === 0 && (
            <div className="flex flex-col sm:flex-row gap-4 pb-2">
              <div className="flex flex-col w-full">
                <label className="text-sm text-gray-500">Email</label>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="E-mail of passenger"
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={readOnly}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label className="text-sm text-gray-500">Phone Number</label>
                <Input
                  {...register("phone")}
                  type="tel"
                  placeholder="Phone number"
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={readOnly}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>
          )}

          <Separator />

          <div className="relative">
            <Input
              type="file"
              accept="image/*,application/pdf"
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              onChange={handleFileUpload}
              disabled={readOnly}
            />
            <div className="flex items-center border rounded-md bg-background px-3 py-2 text-gray-700">
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="mr-2 drop-shadow-md"
              >
                Scan passport
              </Button>
            </div>
          </div>
          <p className="text-xs text-gray-400">
            We will scan your passport automatically when you upload it
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pb-2">
            <div className="flex flex-col w-full">
              <label className="text-sm text-gray-500">First Name</label>
              <Input
                {...register("first_name")}
                placeholder="First name"
                onChange={(e) => handleInputChange("first_name", e.target.value)}
                disabled={readOnly}
              />
              {errors.first_name && (
                <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label className="text-sm text-gray-500">Last Name</label>
              <Input
                {...register("last_name")}
                placeholder="Last name"
                onChange={(e) => handleInputChange("last_name", e.target.value)}
                disabled={readOnly}
              />
              {errors.last_name && (
                <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm text-gray-500">Gender</label>
              <Select
                disabled={readOnly}
                onValueChange={(value: "male" | "female") => handleInputChange("sex", value)}
                defaultValue={currentPassenger?.sex || ""}
              >
                <SelectTrigger>
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

            <div className="flex flex-col">
              <label className="text-sm text-gray-500">Date of Birth</label>
              <Input
                {...register("birthday")}
                type="date"
                placeholder="Select birth date"
                onChange={(e) => handleInputChange("birthday", e.target.value)}
                disabled={readOnly}
              />
              {errors.birthday && (
                <p className="text-red-500 text-xs mt-1">{errors.birthday.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm text-gray-500">Nationality</label>
              <Input
                {...register("nationality")}
                placeholder="Nationality"
                onChange={(e) => handleInputChange("nationality", e.target.value)}
                disabled={readOnly}
              />
              {errors.nationality && (
                <p className="text-red-500 text-xs mt-1">{errors.nationality.message}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-500">Passport Number</label>
              <Input
                {...register("passport_nbr")}
                placeholder="Passport Number"
                onChange={(e) => handleInputChange("passport_nbr", e.target.value)}
                disabled={readOnly}
              />
              {errors.passport_nbr && (
                <p className="text-red-500 text-xs mt-1">{errors.passport_nbr.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-500">Passport Expiry Date</label>
            <Input
              {...register("passport_expire_at")}
              type="date"
              placeholder="Select passport expire date"
              onChange={(e) => handleInputChange("passport_expire_at", e.target.value)}
              disabled={readOnly}
            />
            {errors.passport_expire_at && (
              <p className="text-red-500 text-xs mt-1">{errors.passport_expire_at.message}</p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
