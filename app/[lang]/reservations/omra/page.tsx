import SearchInput from '@/app/Components/profile/search-input';
import FlightsTable from '@/app/Components/profile/flights-table';
export default function page() {
  return (
    <div className="h-full flex-col items-center flex pt-8 pb-20 bg-[#f8f8f8]">

      <div className="flex pt-8">
        <SearchInput />
      </div>
      <div className="flex pt-8">
        <FlightsTable/>
      </div>
    </div>
  );
}
