import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plane, User } from "lucide-react";
import { Traveler } from "@/lib/store/custom/flightSlices/flightPaymentSlice";

interface FlightSummaryProps {
  flight: any;
  travelers: Record<string, Traveler>;
}

export default function FlightSummary({ flight, travelers }: FlightSummaryProps) {
  return (
    <div className="space-y-6">
      {/* Flight Segments */}
      {flight.segments.map((segmentGroup: any[], groupIndex: number) => (
        <Card key={groupIndex} className="p-4">
          <div className="space-y-4">
            {/* Flight Header */}
            <div className="flex items-center gap-2">
              <Plane className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">
                Flight {groupIndex + 1}: {segmentGroup[0].boardAirportName.city} →{" "}
                {
                  segmentGroup[segmentGroup.length - 1].offAirportName
                    .city
                }
              </h3>
            </div>

            {/* Segments */}
            {segmentGroup.map((segment: any, index: number) => (
              <div key={index}>
                <div className="grid grid-cols-2 gap-4 py-2">
                  <div>
                    <p className="text-sm font-medium">
                      {segment.boardAirportName.city} ({segment.boardAirport})
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(segment.boardDate).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {segment.offAirportName.city} ({segment.offAirport})
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(segment.offDate).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <p>Airline: {segment.airLine.name}</p>
                  <p>Flight: {segment.flightNumber}</p>
                  <p>Aircraft: {segment.equipmentType}</p>
                  <p>Duration: {segment.duration}</p>
                </div>
                {index < segmentGroup.length - 1 && (
                  <div className="my-2 px-4 py-2 bg-gray-50 rounded">
                    <p className="text-sm text-gray-500">
                      Layover: {segment.offAirportName.city} -
                      {segmentGroup[index + 1].duration}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      ))}

      {/* Travelers Information */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Travelers Information</h3>
          </div>

          {Object.entries(travelers).map(([index, traveler]) => (
            <div key={index} className="space-y-2">
              <h4 className="font-medium">
                Traveler {parseInt(index) + 1} - {traveler.type}
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p>
                    Name: {traveler.first_name} {traveler.last_name}
                  </p>
                  <p>Gender: {traveler.gender}</p>
                  <p>Nationality: {traveler.nationality}</p>
                </div>
                <div>
                  <p>Birth Date: {traveler.birth_date}</p>
                  <p>Passport: {traveler.passport_nbr}</p>
                  <p>Expires: {traveler.passport_expire_at}</p>
                </div>
              </div>
              {parseInt(index) < Object.keys(travelers).length - 1 && (
                <Separator className="my-2" />
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
