import React from 'react';
import searchBg from '@/public/images/home/search-bg.jpeg';
import SearchCatBox from './searchCatBox';
import SearchInputComponent from '@/app/commonComponents/searchInputComponent';

const SearchSectionComponent: React.FC = () => {

    const layoutStyle = {
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        width: '100%',
        height: '100%',
    }

    return (
        <div className='bg-slate-800 text-white py-12' style={{backgroundImage: `url(${searchBg.src})`, backgroundSize: 'cover', backgroundPosition: 'center'}}> 
            <div className="layout rounded-xl" style={layoutStyle}></div>
            <div className="container">
                <div className="pt-5">
                    <p className="text-3xl font-extrabold">YOU FLY FOR LESS</p>
                    <p className="text-md">Book cheap flights other sites simply can’t find.</p>
                </div>
                <div className="flex items-center justify-center gap-3 flex-wrap mt-5">
                    {
                        ['Vol', 'Packages', 'Hotels', 'Omras'].map((item, index) => (
                            <SearchCatBox key={index} item={item} />
                        ))
                    }
                </div>
                <div className="main-search-box mt-14 p-5">
                    <div className="flex items-center justify-center">
                        <SearchInputComponent placeholder="Search for flights, hotels, cars, and more" onSearch={(value) => console.log(value)} />
                    </div>
                    <div className="flex items-center gap-2 mt-7">
                        <input id="home-search-checkbox" type="checkbox" value="" className="w-4 h-4 accent-[#FF8000] border-gray-300 rounded focus:ring-orange-500" />
                        <label htmlFor='home-search-checkbox' className="text-md text-gray-400">Check accommodation with <span className='text-black font-bold'>booking.com</span></label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchSectionComponent;