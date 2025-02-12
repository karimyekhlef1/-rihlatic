import SearchInput from '@/app/Components/profile/search-input';
import HotelReservationTabel from '@/app/Components/profile/HotelReservationTabel';
export default function page() {
  return (
    <div className="h-full flex-col items-center flex pt-8 pb-20 bg-[#f8f8f8]">

      <div className="flex pt-8">
        <SearchInput />
      </div>
      <div className="flex pt-8">
        <HotelReservationTabel/>
    
      </div>
    </div>
  );
}
