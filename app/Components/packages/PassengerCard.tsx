import React, { useMemo } from 'react';
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Card } from '@/components/ui/card';

interface Passenger {
  first_name: string;
  last_name: string;
  sex: string;
  email?: string;
  phone?: string;
  passport_nbr?: string;
  passport_expire_at?: string;
  birth_date?: string;
}

// Define a type for the field configuration
type FieldConfig = {
  key: keyof Passenger;
  label: string;
  formatDate?: boolean;
}

// Now the config array is properly typed
const FIELD_CONFIG: FieldConfig[] = [
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'passport_nbr', label: 'Passport Number' },
  {
    key: 'passport_expire_at',
    label: 'Passport Expiry',
    formatDate: true,
  },
  {
    key: 'birth_date',
    label: 'Birth Date',
    formatDate: true,
  },
];

const PassengerField = React.memo(({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <Label className="text-gray-600 text-xs uppercase tracking-wide">
      {label}
    </Label>
    <p className="font-medium text-sm">{value}</p>
  </div>
));

PassengerField.displayName = 'PassengerField';

const PassengerCard = ({ passenger }: { passenger: Passenger }) => {
  const fullName = useMemo(
    () => `${passenger.first_name} ${passenger.last_name}`,
    [passenger.first_name, passenger.last_name]
  );

  const formatDateValue = useMemo(() => (dateStr: string) => {
    try {
      return format(new Date(dateStr), "dd MMM yyyy");
    } catch {
      return dateStr;
    }
  }, []);

  return (
    <Card className=" p-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold text-gray-900">{fullName}</h4>
        <span className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
          {passenger.sex}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FIELD_CONFIG.map(({ key, label, formatDate }) => {
          const value = passenger[key];
          if (!value) return null;

          return (
            <PassengerField
              key={key}
              label={label}
              value={formatDate ? formatDateValue(value) : value}
            />
          );
        })}
      </div>
    </Card>
  );
};

export default React.memo(PassengerCard);