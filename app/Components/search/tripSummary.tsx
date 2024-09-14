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
} from '@/lib/store/mainSlices/dialogSlice';
import { RootState } from '@/lib/store/store';
import TripSummaryComponent from '../packages/tripSummary';

export default function TripSummary() {
  const dispatch = useDispatch();
  const isDialogOpen = useSelector(
    (state: RootState) => state.dialog.isSummaryOpen
  );

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) =>
        dispatch(open ? openDialogSummary() : closeDialogSummary())
      }
    >
      <DialogContent className="sm:max-w-3xl">
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
        <TripSummaryComponent />
        <TripSummaryComponent />
      </DialogContent>
    </Dialog>
  );
}
