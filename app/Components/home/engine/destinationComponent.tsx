import React from 'react';
import { FaCity } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';

interface DestinationComponentProps {
    item: any;
    type: number;
    searchClick: (value: any) => void;
    setIsPicked: (value: boolean) => void;
}

const DestinationComponent: React.FC<DestinationComponentProps> = ({ item, searchClick, setIsPicked, type }) => {
    const handleClick = () => {
        console.log('DestinationComponent - Selected item:', item);
        searchClick(item);
        setIsPicked(true);
    };

    return (
        <li
            className="hover:bg-slate-100 hover:cursor-pointer"
            onClick={handleClick}
        >
            <div className="w-full flex justify-between items-center p-3">
                <div className="flex items-center gap-3">
                    <FaCity />
                    {type === 1 && (
                        <div className="flex flex-col">
                            <span className="truncate fw-bold">{item.city}</span>
                            <span className="block text-ellipsis truncate text-xs text-gray-500">{item.name}</span>
                        </div>
                    )}
                    {type === 2 && (
                        <span className="text-gray-500">{item.name}</span>
                    )}
                    {type === 3 && (
                        <span className="text-gray-500">{item.name}</span>
                    )}
                    {type === 4 && (
                        <span className="text-gray-500">{item.destinations[0].name}</span>
                    )}
                </div>
                <div className="search-add-icon">
                    <FiPlus />
                </div>
            </div>
        </li>
    );
};

export default DestinationComponent;