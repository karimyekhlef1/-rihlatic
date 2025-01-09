import { Checkbox } from "@/components/ui/checkbox";

export default function Hours() {
  const departureTimes = [
    "11:50",
    "12:30",
    "13:20",
    "14:15",
    "14:40",
    "14:45",
    "16:25",
    "17:50",
    "18:30",
    "19:15",
    "21:30",
    "23:55",
  ];

  const returnTimes = [
    "06:10",
    "07:15",
    "07:40",
    "08:00",
    "08:05",
    "09:55",
    "10:35",
    "11:15",
    "11:45",
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-xm font-medium text-muted-foreground">
          Select your preferred departure time
        </h3>
        <div className="space-y-2">
          {departureTimes.map((time) => (
            <div key={time} className="flex items-center space-x-2">
              <Checkbox id={`departure-${time}`} defaultChecked />
              <label
                htmlFor={`departure-${time}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {time}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xm font-medium text-muted-foreground">
          Select your preferred return time
        </h3>
        <div className="space-y-2">
          {returnTimes.map((time) => (
            <div key={time} className="flex items-center space-x-2">
              <Checkbox id={`return-${time}`} defaultChecked />
              <label
                htmlFor={`return-${time}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {time}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
