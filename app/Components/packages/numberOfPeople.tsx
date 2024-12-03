import React from "react";
import { Button } from "@/components/ui/button";
import { FiMinus, FiPlus } from "react-icons/fi";

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
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        {icon && <span>{icon}</span>}
        <span className="text-gray-700">{label}</span>
      </div>

      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={onDecrement}
          disabled={value == min}
        >
          <FiMinus />
        </Button>
        <span className="px-4">{value}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onIncrement}
          disabled={value >= max}
        >
          <FiPlus />
        </Button>
      </div>
    </div>
  );
};

export default NumberOfPeople;
