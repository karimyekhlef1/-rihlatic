import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectFilteredFlights = createSelector(
  [(state: RootState) => state.vols.flightsData,
   (state: RootState) => state.hours.selectedDepartureTimes,
   (state: RootState) => state.hours.selectedArrivalTimes,
   (state: RootState) => state.stops.selectedStops],
  (flights, selectedDepartureTimes, selectedArrivalTimes, selectedStops) => {
    if (!flights) return [];
    
    return flights.filter(flight => {
      if (!flight.segments?.[0]) return false;

      // Time filters
      const firstSegment = flight.segments[0][0];
      const lastSegment = flight.segments[0][flight.segments[0].length - 1];
      const departureTime = firstSegment.depTime;
      const arrivalTime = lastSegment.arrTime;

      const matchesDeparture = selectedDepartureTimes.length === 0 || 
        selectedDepartureTimes.includes(departureTime);
      const matchesArrival = selectedArrivalTimes.length === 0 || 
        selectedArrivalTimes.includes(arrivalTime);

      // Stops filter
      const numStops = flight.segments[0].length - 1;
      const matchesStops = selectedStops === 'any' ||
        (selectedStops === 'direct' && numStops === 0) ||
        (selectedStops === 'up-to-1-stop' && numStops <= 1) ||
        (selectedStops === 'up-to-2-stops' && numStops <= 2);

      return matchesDeparture && matchesArrival && matchesStops;
    });
  }
);
