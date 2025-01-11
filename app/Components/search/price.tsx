"use client";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { setSelectedPriceRange } from '@/lib/store/custom/searchSlices/priceSlice';
import { Slider } from "@/components/ui/slider";

export default function Price() {
  const dispatch = useDispatch();
  const { availableRange, selectedRange } = useSelector(
    (state: RootState) => state.price
  );

  const formatPrice = (value: number) => {
    return value.toLocaleString("en-US");
  };

  const handleValueChange = (values: number[]) => {
    if (values.length === 2) {
      dispatch(setSelectedPriceRange({
        min: values[0],
        max: values[1]
      }));
    }
  };

  if (!availableRange.max) {
    return (
      <div className="w-full max-w-sm p-4">
        <p className="text-sm text-gray-500">Loading price range...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm p-4">
      <div className="space-y-1">
        <h3 className="text-xs font-medium text-muted-foreground">
          Select your preferred price
        </h3>
        <p className="text-xm font-semibold">All prices</p>
        <p className="text-sm font-medium pt-4">
          {formatPrice(selectedRange.min)} - {formatPrice(selectedRange.max)}
        </p>
      </div>

      <div className="relative mt-6">
        <Slider
          min={availableRange.min}
          max={availableRange.max}
          step={1}
          value={[selectedRange.min, selectedRange.max]}
          onValueChange={handleValueChange}
          className="py-2"
          minStepsBetweenThumbs={1}
        />
      </div>
    </div>
  );
}
