import Image from 'next/image';

import image1 from '@/public/images/packages/image_1.jpg';
import StarRating from '@/app/commonComponents/starRating';

export default function HotelsComponent({data}:any) {
  console.log("HotelsComponent",data)

  return (
    <div className="flex flex-col gap-3 sm:gap-0  sm:flex-row justify-between items-center w-full">
      <div className="flex items-center space-x-4">
        <Image
          src={image1}
          alt="Hotel"
          className="w-16 h-16 object-cover rounded-2xl"
        />
        <div>
          <h3 className="font-semibold">{data.name}</h3>
          <p className="text-sm text-gray-600">Location</p>
        </div>
      </div>

      <div className="text-center">
        <p className="font-semibold text-gray-600">{data.type_meals}</p>
        <p className="text-sm text-gray-600">Dates</p>
      </div>

      <StarRating rating={Number(data.rate)} />
    </div>
  );
}
