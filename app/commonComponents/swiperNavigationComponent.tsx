import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface SwiperNavigationProps {
    onNext: () => void;
    onPrev: () => void;
}

const buttonStyle = {
    width: '40px',
    height: '40px',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
};

const SwiperNavigation: React.FC<SwiperNavigationProps> = ({ onNext, onPrev }) => {
    return (
        <div className='swiper-navigation-btns flex items-center gap-3'>
            <button className='flex justify-center items-center' style={buttonStyle} onClick={onPrev}><FaChevronLeft /></button>
            <button className='active flex justify-center items-center' style={buttonStyle} onClick={onNext}><FaChevronRight /></button>
        </div>
    );
};

export default SwiperNavigation;