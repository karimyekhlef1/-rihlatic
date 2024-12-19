import Image from "next/image";
import StarRating from "@/app/commonComponents/starRating";

export default function OmraHotelsComponent({ data }: any) {
  console.log("HotelsComponent", data);

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
          {/* <p className="text-sm text-gray-600">Location</p> */}
          {/* hard coded for the moment until we get the real data */}
          <p className="text-xs text-wrap w-1/2 text-gray-500">
            Dist, 6699 Hamzah Bin Abdulmuttaleb, Ajyad, Makkah 24231, Saudi
            Arabia
          </p>
        </div>
      </div>

      <div className="text-center">
        <p className="font-semibold text-gray-600">{data.type_meals}</p>
        <p className="text-sm text-gray-600">Dates</p>
      </div>

      {/* <StarRating rating={Number(data.rate)} /> */}
      {/* hard coded for the moment until we get the real data */}
      <StarRating rating={4} />
    </div>
  );
}
