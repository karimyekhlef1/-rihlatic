import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import flag from '@/public/images/uk_flag.svg';

export default function LanguageAndCurrency() {
  return (
    <div className="pt-4 px-10">
      <Card className="w-[300px] sm:w-full">
        <CardContent className="flex flex-col">
          <div className="flex">
            <h1 className="font-semibold pt-3 pb-3 justify-start">
              Language and currency
            </h1>
          </div>
          <Separator />
          <div className="flex flex-col pb-4">
            <div className="flex flex-row pt-6 items-center">
              <Image src={flag} alt="flag" width={20} height={20} />
              <h1 className="font-semibold text-nowrap pl-2 pr-16 sm:pr-44">
                English . USD
              </h1>
              <Button variant={'secondary'} className="h-[36px] w-[70px]">
                Edit
              </Button>
            </div>
            <p className="font-medium text-[12px] sm:w-[300px] h-[40px] text-gray-500">
              Choose your preferred communication language and currency in
              the main navigation or here in the Account settings.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
