import Image from "next/image";
import noResultsImage from "@/public/images/no_results.png";

const NoFlightsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="relative w-64 h-64 mb-6">
        <Image
          src={noResultsImage}
          alt="No flights found"
          fill
          className="object-contain"
          priority
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        No flights found
      </h3>
      <p className="text-xs text-gray-500 text-center max-w-md">
        There are currently no flights for your selected filters, try searching
        again later
      </p>
    </div>
  );
};

export default NoFlightsFound;
