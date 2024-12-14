import React from 'react';

interface SearchCatBoxProps {
    item: string;
    index: number;
    selected: number;
    setSelected: (index: number) => void;
}

const SearchCatBox: React.FC<SearchCatBoxProps> = ({ item, index, selected, setSelected }) => {
    return (
        <div className={`rounded-2xl cursor-pointer transition-colors flex items-center justify-center font-semibold border-2 ${selected === index ? 'border-[#FF8000] text-[#FF8000]' : 'border-[white] text-gray-500 font-normal'} home-search-category-box`}
            onClick={() => setSelected(index)}
        >
            <span>{item}</span>
        </div>
    );
};

export default SearchCatBox;