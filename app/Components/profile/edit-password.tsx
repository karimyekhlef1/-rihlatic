"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogTitle, DialogContent } from "@/components/ui/dialog";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store/store";
import { setPasswordDialogOpen } from "@/lib/store/custom/mainSlices/dialogSlice";
import { updatePassword } from "@/lib/store/api/account/accountSlice";
import { toast } from "sonner";
import { storageUtils } from "@/utils/localStorage";

// Import Zod validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordChangeSchema } from "@/lib/schemas/profileSchemas";
import type { z } from "zod";

type FormData = z.infer<typeof passwordChangeSchema>;

export default function EditPassword() {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector(
    (state: RootState) => state.dialog.isPasswordDialogOpen
  );
  const { loading } = useSelector((state: RootState) => state.account);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      old_password: "",
      password: "",
      password_confirmation: "",
    },
  });

  const handleClose = () => {
    dispatch(setPasswordDialogOpen(false));
    reset();
  };

  const onSubmit = async (data: FormData) => {
    const token = storageUtils.getToken();
    if (!token) {
      toast.error("Authentication required. Please log in again.");
      return;
    }

    try {
      const response = await dispatch(
        updatePassword({
          old_password: data.old_password,
          password: data.password,
          password_confirmation: data.password_confirmation,
        })
      ).unwrap();

      if (response.success) {
        toast.success(response.message || "Password updated successfully");
        handleClose();
      } else {
        toast.error(response.message || "Failed to update password");
      }
    } catch (error: any) {
      console.error("Password update error:", error);

      // Handle different error response structures
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to update password";

      toast.error(errorMessage);

      // Handle token expiration or authentication errors
      if (error.response?.status === 401) {
        storageUtils.clearAuth();
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-2xl">
        <VisuallyHidden.Root>
          <DialogTitle className="hidden">Change your password</DialogTitle>
        </VisuallyHidden.Root>
        <Card className="w-full bg-white border-0 shadow-none">
          <CardHeader>
            <CardTitle>Change password</CardTitle>
            <CardDescription>
              Change your password to keep your account secure.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current">Current password</Label>
                <Input
                  id="current"
                  type="password"
                  {...register("old_password")}
                />
                {errors.old_password && (
                  <p className="text-red-500 text-xs">
                    {errors.old_password.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" {...register("password")} />
                {errors.password && (
                  <p className="text-red-500 text-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm password</Label>
                <Input
                  id="confirm"
                  type="password"
                  {...register("password_confirmation")}
                />
                {errors.password_confirmation && (
                  <p className="text-red-500 text-xs">
                    {errors.password_confirmation.message}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex w-full gap-4">
                <Button
                  className="w-1/2"
                  variant="outline"
                  onClick={handleClose}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  className="w-1/2 bg-orange-600 hover:bg-orange-700"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Change"}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
