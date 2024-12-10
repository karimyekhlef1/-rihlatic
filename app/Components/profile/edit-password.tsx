import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogTitle, DialogContent } from '@/components/ui/dialog';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store/store';
import { setPasswordDialogOpen } from '@/lib/store/custom/mainSlices/dialogSlice';
import { updatePassword } from '@/lib/store/api/account/accountSlice';
import { toast } from 'sonner';
import { storageUtils } from '@/utils/localStorage';

export default function EditPassword() {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector((state: RootState) => state.dialog.isPasswordDialogOpen);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    dispatch(setPasswordDialogOpen(false));
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = async () => {
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('New password must be at least 8 characters long');
      return;
    }

    const token = storageUtils.getToken();
    if (!token) {
      toast.error('Authentication required. Please log in again.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await dispatch(updatePassword({
        password: newPassword,
        password_confirmation: confirmPassword,
        old_password: currentPassword,
      })).unwrap();

      if (response.success) {
        toast.success(response.message || 'Password updated successfully');
        handleClose();
      } else {
        toast.error(response.message || 'Failed to update password');
      }
    } catch (error: any) {
      console.error('Password update error:', error);
      
      // Handle different error response structures
      const errorMessage = error.response?.data?.message 
        || error.response?.data?.error 
        || error.message 
        || 'Failed to update password';
      
      toast.error(errorMessage);
      
      // Handle token expiration or authentication errors
      if (error.response?.status === 401) {
        storageUtils.clearAuth();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-2xl">
      <VisuallyHidden.Root>
            <DialogTitle className="hidden">
            Change your password
            </DialogTitle>
        </VisuallyHidden.Root>
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
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                className="w-1/2 bg-orange-600 hover:bg-orange-700"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Change'}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}