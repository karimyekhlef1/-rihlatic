"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronDown,
  ChevronUp,
  Wifi,
  Info,
  Plane,
  CircleAlert,
  Briefcase,
  Luggage,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import airlineLogo from "@/public/images/airalgerie.svg";
import AirlineCompanyComponent from "./airlineCompany";
import { FaPlane, FaCircle } from "react-icons/fa";
import { FlightInfo } from "@/app/Types/Common/flightInfo";
import FlightDuration from "@/app/commonComponents/flightDuration";

interface TripSummaryProps {
  flightInfo: any;
}

export default function TripSummaryComponent({ flightInfo }: TripSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  // Effect to update content height when expanded state changes
  useEffect(() => {
    if (isExpanded) {
      const content = document.getElementById("expandable-content");
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
      <FlightDuration
        flightFrom={flightInfo.from}
        flightTo={flightInfo.to}
        flightDuration={flightInfo.duration}
      />

      {/* Main flight information card */}
      <div
        className={`flex flex-col items-center pt-2 ${
          flightInfo.nextdayDeparture
            ? "bg-orange-100 rounded-lg border-l-4 border-l-orange-500"
            : ""
        }`}
      >
        {flightInfo.nextdayDeparture && (
          <div className="flex items-center mb-2 pl-8 self-start">
            <CircleAlert size={16} className="text-white mr-1" fill="#ff8000" />
            <p className="text-xs font-semibold text-orange-500">
              Depart the next day
            </p>
          </div>
        )}
        <Card className="shadow-md pt-4 w-full">
          <CardContent>
            <div className="flex flex-col sm:flex-row relative">
              {/* Left column: Departure and arrival times */}
              <div className="w-full sm:w-1/4 pr-4 sm:border-r flex flex-row sm:flex-col justify-between relative mb-4 sm:mb-0">
                <div className="flex flex-row sm:flex-col items-center sm:items-start">
                  <div className="mb-2 sm:mb-4 mr-2 sm:mr-0">
                    <p className="font-semibold text-xs sm:text-sm">
                      {flightInfo.departureTime}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-500">
                      {flightInfo.departureDate}
                    </p>
                  </div>
                  <div className="mb-2 sm:mb-4">
                    <p className="text-[10px] sm:text-xs font-semibold text-gray-500 pt-1 sm:pt-2">
                      {flightInfo.duration}
                    </p>
                  </div>
                </div>
                <div className="sm:mt-auto">
                  <p className="font-semibold text-xs sm:text-sm">
                    {flightInfo.arrivalTime}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500">
                    {flightInfo.arrivalDate}
                  </p>
                </div>
                {/* Flight path indicators */}
                <div className="hidden sm:block absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2 p-1 rounded-full">
                  <FaCircle className="text-gray-400 text-[6px] sm:text-[8px]" />
                </div>
                <div className="hidden sm:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 bg-white p-1 rounded-full">
                  <FaPlane className="text-gray-400 transform rotate-90 text-xs sm:text-sm" />
                </div>
                <div className="hidden sm:block absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2 p-1 rounded-full">
                  <FaCircle className="text-gray-400 text-[6px] sm:text-[8px]" />
                </div>
              </div>

              {/* Right column: Airport details and expandable content */}
              <div className="w-full sm:w-2/3 sm:pl-4 md:pl-8 lg:pl-28 flex flex-col">
                <div className="mb-2 sm:mb-4">
                  <p className="text-xs sm:text-sm font-semibold">
                    {flightInfo.departureCity}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500">
                    {flightInfo.departureAirport}
                  </p>
                </div>

                {/* Airline info and expand/collapse button */}
                <div className="mb-2 sm:mb-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <AirlineCompanyComponent
                      logo={airlineLogo}
                      name={flightInfo.airline}
                    />
                    <span className="ml-2 text-xs text-gray-600">
                      {flightInfo.flightNumber}
                    </span>
                  </div>
                  <Button
                    variant="ghost2"
                    size="sm"
                    onClick={toggleExpanded}
                    className="p-1"
                  >
                    {isExpanded ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </Button>
                </div>

                <div className="mt-auto">
                  <p className="text-xs sm:text-sm font-semibold">
                    {flightInfo.arrivalCity}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500">
                    {flightInfo.arrivalAirport}
                  </p>
                </div>

                {/* Expandable content section */}
                <div
                  style={{
                    maxHeight: isExpanded ? `${contentHeight}px` : "0",
                    overflow: "hidden",
                    transition: "max-height 0.4s ease-in-out",
                  }}
                >
                  <div
                    id="expandable-content"
                    className="mb-2 sm:mb-4 space-y-2 sm:space-y-4"
                  >
                    {/* Connection info */}
                    <div>
                      <h4 className="font-semibold text-xs sm:text-sm mb-1 sm:mb-2">
                        Connection info
                      </h4>
                      <div className="grid grid-cols-2 gap-1 sm:gap-2 text-[10px] sm:text-sm">
                        <div className="flex items-center">
                          <Plane
                            size={15}
                            className="mr-1 sm:mr-2"
                            fill="black"
                          />
                          <p className="font-normal text-[10px] sm:text-xs">
                            Airline
                          </p>
                        </div>
                        <p className="font-semibold text-[10px] sm:text-xs">
                          {flightInfo.airline}
                        </p>
                        <div className="flex items-center">
                          <Info size={15} className="mr-1 sm:mr-2" />
                          <p className="font-normal text-[10px] sm:text-xs">
                            Flight no
                          </p>
                        </div>
                        <p className="font-semibold text-[10px] sm:text-xs">
                          {flightInfo.flightNumber}
                        </p>
                      </div>
                    </div>
                    {/* Seating info */}
                    <div>
                      <h4 className="font-semibold text-xs sm:text-sm mb-1 sm:mb-2">
                        Seating info
                      </h4>
                      <div className="grid grid-cols-2 gap-1 sm:gap-2 text-[10px] sm:text-sm">
                        <p className="font-normal text-[10px] sm:text-xs">
                          Seat pitch
                        </p>
                        <p className="font-semibold text-[10px] sm:text-xs">
                          {flightInfo.seatPitch}
                        </p>
                        <p className="font-normal text-[10px] sm:text-xs">
                          Seat width
                        </p>
                        <p className="font-semibold text-[10px] sm:text-xs">
                          {flightInfo.seatWidth}
                        </p>
                        <p className="font-normal text-[10px] sm:text-xs">
                          Seat recline
                        </p>
                        <p className="font-semibold text-[10px] sm:text-xs">
                          {flightInfo.seatRecline}
                        </p>
                        <div className="flex items-center">
                          <Wifi size={15} className="mr-1 sm:mr-2" />
                          <p className="font-normal text-[10px] sm:text-xs">
                            Wi-Fi on board
                          </p>
                        </div>
                        <p className="font-semibold text-[10px] sm:text-xs">
                          {flightInfo.wifiOnBoard ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>
                    {/* Luggage info */}
                    <div>
                      <h4 className="font-semibold text-xs sm:text-sm mb-1 sm:mb-2">
                        Luggage info
                      </h4>
                      <div className="grid grid-cols-2 gap-1 sm:gap-2 text-[10px] sm:text-sm">
                        <div className="flex items-center">
                          <Briefcase size={15} className="mr-1 sm:mr-2" />
                          <p className="font-normal text-[10px] sm:text-xs">
                            Hand luggage
                          </p>
                        </div>
                        <p className="font-semibold text-[10px] sm:text-xs">
                          {flightInfo.handLuggage} KG
                        </p>
                        <div className="flex items-center">
                          <Luggage size={15} className="mr-1 sm:mr-2" />
                          <p className="font-normal text-[10px] sm:text-xs">
                            Checked luggage
                          </p>
                        </div>
                        <p className="font-semibold text-[10px] sm:text-xs">
                          {flightInfo.checkedLuggage} KG
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
