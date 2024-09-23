import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import rhtlk from '@/public/images/rhtlk.png';

export default function AdComponent() {
  return (
    <div>
      <Card className="w-[300px] rounded-xl">
        <CardContent className="p-0">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl text-center font-bold pb-2 pt-8 px-4">
              A Travel guide in your pocket
            </h1>
            <p className="text-gray-500 box-content font-normal text-center w-full pt-4 text-xl md:w-[250px] md:pt-4 md:text-sm">
              Get the Rihlatik app for one touche access to your next travel
              adventure.
            </p>
            <Image height={500} width={300} src={rhtlk} alt="Rihlatik" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
