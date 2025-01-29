import React from 'react';

const PackageCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-lg shadow-md my-3 mx-auto w-full animate-pulse">
      {/* Image placeholder */}
      <div className="image">
        <div className="h-48 sm:h-52 md:h-60 w-full bg-gray-200 rounded-t-2xl"></div>
      </div>
      {/* Info placeholder */}
      <div className="info p-3 sm:p-4">
        {/* Location placeholder */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-3">
          <div className="h-3 w-3 bg-gray-200 rounded-full"></div>
          <div className="h-4 w-20 bg-gray-200 rounded-full"></div>
        </div>
        {/* Tags placeholder */}
        <div className="flex gap-2 flex-wrap mb-3">
          <div className="h-5 w-16 bg-gray-200 rounded-md"></div>
          <div className="h-5 w-20 bg-gray-200 rounded-md"></div>
          <div className="h-5 w-12 bg-gray-200 rounded-md"></div>
        </div>
        {/* Name placeholder */}
        <div className="h-6 w-3/4 bg-gray-200 rounded-full mb-3"></div>
        {/* Pricing placeholder */}
        <div className="h-5 w-1/2 bg-gray-200 rounded-full mb-3"></div>
        {/* Button placeholder */}
        <div className="h-10 w-full bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  );
};

export default PackageCardSkeleton;
