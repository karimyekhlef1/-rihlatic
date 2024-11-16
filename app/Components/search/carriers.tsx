import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import {
  setSearchTerm,
  toggleCarrier,
  toggleSelectAll,
  toggleShowAll,
} from '@/lib/store/custom/searchSlices/carrierSlice';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

export default function AirlineCarrierSelector() {
  const dispatch = useDispatch();
  const { carriers, searchTerm, selectedCarriers, showAll } = useSelector(
    (state: RootState) => state.carriers
  );

  const filteredCarriers = carriers.filter((carrier) =>
    carrier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleCarriers = showAll
    ? filteredCarriers
    : filteredCarriers.slice(0, 4);

  const handleCarrierToggle = (carrier: string) => {
    dispatch(toggleCarrier(carrier));
  };

  const handleSelectAll = () => {
    dispatch(toggleSelectAll());
  };

  return (
    <div className="w-full max-w-sm p-4">
      <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search carriers"
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          className="pl-8"
        />
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">In results</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSelectAll}
          className="text-sm"
        >
          {selectedCarriers.length === carriers.length
            ? 'Deselect all'
            : 'Select all'}
        </Button>
      </div>
      <div className="space-y-2">
        {visibleCarriers.map((carrier, index) => (
          <div
            key={carrier}
            className={`flex items-center space-x-2 ${index === 3 && !showAll ? 'opacity-50' : ''}`}
          >
            <Checkbox
              id={carrier}
              checked={selectedCarriers.includes(carrier)}
              onCheckedChange={() => handleCarrierToggle(carrier)}
            />
            <Label htmlFor={carrier} className="text-sm">
              {carrier}
            </Label>
          </div>
        ))}
      </div>
      {filteredCarriers.length > 4 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch(toggleShowAll())}
          className="mt-2 w-full text-sm"
        >
          {showAll ? 'Show less' : 'Show all carriers'}
        </Button>
      )}
    </div>
  );
}
