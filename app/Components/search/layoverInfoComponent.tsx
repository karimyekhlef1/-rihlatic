import React from 'react';
import { Clock } from 'lucide-react';
import Image from 'next/image';

import selfTransfer from '@/public/images/self-transfer.svg';

interface LayoverInfo {
  duration: string;
  location: string;
  code: string;
}

interface LayoverInfoProps {
  layovers: LayoverInfo[];
}

const LayoverInfoComponent: React.FC<LayoverInfoProps> = ({ layovers }) => {
  return (
    <div className="pt-4">
      {layovers.map((layover, index) => (
        <div key={index} className="flex items-center mb-2">
          <Clock className="w-5 h-5 mr-2 text-gray-500 bg-gray-200 rounded-full p-[2px]" />
          <span className="text-xs">
            {layover.duration} layover in {layover.location} ({layover.code})
          </span>
        </div>
      ))}
      <div className="flex items-start mt-4 p-0 rounded">
        <Image
          src={selfTransfer}
          alt="Self Transfer"
          width={20}
          height={20}
          className="mr-2 bg-orange-50 rounded-full p-[2px]"
        />
        <p className="text-xs text-black">
          <span className="font-medium text-orange-500">
            Self-transfer hack:
          </span>{' '}
          Transport to your connecting flights is your responsibility
        </p>
      </div>
    </div>
  );
};

export default LayoverInfoComponent;
