export interface HotelDetails {
    supplier: string;
    infos: {
      destination: string;
      city: string;
      ref: string;
      name: string;
      description: string;
      rating: string;
      address: string;
      summary: string;
    };
    contact: {
      email: string;
      phone: string;
      fax: string;
      website: string;
    };
    facilities: string[];
    feature_image: string;
    images: string[];
    rooms: Room[];
    reviews: {
      note: string;
      number: string;
    };
    localisation: {
      longitude: string;
      latitude: string;
    };
    supplements: null | any; // If you know the type of supplements, replace `any` with the specific type.
    reduction: null | any; // If you know the type of reduction, replace `any` with the specific type.
    roomsdata: any[]; // If you know the structure of roomsdata, replace `any` with the specific type.
  }
  
  export interface Room {
    room_id: string;
    room_name: string;
    adults: string;
    children: string;
    age: string;
    boardings: Boarding;
  }
  
 export interface Boarding {
    boarding_id: string;
    boarding_name: string;
    bookingDetails: {
      boarding_id: string;
      room_id: string;
      count: string;
    };
    base_rate: string;
    rate: string;
    availability: string;
    cancellation_policy: CancellationPolicy[];
    deadline: string;
    taxes: any[]; // Replace `any` with the specific type if available.
    notes: (string | null)[];
    offers: any[]; // Replace `any` with the specific type if available.
    promotions: any[]; // Replace `any` with the specific type if available.
    adults: number;
    children: number;
    ages: string;
  }
  
 export interface CancellationPolicy {
    amount: string;
    date_from: string;
    percentage: string;
  }
  