import React from 'react';

const SmallHotelCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-lg shadow-md my-3 mx-auto w-full animate-pulse">
      {/* Image placeholder */}
      <div className="relative h-48 sm:h-52 md:h-60 w-full bg-gray-200 rounded-t-2xl"></div>

{/* Content placeholder */}
<div className="p-3 sm:p-4">
  {/* Name placeholder */}
  <div className="h-6 bg-gray-200 rounded-full w-3/4 mb-4"></div>

  {/* Address placeholder */}
  <div className="h-4 bg-gray-200 rounded-full w-full mb-2"></div>
  <div className="h-4 bg-gray-200 rounded-full w-2/3 mb-4"></div>

  {/* Pricing placeholder */}
  <div className="h-5 bg-gray-200 rounded-full w-1/2 mb-4"></div>

  {/* Reviews placeholder */}
  <div className="h-4 bg-gray-200 rounded-full w-1/3 mb-4"></div>

  {/* Button placeholder */}
  <div className="flex justify-center">
    <div className="h-10 bg-gray-200 rounded-xl w-full"></div>
  </div>
</div>
    </div>
  );
};

export default SmallHotelCardSkeleton;
