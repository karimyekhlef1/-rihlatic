import React from 'react';

interface FlightSeparatorProps {
  segments: any[];
}

const FlightSeparator: React.FC<FlightSeparatorProps> = ({ segments }) => {
  const calculateLayoverTime = () => {
    if (!segments || segments.length <= 1) return '';

    // Calculate total layover time
    let totalLayoverMinutes = 0;
    for (let i = 0; i < segments.length - 1; i++) {
      const currentFlight = segments[i];
      const nextFlight = segments[i + 1];
      
      // Convert arrival and departure times to minutes for calculation
      const [arrHours, arrMinutes] = currentFlight.arrTime.split(':').map(Number);
      const [depHours, depMinutes] = nextFlight.depTime.split(':').map(Number);
      
      const arrivalMinutes = arrHours * 60 + arrMinutes;
      const departureMinutes = depHours * 60 + depMinutes;
      
      // Add layover time
      totalLayoverMinutes += departureMinutes - arrivalMinutes;
    }

    // Format layover time
    const hours = Math.floor(totalLayoverMinutes / 60);
    const minutes = totalLayoverMinutes % 60;
    
    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m layover`;
    } else if (hours > 0) {
      return `${hours}h layover`;
    } else {
      return `${minutes}m layover`;
    }
  };

  return (
    <div>
      <div className="relative py-3">
        <div className="border-t border-dashed border-gray-300"></div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full px-3 py-0.5 text-[10px] sm:text-xs text-black font-normal sm:font-medium flex justify-center border border-gray-200">
          {calculateLayoverTime()}
        </div>
      </div>
    </div>
  );
};

export default FlightSeparator;
