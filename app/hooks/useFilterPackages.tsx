// Utility function for filtering packages
export const usefilterPackages = (
    packages: any[], 
    selectedCountries: string[], 
    selectedCategories: string[]
  ): any[] => {
    let result = packages;
  
    // Filter by countries if any countries are selected
    if (selectedCountries.length > 0) {
      result = result.filter((pkg) => 
        pkg.destinations.some((dest: any) => 
          selectedCountries.includes(dest.country.name)
        )
      );
    }
  
    // Filter by categories if any categories are selected
    if (selectedCategories.length > 0) {
      result = result.filter((pkg) => 
        selectedCategories.includes(pkg.category)
      );
    }
  
    return result;
  };