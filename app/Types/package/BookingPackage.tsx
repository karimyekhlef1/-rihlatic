interface RoomOption {
    id: number;
    type: string;
    name: string;
    description: string;
    capacity_adult: number;
    capacity_child: number;
    capacity_bebe: number;
  }
  
  interface RoomState {
    roomType: RoomOption | null;
    adults: number;
    children: number;
    infants: number;
    childrenAges: number[];
    note: string;
  }
  
  interface BookingProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    selectedDeparture: any;
    selectedRoom: any;
  }