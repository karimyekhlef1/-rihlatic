import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FilterComponentProps {
  packageCategories: string[];
  countryNames: string[];
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  packageCategories,
  countryNames,
}) => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCountryChange = (country: string) => {
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="p-4">
      <Accordion type="multiple" className="w-[270px]">
        <AccordionItem value="country">
          <AccordionTrigger>Country</AccordionTrigger>
          <AccordionContent>
            <CheckboxList
              items={countryNames}
              selectedItems={selectedCountries}
              onChange={handleCountryChange}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="multiple" className="w-[270px]">
        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <CheckboxList
              items={packageCategories}
              selectedItems={selectedCategories}
              onChange={handleCategoryChange}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

interface CheckboxListProps {
  items: string[];
  selectedItems: string[];
  onChange: (item: string) => void;
}

const CheckboxList: React.FC<CheckboxListProps> = ({
  items,
  selectedItems,
  onChange,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {items.map((item) => (
        <CheckboxItem
          key={item}
          id={item}
          label={item}
          checked={selectedItems.includes(item)}
          onChange={() => onChange(item)}
        />
      ))}
    </div>
  );
};

interface CheckboxItemProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({ id, label, checked, onChange }) => (
  <div className="flex items-center space-x-2 py-1">
    <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
    <label
      htmlFor={id}
      className="text-xs font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {label}
    </label>
  </div>
);

export default FilterComponent;
