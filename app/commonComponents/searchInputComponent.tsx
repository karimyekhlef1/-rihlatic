import React, { useState } from 'react';
import Select from 'react-dropdown-select';

interface SearchInputProps {
    placeholder: string;
    onSearch: (value: string) => void;
}

const SearchInputComponent: React.FC<SearchInputProps> = ({ placeholder, onSearch }) => {

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // onSearch(value);
        setIsOpened(!isOpened);
    };

    const clickHandler = () => {
        setIsOpened(!isOpened);
    }

    const [isOpened, setIsOpened] = useState<boolean>(false);

    return (
        <div className="border border-gray-400 rounded-lg relative" style={isOpened ? {border: '1px solid #FF8000', width: "400px"} : {border: '1px solid #E5E7EB', width: "300px"}}>
           <div className="text-field-search flex items-center gap-3 p-2 absolute top-0 left-0 right-0 bg-white z-10">
                <label htmlFor="InputField" className='text-[#A7A8AB] text-sm'>From</label>
                <input
                    type="text"
                    className='text-base w-full text-gray-700 outline-none placeholder:text-[#64656A]'
                    placeholder={placeholder}
                    onChange={handleInputChange}
                    onClick={clickHandler}
                    id='InputField'
                />
            </div>
            {
                isOpened && (
                    <div className="absolute top-[-10px] right-[-10px] left-[-10px] p-2 bg-emerald-50 rounded-lg text-gray-900 pt-16 z-0" style={isOpened ? {display: 'block'} : {display: 'none'}}>
                        <ul>
                            <li className='p-3'>
                                <div className="flex">
                                    <span>Lorem, ipsum.</span>    
                                    <span className='ml-auto'>X</span>
                                </div>   
                            </li>
                        </ul>
                    </div>
                )
            }
        </div>
    );
};

export default SearchInputComponent;