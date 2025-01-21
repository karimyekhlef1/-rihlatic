import React, { useState } from "react";
import { Users, Baby, GraduationCap, UserCog, Blocks } from "lucide-react";
import { useDispatch } from "react-redux";
import { setVolPassanger } from "@/lib/store/engine/vol_search_slice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const PassengersComponent = () => {
  const dispatch = useDispatch<any>();

  const [pdata, setPdata] = useState<any>({
    adults: 1,
    children: 0,
    infants: 0,
    infantsSeat: 0,
    students: 0,
    thirdAge: 0,
  });

  const updatePassengers = (field: keyof typeof pdata, increment: boolean) => {
    setPdata((prev: any) => {
      let newValue = increment ? prev[field] + 1 : prev[field] - 1;

      // Validation rules
      if (field === "adults" && newValue < 1) return prev; // Adults must be at least 1
      if (newValue < 0 || newValue > 9) return prev; // General bounds

      const newData = { ...prev, [field]: newValue };
      dispatch(setVolPassanger(newData));
      return newData;
    });
  };

  const totalPassengers = (Object.values(pdata) as number[]).reduce(
    (a, b) => a + b,
    0
  );

  const passengerTypes = [
    {
      field: "adults",
      label: "Adults",
      subtext: "Ages 11 or above",
      Icon: Users,
    },
    {
      field: "children",
      label: "Children",
      subtext: "Ages 2-11",
      Icon: Blocks,
    },
    {
      field: "infants",
      label: "Infants",
      subtext: "Under 2 years",
      Icon: Baby,
    },
    {
      field: "infantsSeat",
      label: "Infants with seat",
      subtext: "Under 2 years",
      Icon: Baby,
    },
    {
      field: "students",
      label: "Students",
      subtext: "Student travelers",
      Icon: GraduationCap,
    },
    {
      field: "thirdAge",
      label: "Third Age",
      subtext: "Senior travelers",
      Icon: UserCog,
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "w-[200px] h-9 justify-start text-xs bg-white border-gray-200 text-black",
            totalPassengers > 1 && "border-[#FF8000] bg-orange-50"
          )}
        >
          <div className="flex items-center gap-2">
            <Users className="h-3.5 w-3.5 text-gray-500" />
            <span className="text-xs">{totalPassengers}</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-3" align="start">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" />
            <h4 className="font-medium text-xs">Passengers</h4>
          </div>
          <Separator className="my-2" />
          <div className="space-y-4">
            {passengerTypes.map(({ field, label, subtext, Icon }) => (
              <div key={field} className="flex items-center justify-between">
                <div className="flex gap-3 items-center">
                  <Icon className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-xs font-medium">{label}</p>
                    <p className="text-xs text-gray-500">{subtext}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      "h-7 w-7",
                      pdata[field] === (field === "adults" ? 1 : 0) &&
                        "opacity-50 cursor-not-allowed"
                    )}
                    onClick={() => updatePassengers(field, false)}
                    disabled={pdata[field] === (field === "adults" ? 1 : 0)}
                  >
                    <span className="text-xs">-</span>
                  </Button>
                  <span className="w-4 text-center text-xs">
                    {pdata[field]}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      "h-7 w-7",
                      pdata[field] === 9 && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={() => updatePassengers(field, true)}
                    disabled={pdata[field] === 9}
                  >
                    <span className="text-xs">+</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PassengersComponent;
