"use client";
import { useEffect, useState, useCallback } from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/store/store";

import AdComponent from "@/app/commonComponents/adComponent";
import FilterComponent from "@/app/Components/packages/filtersComponent";
import PackagesComponent from "@/app/Components/packages/packagesComponent";
import Loading from "@/app/Components/home/Loading";
import { useSelector, useDispatch } from "react-redux";
import { packagesFunc } from "@/lib/store/api/packages/packagesSlice";
import { extractData } from "@/app/hooks/useExtractData";
import { usefilterPackages } from "@/app/hooks/useFilterPackages"; // Import the utility function
import PackagesSearchComponent from "@/app/Components/home/engine/packages/packagesSearchComponent";
import { format } from "date-fns";
import EmptyComponent from "@/app/commonComponents/emptyComponent";
import PackageCardSkeleton from "@/app/Components/packages/PackageCardSkeleton";
export default function Packages() {
  const { loading, packagesData } = useSelector((state: any) => state.packages);
  const { dateRange, packageType, selectedDestinationId } = useSelector(
    (state: any) => state.packageSearchSlice
  );

  const dispatch = useDispatch<any>();
  const [packages, setPackage] = useState<any[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<any[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const fetchPackages = async (isSearching: boolean = false) => {
    console.log("isSearching", isSearching);
    const baseParams = {
      include: "departures",
    };
    const searchParams = isSearching
      ? {
          ...baseParams,
          "filter[type]":packageType,
          "filter[destinationId]": selectedDestinationId || "",
          "filter[departure_date]": dateRange.from
            ? format(dateRange.from, "yyyy/MM/dd")
            : "",
          "filter[return_date]": dateRange.to
            ? format(dateRange.to, "yyyy/MM/dd")
            : "",
        }
      : baseParams;

    const result = await dispatch(packagesFunc(searchParams));
    const fetchedPackages = result.payload.result.packages;
    setPackage(fetchedPackages);
    setFilteredPackages(fetchedPackages);
  };
  const handleSearch = async () => {
    fetchPackages(true);
  };

  useEffect(() => {
    fetchPackages();
  }, [dispatch]);

  // Use the utility function to filter packages
  useEffect(() => {
    const filtered = usefilterPackages(
      packages,
      selectedCountries,
      selectedCategories
    );
    setFilteredPackages(filtered);
  }, [selectedCountries, selectedCategories, packages]);

  // if (loading) return <Loading />;

  const packageCategories = extractData(packages, (pkg) => `${pkg.category}`);
  const countryNames = extractData(packages, (pkg) =>
    pkg.destinations.map((dest: any) => dest.country.name)
  );

  return (
    <div className="">
      <div className="flex justify-center py-4 mt-2 bg-white">
        <PackagesSearchComponent onSearch={handleSearch} />
      </div>

      <div className="flex md:flex-row flex-col">
        <div className="px-14 flex flex-col items-center pt-10 gap-y-8 md:pb-10">
          <FilterComponent
            packageCategories={packageCategories}
            countryNames={countryNames}
            selectedCountries={selectedCountries}
            selectedCategories={selectedCategories}
            setSelectedCountries={setSelectedCountries}
            setSelectedCategories={setSelectedCategories}
          />
          <div className="hidden md:block">
            <AdComponent />
          </div>
        </div>
        <div className="px-10 pt-10 gap-y-8 pb-10 w-full">
          {loading ?<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" >
            <PackageCardSkeleton/>
            <PackageCardSkeleton/>
            <PackageCardSkeleton/>
          </div> : filteredPackages.length === 0 ? (
            <EmptyComponent message="No packages found" />
          ) : (
            <PackagesComponent data={filteredPackages} />
          )}
        </div>
      </div>
    </div>
  );
}
