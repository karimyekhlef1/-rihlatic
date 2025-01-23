import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import FlightInfos from "./flightInfos";
import FlightSeparator from "./flightSeparator";
import FlightInfoFooter from "./flightInfoFooter";
import { useDispatch, useSelector } from "react-redux";
import { openDialogDetail } from "@/lib/store/custom/mainSlices/dialogSlice";
import { RootState } from "@/lib/store/store";
import TripDetails from "./tripDetails";
import { Info } from "lucide-react";

interface ResultCardProps {
  flightData: {
    price: number;
    segments: any[][];
  };
}

export default function ResultCard({ flightData }: ResultCardProps) {
  const dispatch = useDispatch();
  
  const handleOpenDialog = () => {
    dispatch(openDialogDetail());
  };

  // Extract outbound and return segments
  const outboundSegments = flightData.segments[0];
  const returnSegments = flightData.segments[1];

  return (
    <div className="w-full max-w-sm sm:max-w-4xl mx-auto sm:px-0 sm:pb-4">
      <div className="flex flex-col sm:flex-row w-full transition-all duration-300 ease-in-out sm:hover:drop-shadow-md">
        <Card className="flex-grow rounded-t-xl sm:rounded-t-xl sm:border-r-0 sm:mb-0 border-b-0 sm:border-b">
          <CardContent className="p-4">
            <div className="space-y-4">
              <FlightInfos segments={outboundSegments} type="outbound" />

              {returnSegments && (
                <>
                  <FlightSeparator />
                  <FlightInfos segments={returnSegments} type="return" />
                </>
              )}
            </div>
          </CardContent>

          <CardFooter className="p-4 border-t border-dashed border-gray-300">
            <FlightInfoFooter />
          </CardFooter>
        </Card>

        <div className="hidden sm:block w-px border-r border-dashed border-gray-300 my-4"></div>

        <Card className="w-full sm:w-60 rounded-b-xl sm:rounded-t-xl sm:border-l-0 flex flex-col border-t-0 sm:border-t">
          <CardContent className="p-4 flex-grow flex flex-col justify-between">
            <div className="flex-grow flex items-center justify-center">
              <span className="text-xl font-bold">{flightData.price} DZD</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="group text-sm underline font-semibold text-blue-600 flex items-center hover:no-underline hover:text-blue-700 cursor-pointer">
                <Info className="w-4 h-4 mr-1 text-white fill-blue-600 group-hover:fill-blue-700" />
                Conditions
              </span>
            </div>
            <Button
              onClick={handleOpenDialog}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              Select
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
