"use client";
import { useEffect, useState } from "react";
import AdComponent from "@/app/commonComponents/adComponent";
import FilterComponent from "@/app/Components/packages/filtersComponent";
import OmraTripComponent from "@/app/commonComponents/OmratripComponent";
import Loading from "@/app/Components/home/Loading";
import { useSelector, useDispatch } from "react-redux";
import { getOmraDetails } from "@/lib/store/api/omras/omrasSlice";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Omras() {
  const { loading, omraData } = useSelector((state: any) => state.omras);
  const dispatch = useDispatch<any>();
  const [omras, setOmras] = useState<any[]>([]);
  const [filteredOmras, setFilteredOmras] = useState<any[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch omras data
  useEffect(() => {
    const getData = async () => {
      const result = await dispatch(
        getOmraDetails({ include: "omraDepartures" })
      );
      if (result.payload?.result?.omra) {
        const fetchedOmras = result.payload.result.omra;
        setOmras(fetchedOmras);
        setFilteredOmras(fetchedOmras);
      }
    };
    getData();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...omras];

    if (selectedCountries.length > 0) {
      filtered = filtered.filter((omra) =>
        omra.destinations?.some((dest: any) =>
          selectedCountries.includes(dest.country?.name)
        )
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((omra) =>
        selectedCategories.includes(omra.category)
      );
    }

    setFilteredOmras(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedCountries, selectedCategories, omras]);

  if (loading) return <Loading />;

  const packageCategories = ["Simple", "VIP"];
  const countryNames = ["Saudi Arabia"];

  // Pagination logic
  const totalPages = Math.ceil(filteredOmras.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOmras = filteredOmras.slice(startIndex, endIndex);

  return (
    <div className="textarabic flex md:flex-row flex-col">
      <div className="w-full md:w-1/4 px-4 md:px-8">
        <div className="sticky top-0 pt-10">
          <FilterComponent
            packageCategories={packageCategories}
            countryNames={countryNames}
            selectedCountries={selectedCountries}
            selectedCategories={selectedCategories}
            setSelectedCountries={setSelectedCountries}
            setSelectedCategories={setSelectedCategories}
          />
          <div className="hidden md:block mt-8">
            <AdComponent />
          </div>
        </div>
      </div>
      <div className="w-full md:w-3/4 px-4 md:px-8 pt-10 pb-10">
        <h2 className="text-xs font-semibold text-gray-500 mb-6">
          {`Nous avons trouvé ${filteredOmras.length} omra${
            filteredOmras.length > 1 ? "s" : ""
          } pour vous`}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px]">
          {currentOmras.map((omra) => (
            <OmraTripComponent
              key={omra.id}
              id={omra.id}
              name={omra.name}
              url_featured_image={omra.url_featured_image}
              category={omra.category}
              omraDepartures_count={omra.omraDepartures_count}
              omraDepartures={omra.omraDepartures}
              destinations={omra.destinations}
            />
          ))}
        </div>
        
        {/* Pagination - always shown */}
        <Pagination className="my-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "hover:bg-orange-100 hover:text-orange-500",
                  (currentPage === 1 || totalPages <= 1) && "pointer-events-none opacity-50"
                )}
                onClick={() => setCurrentPage(currentPage - 1)}
              />
            </PaginationItem>

            {Array.from({ length: Math.max(totalPages, 1) }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "hover:bg-orange-100 hover:text-orange-500",
                    currentPage === i + 1 &&
                      "bg-orange-500 text-white hover:bg-orange-600 hover:text-white",
                    totalPages <= 1 && "pointer-events-none"
                  )}
                  onClick={() => setCurrentPage(i + 1)}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "hover:bg-orange-100 hover:text-orange-500",
                  (currentPage === totalPages || totalPages <= 1) && "pointer-events-none opacity-50"
                )}
                onClick={() => setCurrentPage(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
