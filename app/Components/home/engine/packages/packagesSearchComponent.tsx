import React from 'react';
import SearchInputComponent from '@/app/commonComponents/searchInputComponent';
import DatePickerComponent from '@/app/commonComponents/datePickerComponent';
import SearchSelectComponent from '../../searchSelectComponent';
import { packageEngineTypes } from '@/lib/store/engine/package_search_slice';


const PackagesSearchComponent: React.FC = () => {

    const dateRange: any = {
        startDate: new Date(),
        endDate: new Date(),
    };

    return (
        <div className="flex flex-col gap-2">
             <div className="flex gap-3">
                <SearchSelectComponent data={packageEngineTypes} setSelected={() => {}} />
            </div>
            <div className="flex justify-start gap-2 flex-wrap">
                <div className="flex items-center flex-wrap gap-2">
                    <SearchInputComponent
                        placeholder="City, airports or place"
                        onSearch={(value) => console.log(value)}
                        dir="To"
                        type={2}
                    />
                    <DatePickerComponent isOnePick={false} dateRange={dateRange} />
                    <button
                        type="button"
                        className="rounded bg-[#FF8000] px-2 py-2.5 text-sm font-semibold text-white w-full sm:w-24"
                    >
                        Exploire
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PackagesSearchComponent;
