import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import Image from 'next/image';
import mockup from '@/public/images/rhtlk.png';
import codeQR from '@/public/images/code_qr.svg';
import Link from 'next/link';

export default function TipsCard() {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold pb-2 flex start-1 ">
        Smart travel tips
      </h1>
      <div>
        <Card>
          <CardContent className="p-0">
            <div className="flex flex-row">
              <div className="overflow-hidden">
                <Image src={mockup} alt="RHTLK" width={300} height={300} />
              </div>
              <div className="flex flex-col">
                <p className="box-content w-[450px] pt-10 text-3xl font-bold">
                  Travel smarter. Get our app for exclusive features to navigate
                  the world like a pro.
                </p>
                <Link href={'#'}>
                  <p className="text-xl text-[#FF8000] font-bold pt-14">
                    {' '}
                    Learn more...
                  </p>
                </Link>
              </div>
              <div className="flex flex-col">
                <Image
                  className="mx-12 mt-12"
                  src={codeQR}
                  alt="QR Code"
                  height={150}
                  width={150}
                />
                <p className="font-semibold mx-12 my-0">Scan and try our app</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
