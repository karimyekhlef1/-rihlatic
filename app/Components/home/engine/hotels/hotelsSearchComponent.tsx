import React from 'react';
import SearchInputComponent from '@/app/commonComponents/searchInputComponent';
import DatePickerComponent from '@/app/commonComponents/datePickerComponent';
import HotelRoomsComponent from './roomsComponent';
import { setDateRange } from '@/lib/store/engine/hotel_search_slice';
import { useDispatch, useSelector } from 'react-redux';
import { DateRange } from 'react-day-picker';
import { useNavigateHelper } from '@/app/hooks/useNavigateHelper';
import { setSelectedDestination , setSelectedDestinationName } from '@/lib/store/engine/hotel_search_slice';
interface HotelsSearchComponentProps {
    onSearch: () => Promise<void>; // Define the onSearch prop type
  }
  
const HotelsSearchComponent: React.FC<HotelsSearchComponentProps> = ({ onSearch }) => {

    const dispatch = useDispatch<any>();
    const dateRange = useSelector((state: { hotelSearchSlice: { dateRange: DateRange } }) => state.hotelSearchSlice?.dateRange);
    const { handleClickExplore } = useNavigateHelper({onSearch});
    const selectedDestinationName = useSelector((state: any) => state.hotelSearchSlice.selectedDestinationName);
    const handleSelectionDestination = (item: any) => {
    dispatch(setSelectedDestinationName(item.name));
    dispatch(setSelectedDestination(item));
    };
    return (
        <div className="flex flex-col gap-2 ">
            <div className="flex justify-start gap-2 flex-wrap">
                <div className="flex flex-col md:flex-row gap-2 w-full">
                    <SearchInputComponent
                        placeholder="City, airports or place"
                        onSearch={handleSelectionDestination}
                        dir="To"
                        type={3}
                        selected={selectedDestinationName}
                    />
                    <DatePickerComponent isOnePick={false} dateRange={dateRange} setDateRange={(value: DateRange) => dispatch(setDateRange(value))} />
                    <HotelRoomsComponent />
                    <button
                        type="button"
                        className="rounded bg-[#FF8000] text-white px-7 h-9 text-sm font-semibold w-full md:w-36"
                        onClick={()=>handleClickExplore("hotels")}
                    >
                        Explore
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HotelsSearchComponent;
