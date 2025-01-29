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

interface FlightReservationInformationProps {
  flight: any; // TODO: Add proper flight type
}

export default function FlightReservationInformation({ flight }: FlightReservationInformationProps) {
  const dispatch = useDispatch();
  const { travelers, email, phone, mobileCountry } = useSelector(
    (state: RootState) => state.flightPayment
  );

  const handleTravelerUpdate = (index: string, field: string, value: string) => {
    dispatch(updateTraveler({ index, data: { [field]: value } }));
  };

  const handleContactUpdate = (field: string, value: string) => {
    dispatch(
      setContactInfo({
        email: field === "email" ? value : email,
        phone: field === "phone" ? value : phone,
        mobileCountry: field === "mobileCountry" ? value : mobileCountry,
      })
    );
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
              id="email"
              value={email}
              onChange={(e) => handleContactUpdate("email", e.target.value)}
              placeholder="Enter your email"
            />
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
              <Input
                id="phone"
                value={phone}
                onChange={(e) => handleContactUpdate("phone", e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Travelers Information */}
      {Object.entries(travelers).map(([index, traveler]) => (
        <Card key={index} className="p-4">
          <h3 className="text-lg font-semibold mb-4">
            Traveler {parseInt(index) + 1} - {traveler.type}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Personal Information */}
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input
                value={traveler.first_name}
                onChange={(e) =>
                  handleTravelerUpdate(index, "first_name", e.target.value)
                }
                placeholder="Enter first name"
              />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input
                value={traveler.last_name}
                onChange={(e) =>
                  handleTravelerUpdate(index, "last_name", e.target.value)
                }
                placeholder="Enter last name"
              />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select
                value={traveler.gender}
                onValueChange={(value) =>
                  handleTravelerUpdate(index, "gender", value)
                }
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
            <div className="space-y-2">
              <Label>Birth Date</Label>
              <Input
                type="date"
                value={traveler.birth_date}
                onChange={(e) =>
                  handleTravelerUpdate(index, "birth_date", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Nationality</Label>
              <Input
                value={traveler.nationality}
                onChange={(e) =>
                  handleTravelerUpdate(index, "nationality", e.target.value)
                }
                placeholder="Enter nationality"
              />
            </div>

            {/* Passport Information */}
            <div className="space-y-2">
              <Label>Passport Number</Label>
              <Input
                value={traveler.passport_nbr}
                onChange={(e) =>
                  handleTravelerUpdate(index, "passport_nbr", e.target.value)
                }
                placeholder="Enter passport number"
              />
            </div>
            <div className="space-y-2">
              <Label>Passport Expiry Date</Label>
              <Input
                type="date"
                value={traveler.passport_expire_at}
                onChange={(e) =>
                  handleTravelerUpdate(index, "passport_expire_at", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Passport Scan</Label>
              <Input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // Handle file upload here
                    // For now, just store the file name
                    handleTravelerUpdate(index, "passport_scan", file.name);
                  }
                }}
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
