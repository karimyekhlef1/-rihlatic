import { Button } from '@/components/ui/button';
import React from 'react';

const BaggageItem: React.FC<BaggageItemProps> = ({
  type,
  count,
  icon,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center">
        {icon}
        <span className="text-xs font-medium">{type}</span>
      </div>
      <div className="flex items-center">
        <Button
          variant="outline"
          size="sm"
          className="h-6 w-6 rounded-full text-xs"
          onClick={onDecrement}
        >
          -
        </Button>
        <span className="mx-2 text-xs">{count}</span>
        <Button
          variant="outline"
          size="sm"
          className="h-6 w-6 rounded-full text-xs"
          onClick={onIncrement}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default BaggageItem;
