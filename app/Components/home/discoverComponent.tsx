import { DiscoverProps } from '@/app/Types/home/discover';
import React from 'react';

const DiscoverComponent: React.FC<DiscoverProps> = ({ image, name, establishment }) => {
    
    const boxStyle = {
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat", 
        backgroundSize: "cover",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        height: '300px', 
        width: "100%", 
        objectFit: "cover",
    }

    const layoutStyle = {
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        width: '100%',
        height: '100%',
    }

    return (
        <div className="flex flex-col rounded-2xl relative" style={boxStyle}>
            <div className="layout rounded-xl w-1/1 h-1/1" style={layoutStyle}></div>
            <dd className="mt-1 flex flex-col absolute left-5 bottom-5">
                <h2 className="text-white text-lg font-semibold m-0">{name}</h2>
                <p className="text-white text-sm">{establishment} establishments</p>
            </dd>
        </div>
    );
};


export default DiscoverComponent;