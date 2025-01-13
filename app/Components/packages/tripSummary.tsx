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
import AirlineCompanyComponent from "./airlineCompany";
import { FaPlane, FaCircle } from "react-icons/fa";
import FlightDuration from "@/app/commonComponents/flightDuration";
import LayoverInfo from "./layoverInfo";
import { FlightInfo, FlightSegment } from "@/lib/types/flightInfo";
import { calculateLayoverDuration, calculateTotalDuration, formatDuration } from "@/lib/utils/flightUtils";

interface TripSummaryProps {
  flightInfo: FlightInfo;
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

  // Validate flight data
  if (!flightInfo?.segments || !Array.isArray(flightInfo.segments) || flightInfo.segments.length === 0) {
    return (
      <Card className="w-full bg-white rounded-lg shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-center text-red-500">
            <CircleAlert className="w-5 h-5 mr-2" />
            <span>Flight information unavailable</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Get first and last airports for the entire trip
  const firstSegment = flightInfo.segments[0]?.[0];
  const lastSegmentArray = flightInfo.segments[flightInfo.segments.length - 1];
  const lastSegment = lastSegmentArray?.[lastSegmentArray.length - 1];

  // Additional validation for first and last segments
  if (!firstSegment || !lastSegment) {
    return (
      <Card className="w-full bg-white rounded-lg shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-center text-red-500">
            <CircleAlert className="w-5 h-5 mr-2" />
            <span>Incomplete flight information</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalDuration = calculateTotalDuration(flightInfo.segments);
  const isDirectFlight = flightInfo.segments.length === 1 && flightInfo.segments[0].length === 1;

  return (
    <div className="flex flex-col space-y-4 pb-8">
      {/* Flight route summary */}
      <FlightDuration
        flightFrom={firstSegment.boardAirport}
        flightTo={lastSegment.offAirport}
        flightDuration={totalDuration}
        isDirectFlight={isDirectFlight}
      />

      {/* Main flight information card */}
      <div className="flex flex-col items-center pt-2">
        <Card className="shadow-md pt-4 w-full">
          <CardContent>
            {flightInfo.segments.map((segment, segmentIndex) => (
              <div key={segmentIndex} className="mb-6">
                {segment.map((leg, legIndex) => (
                  <div key={`${segmentIndex}-${legIndex}`} className="mb-4">
                    <div className="flex flex-col sm:flex-row relative">
                      {/* Left column: Departure and arrival times */}
                      <div className="w-full sm:w-1/4 pr-4 sm:border-r flex flex-row sm:flex-col justify-between relative mb-4 sm:mb-0">
                        <div className="flex flex-row sm:flex-col items-center sm:items-start">
                          <div className="mb-2 sm:mb-4 mr-2 sm:mr-0">
                            <p className="font-semibold text-xs sm:text-sm">
                              {leg.boardTime}
                            </p>
                            <p className="text-[10px] sm:text-xs text-gray-500">
                              {leg.boardDate}
                            </p>
                          </div>
                          <div className="mb-2 sm:mb-4">
                            <p className="text-[10px] sm:text-xs font-semibold text-gray-500 pt-1 sm:pt-2">
                              {formatDuration(leg.duration)}
                            </p>
                          </div>
                        </div>
                        <div className="sm:mt-auto">
                          <p className="font-semibold text-xs sm:text-sm">
                            {leg.offTime}
                          </p>
                          <p className="text-[10px] sm:text-xs text-gray-500">
                            {leg.offDate}
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
                            {leg.boardAirportName?.name || leg.boardAirport}
                          </p>
                          <p className="text-[10px] sm:text-xs text-gray-500">
                            {leg.boardAirport}
                          </p>
                        </div>

                        {/* Airline info and expand/collapse button */}
                        <div className="mb-2 sm:mb-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <AirlineCompanyComponent
                              iata={leg.airLine?.iata || ""}
                              name={leg.airLine?.name || ""}
                            />
                            <span className="ml-2 text-xs text-gray-600">
                              {leg.flightNumber}
                            </span>
                          </div>
                          {legIndex === 0 && segmentIndex === 0 && (
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
                          )}
                        </div>

                        <div className="mt-auto">
                          <p className="text-xs sm:text-sm font-semibold">
                            {leg.offAirportName?.name || leg.offAirport}
                          </p>
                          <p className="text-[10px] sm:text-xs text-gray-500">
                            {leg.offAirport}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Show layover info if there's another leg in this segment */}
                    {legIndex < segment.length - 1 && (
                      <LayoverInfo
                        airport={segment[legIndex + 1].boardAirportName?.name || segment[legIndex + 1].boardAirport}
                        duration={calculateLayoverDuration(
                          leg.offTime,
                          segment[legIndex + 1].boardTime
                        )}
                      />
                    )}
                  </div>
                ))}

                {/* Show layover between segments */}
                {segmentIndex < flightInfo.segments.length - 1 && (
                  <LayoverInfo
                    airport={flightInfo.segments[segmentIndex + 1][0].boardAirportName?.name || 
                            flightInfo.segments[segmentIndex + 1][0].boardAirport}
                    duration={calculateLayoverDuration(
                      segment[segment.length - 1].offTime,
                      flightInfo.segments[segmentIndex + 1][0].boardTime
                    )}
                  />
                )}
              </div>
            ))}

            {/* Expandable content section */}
            <div
              style={{
                maxHeight: isExpanded ? `${contentHeight}px` : "0",
                overflow: "hidden",
                transition: "max-height 0.4s ease-in-out",
              }}
            >
              <div id="expandable-content" className="mb-2 sm:mb-4 space-y-2 sm:space-y-4">
                {flightInfo.segments.map((segment, segmentIndex) =>
                  segment.map((leg, legIndex) => (
                    <div key={`${segmentIndex}-${legIndex}`}>
                      {/* Connection info */}
                      <div>
                        <h4 className="font-semibold text-xs sm:text-sm mb-1 sm:mb-2">
                          Flight {legIndex + 1} Details
                        </h4>
                        <div className="grid grid-cols-2 gap-1 sm:gap-2 text-[10px] sm:text-sm">
                          <div className="flex items-center">
                            <Plane size={15} className="mr-1 sm:mr-2" fill="black" />
                            <p className="font-normal text-[10px] sm:text-xs">
                              Airline
                            </p>
                          </div>
                          <p className="font-semibold text-[10px] sm:text-xs">
                            {leg.airLine?.name || 'N/A'}
                          </p>
                          <div className="flex items-center">
                            <Info size={15} className="mr-1 sm:mr-2" />
                            <p className="font-normal text-[10px] sm:text-xs">
                              Flight no
                            </p>
                          </div>
                          <p className="font-semibold text-[10px] sm:text-xs">
                            {leg.flightNumber || 'N/A'}
                          </p>
                          <div className="flex items-center">
                            <Briefcase size={15} className="mr-1 sm:mr-2" />
                            <p className="font-normal text-[10px] sm:text-xs">
                              Baggage
                            </p>
                          </div>
                          <p className="font-semibold text-[10px] sm:text-xs">
                            {leg.baggage || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
