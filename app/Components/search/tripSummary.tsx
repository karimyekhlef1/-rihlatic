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

export default function TripSummary() {
  const dispatch = useDispatch();
  const isDialogOpen = useSelector(
    (state: RootState) => state.dialog.isSummaryOpen
  );
  const flightData = useSelector((state: RootState) => state.vols.flightsData[0]);

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
        {flightData && <TripSummaryComponent flightInfo={flightData} />}
      </DialogContent>
    </Dialog>
  );
}
