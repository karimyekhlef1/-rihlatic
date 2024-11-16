import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import {
  setSearchTerm,
  toggleCountry,
  toggleSelectAll,
  toggleShowAll,
} from '@/lib/store/custom/searchSlices/excludedCountriesSlice';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

export default function ExcludedCountriesSelector() {
  const dispatch = useDispatch();
  const { countries, searchTerm, selectedCountries, showAll } = useSelector(
    (state: RootState) => state.excludedCountries
  );

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleCountries = showAll
    ? filteredCountries
    : filteredCountries.slice(0, 4);

  const handleCountryToggle = (country: string) => {
    dispatch(toggleCountry(country));
  };

  const handleSelectAll = () => {
    dispatch(toggleSelectAll());
  };

  return (
    <div className="w-full max-w-sm p-4">
      <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-3 w-3 text-gray-400" />
        <Input
          type="text"
          placeholder="Search countries"
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          className="pl-7 text-xs font-semibold"
        />
      </div>
      <div className="flex flex-col justify-between items-center mb-2">
        <span className="text-[11px] font-medium">
          Please select any countries you do not want to travel through on your
          journey.
        </span>
      </div>
      <div className="space-y-2">
        {visibleCountries.map((country, index) => (
          <div
            key={country}
            className={`flex items-center space-x-2 ${index === 3 && !showAll ? 'opacity-50' : ''}`}
          >
            <Checkbox
              id={country}
              checked={selectedCountries.includes(country)}
              onCheckedChange={() => handleCountryToggle(country)}
            />
            <Label htmlFor={country} className="text-xs font-semibold">
              {country}
            </Label>
          </div>
        ))}
      </div>
      {filteredCountries.length > 4 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch(toggleShowAll())}
          className="mt-2 w-full text-xs font-semibold"
        >
          {showAll ? 'Show less' : 'Show all countries'}
        </Button>
      )}
    </div>
  );
}
