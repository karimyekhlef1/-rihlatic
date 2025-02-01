"use client"

import React, { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { SliderMaxMin } from "@/components/ui/SliderMaxMin"

 
interface PriceRangeSliderProps {
  min?: number
  max?: number
  onChange: (range: [number, number]) => void
}

 const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  min = 0,
  max = 1000,
  onChange,
}) => {
  const [range, setRange] = useState<[number, number]>([min, max])

  useEffect(()=>{
    setRange([min,max])

  },[max, min])

  useEffect(() => {
    onChange(range)

  }, [range, onChange , max, min])

  const handleSliderChange = (newRange: [number, number]) => {
    setRange(newRange)
  }

  const handleInputChange = (index: 0 | 1, value: string) => {
    const newValue = Number(value)
    if (!isNaN(newValue)) {
      const newRange = [...range] as [number, number]
      newRange[index] = Math.max(min, Math.min(max, newValue))
      setRange(newRange)
    }
  }

  return (
    <div className="space-y-4 m-2">
      <SliderMaxMin
        min={min}
        max={max}
        step={1}
        value={range}
        onValueChange={handleSliderChange}
        className="w-full my-2"
      />
      <div className="flex justify-between items-center">
        <Input
          type="number"
          value={range[0]}
          onChange={(e) => handleInputChange(0, e.target.value)}
          className="w-20 p-1 text-center"
        />
        <span className="mx-2 font-semibold">to</span>
        <Input
          type="number"
          value={range[1]}
          onChange={(e) => handleInputChange(1, e.target.value)}
          className="w-20 p-1 text-center"
        />
      </div>
    </div>
  )
}

export default PriceRangeSlider