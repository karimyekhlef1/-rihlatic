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

// Clean room data before API submission
export const cleanRoomData = (room: Room): Room => {
  return {
    ...room,
    passengers: cleanPassengers(room.passengers)
  };
};

export interface Room {
  room_id: number;
  type: string;
  reservation_type: string;
  passengers: Passengers;
}

interface OmraReservationState {
  omra_departure_id: number | null;
  rooms: Room[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OmraReservationState = {
  omra_departure_id: null,
  rooms: [],
  status: "idle",
  error: null,
};

const omraReservationSlice = createSlice({
  name: "omraReservation",
  initialState,
  reducers: {
    setOmraDepartureId: (state, action: PayloadAction<number>) => {
      state.omra_departure_id = action.payload;
    },
    addRoom: (state, action: PayloadAction<Room>) => {
      state.rooms.push(action.payload);
    },
    updateRoom: (
      state,
      action: PayloadAction<{ roomIndex: number; roomData: Partial<Room> }>
    ) => {
      const { roomIndex, roomData } = action.payload;
      if (state.rooms[roomIndex]) {
        state.rooms[roomIndex] = { ...state.rooms[roomIndex], ...roomData };
      }
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
} = omraReservationSlice.actions;

export default omraReservationSlice.reducer;
