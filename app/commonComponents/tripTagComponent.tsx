import React from 'react';
import { IoIosInformationCircle } from 'react-icons/io';

interface TagProps {
    text: string;
    icon?: React.ReactElement;
    background?: string;
    textColor?: string;
    iconColor?: string;
}

const TripTagComponent: React.FC<TagProps> = ({ text, background, textColor, iconColor, icon }) => {
    return (
        <div className='flex items-center gap-2'
            style={{
                backgroundColor: background || 'blue',
                padding: '2px 10px',
                borderRadius: '10px',
                color: textColor || 'white',
                fontSize: '11px',
                border: '1px solid' + (textColor || 'white')
            }}
        >
            <div className="flex items-center gap-1">
                {icon}
                <span>{text}</span>
            </div>
            <IoIosInformationCircle color={iconColor || 'white'} />
        </div>
    );
};

export default TripTagComponent;