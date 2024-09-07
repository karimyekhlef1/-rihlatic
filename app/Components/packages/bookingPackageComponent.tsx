import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CircleCheck } from 'lucide-react';

export default function BookingPackageComponent() {
  return (
    <div>
      <Card className="w-[300px]">
        <CardContent className="px-0 py-8 shadow-xl">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center justify-center pb-4">
              <p className="text-xs">Starting from</p>
              <p className="font-semibold text-lg">149000 DZD</p>
            </div>
            <Separator />
            <div className="flex flex-col pt-4 pb-[100px]">
              <div className="flex flex-row items-center">
                <CircleCheck
                  size={15}
                  className="font-semibold text-xs text-[#43acff]"
                  fill="#b4deff"
                />
                <p className="text-sm font-semibold pl-2">8 nights / 9 days</p>
              </div>
              <div className="flex flex-row items-center mt-2">
                <CircleCheck
                  size={15}
                  className="font-semibold text-xs text-[#ff8000]"
                  fill="#ffcc99"
                />
                <p className="text-sm font-semibold pl-2">12-August-2024</p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2 pb-4">
              <Button className="px-8" variant={'rihlatic'}>
                Kind of room
              </Button>
              <Button className="px-8" variant={'rihlatic'}>
                Select a departure
              </Button>
            </div>
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
