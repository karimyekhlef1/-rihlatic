import React, { useEffect, useRef, useState } from 'react';
import { FaCity, FaTimes } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { DatePickerHome } from './datePickerHome'; // Make sure to import this component
import { Provider } from 'react-redux';
import { store } from '@/lib/store/store';

interface SearchInputProps {
  dir: string;
  placeholder: string;
  onSearch: (value: string) => void;
}

const SearchInputComponent: React.FC<SearchInputProps> = ({
  placeholder,
  onSearch,
  dir,
}) => {
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
    if (searchValue === '') {
      setIsOpened(!isOpened);
    }
  };

  const [searchValue, setSearchValue] = useState<string>('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const searchClick = (value: string) => {
    setSearchValue(value);
    setIsOpened(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setIsOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (dir === 'Departure') {
    return (
      <Provider store={store}>
        <DatePickerHome />
      </Provider>
    );
  }

  return (
    <div
      className="rounded-lg relative transition-all"
      style={{
        width: '300px',
        transition: 'width 0.2s ease-in-out',
      }}
      ref={wrapperRef}
    >
      <div
        className={`text-field-search flex items-center gap-3 p-2 bg-white rounded-lg relative
                    ${isOpened ? 'border-[#FF8000] border-2 z-10' : 'border border-[#bac7d5]'}`}
        onClick={clickHandler}
        style={{
          width: isOpened ? '350px' : '300px',
          transition: 'width 0.2s ease-in-out',
        }}
      >
        <div className="flex items-center gap-2">
          <label htmlFor="InputField" className="text-[#A7A8AB] text-sm">
            {dir}
          </label>
          {searchValue && (
            <div
              className={`flex items-center gap-3 rounded text-white text-xs p-1 flex-shrink-0 min-w-fit ${dir === 'From' ? 'bg-[#48c299]' : 'bg-[#f9971e]'} `}
            >
              <span>{searchValue}</span>
              <div
                className={`cross ${dir === 'From' ? 'bg-teal-700' : 'bg-amber-700'} roubded p-[2px]`}
                onClick={() => setSearchValue('')}
              >
                <FaTimes />
              </div>
            </div>
          )}
        </div>
        {!searchValue && (
          <input
            type="text"
            className={`text-base text-gray-700 outline-none placeholder:text-[#64656A]`}
            placeholder={placeholder}
            onChange={handleInputChange}
            onClick={clickHandler}
            id="InputField"
          />
        )}
      </div>
      {isOpened && (
        <div
          className="absolute top-[-10px] right-[-60px] left-[-10px] bg-white shadow-xl rounded-md text-gray-900 pt-16"
          style={
            isOpened ? { display: 'block', zIndex: 1 } : { display: 'none' }
          }
        >
          <ul>
            {fakeLit.map((item, index) => (
              <li
                key={index}
                className="hover:bg-slate-100 hover:cursor-pointer"
                onClick={() => searchClick(item.name)}
              >
                <div className="w-full flex justify-between items-center p-3">
                  <div className="flex items-center gap-3">
                    <FaCity />
                    <span className="truncate text-sm">{item.name}</span>
                  </div>
                  <div className="search-add-icon">
                    <FiPlus />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchInputComponent;
