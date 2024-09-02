import React from 'react';

interface SearchCatBoxProps {
    item: string;
}

const SearchCatBox: React.FC<SearchCatBoxProps> = ({ item }) => {
    return (
        <div className={`rounded-2xl flex items-center justify-center font-semibold border-2 ${item === "Vol" ? 'border-[#FF8000] text-[#FF8000]' : 'border-[white] text-gray-400 font-thin'} home-search-category-box`}>
            <span>{item}</span>
        </div>
    );
};

export default SearchCatBox;