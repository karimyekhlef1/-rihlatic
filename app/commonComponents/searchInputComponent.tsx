import React from 'react';

interface SearchInputProps {
    placeholder: string;
    onSearch: (value: string) => void;
}

const SearchInputComponent: React.FC<SearchInputProps> = ({ placeholder, onSearch }) => {

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        onSearch(value);
    };

    return (
        <div className="border border-gray-400 rounded-lg">
            <input
                type="text"
                className='bg-transparent w-full p-2'
                placeholder={placeholder}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default SearchInputComponent;