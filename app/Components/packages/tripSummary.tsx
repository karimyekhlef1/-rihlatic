'use client';

import { RootState } from '@/lib/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { toggleExpanded } from '@/lib/store/packagesSlices/flightSlice';

import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  MoveRight,
  CircleArrowRight,
  Clock,
  ChevronDown,
  ChevronUp,
  Plane,
  Wifi,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function TripSummaryComponent() {
  const dispatch = useDispatch();
  const { flightInfo, isExpanded } = useSelector(
    (state: RootState) => state.flight
  );

  return (
    <div className="flex flex-col space-y-4 pb-8">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row justify-center items-center gap-x-1">
          <p className="font-semibold text-sm flex flex-row justify-center items-center gap-x-2">
            {flightInfo.from} {<MoveRight size={20} />} {flightInfo.to}
          </p>
          <div className="flex flex-row justify-center items-center px-2 gap-x-1">
            <CircleArrowRight
              size={20}
              className="font-semibold text-xs text-[#3279f4]"
              fill="#cddfff"
            />
            <p className="font-semibold text-xs text-blue-400">Direct flight</p>
          </div>
        </div>{' '}
        <div className="flex flex-row justify-center items-center gap-x-1">
          <Clock size={15} color="gray" />
          <p className="text-xs text-gray-500">Duration:</p>
          <p className="text-xs text-black font-semibold">
            {flightInfo.duration}
          </p>
        </div>
      </div>
      <Card className="shadow-md pt-4">
        <CardContent>
          <div className="flex">
            <div className="w-1/3 pr-4 border-r">
              <div className="mb-4">
                <p className="font-semibold">{flightInfo.departureTime}</p>
                <p className="text-sm text-gray-500">
                  {flightInfo.departureDate}
                </p>
              </div>
              <div className="mb-4">
                <p className="font-semibold">{flightInfo.arrivalTime}</p>
                <p className="text-sm text-gray-500">
                  {flightInfo.arrivalDate}
                </p>
              </div>
              <div>
                <p className="text-sm">{flightInfo.duration}</p>
              </div>
            </div>
            <div className="w-2/3 pl-4">
              <div className="mb-4">
                <p className="font-semibold">{flightInfo.departureAirport}</p>
                <p className="text-sm text-gray-500">
                  {flightInfo.departureAirportName}
                </p>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Plane className="mr-2" size={20} />
                  <p className="text-sm font-semibold">{flightInfo.airline}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dispatch(toggleExpanded())}
                  className="p-1"
                >
                  {isExpanded ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </Button>
              </div>
              {isExpanded && (
                <div className="mb-4 space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Connection info</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p>Airline</p>
                      <p>{flightInfo.airline}</p>
                      <p>Flight no</p>
                      <p>{flightInfo.flightNumber}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Seating info</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p>Seat pitch</p>
                      <p>{flightInfo.seatPitch}</p>
                      <p>Seat width</p>
                      <p>{flightInfo.seatWidth}</p>
                      <p>Seat recline</p>
                      <p>{flightInfo.seatRecline}</p>
                      <div className="flex items-center">
                        <Wifi size={16} className="mr-2" />
                        <p>Wi-Fi on board</p>
                      </div>
                      <p>{flightInfo.wifiOnBoard ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                </div>
              )}
              <div>
                <p className="font-semibold">{flightInfo.arrivalAirport}</p>
                <p className="text-sm text-gray-500">
                  {flightInfo.arrivalAirportName}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
