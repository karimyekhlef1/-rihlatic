"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import StarRatingFilter from "@/app/commonComponents/StarRatingFilter";
import PriceRangeSlider from "@/app/commonComponents/PriceRangeSlider";
interface FilterProps {
  stars: number;
  prices: {
    min: string;
    max: string;
  };
  onFilterChange?: (filters: {
    stars: number | null;
    priceRange: { min: number; max: number };
  }) => void;
}

const FilterComponentHotels: React.FC<FilterProps> = ({
  stars,
  prices,
  onFilterChange
}) => {
  const [selectedStars, setSelectedStars] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState({
    min: Number(prices.min),
    max: Number(prices.max)
  });

  const handleStarChange = (rating: number | null) => {
    setSelectedStars(rating);
    onFilterChange?.({ stars: rating, priceRange });
  };

  const handlePriceChange = (range: { min: number; max: number }) => {
    setPriceRange(range);
    onFilterChange?.({ stars: selectedStars, priceRange: range });
  };

  return (
    <div className="p-4">
      <Accordion type="multiple" className="w-[270px] space-y-2">
        <AccordionItem value="stars">
          <AccordionTrigger className="hover:no-underline">
            Star Rating
          </AccordionTrigger>
          <AccordionContent>
            <StarRatingFilter onChange={handleStarChange} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="hover:no-underline">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <PriceRangeSlider
              min={Number(prices.min)}
              max={Number(prices.max)}
              onChange={handlePriceChange}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FilterComponentHotels;