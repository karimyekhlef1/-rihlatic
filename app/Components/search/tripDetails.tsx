import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Share2 } from 'lucide-react';
import {
  openDialogDetail,
  closeDialogDetail,
  openDialogSummary,
  openDialogSignUp,
} from '@/lib/store/custom/mainSlices/dialogSlice';
import { RootState } from '@/lib/store/store';
import TripSummary from './tripSummary';
import FlightInfoCard from './flightInfo';
import SignUpDialog from '@/app/commonComponents/signupComponent';
import LayoverInfoComponent from './layoverInfoComponent';

const layovers = [
  { duration: '8h 35m', location: 'Paris', code: 'CDG' },
  { duration: '6h 40m', location: 'Alger', code: 'ALG' },
];

const flightData = [
  {
    from: 'Algiers',
    to: 'Paris',
    airline: 'Air Algerie',
    additionalInfo: false,
  },
  {
    from: 'Paris',
    to: 'Algiers',
    airline: 'Air Algerie',
    additionalInfo: true,
  },
];

export default function TripDetails() {
  const dispatch = useDispatch();
  const isDialogOpen = useSelector(
    (state: RootState) => state.dialog.isDetailOpen
  );

  const handleOpenDialogSummary = () => {
    dispatch(openDialogSummary());
  };

  const handleOpenDialogSignUp = () => {
    dispatch(openDialogSignUp());
  };

  return (
    <div>
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) =>
          dispatch(open ? openDialogDetail() : closeDialogDetail())
        }
      >
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Trip Details</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Card
              className="mb-4 cursor-pointer hover:shadow-md transition-colors"
              onClick={handleOpenDialogSummary}
            >
              <CardContent className="p-2">
                <FlightInfoCard
                  flights={flightData}
                  additionalInfo={<LayoverInfoComponent layovers={layovers} />}
                />
              </CardContent>
            </Card>
            <div className="flex justify-between items-center">
              <Button variant="ghost2" size="sm" className="flex items-center">
                <Share2 className="h-4 w-4 mr-2" fill="currentColor" />
                Share
              </Button>
              <Button variant={'active'} onClick={handleOpenDialogSignUp}>
                Next
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <TripSummary />
      <SignUpDialog />
    </div>
  );
}
