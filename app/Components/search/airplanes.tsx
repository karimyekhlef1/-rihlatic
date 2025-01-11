import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import {
  setSearchTerm,
  toggleAirplaneType,
  toggleSelectAll,
  toggleShowAll,
} from '@/lib/store/custom/searchSlices/airplaneSlice';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

export default function Airplanes() {
  const dispatch = useDispatch();
  const { airplaneTypes, searchTerm, selectedAirplaneTypes, showAll } = useSelector(
    (state: RootState) => state.airplanes
  );

  console.log('Airplane Types:', airplaneTypes);
  console.log('Selected Types:', selectedAirplaneTypes);
  console.log('Search Term:', searchTerm);

  const filteredAirplaneTypes = airplaneTypes.filter((type) =>
    type.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleAirplaneTypes = showAll
    ? filteredAirplaneTypes
    : filteredAirplaneTypes.slice(0, 4);

  const handleAirplaneTypeToggle = (typeCode: string) => {
    dispatch(toggleAirplaneType(typeCode));
  };

  const handleSelectAll = () => {
    dispatch(toggleSelectAll());
  };

  if (!airplaneTypes.length) {
    return (
      <div className="w-full max-w-sm p-4">
        <p className="text-sm text-gray-500">No airplane types available</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm p-4">
      <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-3 w-3 text-gray-400" />
        <Input
          type="text"
          placeholder="Search airplane types"
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          className="pl-7 text-xs font-semibold"
        />
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold">Airplane Types</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSelectAll}
          className="text-xs font-semibold"
        >
          {selectedAirplaneTypes.length === airplaneTypes.length
            ? 'Deselect all'
            : 'Select all'}
        </Button>
      </div>
      <div className="space-y-2">
        {visibleAirplaneTypes.map((type, index) => (
          <div
            key={type.code}
            className={`flex items-center space-x-2 ${index === 3 && !showAll ? 'opacity-50' : ''}`}
          >
            <Checkbox
              id={type.code}
              checked={selectedAirplaneTypes.includes(type.code)}
              onCheckedChange={() => handleAirplaneTypeToggle(type.code)}
              className="h-3 w-3"
            />
            <Label htmlFor={type.code} className="text-xs font-semibold">
              {type.name}
            </Label>
          </div>
        ))}
      </div>
      {filteredAirplaneTypes.length > 4 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch(toggleShowAll())}
          className="mt-2 text-xs font-semibold w-full"
        >
          {showAll ? 'Show less' : `Show ${filteredAirplaneTypes.length - 4} more`}
        </Button>
      )}
    </div>
  );
}
