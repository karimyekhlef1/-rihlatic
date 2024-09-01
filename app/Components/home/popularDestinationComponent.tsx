import React from 'react';
import image4 from '@/public/images/home/four.jpeg';
import { FaChevronRight } from 'react-icons/fa';

const PopularDestinationComponent: React.FC = () => {
    const boxStyle = {
        backgroundImage: `url(${image4.src})`,
        backgroundRepeat: "no-repeat", 
        backgroundSize: "cover",
        height: '325px', 
        width: "100%", 
        objectFit: "cover",
    }

    const dropFilter = {
        backdropFilter: 'blur(8.6px)',
        background: 'rgba(255, 255, 255, 0.4)',
    }

    return (
        <div className="flex flex-col rounded-2xl relative p-5" style={boxStyle}>
            <dd className="mt-1 flex justify-between items-center absolute bottom-5 right-5 left-5 p-3 rounded-xl text-black" style={dropFilter}>
                <div className="left">
                    <h2 className="text-lg font-semibold m-0">London</h2>
                    <p className="text-md">Ticket from <b>200$</b></p>
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