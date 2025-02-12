import StarRating from "./starRating";
import { MapPin } from "lucide-react";

const PageTitleComponent: React.FC<PageTitleProps> = ({
  title,
  rating,
  adress,
}: any) => {
  return (
    <div className="flex flex-col pb-3">
      <div className="flex flex-row items-center">
        <h2 className="textarabic text-xl text-wrap font-bold text-orange-500">
          {title}
        </h2>
        <div className="pl-2">{rating && <StarRating rating={rating} />}</div>
      </div>
      {adress && (
        <div className="flex flex-row items-center">
          <div>
            <MapPin size={17} fill="gray" color="#ffffff" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold">{adress}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageTitleComponent;
