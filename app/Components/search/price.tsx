"use client";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export default function Price() {
  const [priceRange, setPriceRange] = useState([53780, 189806]);

  const formatPrice = (value: number) => {
    return value.toLocaleString("en-US");
  };

  const handleValueChange = (values: number[]) => {
    if (values.length === 2) {
      setPriceRange(values);
    }
  };
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-xs font-medium text-muted-foreground">
          Select your preferred price
        </h3>
        <p className="text-xm font-semibold">All prices</p>
        <p className="text-sm font-medium pt-4">
          {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
        </p>
      </div>

      <div className="relative">
        <Slider
          min={53780}
          max={189806}
          step={1}
          value={priceRange}
          onValueChange={handleValueChange}
          className="py-2"
          minStepsBetweenThumbs={1}
        />
      </div>
    </div>
  );
}
