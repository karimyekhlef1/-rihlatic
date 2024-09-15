import React from 'react';

interface TripSeparatorProps {
  time: string;
  place: string;
}

const TripSeparator: React.FC<TripSeparatorProps> = ({ time, place }) => {
  return (
    <div className="relative py-4">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-2 text-xs font-semibold">
          {time} in {place}
        </span>
      </div>
    </div>
  );
};

export default TripSeparator;
