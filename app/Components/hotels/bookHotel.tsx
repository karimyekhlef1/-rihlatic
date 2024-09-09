import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CircleCheck, User } from 'lucide-react';
import {
  incrementAdults,
  decrementAdults,
  incrementChildren,
  decrementChildren,
} from '@/lib/store/hotelSlices/bookingSlice';
import { RootState } from '@/lib/store/store';

export default function BookingHotelComponent() {
  const dispatch = useDispatch();
  const { adults, children } = useSelector((state: RootState) => state.booking);

  return (
    <div>
      <Card className="w-[300px] rounded-3xl">
        <CardContent className="px-0 py-8">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center justify-center pb-4">
              <p className="text-xs">Starting from</p>
              <p className="font-semibold text-lg">19000 DZD</p>
              <div className="flex flex-row">
                <User size={15} className="text-gray-500" />
                <p className="text-xs text-gray-500">
                  {adults + children}{' '}
                  {adults + children === 1 ? 'person' : 'persons'}
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col w-full px-4 py-4">
              <div className="text-sm font-semibold mb-2 text-gray-500">
                ROOM 1
              </div>
              <div className="flex flex-row justify-between items-center mb-2">
                <span className="text-sm">Adult</span>
                <div className="flex items-center border border-gray-300 rounded-xl p-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 rounded-full"
                    onClick={() => dispatch(decrementAdults())}
                  >
                    -
                  </Button>
                  <span className="mx-2 text-sm">{adults}</span>
                  <Button
                    variant="unactive"
                    size="sm"
                    className="h-8 w-8 rounded-full"
                    onClick={() => dispatch(incrementAdults())}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <span className="text-sm">Children</span>
                <div className="flex items-center border border-gray-300 rounded-xl p-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 rounded-full"
                    onClick={() => dispatch(decrementChildren())}
                  >
                    -
                  </Button>
                  <span className="mx-2 text-sm">{children}</span>
                  <Button
                    variant="unactive"
                    size="sm"
                    className="h-8 w-8 rounded-full"
                    onClick={() => dispatch(incrementChildren())}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-2 pt-4 pb-4">
              <Button className="px-14" variant={'unactive'}>
                Add room
              </Button>
            </div>
            <Separator />
            <div className="flex flex-col items-center gap-y-2 pt-4">
              <p className="text-xs text-gray-500">8 nuits / 9 jours</p>
              <Button variant={'unactive'}>12-août-2024/20-août-2024</Button>
              <Button size={'sm'} variant={'active'} disabled>
                Book Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
