import Image from 'next/image';

import image1 from '@/public/images/packages/image_1.jpg';
import image2 from '@/public/images/packages/image_2.jpg';
import image3 from '@/public/images/packages/image_3.jpg';

export default function TravelProgram() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex gap-x-2 [&:hover>div]:w-16 [&>div:hover]:w-[30rem]">
        <div className="group relative h-96 w-[30rem] hover:w-[30rem] cursor-pointer rounded-3xl overflow-hidden transition-all duration-200">
          <Image
            className="h-full object-cover group-hover:scale-150 transition-all"
            src={image1}
            alt=""
          />
          <div className="invisible absolute inset-0 bg-gradient-to-b from-orange-500/20 to-black group-hover:visible">
            <div className="absolute inset-x-5 bottom-4">
              <div className="flex gap-3 text-white">
                <p>Day 1</p>
              </div>
              <div>
                <p className="font-semibold text-xl text-gray-100">
                  Libre toor on istanbul ( alone , you can have a toor walk and
                  explore the city).
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="group relative shadow-sm shadow-black/30 h-96 w-16 hover:w-[30rem] cursor-pointer rounded-3xl overflow-hidden transition-all duration-200">
          <Image
            className="h-full object-cover group-hover:scale-150 transition-all"
            src={image2}
            alt=""
          />
          <div className="invisible absolute inset-0 bg-gradient-to-b from-orange-500/20 to-black group-hover:visible">
            <div className="absolute inset-x-5 bottom-4">
              <div className="flex gap-3 text-white">
                <p>Day 2</p>
              </div>
              <div>
                <p className="font-semibold text-xl text-gray-100">
                  Libre toor on istanbul ( alone , you can have a toor walk and
                  explore the city).
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="group relative shadow-sm shadow-black/30 h-96 w-16 hover:w-[30rem] cursor-pointer rounded-3xl overflow-hidden transition-all duration-200">
          <Image
            className="h-full object-cover group-hover:scale-150 transition-all"
            src={image3}
            alt=""
          />
          <div className="invisible absolute inset-0 bg-gradient-to-b from-orange-500/20 to-black group-hover:visible">
            <div className="absolute inset-x-5 bottom-4">
              <div className="flex gap-3 text-white">
                <p>Day 3</p>
              </div>
              <div>
                <p className="font-semibold text-xl text-gray-100">
                  Libre toor on istanbul ( alone , you can have a toor walk and
                  explore the city).
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="group relative shadow-sm shadow-black/30 h-96 w-16 hover:w-[30rem] cursor-pointer rounded-3xl overflow-hidden transition-all duration-200">
          <Image
            className="h-full object-cover group-hover:scale-150 transition-all"
            src={image1}
            alt=""
          />
          <div className="invisible absolute inset-0 bg-gradient-to-b from-orange-500/20 to-black group-hover:visible">
            <div className="absolute inset-x-5 bottom-4">
              <div className="flex gap-3 text-white">
                <p>Day 4</p>
              </div>
              <div>
                <p className="font-semibold text-xl text-gray-100">
                  Libre toor on istanbul ( alone , you can have a toor walk and
                  explore the city).
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="group relative shadow-sm shadow-black/30 h-96 w-16 hover:w-[30rem] cursor-pointer rounded-3xl overflow-hidden transition-all duration-200">
          <Image
            className="h-full object-cover group-hover:scale-150 transition-all"
            src={image2}
            alt=""
          />
          <div className="invisible absolute inset-0 bg-gradient-to-b from-orange-500/20 to-black group-hover:visible">
            <div className="absolute inset-x-5 bottom-4">
              <div className="flex gap-3 text-white">
                <p>Day 5</p>
              </div>
              <div>
                <p className="font-semibold text-xl text-gray-100">
                  Libre toor on istanbul ( alone , you can have a toor walk and
                  explore the city).
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="group relative shadow-sm shadow-black/30 h-96 w-16 hover:w-[30rem] cursor-pointer rounded-3xl overflow-hidden transition-all duration-200">
          <Image
            className="h-full object-cover group-hover:scale-150 transition-all"
            src={image3}
            alt=""
          />
          <div className="invisible absolute inset-0 bg-gradient-to-b from-orange-500/20 to-black group-hover:visible">
            <div className="absolute inset-x-5 bottom-4">
              <div className="flex gap-3 text-white">
                <p>Day 6</p>
              </div>
              <div>
                <p className="font-semibold text-xl text-gray-100">
                  Libre toor on istanbul ( alone , you can have a toor walk and
                  explore the city).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
