import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectFilteredFlights = createSelector(
  [(state: RootState) => state.vols.flightsData,
   (state: RootState) => state.hours.selectedDepartureTimes,
   (state: RootState) => state.hours.selectedArrivalTimes],
  (flights, selectedDepartureTimes, selectedArrivalTimes) => {
    if (!flights) return [];
    if (selectedDepartureTimes.length === 0 && selectedArrivalTimes.length === 0) {
      return flights;
    }

    return flights.filter(flight => {
      if (!flight.segments?.[0]?.[0]) return false;

      const firstSegment = flight.segments[0][0];
      const lastSegment = flight.segments[0][flight.segments[0].length - 1];

      const departureTime = firstSegment.depTime;
      const arrivalTime = lastSegment.arrTime;

      const matchesDeparture = selectedDepartureTimes.length === 0 || 
        selectedDepartureTimes.includes(departureTime);
      
      const matchesArrival = selectedArrivalTimes.length === 0 || 
        selectedArrivalTimes.includes(arrivalTime);

      return matchesDeparture && matchesArrival;
    });
  }
);
