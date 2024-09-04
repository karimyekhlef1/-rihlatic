import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MoveRight, CircleArrowRight, Clock } from 'lucide-react';

export default function TripSummaryComponent() {
  return (
    <div className="flex flex-col space-y-4 pb-8">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row justify-center items-center gap-x-1">
          <p className="font-semibold text-sm flex flex-row justify-center items-center gap-x-2">
            Algiers {<MoveRight size={20} />} Paris
          </p>
          <div className="flex flex-row justify-center items-center px-2 gap-x-1">
            <CircleArrowRight
              size={15}
              className="font-semibold text-xs text-[#3279f4]"
              fill="#cddfff"
            />
            <p className="font-semibold text-xs text-blue-400">Direct flight</p>
          </div>
        </div>{' '}
        <div className="flex flex-row justify-center items-center gap-x-1">
          <Clock size={15} color="gray" />
          <p className="text-sm text-gray-500">Duration:</p>
          <p className="text-sm text-black font-semibold">2h 20m</p>
        </div>
      </div>
      <Card className="shadow-md pt-4">
        <CardContent></CardContent>
      </Card>

      <Separator />

      <div className="flex flex-row justify-between">
        <div className="flex flex-row justify-center items-center gap-x-1">
          <p className="font-semibold text-sm flex flex-row justify-center items-center gap-x-2">
            Algiers {<MoveRight size={20} />} Paris
          </p>
          <div className="flex flex-row justify-center items-center px-2 gap-x-1">
            <CircleArrowRight
              size={15}
              className="font-semibold text-xs text-[#3279f4]"
              fill="#cddfff"
            />
            <p className="font-semibold text-xs text-blue-400">Direct flight</p>
          </div>
        </div>{' '}
        <div className="flex flex-row justify-center items-center gap-x-1">
          <Clock size={15} color="gray" />
          <p className="text-sm text-gray-500">Duration:</p>
          <p className="text-sm text-black font-semibold">2h 20m</p>
        </div>
      </div>
      <Card className="shadow-md pt-4">
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
