import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Share2, ChevronRight, CircleArrowRight } from "lucide-react";
import {
  closeDialogDetail,
} from "@/lib/store/custom/mainSlices/dialogSlice";
import { openDialogSummary } from "@/lib/store/api/vols/volsSlice";
import { RootState } from "@/lib/store/store";
import { Flight } from "@/lib/types/flight";

interface TripDetailsProps {
  flight?: Flight;
}

export default function TripDetails({ flight }: TripDetailsProps) {
  const dispatch = useDispatch();
  const isDialogOpen = useSelector(
    (state: RootState) => state.dialog.isDetailOpen
  );

  const handleOpenSummary = () => {
    dispatch(closeDialogDetail());
    dispatch(openDialogSummary());
  };

  const handleCloseDialog = () => {
    dispatch(closeDialogDetail());
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto px-4 sm:px-6">
        <DialogHeader>
          <DialogTitle>Trip Details</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Card
            className="mb-4 cursor-pointer hover:shadow-md transition-colors"
            onClick={handleOpenSummary}
          >
            <CardContent className="p-2 sm:p-4">
              {flight?.segments.map((segment, index) => (
                <div key={index} className="mb-4">
                  {segment.map((leg, legIndex) => (
                    <div key={legIndex} className="mb-4">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-sm flex flex-row justify-center items-center gap-x-2">
                          {leg.boardAirport} → {leg.offAirport}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        <div className="flex flex-col items-start text-xs font-medium space-y-2">
                          <span>{leg.airLine?.name || "Unknown Airline"}</span>
                          <div className="flex flex-row justify-center items-center gap-x-1">
                            <CircleArrowRight
                              size={20}
                              className="font-semibold text-xs text-[#3279f4]"
                              fill="#cddfff"
                            />
                            <p className="font-semibold text-xs text-[#3279f4]">
                              Direct flight
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {index < flight.segments.length - 1 && (
                    <hr className="my-2 border-gray-300 border-dashed mx-4" />
                  )}
                </div>
              ))}
              <hr className="my-2 border-gray-300 border-dashed mx-4" />
              <button 
                className="w-full text-left font-semibold mt-2 flex items-center hover:text-[#3279f4] transition-colors"
                onClick={handleOpenSummary}
              >
                Show full details
                <ChevronRight size={20} className="ml-auto" />
              </button>
            </CardContent>
          </Card>
          <div className="flex justify-between items-center px-2">
            <Button variant="ghost2" size="sm" className="flex items-center">
              <Share2 className="h-4 w-4 mr-2" fill="currentColor" />
              Share
            </Button>
            <Button variant="active">
              Next
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
