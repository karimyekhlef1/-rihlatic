import React from 'react';

const AccommodationComponent: React.FC = () => {
    return (
        <div className="flex items-center gap-2 mt-7">
          <input
            id="home-search-checkbox"
            type="checkbox"
            value=""
            className="w-4 h-4 accent-[#FF8000] border-gray-300 rounded focus:ring-orange-500"
          />
          <label
            htmlFor="home-search-checkbox"
            className="text-md text-gray-400"
          >
            Check accommodation with{' '}
            <span className="text-black font-bold">booking.com</span>
          </label>
        </div>
    );
};

export default AccommodationComponent;