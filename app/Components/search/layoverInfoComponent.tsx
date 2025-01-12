import React from 'react';
import { Clock } from 'lucide-react';
import Image from 'next/image';

import selfTransfer from '@/public/images/self-transfer.svg';

interface LayoverInfoProps {
  duration: string;
  location: string;
  code: string;
}

const LayoverInfoComponent: React.FC<LayoverInfoProps> = ({ duration, location, code }) => {
  return (
    <div className="pt-4">
      <div className="flex items-center mb-2">
        <Clock className="w-5 h-5 mr-2 text-gray-500 bg-gray-200 rounded-full p-[2px]" />
        <span className="text-xs">
          {duration} layover in {location} ({code})
        </span>
      </div>
      <div className="flex items-start mt-4 p-0 rounded">
        <Image
          src={selfTransfer}
          alt="Self Transfer"
          width={24}
          height={24}
          className="mr-2"
        />
        <div className="text-xs">
          <p className="font-semibold">Self-transfer</p>
          <p className="text-gray-500">You'll need to collect your bags and check in again.</p>
        </div>
      </div>
    </div>
  );
};

export default LayoverInfoComponent;
