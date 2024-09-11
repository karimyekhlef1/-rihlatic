import React from 'react';
import { Luggage, Briefcase, Star } from 'lucide-react';

const FlightInfoFooter: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <Luggage className="h-5 w-5 text-gray-400" />
      <span className="text-sm text-gray-400">1</span>
      <Briefcase className="h-5 w-5 text-gray-400" />
      <span className="text-sm text-gray-400">1</span>
      <div className="bg-gray-100 rounded-full px-4 py-1 text-sm text-black font-medium flex items-center">
        <Star className="h-4 w-4 mr-1 fill-black" />
        Self-transfer hack
      </div>
    </div>
  );
};

export default FlightInfoFooter;
