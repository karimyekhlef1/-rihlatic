import { Card } from "@/components/ui/card";
import { Plane, Luggage, Clock, Armchair } from "lucide-react";

interface FlightPricingCardProps {
  flight: any;
  price: number;
  tax_price: number;
}

export default function FlightPricingCard({
  flight,
  price,
  tax_price,
}: FlightPricingCardProps) {
  const firstSegment = flight.segments[0][0];
  const lastSegment = flight.segments[0][flight.segments[0].length - 1];

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <Card className="p-6">
      {/* Flight Price */}
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold">Total Price</h3>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">
            {formatPrice(price)} DZD
          </p>
        </div>
      </div>

      {/* Flight Route */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div>
            <p className="text-2xl font-semibold">
              {firstSegment.boardAirport}
            </p>
            <p className="text-sm text-muted-foreground">
              {firstSegment.boardAirportName.city}
            </p>
          </div>
          <Plane className="w-5 h-5 text-primary mx-4" />
          <div className="text-right">
            <p className="text-2xl font-semibold">{lastSegment.offAirport}</p>
            <p className="text-sm text-muted-foreground">
              {lastSegment.offAirportName.city}
            </p>
          </div>
        </div>
        <p className="text-sm text-center text-muted-foreground">
          {firstSegment.airLine.name}
        </p>
      </div>

      {/* Flight Details */}
      <div className="space-y-3">
        <div className="flex items-center">
          <Plane className="w-4 h-4 text-muted-foreground mr-3" />
          <div>
            <p className="text-sm">Aircraft</p>
            <p className="text-sm font-medium">{firstSegment.equipmentType}</p>
          </div>
        </div>

        <div className="flex items-center">
          <Armchair className="w-4 h-4 text-muted-foreground mr-3" />
          <div>
            <p className="text-sm">Cabin Class</p>
            <p className="text-sm font-medium">{firstSegment.cabinClass}</p>
          </div>
        </div>

        <div className="flex items-center">
          <Luggage className="w-4 h-4 text-muted-foreground mr-3" />
          <div>
            <p className="text-sm">Baggage Allowance</p>
            <p className="text-sm font-medium">{firstSegment.baggage}</p>
          </div>
        </div>

        <div className="flex items-center">
          <Clock className="w-4 h-4 text-muted-foreground mr-3" />
          <div>
            <p className="text-sm">Duration</p>
            <p className="text-sm font-medium">{firstSegment.duration}</p>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 pt-4 border-t space-y-1">
        <p className="text-sm text-muted-foreground">
          Booking Class: {firstSegment.bookClass}
        </p>
        <p className="text-sm text-muted-foreground">
          Availability: {firstSegment.availability} seats
        </p>
      </div>
    </Card>
  );
}
