import React, {useState , useEffect } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Dialog, DialogTitle, DialogContent } from '@/components/ui/dialog';
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useDispatch, useSelector } from 'react-redux';
import {
  updateField,
  resetForm,
  AccountState,
} from '@/lib/store/custom/mainSlices/accountSlice';
import { setDialogOpen } from '@/lib/store/custom/mainSlices/dialogSlice';
import type { RootState } from '@/lib/store/store';
import { updateAccountDetails } from '@/lib/store/api/account/accountSlice';
export default function EditAccountOwnerDetails() {
  const dispatch = useDispatch<any>();
  const account = useSelector((state: RootState) => state.account);
  const [localAccount, setLocalAccount] = useState<AccountState>(account);
  const { isOpen } = useSelector((state: RootState) => state.dialog);

  useEffect(() => {
    setLocalAccount(account);
  }, [account]);

  const handleUpdatingField = (field: keyof AccountState, value: string) => {
    dispatch(updateField({ field, value }));
  };
  const handleInputChange = (field: keyof AccountState, value: string) => {
    setLocalAccount(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    const updateAccountData =async ( account :AccountState)=>{
      try{
        const result = await dispatch(updateAccountDetails(account ))
        const user = result.payload.user;
        Object.keys(user).forEach((field) => {
          if (account.hasOwnProperty(field)) {
            handleUpdatingField(field as keyof AccountState, user[field]);
          }
        });
      } catch(error) {
        console.log(error)

      }
    }
    updateAccountData(localAccount)
    dispatch(setDialogOpen(false));

  };

  const handleCancel = () => {
   
    setLocalAccount(account);
    // dispatch(resetForm());
    dispatch(setDialogOpen(false));
    // console.log("account",account)
    // console.log("local",localAccount)

  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => dispatch(setDialogOpen(open))}
    >
      <DialogContent className="sm:max-w-[425px] md:max-w-2xl">
      <VisuallyHidden.Root>
            <DialogTitle className="hidden">
            Edit account owner details
            </DialogTitle>
        </VisuallyHidden.Root>
        <Card className="w-full bg-white border-0 shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl text-black">
              Edit account owner details
            </CardTitle>
            <CardDescription>
              Enter all details exactly as they appear in the passport/ID for
              our check-in service with the airlines.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="first_name"
                  value={localAccount.first_name}
                  onChange={(e) =>
                    handleInputChange('first_name', e.target.value)
                  }
                  placeholder="Enter first name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="last_name"
                  value={localAccount.last_name}
                  onChange={(e) =>
                    handleInputChange('last_name', e.target.value)
                  }
                  placeholder="Enter last name"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={localAccount.sexe}
                  onValueChange={(value) => handleInputChange('sexe', value)}
                >
                  <SelectTrigger id="sexe">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="birthdate" className="text-gray-700">
                  Date of birth
                </Label>
                <Input
                  id="birthday"
                  type="date"
                  value={localAccount.birthday}
                  onChange={(e) =>
                    handleInputChange('birthday', e.target.value)
                  }
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Select
                value={localAccount.nationality}
                onValueChange={(value) =>
                  handleInputChange('nationality', value)
                }
              >
                <SelectTrigger id="nationality">
                  <SelectValue placeholder="Select nationality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Algerienne">Algerienne</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  {/* Add more nationalities as needed */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Travel document (optional)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="documentNumber">Passport or ID number</Label>
                  <Input
                    id="passport_nbr"
                    value={localAccount.passport_nbr}
                    onChange={(e) =>
                      handleInputChange('passport_nbr', e.target.value)
                    }
                    placeholder="Enter document number"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="documentExpiration">
                    Passport or ID expiration
                  </Label>
                  <Input
                    id="passport_expire_at"
                    type="date"
                    value={localAccount.passport_expire_at}
                    onChange={(e) =>
                      handleInputChange('passport_expire_at', e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Contact details (optional)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={localAccount.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter email"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={localAccount.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex w-full gap-4">
              <Button
                variant="outline"
                className="w-1/3"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                className="w-2/3 bg-orange-600 hover:bg-orange-700"
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
