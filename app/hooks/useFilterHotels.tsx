import { HotelType } from "../Types/hotel/HotelDetails";

export function getMaxAndMinPrices(hotels: HotelType[]): { max: number; min: number } {
  return hotels.reduce(
    (acc, hotel) => {
      acc.max = Math.max(acc.max, hotel.rate);
      acc.min = Math.min(acc.min, hotel.rate);
      return acc;
    },
    { max: -Infinity, min: Infinity }
  );
}
export function useFilterHotels(
  hotels: HotelType[],
  priceRange: { min: number; max: number },
  targetRating?: number
): HotelType[] {
   return hotels.filter(hotel => {
    const matchesPrice = hotel.rate >= priceRange.min && hotel.rate <= priceRange.max;
    const matchesRating = !targetRating || hotel.rating === targetRating;
    return matchesPrice && matchesRating;
  }) ;
}