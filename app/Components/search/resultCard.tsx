import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import FlightInfos from './flightInfos';
import FlightSeparator from './flightSeparator';
import FlightInfoFooter from './flightInfoFooter';

import { useDispatch } from 'react-redux';
import { openDialogDetail } from '@/lib/store/custom/mainSlices/dialogSlice';
import TripDetails from './tripDetails';

export default function ResultCard() {
  const dispatch = useDispatch();
  const handleOpenDialog = () => {
    dispatch(openDialogDetail());
  };

  return (
    <div className="w-full max-w-sm sm:max-w-4xl mx-auto sm:pt-4 sm:px-0">
      <div className="flex flex-col sm:flex-row w-full transition-all duration-300 ease-in-out sm:hover:drop-shadow-md">
        <Card className="flex-grow rounded-t-xl sm:rounded-t-xl sm:border-r-0 sm:mb-0 border-b-0 sm:border-b">
          <CardContent className="p-4">
            <div className="space-y-4">
              <FlightInfos />

              {/* SEPARATOR */}
              <FlightSeparator />

              <FlightInfos />
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
              <span className="text-xl font-bold">$584</span>
            </div>
            <Button
              className="w-full mt-4 text-sm"
              variant={'active'}
              onClick={handleOpenDialog}
            >
              Select
            </Button>
          </CardContent>
        </Card>
        <div>
          <TripDetails />
        </div>
      </div>
    </div>
  );
}
