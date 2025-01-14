export interface PackageDetails {
    id: string;
    description: string;
    departures: Departure[]; 
    media?: any; 
    note:string
  }
  export interface Room {
    name: string;
      id: Number;
      type: string;
      description: string;
      capacity_adult: number;
      capacity_child: number;
      capacity_bebe: number;
  }
  
  export interface Departure {
    id: number;
    price_ini?: number;
    departure_date: Date;
    return_date: Date;
    pricing: {
      rooms: Room[];
    };
    hotel_stay:any;
    visa:boolean;
    vol:boolean;
    flight?: any;
    hotel:boolean;
    transfer:boolean;
    excursion:boolean;
    cruise:boolean;
    schedule?: any[];
    includes:string[];
    excludes:string[];
  }