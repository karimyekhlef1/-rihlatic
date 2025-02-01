import React from "react";
import { Button } from "@/components/ui/button";

import { Users, Minus, Plus, UserRound ,Hotel} from "lucide-react";

type NumberOfPeopleProps = {
  label: string;
  icon?: React.ReactNode;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  max?: number;
  min?: number;
};

const NumberOfPeople: React.FC<NumberOfPeopleProps> = ({
  label,
  icon,
  value,
  onIncrement,
  onDecrement,
  max = 2,
  min = 0,
}) => {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
    <div className="flex items-center space-x-3">
      {icon}
      <span className="text-gray-700">{label}</span>
    </div>
 



    <div className="flex items-center space-x-2">
      <Button
                 variant="outline" 
                 size="sm" 
                 onClick={onDecrement} 
                 disabled={value == min}
                 className="w-8 h-8 p-0 hover:border-orange-500"
         
                >
                  <Minus className="h-3 w-3 " />
                </Button>
      <span className="text-lg font-semibold w-8 text-center">{value}</span>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onIncrement} 
        disabled={value == max}
        className="w-8 h-8 p-0 hover:border-orange-500"
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  </div>
  );
};

export default NumberOfPeople;
