import React, { useEffect, useRef, useState } from 'react';
import { FaCity, FaTimes } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { DatePickerHome } from './datePickerHome';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { GetDestinations } from '@/lib/store/api/engine/destinationsSlice';
import { id } from 'date-fns/locale';
import DestinationComponent from '../Components/home/engine/destinationComponent';

interface SearchInputProps {
  dir: string;
  placeholder: string;
  onSearch: (value: string) => void;
  isOnePick?: boolean;
  type: number;
}

const SearchInputComponent: React.FC<SearchInputProps> = ({ placeholder, onSearch, dir, type }) => {

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  const clickHandler = () => {
    if (!isPicked) {
      if (!isOpened) {
        setIsOpened(true);
        getSearchData();
      }
    }
  };
  
  const [searchValue, setSearchValue] = useState<string>('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isPicked, setIsPicked] = useState<boolean>(false);

  const dispatch = useDispatch<any>();
  const { loadingDestinations, destinations } = useSelector((state: RootState) => state.getDestinations);

  const searchClick = (value: string) => {
    setSearchValue(value);
    setIsOpened(false);
    setIsPicked(true);
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

  const getSearchData = async () => {
    try {
      const data = {
        search: searchValue,
        type: type,
      };
      const act = await dispatch(GetDestinations(data));
      console.log(act)
    } catch (e) { 
      console.log(e);
    }
  }

  useEffect(() => {
    getSearchData();
  }, [searchValue]);

  // if (dir === 'Departure') {
  //   return (
  //     <Provider store={store}>
  //       <DatePickerHome />
  //     </Provider>
  //   );
  // }

  return (
    <div
      className="relative transition-all"
      style={{
        width: '300px',
        transition: 'width 0.05s ease-in-out',
      }}
      ref={wrapperRef}
    >
      <div
        className={`text-field-search flex items-center gap-3 p-2 bg-white rounded relative ${isOpened ? 'border-[#FF8000] border-2 z-10' : 'border border-[#bac7d5]'}`}
        onClick={clickHandler}
        style={{
          width: isOpened ? '350px' : '300px',
          transition: 'width 0.05s ease-in-out',
        }}
      >
        <div className="flex items-center gap-2">
          <label htmlFor="InputField" className="text-[#A7A8AB] text-sm">
            {dir}
          </label>
          {(isPicked) && (
            <div
              className={`flex items-center gap-3 rounded text-white text-xs p-1 flex-shrink-0 min-w-fit ${dir === 'From' ? 'bg-[#48c299]' : 'bg-[#f9971e]'} `}
            >
              <span>{searchValue}</span>
              <div
                className={`cross ${dir === 'From' ? 'bg-teal-700' : 'bg-amber-700'} roubded p-[2px]`}
                onClick={() => {setSearchValue(''); setIsPicked(false); }}
              >
                <FaTimes />
              </div>
            </div>
          )}
        </div>
        {!isPicked && (
          <input
            type="text"
            className={`text-base text-gray-700 outline-none placeholder:text-[#64656A]`}
            placeholder={placeholder}
            onChange={handleInputChange}
            id="InputField"
          />
        )}
      </div>
      {isOpened && (
        loadingDestinations ? (
          <div className="absolute top-[-10px] right-[-60px] left-[-10px] bg-white shadow-xl rounded-md text-gray-900 pt-16">
            <ul>
              <li>
                <div className="w-full flex justify-between items-center p-3">
                  <div className="flex items-center gap-3">
                    <FaCity />
                    <span className="truncate text-sm">Loading...</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        ) : (<div
          className="absolute top-[-10px] right-[-60px] left-[-10px] bg-white shadow-xl rounded-md text-gray-900 pt-16"
          style={
            isOpened ? { display: 'block', zIndex: 1 } : { display: 'none' }
          }
        >
          <ul>
            {destinations?.map((item: any, index: number) => (
              <DestinationComponent key={index} item={item} searchClick={searchClick} setIsPicked={setIsPicked} type={type} />
              // <li
              //   key={index}
              //   className="hover:bg-slate-100 hover:cursor-pointer"
              //   onClick={() => { searchClick(item.name); setIsPicked(true) }}
              // >
              //   <div className="w-full flex justify-between items-center p-3">
              //     <div className="flex items-center gap-3">
              //       <FaCity />
              //       <span className="truncate text-sm">{item.name}</span>
              //     </div>
              //     <div className="search-add-icon">
              //       <FiPlus />
              //     </div>
              //   </div>
              // </li>
            ))}
          </ul>
        </div>)
      )}
    </div>
  );
};

export default SearchInputComponent;
