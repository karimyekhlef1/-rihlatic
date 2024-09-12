import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function Stops() {
  return (
    <RadioGroup defaultValue="any" className="space-y-2">
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="any"
          id="r1"
          className="border-blue-500 border-2 text-blue-500 focus:ring-blue-500"
        />
        <Label htmlFor="r1">Any</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="direct"
          id="r2"
          className="border-blue-500 border-2 text-blue-500 focus:ring-blue-500"
        />
        <Label htmlFor="r2">Direct</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="up-to-1-stop"
          id="r3"
          className="border-blue-500 border-2 text-blue-500 focus:ring-blue-500"
        />
        <Label htmlFor="r3">Up to 1 stop</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="up-to-2-stops"
          id="r4"
          className="border-blue-500 border-2 text-blue-500 focus:ring-blue-500"
        />
        <Label htmlFor="r4">Up to 2 stops</Label>
      </div>
    </RadioGroup>
  );
}
