import React, { useEffect, useRef, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { FaUserFriends } from "react-icons/fa";
import { FaChildren } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { setVolPassanger } from '@/lib/store/engine/vol_search_slice';

const HotelRoomsComponent = () => {

    const dispatch = useDispatch<any>();

    const [pdata, setPdata] = useState<any>([
        { adults: 1, children: 0 }
    ]);

    const [show, setShow] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShow(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const calculatePeople = () => {
        return pdata.reduce((total: number, room: any) => total + room.adults + room.children, 0);
    };

    const addRoom = () => {
        setPdata((prev: any) => [...prev, { adults: 1, children: 0 }]);
    };

    const removeRoom = () => {
        if (pdata.length > 1) {
            setPdata((prev: any) => prev.slice(0, -1));
        }
    };

    const updateRoom = (index: number, field: 'adults' | 'children', increment: boolean) => {
        setPdata((prev: any) => {
            const updatedRooms = [...prev];
            const updatedRoom = { ...updatedRooms[index] };
    
            if (increment) {
                updatedRoom[field]++;
            } else if (updatedRoom[field] > 0 && (field !== 'adults' || updatedRoom[field] > 1)) {
                updatedRoom[field]--;
            }
    
            updatedRooms[index] = updatedRoom;
    
            return updatedRooms;
        });
    
        dispatch(setVolPassanger(pdata));
    };
    

    const toggleDropdown = () => setShow(!show);

    return (
        <div className="passengers-holder relative z-40">
            <button
                className="passengers-btn rounded-lg p-2 text-sm font-semibold text-gray-700 flex items-center gap-2 hover:bg-blue-50"
                onClick={toggleDropdown}
            >
                <FaUserFriends className="text-sm" />
                <span className="ml-2 text-sm">{pdata.length + " Rooms"}, {calculatePeople() + " Guests"}</span>
                <RiArrowDropDownLine className='text-2xl' />
            </button>

            {show && (
                <div
                    className="p-4 bg-white rounded-lg shadow-md absolute top-0 left-0"
                    ref={dropdownRef}
                    style={{ width: "350px" }}
                >
                    {pdata.map((room: any, index: number) => (
                        <div key={index} className="flex flex-col gap-4 mb-4">
                            <h2 className="text-sm font-bold text-black">Room {index + 1}</h2>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-black">Adults</p>
                                    <p className="text-xs text-gray-500">Ages 11 or above</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        className={`px-2 py-1 rounded w-7 h-7 bg-gray-300 text-gray-500 hover:bg-gray-200`}
                                        onClick={() => updateRoom(index, 'adults', false)}
                                    >-</button>
                                    <span className='d-block text-center w-3 text-black'>{room.adults}</span>
                                    <button
                                        className={`px-2 py-1 rounded w-7 h-7 bg-gray-300 text-gray-500 hover:bg-gray-200`}
                                        onClick={() => updateRoom(index, 'adults', true)}
                                    >+</button>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-black">Children</p>
                                    <p className="text-xs text-gray-500">Ages under 11</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        className={`px-2 py-1 rounded w-7 h-7 bg-gray-300 text-gray-500 hover:bg-gray-200`}
                                        onClick={() => updateRoom(index, 'children', false)}
                                    >-</button>
                                    <span className='d-block text-center w-3 text-black'>{room.children}</span>
                                    <button
                                        className={`px-2 py-1 rounded w-7 h-7 bg-gray-300 text-gray-500 hover:bg-gray-200`}
                                        onClick={() => updateRoom(index, 'children', true)}
                                    >+</button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-between mt-4">
                        <button
                            className="px-4 py-1 bg-[#FF8000] text-white rounded"
                            onClick={addRoom}
                        >
                            <span className='fs-6'>+</span>
                        </button>
                        <button
                            className="px-4 py-2 bg-[#555] text-white rounded"
                            onClick={removeRoom}
                            disabled={pdata.length === 1}
                        >
                            <span className='fs-6'>-</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HotelRoomsComponent;
