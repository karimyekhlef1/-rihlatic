import React from 'react';
import { LuHotel } from 'react-icons/lu';
import { MdCardTravel, MdFlightTakeoff } from 'react-icons/md';
import { PiAirplaneInFlightDuotone, PiCubeBold } from "react-icons/pi";

interface SearchCatBoxProps {
    icon: number;
    item: string;
    index: number;
    selected: number;
    setSelected: (index: number) => void;
}

function getIcon(icon: number) {
    switch (icon) {
        case 0:
            return <PiAirplaneInFlightDuotone className='text-md' />;
        case 1:
            return <MdCardTravel className='text-md' />;
        case 2:
            return <LuHotel className='text-md' />;
        case 3:
            return <PiCubeBold className='text-md' />;
        default:
            return <MdFlightTakeoff className='text-md' />;
    }
}

const SearchCatBox: React.FC<SearchCatBoxProps> = ({ icon, item, index, selected, setSelected }) => {
    return (
        <div className={`rounded-lg cursor-pointer flex gap-2 items-center justify-center font-semibold border-2 px-5 ${selected === index ? 'border-[#FF8000] text-[#FF8000]' : 'border-[white] text-gray-500 font-normal'} home-search-category-box`}
            onClick={() => setSelected(index)}
        >
            {getIcon(icon)}
            <span>{item}</span>
        </div>
    );
};

export default SearchCatBox;