import { Checkbox } from '@/components/ui/checkbox';
import TooltipComponent from './tooltip';

export default function BookingOptions() {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <CheckboxItem id="show-only" label="Show only Rihlatic.com results" />
        <TooltipComponent content="You'll only see results that are bookable on Rihlatic.com" />
      </div>
    </div>
  );
}

function CheckboxItem({ id, label }: { id: string; label: string }) {
  return (
    <div className="flex items-center space-x-2 py-1">
      <Checkbox id={id} />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}
