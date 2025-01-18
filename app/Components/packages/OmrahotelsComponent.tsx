import Image from "next/image";
import StarRating from "@/app/commonComponents/starRating";

export default function OmraHotelsComponent({ data }: any) {
  console.log("HotelsComponent", data);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return dateString.split(" ")[0];
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-0  sm:flex-row justify-between items-center w-full">
      <div className="flex items-center space-x-4">
        <Image
          src={data.galleries[0].url}
          alt="Hotel"
          className="w-16 h-16 object-cover rounded-2xl"
          width={100}
          height={100}
        />
        <div>
          <h3 className="font-semibold">{data.name}</h3>
          <p className="text-xs text-wrap w-1/2 text-gray-500">
            {data.address || "Address not available"}
          </p>
        </div>
      </div>

      <div className="text-center">
        <p className="font-semibold text-gray-600">{data.type_meals}</p>
        <div className="text-xs text-gray-600">
          <p>Check-in: {formatDate(data.check_in)}</p>
          <p>Check-out: {formatDate(data.check_out)}</p>
        </div>
      </div>

      <StarRating rating={Number(data.rate) || 4} />
    </div>
  );
}
