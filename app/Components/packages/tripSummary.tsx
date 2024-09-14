'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  MoveRight,
  CircleArrowRight,
  Clock,
  ChevronDown,
  ChevronUp,
  Wifi,
  Info,
  Plane,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import airlineLogo from '@/public/images/airalgerie.svg';
import AirlineCompanyComponent from './airlineCompany';
import { FaPlane, FaCircle } from 'react-icons/fa';

// Define the FlightInfo interface
interface FlightInfo {
  from: string;
  to: string;
  duration: string;
  departureTime: string;
  departureDate: string;
  arrivalTime: string;
  arrivalDate: string;
  departureAirport: string;
  departureAirportName: string;
  arrivalAirport: string;
  arrivalAirportName: string;
  airline: string;
  flightNumber: string;
  seatPitch: string;
  seatWidth: string;
  seatRecline: string;
  wifiOnBoard: boolean;
}

export default function TripSummaryComponent() {
  // Use useState for local state management
  const [flightInfo, setFlightInfo] = useState<FlightInfo>({
    // Initialize with default values or fetch from an API
    from: 'Algiers',
    to: 'Paris',
    duration: '2h 20m',
    departureAirport: 'Algiers . ALG',
    departureAirportName: 'Houari Boumediene',
    departureTime: '18:35',
    departureDate: 'Tue 24 Sep',
    arrivalAirport: 'Paris . ORY',
    arrivalAirportName: 'Paris Orly',
    arrivalTime: '21:55',
    arrivalDate: 'Tue 24 Sep',
    airline: 'Air Algerie',
    flightNumber: 'AH 1008',
    seatPitch: '73-76 cm',
    seatWidth: '43 cm',
    seatRecline: '7 cm',
    wifiOnBoard: false,
  });
  const [isExpanded, setIsExpanded] = useState(false);
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

  // Function to toggle expanded state
  const toggleExpanded = () => setIsExpanded(!isExpanded);

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
          <div className="flex relative">
            {/* Left column: Departure and arrival times */}
            <div className="w-1/4 pr-4 border-r flex flex-col justify-between relative">
              <div>
                <div className="mb-4">
                  <p className="font-semibold text-sm">
                    {flightInfo.departureTime}
                  </p>
                  <p className="text-xs text-gray-500">
                    {flightInfo.departureDate}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 pt-2">
                    {flightInfo.duration}
                  </p>
                </div>
              </div>
              <div className="mt-auto">
                <p className="font-semibold text-sm">
                  {flightInfo.arrivalTime}
                </p>
                <p className="text-xs text-gray-500">
                  {flightInfo.arrivalDate}
                </p>
              </div>
              <div className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2 p-1 rounded-full">
                <FaCircle className="text-gray-400 text-[8px]" />
              </div>
              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 bg-white p-1 rounded-full">
                <FaPlane className="text-gray-400 transform rotate-90" />
              </div>
              <div className="absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2 p-1 rounded-full">
                <FaCircle className="text-gray-400 text-[8px]" />
              </div>
            </div>

            {/* Right column: Airport details and expandable content */}
            <div className="w-2/3 pl-28 flex flex-col">
              <div className="mb-4">
                <p className="text-sm font-semibold">
                  {flightInfo.departureAirport}
                </p>
                <p className="text-xs text-gray-500">
                  {flightInfo.departureAirportName}
                </p>
              </div>

              {/* Airline info and expand/collapse button */}
              <div className="mb-4 flex items-center justify-between">
                <AirlineCompanyComponent
                  logo={airlineLogo}
                  name={flightInfo.airline}
                />
                <Button
                  variant="ghost2"
                  size="sm"
                  onClick={toggleExpanded}
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
                      <div className="flex items-center">
                        <Plane size={16} className="mr-2" fill="black" />
                        <p className="font-normal text-xs">Airline</p>
                      </div>
                      <p className="font-semibold text-xs">
                        {flightInfo.airline}
                      </p>
                      <div className="flex items-center">
                        <Info size={16} className="mr-2" />
                        <p className="font-normal text-xs">Flight no</p>
                      </div>
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

              {/* Arrival airport (moved to bottom of right column) */}
              <div className="mt-auto">
                <p className="font-semibold text-sm">
                  {flightInfo.arrivalAirport}
                </p>
                <p className="text-xs text-gray-500">
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
