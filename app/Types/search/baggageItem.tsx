interface BaggageItemProps {
  type: string;
  count: number;
  icon?: React.ReactNode;
  onIncrement: () => void;
  onDecrement: () => void;
}
