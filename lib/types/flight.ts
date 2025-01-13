export interface Flight {
  ht_price: number;
  base_price: number;
  tax_price: number;
  marge_owner: number;
  price_agency: number;
  marge_agency: number;
  price: number;
  detail_price: {
    ADT: {
      base_price: number;
      tax: number;
      price_agency: number;
      price: number;
    };
    CHD: {
      base_price: number;
      tax: number;
      price_agency: number;
      price: number;
    };
    INF: {
      base_price: number;
      tax: number;
      price_agency: number;
      price: number;
    };
  };
  segments: Array<Array<{
    fareBasis: string;
    boardAirport: string;
    boardAirportName: {
      id: number;
      name: string;
    };
    offAirport: string;
    offAirportName: {
      id: number;
      name: string;
    };
    airLine?: {
      iata: string;
      name: string;
    };
    airLineOperating?: {
      iata: string;
      name: string;
    };
    duration: string;
    authorizeConfirmed: boolean;
  }>>;
}
