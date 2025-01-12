import { Clock } from 'lucide-react';

interface LayoverInfoProps {
  airport: string;
  duration: string;
}

export default function LayoverInfo({ airport, duration }: LayoverInfoProps) {
  return (
    <div className="flex flex-col space-y-1 py-2 px-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-2">
        <Clock size={14} className="text-gray-500" />
        <span className="text-xs font-medium text-gray-600">
          Layover at {airport}
        </span>
      </div>
      <span className="text-xs text-gray-500 pl-6">Duration: {duration}</span>
    </div>
  );
}
