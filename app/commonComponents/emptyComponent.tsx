import React from 'react';
import emptyImage from '@/public/images/no_results.png';
import Image from 'next/image';


const EmptyComponent = ({message}: {message: string}) => {
    return (
        <div className="flex flex-col justify-center items-center h-96">
            <Image src={emptyImage} alt="Empty" className="w-1/3 sm:w-1/5" />
            <div className="text-2xl text-gray-600 font-medium mt-2  ">{message}</div>
        </div>
    );
};

export default EmptyComponent;