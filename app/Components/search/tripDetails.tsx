import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Share } from 'lucide-react';
import {
  openDialogDetail,
  closeDialogDetail,
  openDialogSummary,
} from '@/lib/store/mainSlices/dialogSlice';
import { RootState } from '@/lib/store/store';
import TripSummary from './tripSummary';

export default function TripDetails() {
  const dispatch = useDispatch();
  const isDialogOpen = useSelector(
    (state: RootState) => state.dialog.isDetailOpen
  );

  const handleOpenDialogSummary = () => {
    dispatch(openDialogSummary());
  };

  return (
    <div>
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) =>
          dispatch(open ? openDialogDetail() : closeDialogDetail())
        }
      >
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Trip Details</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Card
              className="mb-4 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={handleOpenDialogSummary}
            >
              <CardContent className="p-4">
                <p>
                  Click here to view your trip summary. This card contains dummy
                  text for your trip details.
                </p>
              </CardContent>
            </Card>
            <div className="flex justify-between items-center">
              <Button variant="outline" size="icon">
                <Share className="h-4 w-4" />
              </Button>
              <Button>Next</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <TripSummary />
    </div>
  );
}
