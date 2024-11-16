import React from 'react';
import Image from 'next/image';
import airlogo1 from '@/public/images/air_alg.png';
import airlogo2 from '@/public/images/air_fr.png';

const FlightInfos: React.FC = () => {
  return (
    <div className="pb-4 relative">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-gray-400">
          Thu 26 Sep • Outbound
        </span>
      </div>
      <div className="flex justify-between items-center">
        <div className="relative z-10 pr-2 bg-white">
          <div className="text-lg font-semibold">ALG</div>
          <div className="text-base">12:25</div>
        </div>
        <div className="text-center relative z-10 bg-white">
          <div className="flex items-center space-x-1">
            <div className="bg-gray-100 rounded-full px-2 py-1 text-xs text-black font-medium">
              2 stops
            </div>
            <div className="flex -space-x-2">
              <Image
                src={airlogo2}
                alt="Air France"
                width={18}
                height={18}
                className="relative z-10"
              />
              <Image
                src={airlogo1}
                alt="Air Algerie"
                width={18}
                height={18}
                className="relative z-20"
              />
            </div>
          </div>
          <div className="text-[10px] font-semibold text-muted-foreground mt-1">
            9h 20m
          </div>
        </div>
        <div className="relative z-10 pl-2 bg-white">
          <div className="text-lg font-semibold">MME</div>
          <div className="text-base">21:55</div>
        </div>
      </div>
      <div
        className="absolute left-0 right-0 h-px bg-gray-200"
        style={{ top: 'calc(50% - 8px)' }}
      ></div>
    </div>
  );
};

export default FlightInfos;
