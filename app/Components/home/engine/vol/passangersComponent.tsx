import React, { useEffect, useRef, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { FaUserFriends } from "react-icons/fa";
import { FaChildren } from "react-icons/fa6";
import { FaBaby } from "react-icons/fa";
import { FaBabyCarriage } from "react-icons/fa6";
import { PiStudentBold } from "react-icons/pi";
import { FaUserTie } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { setVolPassanger } from '@/lib/store/engine/vol_search_slice';

const PassengersComponent = () => {

    const dispatch = useDispatch<any>();

    const [pdata, setPdata] = useState<any>({
        adults: 1,
        children: 0,
        infants: 0,
        infantsSeat: 0,
        students: 0,
        thirdAge: 0,
    });

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

    const increment = (field: keyof typeof pdata) => {
        setPdata((prev: any) => {
            if (prev[field] < 9) {
                return { ...prev, [field]: prev[field] + 1 };
            }
            return prev;
        });
        dispatch(setVolPassanger(pdata));
    };

    const decrement = (field: keyof typeof pdata) => {
        setPdata((prev: any) => {
            if (field === "adults" && prev[field] === 1) return prev; // Adults must be at least 1
            if (prev[field] > 0) {
                return { ...prev, [field]: prev[field] - 1 };
            }
            return prev;
        });
        dispatch(setVolPassanger(pdata));
    };

    const toggle = () => {
        setShow(!show);
    };

    return (
        <div className="passengers-holder relative z-40">
            <button
                className="passengers-btn rounded-lg p-2 text-sm font-semibold text-gray-700 flex items-center gap-2 hover:bg-blue-50"
                onClick={toggle}
            >
                <FaUserFriends className="text-sm" />
                <span className="ml-2 text-sm">{pdata.adults + pdata.children + pdata.infants + pdata.infantsSeat + pdata.students + pdata.thirdAge}</span>
                <RiArrowDropDownLine className='text-2xl' />
            </button>
            {show && (
                <div
                    className="p-4 bg-white rounded-lg shadow-md absolute top-0 left-0"
                    ref={dropdownRef}
                    style={{ width: "350px" }}
                >
                    <h2 className="text-sm font-bold mb-4 text-black">Passengers</h2>
                    {[
                        { field: "adults", label: "Adults", subtext: "Ages 11 or above", icon: FaUserFriends },
                        { field: "children", label: "Children", subtext: "Ages 2-11", icon: FaChildren },
                        { field: "infants", label: "Infants", subtext: "Under 2 years", icon: FaBaby },
                        { field: "infantsSeat", label: "Infants with seat", subtext: "Under 2 years", icon: FaBabyCarriage },
                        { field: "students", label: "Students", subtext: "Student travelers", icon: PiStudentBold },
                        { field: "thirdAge", label: "Third Age", subtext: "Senior travelers", icon: FaUserTie },
                    ].map(({ field, label, subtext }) => (
                        <div className="flex justify-between gap-2 mt-1" key={field}>
                            <div className="icon-text-holder flex gap-2">
                                <div className="flex items-center p-2">
                                    {
                                        field === "adults" ? <FaUserFriends style={{ color: "black", fontSize: "25px" }} /> :
                                            field === "children" ? <FaChildren style={{ color: "black", fontSize: "25px" }} /> :
                                                field === "infants" ? <FaBaby style={{ color: "black", fontSize: "25px" }} /> :
                                                    field === "infantsSeat" ? <FaBabyCarriage style={{ color: "black", fontSize: "25px" }} /> :
                                                        field === "students" ? <PiStudentBold style={{ color: "black", fontSize: "25px" }} /> :
                                                            field === "thirdAge" ? <FaUserTie style={{ color: "black", fontSize: "25px" }} /> : null
                                    }
                                </div>
                                <div className="flex flex-col">
                                    <p className="m-0 text-sm text-black">{label}</p>
                                    <p className="m-0 text-sm text-gray-500 w-full">{subtext}</p>
                                </div>
                            </div>
                            <div className="add-delete-btns flex items-center">
                                <button
                                    className={`px-2 py-1 rounded w-7 h-7 ${pdata[field] === (field === "adults" ? 1 : 0) ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-200 text-black"}`}
                                    onClick={() => decrement(field as keyof typeof pdata)}
                                    disabled={pdata[field] === (field === "adults" ? 1 : 0)}
                                >
                                    -
                                </button>
                                <span className="mx-4 text-black w-3">{pdata[field]}</span>
                                <button
                                    className={`px-2 py-1 rounded w-7 h-7 ${pdata[field] === 9 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-200 text-black"}`}
                                    onClick={() => increment(field as keyof typeof pdata)}
                                    disabled={pdata[field] === 9}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PassengersComponent;
