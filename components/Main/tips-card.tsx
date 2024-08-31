import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';
import mockup from '@/public/images/rhtlk.png';
import codeQR from '@/public/images/code_qr.svg';

export default function TipsCard() {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold pb-2 pl-8 sm:pl-8">
        Smart travel tips
      </h1>
      <div className="md: px-6">
        <Card>
          <CardContent className="p-0">
            <div className="flex flex-col-reverse md:flex-row">
              <div className="flex-shrink-0">
                <Image src={mockup} alt="RHTLK" width={300} height={300} />
              </div>
              <div className="flex flex-col mt-4 md:mt-0 md:ml-4">
                <p className="box-content font-bold text-center w-full pt-4 text-xl md:w-[450px] md:pt-10 md:text-3xl">
                  Travel smarter. Get our app for exclusive features to navigate
                  the world like a pro.
                </p>
                <Link href={'#'}>
                  <p className="text-lg text-center md:text-xl text-[#FF8000] font-bold pt-6 md:pt-14">
                    Learn more...
                  </p>
                </Link>
              </div>
              <div className="hidden lg:flex flex-col items-center mt-4 md:mt-0 md:ml-4 flex-shrink-0">
                <Image
                  className="mt-4 md:mt-12"
                  src={codeQR}
                  alt="QR Code"
                  height={150}
                  width={150}
                />
                <p className="font-semibold mt-2 md:mx-12 md:my-0">
                  Scan and try our app
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
