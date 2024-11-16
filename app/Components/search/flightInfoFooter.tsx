import React from 'react';
import { Luggage, Briefcase, Star } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store'; // Adjust this import path as needed

const FlightInfoFooter: React.FC = () => {
  const { cabin, checked } = useSelector((state: RootState) => state.baggage);

  return (
    <div className="flex items-center space-x-2">
      <Luggage className="h-4 w-4 text-gray-400" />
      <span className="text-xs text-gray-400">{cabin}</span>
      <Briefcase className="h-4 w-4 text-gray-400" />
      <span className="text-xs text-gray-400">{checked}</span>
      <div className="bg-gray-100 rounded-full px-3 py-0.5 text-xs text-black font-medium flex items-center">
        <Star className="h-3 w-3 mr-1 fill-black" />
        Self-transfer hack
      </div>
    </div>
  );
};

export default FlightInfoFooter;
