import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

interface Props {
  data: any;
  setSelected?: (value: string) => void;
  label?: string;
}

const SearchSelectComponent: React.FC<Props> = ({
  data,
  setSelected,
  label,
}) => {
  return (
    <Select
      defaultValue={data[0]}
      onValueChange={(value) => setSelected && setSelected(value)}
    >
      <SelectTrigger className="w-[200px] h-9 text-xs bg-white border-gray-200 hover:bg-gray-50 focus:ring-1 focus:ring-[#FF8000] focus:ring-offset-0">
        <SelectValue placeholder="Select option" className="text-xs" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && (
            <SelectLabel className="text-xs font-medium">{label}</SelectLabel>
          )}
          {data.map((item: any, index: number) => (
            <SelectItem
              key={index}
              value={item.value || item}
              className="text-xs"
            >
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SearchSelectComponent;
