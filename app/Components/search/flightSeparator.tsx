import React from 'react';

const FlightSeparator: React.FC = () => {
  return (
    <div>
      <div className="relative py-3">
        <div className="border-t border-dashed border-gray-300"></div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full px-3 py-0.5 text-[10px] sm:text-xs text-black font-normal sm:font-medium flex justify-center border border-gray-200">
          21 nights in England
        </div>
      </div>
    </div>
  );
};

export default FlightSeparator;
