import React from 'react';

interface FlightSeparatorProps {
  segments: any[];
  outboundLastSegment?: any;  // Last segment of outbound flight
}

const FlightSeparator: React.FC<FlightSeparatorProps> = ({ segments, outboundLastSegment }) => {
  const calculateStayDuration = () => {
    if (!segments || segments.length === 0) return '';
    
    // For round trips, calculate nights between outbound arrival and return departure
    if (outboundLastSegment) {
      const arrivalFlight = outboundLastSegment;
      const departureFlight = segments[0];
      
      // Get the layover city
      const stayCity = arrivalFlight.offAirportName?.city || arrivalFlight.arrCity || arrivalFlight.arrCode;
      
      // Convert arrival and departure times to minutes for calculation
      const [arrHours, arrMinutes] = arrivalFlight.arrTime.split(':').map(Number);
      const [depHours, depMinutes] = departureFlight.depTime.split(':').map(Number);
      
      const arrivalMinutes = arrHours * 60 + arrMinutes;
      let departureMinutes = depHours * 60 + depMinutes;
      
      // Calculate total minutes between flights
      let totalMinutes = departureMinutes - arrivalMinutes;
      
      // If departure is earlier than arrival, it means it's a different day
      if (totalMinutes < 0) {
        totalMinutes += 24 * 60;
      }
      
      // Convert to nights (round down to get full nights)
      const nights = Math.floor(totalMinutes / (24 * 60));
      
      // Return the stay duration message
      return `${nights} ${nights === 1 ? 'night' : 'nights'} in ${stayCity}`;
    }
    
    // For multi-destination trips, calculate layover between consecutive flights
    for (let i = 0; i < segments.length - 1; i++) {
      const currentFlight = segments[i];
      const nextFlight = segments[i + 1];
      
      const layoverCity = currentFlight.offAirportName?.city || currentFlight.arrCity || currentFlight.arrCode;
      
      // Calculate layover duration
      const [arrHours, arrMinutes] = currentFlight.arrTime.split(':').map(Number);
      const [depHours, depMinutes] = nextFlight.depTime.split(':').map(Number);
      
      const arrivalMinutes = arrHours * 60 + arrMinutes;
      let departureMinutes = depHours * 60 + depMinutes;
      
      if (departureMinutes < arrivalMinutes) {
        departureMinutes += 24 * 60;
      }
      
      const totalMinutes = departureMinutes - arrivalMinutes;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      
      if (hours >= 24) {
        const nights = Math.floor(hours / 24);
        return `${nights} ${nights === 1 ? 'night' : 'nights'} in ${layoverCity}`;
      } else if (hours > 0 && minutes > 0) {
        return `${hours}h ${minutes}m layover`;
      } else if (hours > 0) {
        return `${hours}h layover`;
      } else {
        return `${minutes}m layover`;
      }
    }
    
    return '';
  };

  return (
    <div>
      <div className="relative py-3">
        <div className="border-t border-dashed border-gray-300"></div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full px-3 py-0.5 text-[10px] sm:text-xs text-black font-normal sm:font-medium flex justify-center border border-gray-200">
          {calculateStayDuration()}
        </div>
      </div>
    </div>
  );
};

export default FlightSeparator;
