import React from 'react';
import searchBg from '@/public/images/home/search-bg.jpeg';
import SearchCatBox from './searchCatBox';
import SearchInputComponent from '@/app/commonComponents/searchInputComponent';
import SearchSelectComponent from './searchSelectComponent';
import { PiBagSimpleFill } from "react-icons/pi";
import { GiGymBag } from "react-icons/gi";


const SearchSectionComponent: React.FC = () => {

    return (
        <div className='bg-slate-800 text-white py-12' style={{backgroundImage: `url(${searchBg.src})`, backgroundSize: 'cover', backgroundPosition: 'center'}}> 
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
                    <div className='flex flex-col gap-2'>
                        <div className="flex flex-wrap gap-3">
                            <SearchSelectComponent data={['Return', 'One Way']} />
                            <SearchSelectComponent data={['Economy', 'Premium Economy', 'Business', 'First Class']} />
                            <div className="relative">
                                <button className='text-black bg-transparent px-4 py-2'>
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1 items-center">
                                            <PiBagSimpleFill />
                                            <span className='font-semibold'>0</span>
                                        </div>
                                        <div className="flex gap-1 items-center">
                                            <GiGymBag />
                                            <span className='font-semibold'>0</span>
                                        </div>

                                    </div>
                                </button>
                                <div className="bg-gray-400 p-2 absolute w-56">
                                    <div className="item">
                                        <span>Lorem, ipsum dolor.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-start gap-1 flex-wrap">
                            <div className="flex items-center gap-1">
                                <SearchInputComponent placeholder="City, airports or place" onSearch={(value) => console.log(value)} dir='From' />
                                <SearchInputComponent placeholder="City, airports or place" onSearch={(value) => console.log(value)} dir='To' />
                                <SearchInputComponent placeholder="Anytime" onSearch={(value) => console.log(value)} dir='Departure' />
                                <SearchInputComponent placeholder="Anytime" onSearch={(value) => console.log(value)} dir='Return' />
                            </div>
                            <button type="button" className="rounded-md bg-[#FF8000] px-2 py-2.5 text-sm font-semibold text-white">Exploire</button>
                        </div>
                        <div className="flex items-center gap-2 mt-7">
                            <input id="home-search-checkbox" type="checkbox" value="" className="w-4 h-4 accent-[#FF8000] border-gray-300 rounded focus:ring-orange-500" />
                            <label htmlFor='home-search-checkbox' className="text-md text-gray-400">Check accommodation with <span className='text-black font-bold'>booking.com</span></label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchSectionComponent;