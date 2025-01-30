import { CircleCheck, Calendar , Map} from "lucide-react";

export default function PaymentTitleComponent({
  location,
  address,
  month,
  startDate,
  endDate,
}: PaymentTitleProps) {
  return (
    <div className="flex flex-col items-start justify-center pb-4">
      <h1 className="text-2xl font-bold">{`${location}`}</h1>
{   address &&   <div className="flex flex-row items-center mt-2">
        <Map
          size={15}
          className="font-semibold text-xs text-[#4b4b4b]"
          fill="#b6b6b6"
        />
        <p className="text-xs font-semibold pl-2 text-[#4b4b4b]">{`${address}`}</p>
      </div>}
{ month  &&   <div className="flex flex-row items-center mt-2">
        <Calendar
          size={15}
          className="font-semibold text-xs text-[#4b4b4b]"
          fill="#b6b6b6"
        />
        <p className="text-xs font-semibold pl-2 text-[#4b4b4b]">{`${month}`}</p>
      </div>}
      <div className="flex flex-row items-center mt-2">
        <CircleCheck
          size={15}
          className="font-semibold text-xs text-[#ff8000]"
          fill="#ffcc99"
        />
        <p className="text-xs font-semibold pl-2 text-[#ff8000]">
          {`${startDate} / ${endDate}`}
        </p>
      </div>
    </div>
  );
}
