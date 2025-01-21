import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Passenger {
  email: string | null;
  phone: string | null;
  first_name: string;
  last_name: string;
  sex: "male" | "female";
  passport_nbr: string;
  passport_expire_at: string;
  passport_scan: File | string | null;
  birth_date: string;
}

export interface Passengers {
  adults?: Passenger[];
  children?: Passenger[];
  children_without_bed?: Passenger[];
  infants?: Passenger[];
}

// Utility function to clean passenger data before API submission
export const cleanPassengers = (passengers: Passengers): Passengers => {
  const cleaned: Passengers = {};
  if (passengers.adults?.length) cleaned.adults = passengers.adults;
  if (passengers.children?.length) cleaned.children = passengers.children;
  if (passengers.children_without_bed?.length) cleaned.children_without_bed = passengers.children_without_bed;
  if (passengers.infants?.length) cleaned.infants = passengers.infants;
  return cleaned;
};

export interface Room {
  room_id: number;
  type: string;
  reservation_type: string;
  passengers: Passengers;
}

export interface RoomWithPricing extends Room {
  name: string;
  adults_quantity: number;
  adults_price: number;
  children_quantity: number;
  children_price: number;
  infant_quantity: number;
  infant_price: number;
  total: number;
}

interface OmraReservationState {
  omra_departure_id: number | null;
  rooms: RoomWithPricing[];
  total: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OmraReservationState = {
  omra_departure_id: null,
  rooms: [],
  total: 0,
  status: "idle",
  error: null,
};

// Clean room data before API submission
export const cleanRoomData = (room: Room): Room => {
  return {
    ...room,
    passengers: cleanPassengers(room.passengers)
  };
};

const omraReservationSlice = createSlice({
  name: "omraReservation",
  initialState,
  reducers: {
    setOmraDepartureId: (state, action: PayloadAction<number>) => {
      state.omra_departure_id = action.payload;
    },
    addRoom: (state, action: PayloadAction<Room>) => {
      state.rooms.push({
        ...action.payload,
        name: "",
        adults_quantity: action.payload.passengers.adults?.length || 0,
        adults_price: 0,
        children_quantity: (action.payload.passengers.children?.length || 0) + (action.payload.passengers.children_without_bed?.length || 0),
        children_price: 0,
        infant_quantity: action.payload.passengers.infants?.length || 0,
        infant_price: 0,
        total: 0
      });
    },
    updateRoom: (
      state,
      action: PayloadAction<{ roomIndex: number; roomData: Partial<RoomWithPricing> }>
    ) => {
      const { roomIndex, roomData } = action.payload;
      if (state.rooms[roomIndex]) {
        state.rooms[roomIndex] = { ...state.rooms[roomIndex], ...roomData };
      }
    },
    updatePricing: (
      state,
      action: PayloadAction<{
        rooms: RoomWithPricing[];
        total: number;
      }>
    ) => {
      state.rooms = action.payload.rooms;
      state.total = action.payload.total;
    },
    removeRoom: (state, action: PayloadAction<number>) => {
      state.rooms = state.rooms.filter((_, index) => index !== action.payload);
    },
    addPassenger: (
      state,
      action: PayloadAction<{
        roomIndex: number;
        passengerType: keyof Passengers;
        passengerData: Passenger;
      }>
    ) => {
      const { roomIndex, passengerType, passengerData } = action.payload;
      if (state.rooms[roomIndex]) {
        if (!state.rooms[roomIndex].passengers) {
          // Initialize only the required passenger type array
          state.rooms[roomIndex].passengers = {};
        }
        // Initialize the specific passenger type array if it doesn't exist
        if (!state.rooms[roomIndex].passengers[passengerType]) {
          state.rooms[roomIndex].passengers[passengerType] = [];
        }
        state.rooms[roomIndex].passengers[passengerType]!.push(passengerData);
      }
    },
    updatePassenger: (
      state,
      action: PayloadAction<{
        roomIndex: number;
        passengerType: keyof Passengers;
        passengerIndex: number;
        passengerData: Partial<Passenger>;
      }>
    ) => {
      const { roomIndex, passengerType, passengerIndex, passengerData } =
        action.payload;
      if (
        state.rooms[roomIndex]?.passengers?.[passengerType]?.[passengerIndex]
      ) {
        state.rooms[roomIndex].passengers[passengerType][passengerIndex] = {
          ...state.rooms[roomIndex].passengers[passengerType][passengerIndex],
          ...passengerData,
        };
      }
    },
    removePassenger: (
      state,
      action: PayloadAction<{
        roomIndex: number;
        passengerType: keyof Passengers;
        passengerIndex: number;
      }>
    ) => {
      const { roomIndex, passengerType, passengerIndex } = action.payload;
      if (state.rooms[roomIndex]?.passengers?.[passengerType]) {
        state.rooms[roomIndex].passengers[passengerType] = state.rooms[
          roomIndex
        ].passengers[passengerType].filter(
          (_, index) => index !== passengerIndex
        );
      }
    },
    resetReservation: (state) => {
      return initialState;
    },
    setStatus: (
      state,
      action: PayloadAction<OmraReservationState["status"]>
    ) => {
      state.status = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  setOmraDepartureId,
  addRoom,
  updateRoom,
  removeRoom,
  addPassenger,
  updatePassenger,
  removePassenger,
  resetReservation,
  setStatus,
  setError,
  updatePricing,
} = omraReservationSlice.actions;

export default omraReservationSlice.reducer;
