import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Share2 } from "lucide-react";
import {
  openDialogDetail,
  closeDialogDetail,
  openDialogSignUp,
  openDialogSummary,
} from "@/lib/store/custom/mainSlices/dialogSlice";
import { RootState } from "@/lib/store/store";
import TripSummary from "./tripSummary";
import FlightInfoCard from "./flightInfo";
import SignUpDialog from "@/app/commonComponents/signupComponent";
import LayoverInfoComponent from "./layoverInfoComponent";
import { useRouter } from "next/navigation";
import { setSelectedFlight } from "@/lib/store/custom/flightSlices/flightPaymentSlice";

export default function TripDetails() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isDialogOpen = useSelector(
    (state: RootState) => state.dialog.isDetailOpen
  );
  const selectedFlight = useSelector(
    (state: RootState) => state.vols.selectedFlight
  );
  const isLoggedIn = useSelector((state: RootState) => state.signIn.success);

  const handleNext = () => {
    if (!isLoggedIn) {
      dispatch(openDialogSignUp());
    } else {
      // Store selected flight in flight payment state and route to payment page
      dispatch(setSelectedFlight(selectedFlight));
      dispatch(closeDialogDetail());
      router.push("/vols/payment");
    }
  };

  const handleOpenSummary = () => {
    dispatch(openDialogSummary());
  };

  // Early return if no flight is selected
  if (!selectedFlight) return null;

  // Process flight data for display
  const processedFlightData = selectedFlight.segments.map(
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

  // Process layovers if any
  const layovers = selectedFlight.segments.flatMap((segmentGroup: any[]) => {
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
            <div className="flex justify-between items-center">
              <Button variant="ghost2" size="sm" className="flex items-center">
                <Share2 className="h-4 w-4 mr-2" fill="currentColor" />
                Share
              </Button>
              <Button variant={"active"} onClick={handleNext}>
                Next
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <SignUpDialog />
      <TripSummary selectedFlight={selectedFlight} />
    </div>
  );
}
