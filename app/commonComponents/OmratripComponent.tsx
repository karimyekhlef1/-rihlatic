import Image from "next/image";
import { useRouter } from "next/navigation";
import { RiMapPin2Line } from "react-icons/ri";
import { FaStar, FaHeart } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoIosInformationCircle } from "react-icons/io";

interface OmraTripComponentProps {
  id: string;
  name: string;
  url_featured_image: string;
  category: string;
  omraDepartures_count?: number;
  omraDepartures?: any[];
  destinations?: any[];
}

export default function OmraTripComponent({
  id,
  name,
  url_featured_image,
  category,
  omraDepartures_count,
  omraDepartures,
  destinations,
}: OmraTripComponentProps) {
  const router = useRouter();
  const firstDeparture =
    omraDepartures && omraDepartures.length > 0 ? omraDepartures[0] : null;
  const firstDestination =
    destinations && destinations.length > 0 ? destinations[0] : null;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition-shadow w-full">
      <div className="relative">
        <Image
          src={url_featured_image || "/placeholder.jpg"}
          alt={name}
          width={500}
          height={300}
          className="w-full h-52 object-cover"
        />
        <div className="absolute top-4 right-4">
          <button className="p-2 rounded-full bg-white/80 hover:bg-white">
            <FaHeart className="text-gray-400 hover:text-red-500" size={20} />
          </button>
        </div>
        <div className="absolute top-4 left-4">
          <span className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-1 rounded-full text-sm font-medium">
            {category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-gray-600">
          <RiMapPin2Line className="text-lg" />
          <span className="text-sm">
            {firstDestination?.name}, {firstDestination?.country?.name}
          </span>
        </div>
        <h3 className="text-xl font-semibold mt-3 mb-4 line-clamp-2 min-h-[3.5rem]">
          {name}
        </h3>
        <div className="flex flex-wrap gap-3 mb-4">
          {firstDeparture && (
            <>
              <span className="inline-flex items-center gap-1.5 bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-normal">
                {omraDepartures_count} Départs
                <IoIosInformationCircle color={"white"} size={15} />
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-orange-500 bg-orange-50 px-4 py-1.5 rounded-full font-normal border border-orange-400">
                {firstDeparture.total_days} nuits
                <IoIosInformationCircle size={15} />
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-orange-500 bg-white px-4 py-1.5 rounded-full font-normal border border-orange-400">
                <BsFillPeopleFill /> {firstDeparture.remainder_seats} places
                <IoIosInformationCircle size={15} />
              </span>
            </>
          )}
        </div>
        {firstDeparture && (
          <div className="flex items-baseline justify-between mb-5">
            <div>
              <span className="text-sm text-gray-500 block mb-1">
                À partir de
              </span>
              <p className="text-xl font-bold text-orange-500">
                {firstDeparture.price_ini} DA
              </p>
            </div>
            <div className="flex items-center">
              <div className="flex text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar className="text-gray-300" />
              </div>
            </div>
          </div>
        )}
        <button
          onClick={() => router.push(`/omras/${id}`)}
          className="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition-colors font-medium text-base"
        >
          Voir les détails
        </button>
      </div>
    </div>
  );
}
