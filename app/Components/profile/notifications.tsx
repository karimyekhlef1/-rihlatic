import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

export default function Notifications() {
  return (
    <div className="pt-4 px-10">
      <Card className="w-[300px] sm:w-full">
        <CardContent className="flex flex-col">
          <div className="flex">
            <h1 className="font-semibold pt-3 pb-3 justify-start">
              Notifications
            </h1>
          </div>
          <Separator />
          <div className="flex flex-row pt-6 items-center justify-center">
            <p className="flex items-center font-medium text-[12px] w-[300px] h-[40px] text-gray-500">
              Status of notification preferences
            </p>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
