import Image from 'next/image';

import SearchInput from '@/components/Main/search-input';
import { Button } from '@/components/ui/button';
import Notrips from '@/public/images/notrips.svg';
import TipsCard from '@/components/Main/tips-card';

export default function MainPage() {
  return (
    <div className="h-full flex-col items-center flex pt-8 pb-20 bg-[#f8f8f8]">
      {/* Buttons */}
      <div className="flex flex-row gap-x-4">
        <Button className="w-full px-10 h-10" variant={'rihlatic'}>
          Flights
        </Button>
        <Button className="w-full px-10 h-10" variant={'rihlatic2'}>
          Packages
        </Button>
        <Button className="w-full px-10 h-10" variant={'rihlatic2'}>
          Hotels
        </Button>
        <Button className="w-full px-10 h-10" variant={'rihlatic2'}>
          Omra
        </Button>
      </div>

      {/* Search Input */}
      <div className="flex pt-8">
        <SearchInput />
      </div>

      {/* Hero section */}
      <div className="flex pt-14">
        <Image height={185} width={108} alt="no trips found" src={Notrips} />
        <div className="flex items-start pl-10 flex-col">
          <p className="text-[14px] font-bold">
            You don’t have any upcoming trips
          </p>
          <p className="text-[14px] pt-2 font-semibold text-gray-500">
            Book your next trip and it will appear here.
          </p>
        </div>
      </div>

      {/* Tips Card */}
      <div className="flex pt-14">
        <TipsCard />
      </div>
    </div>
  );
}
