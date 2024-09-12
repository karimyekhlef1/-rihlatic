import { Checkbox } from '@/components/ui/checkbox';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { FaInfoCircle } from 'react-icons/fa';

export default function BookingOptions() {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <CheckboxItem id="show-only" label="Show only Rihlatic.com results" />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <FaInfoCircle size={14} />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                You&apos;ll only see results that are bookable on Rihlatic.com
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
