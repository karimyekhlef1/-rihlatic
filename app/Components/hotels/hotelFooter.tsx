import footer from '@/public/images/footer_image.png';
import appStore from '@/public/images/appStore.png';
import playStore from '@/public/images/playStore.png';
import Image from 'next/image';
import { CircleCheck } from 'lucide-react';

export default function HotelFooter() {
  return (
    <div className="flex flex-col md:flex-row px-8 md:px-16 max-w-[350px] sm:max-w-[600px] md:max-w-[768px] lg:max-w-[1500px]">
      {/* Left column for content */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">
          Get more out of Rihlatik.com with our mobile app
        </h2>
        <p className="mb-6">
          Download the <span className="text-orange-500">Rihlatik</span> mobile
          app for one-touch access to your next travel adventure. With the{' '}
          <span className="text-orange-500">Rihlatik</span> mobile app you’ll
          get access to hidden features and special offers.
        </p>

        <div className="hidden md:flex mb-6">
          <ul className="w-1/2 pr-4">
            <li className="mb-2 text-gray-500">
              <div className="flex flex-row items-center">
                <CircleCheck
                  size={20}
                  className="font-semibold text-xs text-[#5eda7f] mr-2"
                  fill="#bff0cc"
                />
                Download boarding passes
              </div>
            </li>
            <li className="mb-2 text-gray-500">
              <div className="flex flex-row items-center">
                <CircleCheck
                  size={20}
                  className="font-semibold text-xs text-[#5eda7f] mr-2"
                  fill="#bff0cc"
                />
                Get exclusive offers and prices
              </div>
            </li>
          </ul>
          <ul className="w-1/2 pl-4">
            <li className="mb-2 text-gray-500">
              <div className="flex flex-row items-center">
                <CircleCheck
                  size={20}
                  className="font-semibold text-xs text-[#5eda7f] mr-2"
                  fill="#bff0cc"
                />
                One click bookings
              </div>
            </li>
            <li className="mb-2 text-gray-500">
              <div className="flex flex-row items-center">
                <CircleCheck
                  size={20}
                  className="font-semibold text-xs text-[#5eda7f] mr-2"
                  fill="#bff0cc"
                />
                Trip notifications
              </div>
            </li>
          </ul>
        </div>

        <div className="flex">
          <Image
            unoptimized
            src={appStore}
            alt="Download on the App Store"
            className="w-32 h-10 md:w-40 md:h-12 lg:w-48 lg:h-14 object-contain"
          />
          <Image
            unoptimized
            src={playStore}
            alt="Get it on Google Play"
            className="w-32 h-10 md:w-40 md:h-12 lg:w-48 lg:h-14 object-contain"
          />
        </div>
      </div>

      {/* Right column for image */}
      <div className="flex-1 md:hidden lg:block">
        <Image
          src={footer}
          alt="Hotel"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
