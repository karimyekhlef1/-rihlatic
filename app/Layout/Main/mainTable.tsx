import { Button } from '@/components/ui/button';
import SearchInput from '@/app/Components/profile/search-input';
import FlightsTable from '@/app/Components/profile/flights-table';

export default function MainTable() {
  return (
    <div className="h-full flex-col items-center flex pt-8 pb-20 bg-[#f8f8f8]">
      {/* Buttons */}
      <div className="flex flex-col gap-y-3 md:flex-row gap-x-4">
        <Button className="w-full px-32 md:px-10 h-10" variant={'rihlatic'}>
          Flights
        </Button>
        <Button className="w-full px-32 md:px-10 h-10" variant={'rihlatic2'}>
          Packages
        </Button>
        <Button className="w-full px-32 md:px-10 h-10" variant={'rihlatic2'}>
          Hotels
        </Button>
        <Button className="w-full px-32 md:px-10 h-10" variant={'rihlatic2'}>
          Omra
        </Button>
      </div>

      {/* Search Input */}
      <div className="flex pt-8">
        <SearchInput />
      </div>

      {/* Flights table */}
      <div className="flex pt-8">
        <FlightsTable />
      </div>
    </div>
  );
}
