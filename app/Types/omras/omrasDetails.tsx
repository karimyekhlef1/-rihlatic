export interface OmrasDetails {
  id: string;
  name: string;
  type: string;
  status: string;
  category: string;
  destinations: any[];
  description: string;
  note: string;
  url_featured_image: string;
  featured_image: string;
  shared_with_all: boolean;
  media?: any;
  departures: omraDepartures[];
}

export interface omraDestinations {
  id: number;
  name: string;
  description: string;
  country: omraCountry;
  image: string;
  departures_count: number;
  total_packages: number;
}

export interface omraCountry {
  id: number;
  name: string;
  full_name: string;
  capital: string;
  citizenship: string;
  country_code: number;
  currency: string;
  currency_code: string;
  currency_sub_unit: string;
  currency_symbol: string;
  iso_3166_2: string;
  iso_3166_3: string;
  region_code: number;
  sub_region_code: number;
  eea: string;
  calling_code: number;
  flag: string;
}

export interface omraDepartures {
  id: number;
  departure_date: Date;
  return_date: Date;
  number_seats: number;
  means_transport: string[];
  itinerary: string[];
  visa: boolean;
  vol: boolean;
  transfer: boolean;
  excursion: boolean;
  hotel_stay: any;
  price_ini: string;
  promotion: number;
  code_promo: string;
  fee_promo: string;
  includes: string[];
  excludes: string[];
  booked_seats: number;
  remainder_seats: number;
  status: string;
  total_days: number;
  rooming_list: string[];
}
