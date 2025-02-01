import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import FlightInfos from "./flightInfos";
import FlightSeparator from "./flightSeparator";
import FlightInfoFooter from "./flightInfoFooter";
import { useDispatch } from "react-redux";
import { openDialogDetail } from "@/lib/store/custom/mainSlices/dialogSlice";
import { setSelectedFlight } from "@/lib/store/api/vols/volsSlice";
import { Info } from "lucide-react";

interface ResultCardProps {
  flightData: {
    price: number;
    segments: any[][];
  };
}

export default function ResultCard({ flightData }: ResultCardProps) {
  const dispatch = useDispatch();

  const handleSelectFlight = () => {
    dispatch(setSelectedFlight(flightData));
    dispatch(openDialogDetail());
  };

  // Check if flightData is empty or invalid
  if (
    !flightData ||
    typeof flightData !== "object" ||
    Object.keys(flightData).length === 0
  ) {
    return null;
  }

  // Check if required properties exist and are valid
  if (
    !flightData.price ||
    !Array.isArray(flightData.segments) ||
    flightData.segments.length === 0
  ) {
    return null;
  }

  // Safely extract outbound and return segments
  const outboundSegments = flightData.segments[0] || [];
  const returnSegments = flightData.segments[1];

  // Check if outbound segments contain valid data
  if (
    !Array.isArray(outboundSegments) ||
    outboundSegments.length === 0 ||
    !outboundSegments[0] ||
    typeof outboundSegments[0] !== "object"
  ) {
    return null;
  }

  // Get first segment for footer info
  const firstSegment = outboundSegments[0];

  // Check if first segment has required properties
  if (
    !firstSegment.availability ||
    !firstSegment.equipmentType ||
    !firstSegment.bookClass ||
    !firstSegment.cabinClass
  ) {
    return null;
  }

  // Format price with space for thousands
  const formattedPrice = flightData.price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return (
    <div className="w-full max-w-sm sm:max-w-4xl mx-auto sm:px-0 sm:pb-3">
      <div className="flex flex-col sm:flex-row w-full transition-all duration-300 ease-in-out hover:shadow-md rounded-xl">
        <Card className="flex-grow rounded-xl sm:rounded-r-none border-b-0 sm:border-b sm:border-r-0">
          <CardContent className="p-4">
            <div className="space-y-4">
              <FlightInfos segments={outboundSegments} type="outbound" />

              {returnSegments && returnSegments.length > 0 && (
                <>
                  <FlightSeparator 
                    segments={returnSegments} 
                    outboundLastSegment={outboundSegments[outboundSegments.length - 1]} 
                  />
                  <FlightInfos segments={returnSegments} type="return" />
                </>
              )}
            </div>
          </CardContent>

          <CardFooter className="px-4 py-3 border-t border-dashed border-gray-200">
            <FlightInfoFooter
              segment={{
                availability: firstSegment.availability,
                equipmentType: firstSegment.equipmentType,
                bookClass: firstSegment.bookClass,
                cabinClass: firstSegment.cabinClass,
                baggage: firstSegment.baggage || "0 Piece(s)",
              }}
            />
          </CardFooter>
        </Card>

        <Card className="w-full sm:w-[200px] rounded-xl sm:rounded-l-none flex flex-col border-t-0 sm:border-t sm:border-l-0">
          <CardContent className="p-4 flex-grow flex flex-col justify-between gap-3">
            <div className="flex-grow flex items-center justify-center">
              <span className="text-xl font-bold tracking-wide">
                {formattedPrice} DZD
              </span>
            </div>
            <div className="flex items-center justify-center">
              <button className="group text-sm text-blue-600 flex items-center underline hover:no-underline hover:text-blue-700">
                <Info className="w-4 h-4 mr-1 fill-blue-600 text-white" />
                <span className="font-medium text-xs">Conditions</span>
              </button>
            </div>
            <Button
              onClick={handleSelectFlight}
              className="w-full bg-orange-500 hover:bg-orange-600 text-sm font-medium py-2 h-9"
            >
              Select
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
