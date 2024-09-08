'use client';

import { RootState } from '@/lib/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { toggleExpanded } from '@/lib/store/packagesSlices/flightSlice';
import { useState, useEffect } from 'react';

import { Card, CardContent } from '@/components/ui/card';

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
  // Initialize Redux dispatch and select flight state
  const dispatch = useDispatch();
  const { flightInfo, isExpanded } = useSelector(
    (state: RootState) => state.flight
  );

  // State to manage the height of expandable content
  const [contentHeight, setContentHeight] = useState(0);

  // Effect to update content height when expanded state changes
  useEffect(() => {
    if (isExpanded) {
      const content = document.getElementById('expandable-content');
      if (content) {
        setContentHeight(content.scrollHeight);
      }
    } else {
      setContentHeight(0);
    }
  }, [isExpanded]);

  return (
    <div className="flex flex-col space-y-4 pb-8">
      {/* Flight route summary */}
      <div className="flex flex-row justify-between">
        {/* From and To locations */}
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
        </div>
        {/* Flight duration */}
        <div className="flex flex-row justify-center items-center gap-x-1">
          <Clock size={15} color="gray" />
          <p className="text-xs text-gray-500">Duration:</p>
          <p className="text-xs text-black font-semibold">
            {flightInfo.duration}
          </p>
        </div>
      </div>

      {/* Main flight information card */}
      <Card className="shadow-md pt-4">
        <CardContent>
          <div className="flex">
            {/* Left column: Departure and arrival times */}
            <div className="w-1/3 pr-4 border-r">
              <div className="mb-4">
                <p className="font-semibold">{flightInfo.departureTime}</p>
                <p className="text-sm text-gray-500">
                  {flightInfo.departureDate}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500">
                  {flightInfo.duration}
                </p>
              </div>
              <div>
                <p className="font-semibold">{flightInfo.arrivalTime}</p>
                <p className="text-sm text-gray-500">
                  {flightInfo.arrivalDate}
                </p>
              </div>
            </div>

            {/* Right column: Airport details and expandable content */}
            <div className="w-2/3 pl-4">
              <div className="mb-4">
                <p className="font-semibold">{flightInfo.departureAirport}</p>
                <p className="text-sm text-gray-500">
                  {flightInfo.departureAirportName}
                </p>
              </div>

              {/* Airline info and expand/collapse button */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Plane className="mr-2" size={20} />
                  <p className="text-sm font-semibold">{flightInfo.airline}</p>
                </div>
                <Button
                  variant="ghost2"
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

              {/* Expandable content section */}
              <div
                style={{
                  maxHeight: isExpanded ? `${contentHeight}px` : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.4s ease-in-out',
                }}
              >
                <div id="expandable-content" className="mb-4 space-y-4">
                  {/* Connection info */}
                  <div>
                    <h4 className="font-semibold text-sm mb-2">
                      Connection info
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p className="font-normal text-xs">Airline</p>
                      <p className="font-semibold text-xs">
                        {flightInfo.airline}
                      </p>
                      <p className="font-normal text-xs">Flight no</p>
                      <p className="font-semibold text-xs">
                        {flightInfo.flightNumber}
                      </p>
                    </div>
                  </div>
                  {/* Seating info */}
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Seating info</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p className="font-normal text-xs">Seat pitch</p>
                      <p className="font-semibold text-xs">
                        {flightInfo.seatPitch}
                      </p>
                      <p className="font-normal text-xs">Seat width</p>
                      <p className="font-semibold text-xs">
                        {flightInfo.seatWidth}
                      </p>
                      <p className="font-normal text-xs">Seat recline</p>
                      <p className="font-semibold text-xs">
                        {flightInfo.seatRecline}
                      </p>
                      <div className="flex items-center">
                        <Wifi size={16} className="mr-2" />
                        <p className="font-normal text-xs">Wi-Fi on board</p>
                      </div>
                      <p className="font-semibold text-xs">
                        {flightInfo.wifiOnBoard ? 'Yes' : 'No'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrival airport */}
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
