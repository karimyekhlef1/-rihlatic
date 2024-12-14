import React from 'react';
import SearchInputComponent from '@/app/commonComponents/searchInputComponent';
import DatePickerComponent from '@/app/commonComponents/datePickerComponent';


const OmrasSearchComponent: React.FC = () => {

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-start gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                    <SearchInputComponent
                        placeholder="City, airports or place"
                        onSearch={(value) => console.log(value)}
                        dir="To"
                    />
                    <DatePickerComponent isOnePick={false} />
                    <button
                        type="button"
                        className="rounded bg-[#FF8000] px-8 py-2.5 text-sm font-semibold text-white min-w-20"
                    >
                        Exploire
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OmrasSearchComponent;
