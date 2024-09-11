import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { setSelectedOption } from '@/lib/store/searchSlices/travelOptionsSlice';
import { cn } from '@/lib/utils';

type Option = {
  type: string;
  price: string;
  duration: string;
};

const options: Option[] = [
  { type: 'Best', price: '$558', duration: '26h 00m' },
  { type: 'Cheapest', price: '$541', duration: '37h 05m' },
  { type: 'Fastest', price: '$1,341', duration: '17h 20m' },
];

export default function TravelOptions() {
  const selectedOption = useSelector(
    (state: RootState) => state.travelOptions.selectedOption
  );
  const dispatch = useDispatch();

  return (
    <div className="flex space-x-4">
      {options.map((option) => (
        <button
          key={option.type}
          className={cn(
            'flex-1 px-4 py-3 rounded-md transition-all duration-200 ease-in-out',
            'border-2 hover:shadow-md focus:outline-none',
            selectedOption === option.type
              ? 'bg-white text-blue-600 border-blue-600'
              : 'bg-gray-100 text-gray-600 border-gray-200 hover:border-gray-300'
          )}
          onClick={() => dispatch(setSelectedOption(option.type))}
        >
          <div className="text-left">
            <div className="font-semibold">{option.type}</div>
            <div className="text-sm">
              {option.price} · {option.duration}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
