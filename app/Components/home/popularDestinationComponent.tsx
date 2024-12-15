import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

interface DestinationData {
    name: string;
    image: string;
    price: number;
}

const PopularDestinationComponent = ({ data }: { data: DestinationData }) => {
    const boxStyle = (image: string) => ({
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", // Proper styling for the background
        height: '325px',
        width: "100%", // Removed `objectFit` as it's not applicable
    });

    const dropFilter = {
        backdropFilter: 'blur(8.6px)',
        background: 'rgba(255, 255, 255, 0.4)',
    };

    return (
        <div className="flex flex-col rounded-2xl relative p-5" style={boxStyle(data?.image)}>
            <dd className="mt-1 flex justify-between items-center absolute bottom-5 right-5 left-5 p-3 rounded-xl text-black" style={dropFilter}>
                <div className="left">
                    <h2 className="text-lg font-semibold m-0">{data?.name}</h2>
                    <p className="text-md">Ticket from <b>{data?.price}$</b></p>
                </div>
                <div className="right">
                    <button>
                        <FaChevronRight />
                    </button>
                </div>
            </dd>
        </div>
    );
};

export default PopularDestinationComponent;
