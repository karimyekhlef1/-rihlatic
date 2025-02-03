import { Card ,CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plane, User } from "lucide-react";
import { Traveler } from "@/lib/store/custom/flightSlices/flightPaymentSlice";
import TripSummary from "../search/tripSummary";
import FlightInfoCard from "../search/flightInfo";
import LayoverInfoComponent from "../search/layoverInfoComponent";
import {
  openDialogSummary,
} from "@/lib/store/custom/mainSlices/dialogSlice";
import { useDispatch, useSelector } from "react-redux";
import { CalendarDays, UserCircle, Globe, AlignVerticalSpaceAround } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface FlightSummaryProps {
  flight: any;
  travelers: Record<string, Traveler>;
}


export default function FlightSummary({ flight, travelers }: FlightSummaryProps) {
  const dispatch = useDispatch();

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'dd MMM yyyy');
    } catch {
      return dateStr;
    }
  };
  const processedFlightData = flight.segments.map(
    (segmentGroup: any[]) => {
      const firstSegment = segmentGroup[0];
      const lastSegment = segmentGroup[segmentGroup.length - 1];
  
      return {
        from: firstSegment.boardAirportName.city,
        to: lastSegment.offAirportName.city,
        airline: firstSegment.airLine.name,
        additionalInfo: segmentGroup.length > 1,
      };
    }
  );
   const handleOpenSummary = () => {
      dispatch(openDialogSummary());
    };
  
    const layovers = flight.segments.flatMap((segmentGroup: any[]) => {
      if (segmentGroup.length <= 1) return [];
  
      return segmentGroup.slice(0, -1).map((segment: any, index: number) => {
        const nextSegment = segmentGroup[index + 1];
        return {
          duration: nextSegment.duration,
          location: nextSegment.boardAirportName.city,
          code: nextSegment.boardAirport,
        };
      });
    });
  
  
  
  return (
    <div className="space-y-6">
     <Card
              className="mb-4 cursor-pointer hover:shadow-md transition-colors"
              onClick={handleOpenSummary}
            >
              <CardContent className="p-2">
                <FlightInfoCard
                  flights={processedFlightData}
                  additionalInfo={
                    layovers.length > 0 ? (
                      <LayoverInfoComponent layovers={layovers} />
                    ) : undefined
                  }
                />
              </CardContent>
            </Card>
    

      {/* Travelers Information */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Travelers Information</h3>
          </div>

          {Object.entries(travelers).map(([index, traveler]) => (
        <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCircle className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg font-semibold">
                  Traveler {parseInt(index) + 1}
                </CardTitle>
              </div>
              {/* <Badge variant="secondary" className="capitalize">
                {traveler.type.toLowerCase()}
              </Badge> */}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Personal Information</p>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <UserCircle className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">
                        {traveler.first_name} {traveler.last_name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <span>{traveler.nationality}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-muted-foreground" />
                      <span>{formatDate(traveler.birth_date)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Passport Details</p>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <AlignVerticalSpaceAround className="w-4 h-4 text-muted-foreground" />
                      <span>{traveler.passport_nbr}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-muted-foreground" />
                      <div className="flex flex-col">
                        <span>Expires: {formatDate(traveler.passport_expire_at)}</span>
                        {new Date(traveler.passport_expire_at) < new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000) && (
                          <span className="text-xs text-red-500">
                            Expires in less than 6 months
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
        </div>
      </Card>
            <TripSummary selectedFlight={flight} />
      
    </div>
  );
}
