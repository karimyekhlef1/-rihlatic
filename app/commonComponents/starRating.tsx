import { FaStar, FaStarHalf } from 'react-icons/fa';

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <span key={index} className="text-yellow-400">
          {index < fullStars ? (
            <FaStar />
          ) : index === fullStars && hasHalfStar ? (
            <FaStarHalf />
          ) : (
            <FaStar className="text-gray-300" />
          )}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
