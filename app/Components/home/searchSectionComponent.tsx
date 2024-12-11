import React, { useState } from 'react';
import searchBg from '@/public/images/home/search-bg.jpeg';
import SearchCatBox from './searchCatBox';
import VolSearchComponent from './engine/vol/volSearchComponent';
import AccommodationComponent from './engine/accommodationComponent';

const SearchSectionComponent: React.FC = () => {

  const[selected, setSelected] = useState<number>(0);

  const searchClick = (value: number) => {
    switch (value) {
      case 0:
        return <VolSearchComponent />;
      case 1:
        return <AccommodationComponent />;
      case 2:
        return <VolSearchComponent />;
      case 3:
        return <VolSearchComponent />;
      default:
        return <VolSearchComponent />;
    }
  }

  return (
    <div
      className="bg-slate-800 text-white py-12"
      style={{
        backgroundImage: `url(${searchBg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container">
        <div className="pt-5">
          <p className="text-3xl font-extrabold">YOU FLY FOR LESS</p>
          <p className="text-md">
            Book cheap flights other sites simply can’t find.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 flex-wrap mt-5">
          {['Vol', 'Packages', 'Hotels', 'Omras'].map((item: string, index: number) => (
            <SearchCatBox key={index} item={item} selected={selected} index={index} setSelected={setSelected} />
          ))}
        </div>
        <div className="main-search-box mt-14 p-5">
          {
            searchClick(selected)
          }
          <AccommodationComponent />
        </div>
        
      </div>
    </div>
  );
};

export default SearchSectionComponent;
