"use client";

import React ,{useCallback, useState} from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import StarRatingFilter from "@/app/commonComponents/StarRatingFilter";
import PriceRangeSlider from "@/app/commonComponents/PriceRangeSlider";
import { useSelector ,useDispatch } from "react-redux";
import { setFilterRating ,setFilterRangePrice} from "@/lib/store/custom/hotelSlices/HotelStateSlice";
export default function FilterComponentHotels() {
  const dispatch = useDispatch<any>();
  const { maxMinRangePrice } = useSelector((state: any) => state.hotelState);
  
  const handleStarChange = (value:number) => {
    dispatch(setFilterRating(value))
  };

  const handlePriceChange = useCallback(
    (range: [number, number]) => {
      const [min, max] = range;
      
      dispatch(setFilterRangePrice({ min, max }));
    },
    [dispatch]
  );
  return (
    <div className="p-4">
      <Accordion
        type="multiple"
        className="w-[270px] space-y-2"
        defaultValue={["stars", "price"]}
      >
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
              min={maxMinRangePrice.min}
              max={maxMinRangePrice.max}
              onChange={handlePriceChange}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}