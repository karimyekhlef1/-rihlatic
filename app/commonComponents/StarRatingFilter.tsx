import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StarRatingFilterProps {
  onChange: (rating: number | null) => void;
}

const StarRatingFilter = ({ onChange }: StarRatingFilterProps) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const ratings = [5, 4, 3, 2, 1];

  const handleRatingClick = (rating: number) => {
    const newRating = selectedRating === rating ? null : rating;
    setSelectedRating(newRating);
    onChange(newRating);
  };

  return (
    <div className="w-full max-w-sm">
      {ratings.map((rating) => {
        const filledStars = rating;
        const emptyStars = 5 - rating;
        const isSelected = selectedRating === rating;

        return (
          <Button
            key={rating}
            variant="ghost"
            className={cn(
              "w-full justify-between hover:bg-gray-100",
              isSelected && "bg-orange-100 hover:bg-orange-50"
            )}
            onClick={() => handleRatingClick(rating)}
            aria-label={`Filter by ${rating} stars`}
          >
            <div className="flex gap-1">
              {/* Render filled stars */}
              {Array.from({ length: filledStars }).map((_, i) => (
                <FaStar key={`filled-${i}`} className="text-yellow-400" size={16} />
              ))}
              {/* Render empty stars */}
              {Array.from({ length: emptyStars }).map((_, i) => (
                <FaStar key={`empty-${i}`} className="text-gray-200" size={16} />
              ))}
            </div>
           
          </Button>
        );
      })}
    </div>
  );
};

export default StarRatingFilter;
