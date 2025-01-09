import React from 'react';
import SearchInputComponent from '@/app/commonComponents/searchInputComponent';
import DatePickerComponent from '@/app/commonComponents/datePickerComponent';
import HotelRoomsComponent from './roomsComponent';
import { setDateRange } from '@/lib/store/engine/hotel_search_slice';
import { useDispatch, useSelector } from 'react-redux';
import { DateRange } from 'react-day-picker';
import { useNavigateHelper } from '@/app/hooks/useNavigateHelper';

const HotelsSearchComponent: React.FC = () => {

    const dispatch = useDispatch<any>();
    const dateRange = useSelector((state: { hotelSearchSlice: { dateRange: DateRange } }) => state.hotelSearchSlice?.dateRange);
    const { handleClickExplore } = useNavigateHelper();

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-start gap-2 flex-wrap">
                <div className="flex items-center flex-wrap gap-2">
                    <SearchInputComponent
                        placeholder="City, airports or place"
                        onSearch={(value) => console.log(value)}
                        dir="To"
                        type={3}
                    />
                    {/* <DatePickerComponent isOnePick={false} /> */}
                    <DatePickerComponent isOnePick={false} dateRange={dateRange} setDateRange={(value: DateRange) => dispatch(setDateRange(value))} />

                    <HotelRoomsComponent />
                    <button
                        type="button"
                        className="rounded bg-[#FF8000] py-2.5 text-sm font-semibold text-white w-full sm:w-24"
                        onClick={()=>handleClickExplore("hotels")


                        }
               
               >
                        Exploire
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HotelsSearchComponent;
