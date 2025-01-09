import React from 'react';
import SearchInputComponent from '@/app/commonComponents/searchInputComponent';
import DatePickerComponent from '@/app/commonComponents/datePickerComponent';
import SearchSelectComponent from '../../searchSelectComponent';
import { packageEngineTypes, setDateRange } from '@/lib/store/engine/package_search_slice';
import { DateRange } from 'react-day-picker';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigateHelper } from '@/app/hooks/useNavigateHelper';
const PackagesSearchComponent: React.FC = () => {
    const dateRange = useSelector((state: { packageSearchSlice: { dateRange: DateRange } }) => state.packageSearchSlice?.dateRange);
    const dispatch = useDispatch<any>();
    const { handleClickExplore } = useNavigateHelper();

    return (
        <div className="flex flex-col gap-2">
             <div className="flex gap-3">
                <SearchSelectComponent data={packageEngineTypes} setSelected={() => {}} />
            </div>
            <div className="flex justify-start gap-2 flex-wrap">
                <div className="flex items-center flex-wrap gap-2">
                    <SearchInputComponent
                        placeholder="City, airports or place"
                        onSearch={(value) => console.log("value++++====>",value)}
                        dir="To"
                        type={2}
                    />
                    <DatePickerComponent isOnePick={false} dateRange={dateRange} setDateRange={(value: DateRange) => dispatch(setDateRange(value))} />
                    <button
                        type="button"
                        className="rounded bg-[#FF8000] px-2 py-2.5 text-sm font-semibold text-white w-full sm:w-24"
                        onClick={()=>handleClickExplore("packages")

                        }
                    >
                        Exploire
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PackagesSearchComponent;
