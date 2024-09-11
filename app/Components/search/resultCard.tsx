import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import FlightInfos from './flightInfos';
import FlightSeparator from './flightSeparator';
import FlightInfoFooter from './flightInfoFooter';

export default function ResultCard() {
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="flex">
        <Card className="flex-grow rounded-xl border-r-0">
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

        <div className="w-px border-r border-dashed border-gray-300 my-4"></div>

        <Card className="w-60 rounded-xl border-l-0 flex flex-col">
          <CardContent className="p-4 flex-grow flex flex-col justify-between">
            <div className="flex-grow flex items-center justify-center">
              <span className="text-2xl font-bold">$584</span>
            </div>
            <Button className="w-full mt-4" variant={'active'}>
              Select
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
