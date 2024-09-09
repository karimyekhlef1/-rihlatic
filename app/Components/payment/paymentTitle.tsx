import { CircleCheck } from 'lucide-react';

export default function PaymentTitleComponent({
  location,
  month,
  startDate,
  endDate,
}: PaymentTitleProps) {
  return (
    <div className="flex flex-col items-start justify-center pb-4">
      <h1 className="text-2xl font-bold">{`${location} ( ${month} )`}</h1>
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
