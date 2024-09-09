import React, { useState } from 'react';
import { FaCity, FaTimes } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';

interface SearchInputProps {
    placeholder: string;
    onSearch: (value: string) => void;
}

const SearchInputComponent: React.FC<SearchInputProps> = ({ placeholder, onSearch }) => {

    const fakeLit = [
        {
            id: 1,
            name: 'Constantine Algeria',
        },
        {
            id: 2,
            name: 'Algiers Algeria',
        },
        {
            id: 3,
            name: 'Oran Algeria',
        },
        {
            id: 4,
            name: 'Annaba Algeria',
        },
        {
            id: 5,
            name: 'Batna Algeria',
        },
    ];

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // onSearch(value);
        setIsOpened(!isOpened);
    };

    const clickHandler = () => {
        setIsOpened(!isOpened);
    }

    const [searchValue, setSearchValue] = useState<string>('');

    const [isOpened, setIsOpened] = useState<boolean>(false);

    const searchClick = (value: string) => {
        setSearchValue(value);
        setIsOpened(false);
    }

    return (
        <div className="rounded-lg relative"
            style={{
                width: isOpened ? '400px' : '300px',
                right: 0,
                bottom: 0,
                position: 'relative',
                transition: 'width 0.2s ease-in-out',
            }}
        >
           <div className={`text-field-search flex items-center gap-3 p-2 absolute top-0 left-0 bg-white z-10 rounded-lg ${isOpened ? 'border-[#FF8000] border-2' : 'border'}`}
                onClick={clickHandler}
                style={{
                    width: isOpened ? 'calc(100% - 1.2rem)' : '100%',
                    transition: 'width 0.2s ease-in-out',
                }}
           >
                <div className="flex items-center gap-2">
                    <label htmlFor="InputField" className='text-[#A7A8AB] text-sm'>From</label>
                    {
                        searchValue && (
                            <div className="flex items-center gap-3 rounded text-white text-xs p-1 flex-shrink-0 min-w-fit bg-[#48c299]">
                                <span>{searchValue}</span>
                                <div className="cross bg-teal-500 roubded p-[2px]" onClick={() => setSearchValue('')}>
                                    <FaTimes />
                                </div>
                            </div>
                        )
                    }
                </div>
                {
                    (!searchValue) && (
                        <input
                            type="text"
                            className={`text-base text-gray-700 outline-none placeholder:text-[#64656A] w-full`}
                            placeholder={placeholder}
                            onChange={handleInputChange}
                            onClick={clickHandler}
                            id='InputField'
                        />
                    )
                }
            </div>
            {
                isOpened && (
                    <div className="absolute w-full top-[-10px] right-[-10px] left-[-10px] bg-white shadow-xl rounded-lg text-gray-900 pt-16 z-0" style={isOpened ? {display: 'block'} : {display: 'none'}}>
                        <ul>
                            {
                                fakeLit.map((item, index) => (
                                    <li key={index} className='hover:bg-slate-100 hover:cursor-pointer' onClick={() => searchClick(item.name)}>
                                        <div className="w-full flex justify-between items-center p-3">
                                            <div className="flex items-center gap-3">
                                                <FaCity />
                                                <span className='truncate text-sm'>{item.name}</span>
                                            </div>
                                            <div className="search-add-icon">
                                                <FiPlus />
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    );
};

export default SearchInputComponent;