const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center">
      <span className="text-yellow-400 text-xl">
        {'★'.repeat(fullStars)}
        {hasHalfStar ? '½' : ''}
        {'☆'.repeat(5 - fullStars - (hasHalfStar ? 1 : 0))}
      </span>
    </div>
  );
};

export default StarRating;
