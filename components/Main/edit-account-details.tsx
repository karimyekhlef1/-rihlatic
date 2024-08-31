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
import { CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent } from '@/components/ui/dialog';

import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { updateField, resetForm } from '@/lib/store/mainSlices/accountSlice';
import { setDialogOpen } from '@/lib/store/mainSlices/dialogSlice';
import type { RootState } from '@/lib/store/store';

export default function EditAccountOwnerDetails() {
  const dispatch = useDispatch();
  const account = useSelector((state: RootState) => state.account);
  const { isOpen } = useSelector((state: RootState) => state.dialog);

  const handleInputChange = (field: string, value: string) => {
    dispatch(updateField({ field, value }));
  };

  const handleSave = () => {
    console.log('Saving account details:', account);
    // Implement the save logic here
    dispatch(setDialogOpen(false));
  };

  const handleCancel = () => {
    dispatch(resetForm());
    dispatch(setDialogOpen(false));
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => dispatch(setDialogOpen(open))}
    >
      <DialogContent className="sm:max-w-[425px] md:max-w-2xl">
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
                  id="firstName"
                  value={account.firstName}
                  onChange={(e) =>
                    handleInputChange('firstName', e.target.value)
                  }
                  placeholder="Enter first name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  value={account.lastName}
                  onChange={(e) =>
                    handleInputChange('lastName', e.target.value)
                  }
                  placeholder="Enter last name"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={account.gender}
                  onValueChange={(value) => handleInputChange('gender', value)}
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="birthdate" className="text-gray-700">
                  Date of birth
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !account.birthdate && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {account.birthdate ? (
                        format(new Date(account.birthdate), 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={
                        account.birthdate
                          ? new Date(account.birthdate)
                          : undefined
                      }
                      onSelect={(date) =>
                        handleInputChange(
                          'birthdate',
                          date ? date.toISOString() : ''
                        )
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Select
                value={account.nationality}
                onValueChange={(value) =>
                  handleInputChange('nationality', value)
                }
              >
                <SelectTrigger id="nationality">
                  <SelectValue placeholder="Select nationality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dz">Algeria</SelectItem>
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
                    id="documentNumber"
                    value={account.documentNumber}
                    onChange={(e) =>
                      handleInputChange('documentNumber', e.target.value)
                    }
                    placeholder="Enter document number"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="documentExpiration">
                    Passport or ID expiration
                  </Label>
                  <Input
                    id="documentExpiration"
                    type="date"
                    value={account.documentExpiration}
                    onChange={(e) =>
                      handleInputChange('documentExpiration', e.target.value)
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
                    value={account.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter email"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={account.phone}
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
