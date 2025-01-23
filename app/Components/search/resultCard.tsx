import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import FlightInfos from "./flightInfos";
import FlightSeparator from "./flightSeparator";
import FlightInfoFooter from "./flightInfoFooter";
import { useDispatch } from "react-redux";
import { openDialogDetail } from "@/lib/store/custom/mainSlices/dialogSlice";
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

  // Safely extract outbound and return segments
  const outboundSegments = flightData?.segments?.[0] || [];
  const returnSegments = flightData?.segments?.[1];

  // Guard against missing data
  if (!outboundSegments.length) {
    return null;
  }

  // Get first segment for footer info
  const firstSegment = outboundSegments[0];

  // Format price with space for thousands
  const formattedPrice = flightData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return (
    <div className="w-full max-w-sm sm:max-w-4xl mx-auto sm:px-0 sm:pb-3">
      <div className="flex flex-col sm:flex-row w-full transition-all duration-300 ease-in-out hover:shadow-md rounded-xl">
        <Card className="flex-grow rounded-xl sm:rounded-r-none border-b-0 sm:border-b sm:border-r-0">
          <CardContent className="p-4">
            <div className="space-y-4">
              <FlightInfos segments={outboundSegments} type="outbound" />

              {returnSegments && returnSegments.length > 0 && (
                <>
                  <FlightSeparator segments={returnSegments} />
                  <FlightInfos segments={returnSegments} type="return" />
                </>
              )}
            </div>
          </CardContent>

          <CardFooter className="px-4 py-3 border-t border-dashed border-gray-200">
            <FlightInfoFooter 
              segment={{
                availability: firstSegment.availability || 'N/A',
                equipmentType: firstSegment.equipmentType || 'N/A',
                bookClass: firstSegment.bookClass || 'N/A',
                cabinClass: firstSegment.cabinClass || 'N/A',
                baggage: firstSegment.baggage || '0 Piece(s)'
              }} 
            />
          </CardFooter>
        </Card>

        <Card className="w-full sm:w-[200px] rounded-xl sm:rounded-l-none flex flex-col border-t-0 sm:border-t sm:border-l-0">
          <CardContent className="p-4 flex-grow flex flex-col justify-between gap-3">
            <div className="flex-grow flex items-center justify-center">
              <span className="text-xl font-bold tracking-wide">{formattedPrice} DZD</span>
            </div>
            <div className="flex items-center justify-center">
              <button 
                onClick={handleOpenDialog}
                className="group text-sm text-blue-600 flex items-center hover:text-blue-700"
              >
                <Info className="w-4 h-4 mr-1.5" />
                <span className="font-medium">Conditions</span>
              </button>
            </div>
            <Button
              onClick={handleOpenDialog}
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
