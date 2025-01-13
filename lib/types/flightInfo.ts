export interface FlightSegment {
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
  boardTime?: string;
  offTime?: string;
  boardDate?: string;
  offDate?: string;
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
  flightNumber?: string;
  baggage?: string;
}

export interface FlightInfo {
  segments: FlightSegment[][];
  price: number;
  ht_price: number;
  tax_price: number;
}
