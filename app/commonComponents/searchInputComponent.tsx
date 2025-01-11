import React, { useEffect, useRef, useState } from "react";
import { Building2, X, Plus, Loader2 } from "lucide-react";
import { DatePickerHome } from "./datePickerHome";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { GetDestinations } from "@/lib/store/api/engine/destinationsSlice";
import { id } from "date-fns/locale";
import DestinationComponent from "../Components/home/engine/destinationComponent";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface SearchInputProps {
  dir: string;
  placeholder: string;
  onSearch: (value: string) => void;
  isOnePick?: boolean;
  type: number;
  selected?: string | null;
}

const SearchInputComponent: React.FC<SearchInputProps> = ({
  placeholder,
  onSearch,
  dir,
  type,
  selected,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  const clickHandler = () => {
    if (!isPicked) {
      if (!isOpened) {
        setIsOpened(true);
        getSearchData();
      }
    }
  };

  const [searchValue, setSearchValue] = useState<string>("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isPicked, setIsPicked] = useState<boolean>(false);

  const dispatch = useDispatch<any>();
  const { loadingDestinations, destinations } = useSelector(
    (state: RootState) => state.getDestinations
  );

  const searchClick = (value: string) => {
    setSearchValue(value);
    setIsOpened(false);
    setIsPicked(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setIsOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getSearchData = async () => {
    try {
      const data = {
        search: searchValue,
        type: type,
      };
      const act = await dispatch(GetDestinations(data));
      console.log(act);
    } catch (e) {
      console.log(e);
    }
  };

  const fullSearchClick = (item: any) => {
    console.log('SearchInputComponent - Received item:', item);
    searchClick(item.name);
    const airportCode = item.iata || item.code;
    console.log('SearchInputComponent - Sending airportCode:', airportCode);
    onSearch(airportCode);
  };

  useEffect(() => {
    getSearchData();
  }, [searchValue]);
  useEffect(() => {
    if (selected) {
      setSearchValue(selected);
      setIsPicked(true);
    } else {
      setSearchValue("");
      setIsPicked(false);
    }
  }, [selected]);

  return (
    <div
      className="relative transition-all"
      style={{
        transition: "width 0.05s ease-in-out",
      }}
      ref={wrapperRef}
    >
      <div
        className={cn(
          "flex items-center gap-3 p-2 bg-white rounded relative",
          isOpened
            ? "ring-2 ring-[#FF8000] ring-offset-0 z-10"
            : "border border-gray-200",
          "transition-all duration-150"
        )}
        onClick={clickHandler}
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-gray-400 text-xs font-medium">{dir}</span>
          {isPicked && (
            <Badge
              variant="outline"
              className={cn(
                "flex items-center gap-2 text-xs font-normal",
                dir === "From"
                  ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
                  : "bg-orange-50 text-orange-700 hover:bg-orange-50"
              )}
            >
              {searchValue}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  setSearchValue("");
                  setIsPicked(false);
                }}
              />
            </Badge>
          )}
        </div>
        {!isPicked && (
          <Input
            type="text"
            className="border-0 p-0 text-xs focus-visible:ring-0 h-auto placeholder:text-gray-400"
            placeholder={placeholder}
            onChange={handleInputChange}
            id="InputField"
          />
        )}
      </div>
      {isOpened && (
        <Card className="absolute top-[-10px] right-[-10px] left-[-10px] bg-white pt-16 border-gray-200">
          <ul className="p-0">
            {loadingDestinations ? (
              <li className="px-3 py-2">
                <div className="w-full flex items-center gap-2 text-gray-500">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="truncate text-xs">Loading...</span>
                </div>
              </li>
            ) : (
              destinations?.map((item: any, index: number) => (
                <DestinationComponent
                  key={index}
                  item={item}
                  searchClick={() => fullSearchClick(item)}
                  setIsPicked={setIsPicked}
                  type={type}
                />
              ))
            )}
          </ul>
        </Card>
      )}
    </div>
  );
};

export default SearchInputComponent;
