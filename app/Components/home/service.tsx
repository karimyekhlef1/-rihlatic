import { ServiceProps } from '@/app/Types/home/service';
import React from 'react';


const HomeServiceComponent: React.FC<ServiceProps> = (data) => {
    return (
        <div key={data.name} className="flex flex-col items-center">
            <dt className="text-base font-semibold leading-7 text-white">
                <div className="mb-6 flex items-center justify-center">
                    <img src={data.image} alt={data.name} />
                </div>
            </dt>
            <dd className="mt-1 flex flex-auto flex-col items-center text-base leading-">
                <h2 className="text-xl font-semibold leading-8 mb-2">{data.name}</h2>
                <p className="text-gray-500 text-center">{data.description}</p>
            </dd>
        </div>
    );
};

export default HomeServiceComponent;