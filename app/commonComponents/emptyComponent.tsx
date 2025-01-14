import React from 'react';
import emptyImage from '@/public/images/empty.png';
import Image from 'next/image';


const EmptyComponent = ({message}: {message: string}) => {
    return (
        <div className="flex flex-col justify-center items-center h-96">
            <Image src={emptyImage} alt="Empty" className="w-1/3 sm:w-1/5" />
            <h5 className="text-xl text-gray-600">{message}</h5>
        </div>
    );
};

export default EmptyComponent;