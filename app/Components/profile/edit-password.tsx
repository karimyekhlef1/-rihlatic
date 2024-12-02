import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { setPasswordDialogOpen } from '@/lib/store/custom/mainSlices/dialogSlice';

export default function EditPassword() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.dialog.isPasswordDialogOpen);

  const handleClose = () => {
    dispatch(setPasswordDialogOpen(false));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-2xl">
        <Card className="w-full bg-white border-0 shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl text-black">
              Change your password
            </CardTitle>
            <CardDescription>
              Please enter your current password and choose a new secure password to update your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="Enter your current password"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter your new password"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your new password"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex w-full gap-4">
              <Button
                variant="outline"
                className="w-1/2"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                className="w-1/2 bg-orange-600 hover:bg-orange-700"
                onClick={()=>{}}
              >
                Change
              </Button>
            </div>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}