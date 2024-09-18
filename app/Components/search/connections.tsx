import { Checkbox } from '@/components/ui/checkbox';

export default function Connections() {
  return (
    <div className="flex flex-col space-y-2">
      <CheckboxItem
        id="self-transfer"
        label="Self-transfer to diffrent station/airport"
      />
      <CheckboxItem
        id="return-from-diffrent-station"
        label="Allow return from a diffrent station/airport"
      />
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
