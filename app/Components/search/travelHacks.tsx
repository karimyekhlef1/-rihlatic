import { Checkbox } from '@/components/ui/checkbox';
import TooltipComponent from './tooltip';

export default function TravelHacks() {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <CheckboxItem id="self-transfer" label="Self-transfer" />
          <TooltipComponent content="Get more flight options by connecting independent routes." />
        </div>
        <div className="flex items-center space-x-2">
          <CheckboxItem id="tw-ticket" label="Throwaway ticketing" />
          <TooltipComponent content="Pay less for a round trip ticket instead of getting a one-way fare." />
        </div>
        <div className="flex items-center space-x-2">
          <CheckboxItem id="hidden-cities" label="Hidden cities" />
          <TooltipComponent content="Avoid expensive popular routes by using the layover as your final stop." />
        </div>
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
        className="text-xs font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}
