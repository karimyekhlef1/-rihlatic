import React from 'react';

interface BaggageItemProps {
  type: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const BaggageItem: React.FC<BaggageItemProps> = ({
  type,
  count,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm font-medium">{type}</span>
      <div className="flex items-center">
        <button onClick={onDecrement} className="px-2 py-1">
          -
        </button>
        <span className="px-2">{count}</span>
        <button onClick={onIncrement} className="px-2 py-1">
          +
        </button>
      </div>
    </div>
  );
};

export default BaggageItem;
