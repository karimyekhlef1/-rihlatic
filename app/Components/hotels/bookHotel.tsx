import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CircleCheck, User } from 'lucide-react';

export default function BookingHotelComponent() {
  return (
    <div>
      <Card className="w-[300px]">
        <CardContent className="px-0 py-8 shadow-xl">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center justify-center pb-4">
              <p className="text-xs">Starting from</p>
              <p className="font-semibold text-lg">19000 DZD</p>
              <div className="flex flex-row">
                <User size={15} className="text-gray-500" />
                <p className="text-xs text-gray-500">01 persone</p>
              </div>
            </div>
            <Separator />
            <div></div>
            <Separator />
            <div className="pt-4">
              <Button className="px-14" variant={'rihlatic'} disabled>
                Book Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
