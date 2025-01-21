import { useState, useCallback, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { storBookingCard } from '@/lib/store/api/packages/packagesSlice';
import { setCardToken, setDeparture, setRooms } from '@/lib/store/custom/packagesSlices/paymentPachageSlices';
import { useRouter } from 'next/navigation';

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

const MAX_ROOMS = 3;
const MIN_ADULT = 1;

export const useBookingPackage = (selectedDeparture: any, selectedRoom: any) => {
  const dispatch = useDispatch();
  const [createdRooms, setCreatedRooms] = useState<RoomState[]>([]);
  const router = useRouter();

  const roomOptions = useMemo(() => 
    selectedDeparture?.pricing?.rooms || [], 
    [selectedDeparture]
  );

  useEffect(() => {
    if (!selectedDeparture || !selectedRoom) return;
    
    const initialRoom: RoomState = {
      roomType: selectedRoom,
      adults: selectedRoom.capacity_adult || MIN_ADULT,
      children: 0,
      infants: 0,
      childrenAges: [],
      note: ''
    };
    setCreatedRooms([initialRoom]); // Fixed: Now using setCreatedRooms instead of setRooms
  }, [selectedDeparture, selectedRoom]);

  const handleAddRoom = useCallback(() => {
    if (createdRooms.length >= MAX_ROOMS) return;
    
    setCreatedRooms(prev => [
      ...prev,
      {
        roomType: null,
        adults: MIN_ADULT,
        children: 0,
        infants: 0,
        childrenAges: [],
        note: ''
      },
    ]);
  }, [createdRooms.length]);

  const handleRoomTypeChange = useCallback((index: number, selectedRoom: RoomOption) => {
    const selectedRoomType = roomOptions.find((room: any) => room.id === selectedRoom.id);
    if (!selectedRoomType) return;

    setCreatedRooms(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        roomType: selectedRoomType,
        adults: selectedRoomType.capacity_adult,
        children: 0,
        infants: 0,
        childrenAges: []
      };
      return updated;
    });
  }, [roomOptions]);

  const handleGuestChange = useCallback((
    index: number,
    type: "adults" | "children" | "infants",
    action: "increment" | "decrement"
  ) => {
    setCreatedRooms(prev => {
      const updated = [...prev];
      const room = updated[index];
      if (!room?.roomType) return prev;

      const capacityMap = {
        adults: room.roomType.capacity_adult,
        children: room.roomType.capacity_child,
        infants: room.roomType.capacity_bebe
      };

      const min = type === "adults" ? MIN_ADULT : 0;
      const max = capacityMap[type];
      const currentValue = room[type];

      if (action === "increment" && currentValue < max) {
        room[type]++;
        if (type === "children") {
          room.childrenAges = [...room.childrenAges, 0];
        }
      } else if (action === "decrement" && currentValue > min) {
        room[type]--;
        if (type === "children") {
          room.childrenAges.pop();
        }
      }

      return updated;
    });
  }, []);

  const handleRemoveRoom = useCallback((index: number) => {
    setCreatedRooms(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleChildAgeChange = useCallback((roomIndex: number, childIndex: number, age: number) => {
    setCreatedRooms(prev => {
      const updated = [...prev];
      updated[roomIndex].childrenAges[childIndex] = age;
      return updated;
    });
  }, []);

  const handleNoteChange = useCallback((index: number, note: string) => {
    setCreatedRooms(prev => {
      const updated = [...prev];
      updated[index].note = note;
      return updated;
    });
  }, []);

  const handleBooking = async () => {
    const bookingData = {
      departure_id: selectedDeparture.id,
      rooms: createdRooms.map(room => ({
        room_id: room.roomType?.id,
        note: room.note || null,
        capacity_adult: room.adults,
        capacity_child: room.children,
        capacity_bebe: room.infants,
        ...(room.children > 0 && {
          children_age: room.childrenAges.reduce((acc, age, index) => ({
            ...acc,
            [index]: { age }
          }), {})
        })
      }))
    };

    try {
      const response = await dispatch<any>(storBookingCard(bookingData));
      console.log("response_ card- package==>",response.payload.result)
      dispatch(setCardToken(response.payload.result?.cart.token));
      dispatch(setDeparture(selectedDeparture));
      dispatch(setRooms(createdRooms));
      router.push('/packages/payment');
    } catch (error) {
      console.error('Booking failed:', error);
      throw error;
    }
  };

  return {
    rooms: createdRooms,
    roomOptions,
    handleAddRoom,
    handleRoomTypeChange,
    handleGuestChange,
    handleRemoveRoom,
    handleChildAgeChange,
    handleNoteChange,
    handleBooking,

  };
};


 