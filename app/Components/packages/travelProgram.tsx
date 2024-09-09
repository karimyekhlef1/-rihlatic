import Image from 'next/image';

import image1 from '@/public/images/packages/image_1.jpg';
import image2 from '@/public/images/packages/image_2.jpg';
import image3 from '@/public/images/packages/image_3.jpg';

export default function TravelProgram() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 [&:hover>div]:w-full sm:[&:hover>div]:w-40 [&>div:hover]:w-full sm:[&>div:hover]:w-[30rem]">
        {[1, 2, 3, 4, 5, 6].map((day, index) => (
          <div
            key={day}
            className="group relative shadow-sm shadow-black/30 h-64 sm:h-96 w-full sm:w-40 hover:w-full sm:hover:w-[30rem] cursor-pointer rounded-xl overflow-hidden transition-all duration-200"
          >
            <Image
              className="h-full w-full object-cover group-hover:scale-150 transition-all"
              src={[image1, image2, image3][index % 3]}
              alt={`Day ${day} image`}
            />
            <div className="invisible absolute inset-0 bg-gradient-to-b from-orange-500/20 to-black group-hover:visible">
              <div className="absolute inset-x-5 bottom-4">
                <div className="flex gap-3 text-white">
                  <p>Day {day}</p>
                </div>
                <div>
                  <p className="font-semibold text-lg text-gray-100">
                    Libre tour in Istanbul (explore the city on your own).
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
