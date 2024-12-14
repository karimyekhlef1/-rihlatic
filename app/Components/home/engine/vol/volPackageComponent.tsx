import React, { useEffect, useRef, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { BiSolidPackage } from "react-icons/bi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { setVolPackage } from '@/lib/store/engine/vol_search_slice';

const VolPackageComponent: React.FC = () => {

    const dispatch = useDispatch<any>();

    const volType = useSelector((state: { volSearchSlice: { volType: string } }) => state.volSearchSlice?.volType);

    const [pdata, setPdata] = useState<any>({
        uniquePackage: false,
        refundable: false,
        directFlight: false,
        openReturn: false,
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
    
    const setData = (field: keyof typeof pdata) => {
        setPdata((prev: any) => {
            return { ...prev, [field]: !prev[field] };
        });
        dispatch(setVolPackage(pdata));
    }

    const toggle = () => {
        setShow(!show);
    };

    return (
        <div className="passengers-holder relative z-30">
            <button
                className="passengers-btn rounded-lg p-2 text-sm font-semibold text-gray-700 flex items-center gap-2 hover:bg-blue-50"
                onClick={toggle}
            >
                <BiSolidPackage className='text-sm' />
                <RiArrowDropDownLine className='text-2xl' />
            </button>
            {show && (
                <div
                    className="p-4 bg-white rounded-lg shadow-md absolute top-0 left-0"
                    ref={dropdownRef}
                    style={{ width: "300px" }}
                >
                    {[
                        { field: "uniquePackage", label: "Unique Package", isShown: true },
                        { field: "refundable", label: "Refundable", isShown: true },
                        { field: "directFlight", label: "Direct Flight", isShown: true },
                        { field: "openReturn", label: "Open Return", isShown: volType === 'Return' },
                    ].map(({ field, label, isShown }) => (
                        <>
                            {
                                isShown && (
                                    <div className="flex justify-between gap-2 mt-1" key={field}>
                                        <div className="icon-text-holder flex gap-2">
                                            <div className="flex gap-2">
                                                <input type="checkbox" name="" id={label} checked={pdata[field]} onChange={() => setData(field)} />
                                                <label htmlFor={label} className='text-gray-800 text-sm'>{label}</label>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VolPackageComponent;
