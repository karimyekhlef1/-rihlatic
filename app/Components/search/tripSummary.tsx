import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ArrowLeft } from 'lucide-react';
import {
  openDialogSummary,
  closeDialogSummary,
} from '@/lib/store/custom/mainSlices/dialogSlice';
import { RootState } from '@/lib/store/store';
import TripSummaryComponent from '../packages/tripSummary';
import { AIRLINE_IMAGE_URL } from '@/app/Constant/urls';

interface TripSummaryProps {
  selectedFlight: any;
}

export default function TripSummary({ selectedFlight }: TripSummaryProps) {
  const dispatch = useDispatch();
  const isDialogOpen = useSelector(
    (state: RootState) => state.dialog.isSummaryOpen
  );

  // Process flight data for each segment group
  const processFlightInfo = (segmentGroup: any[]) => {
    const firstSegment = segmentGroup[0];
    const lastSegment = segmentGroup[segmentGroup.length - 1];

    // Calculate total duration for multi-segment flights
    const totalDuration = segmentGroup.reduce((total: number, segment: any) => {
      const [hours, minutes] = segment.duration.split(':').map(Number);
      return total + hours * 60 + minutes;
    }, 0);

    const formatDuration = (minutes: number) => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}h ${mins}m`;
    };

    // Format dates correctly using depDate and arrDate from API
    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    };

    // Get airline logo URL with fallback
    const airlineLogoUrl = `${AIRLINE_IMAGE_URL}/${firstSegment.airLine.iata}.png?default=airline.png`;

    return {
      from: firstSegment.boardAirportName.city,
      to: lastSegment.offAirportName.city,
      departureTime: firstSegment.depTime,
      arrivalTime: lastSegment.arrTime,
      departureDate: formatDate(firstSegment.depDate),
      arrivalDate: formatDate(lastSegment.arrDate),
      duration: formatDuration(totalDuration),
      nextdayDeparture: new Date(lastSegment.arrDate).getDate() > new Date(firstSegment.depDate).getDate(),
      airline: firstSegment.airLine.name,
      flightNumber: `${firstSegment.airLine.iata}${firstSegment.flightNumber}`,
      departureCity: firstSegment.boardAirportName.city,
      arrivalCity: lastSegment.offAirportName.city,
      departureAirport: `${firstSegment.boardAirportName.name} (${firstSegment.boardAirport})`,
      arrivalAirport: `${lastSegment.offAirportName.name} (${lastSegment.offAirport})`,
      // Additional info for expandable content
      aircraft: firstSegment.equipmentType,
      cabinClass: firstSegment.cabinClass,
      seatingClass: firstSegment.bookingClass,
      // Pass logo URL to AirlineCompanyComponent
      airlineLogo: airlineLogoUrl
    };
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) =>
        dispatch(open ? openDialogSummary() : closeDialogSummary())
      }
    >
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={() => dispatch(closeDialogSummary())}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            Trip Summary
          </DialogTitle>
        </DialogHeader>
        {selectedFlight && selectedFlight.segments.map((segmentGroup: any[], index: number) => (
          <TripSummaryComponent 
            key={index} 
            flightInfo={processFlightInfo(segmentGroup)} 
          />
        ))}
      </DialogContent>
    </Dialog>
  );
}
