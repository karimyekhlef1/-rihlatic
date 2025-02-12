import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CircleCheck } from 'lucide-react';
import { useDispatch ,useSelector} from 'react-redux';
import { format, differenceInDays } from 'date-fns';
import DropDownBookingComponent from './dropDownBooking';
import RoomsDetailsBooking from './RoomsDetailsBooking';
import { Room } from '@/app/Types/package/packageDetails';
import { Departure } from '@/app/Types/package/packageDetails';
import { reStateRoomData } from '@/lib/store/custom/packagesSlices/paymentPachageSlices';
import PopularFacilitiesPackage from './PopularFacilitiesPackage';
import { withAuth } from '@/middleware/withAuth';
import { Button } from '@/components/ui/button';
import { RootState } from '@/lib/store/store';
import { openDialogSignUp } from "@/lib/store/custom/mainSlices/dialogSlice";

export default function BookingPackageComponent({ data ,onSelectedDeparture}: { 
  data: Departure[]
  onSelectedDeparture:(item: Departure) => void;
 })
 
 {
  const { success, userData, isInitialized } = useSelector(
    (state: RootState) => state.signIn
  );

  const dispatch = useDispatch<any>();
  const [selectedDeparture, setSelectedDeparture] = useState<Departure | undefined>();
  const [selectedOption, setSelectedOption] = useState<string | null>('test');
  const [roomNames , setRoomNames] =  useState<any>();
  const [selectedRoom ,setSelectedRoom] = useState<Room | undefined>();
  const [isOpen, setIsOpen] = useState<boolean>(false)

  console.log("selectedDeparture",selectedDeparture)
  useEffect (()=>{
    if (selectedDeparture) {
      const roomNames =selectedDeparture.pricing.rooms.map((room)=>({
        label:room.name,
        id:room.id
      }))
 setRoomNames(roomNames)
    }
  },[selectedDeparture])
  const calculateDuration = (startDate:Date,endDate:Date) => {
    if (startDate && endDate) {
      try {
        const nights = differenceInDays(new Date(endDate), new Date(startDate));
        const days = nights + 1;
        return `${nights} nights / ${days} days`;
      } catch (error) {
        console.error('Error calculating duration:', error);
        return 'Invalid dates';
      }
    }
    return 'Select dates';
  };

  if(!data){
    return <p> loading ...</p>

  }
 
  const currentDeparture = selectedDeparture || data[0];
  const price = currentDeparture?.price_ini ?? 0;
  const startDate = currentDeparture?.departure_date;
  const endDate = currentDeparture?.return_date;
  
  const departureDates = data.map((departure) => ({
    label: `${format(new Date(departure.departure_date), 'dd-MMM-yyyy')}/${format(new Date(departure.return_date), 'dd-MMM-yyyy')}`,
    id: departure.id,
  }));

  const handleSelectDeparture = (selectedOption: { label: string; id: number }) => {
    dispatch(reStateRoomData())
    const selected = data.find((item) => item.id === selectedOption.id);
    if (selected) {
      onSelectedDeparture(selected)
      setSelectedDeparture(selected);
    }
  };
  const handleSelectRoom = (selectedOption: { label: string; id: number }) => {
    dispatch(reStateRoomData())
    const selected = selectedDeparture?.pricing.rooms.find((item) => item.id === selectedOption.id);
    if (selected) {
      setSelectedRoom(selected);
      setIsOpen(true)
    }
  };
  const handleClickBook = () => {
    if (success && userData && isInitialized ){
    dispatch(reStateRoomData())
    const selected = selectedDeparture?.pricing.rooms[0]
    if (selected) {
      setSelectedRoom(selected);
      setIsOpen(true)
    }
  }else{
    dispatch(openDialogSignUp());
  }
  };
  return (
    <div>
      
      <Card className="w-[300px] rounded-xl">
        <CardContent className="px-0 py-8">  
          <div className="flex flex-col items-center"> 
            <div className="flex flex-col items-center justify-center pb-4">
              <p className="text-xs">Starting from</p>
              <p className="font-semibold text-lg">
                {price ? `${price} DZD` : 'N/A'}
              </p>
            </div> 
            <Separator />


   {     currentDeparture && <PopularFacilitiesPackage
        visa={currentDeparture.visa}
        vol={currentDeparture.vol }
        hotel={currentDeparture.hotel}
        transfer={currentDeparture.transfer}
        excursion={currentDeparture.excursion}
        cruise={currentDeparture.cruise}
      />}
            <Separator />
            <div className="flex flex-col pt-4 pb-[100px]">
              <div className="flex flex-row items-center">
                <CircleCheck
                  size={15}
                  className="font-semibold text-xs text-[#43acff]"
                  fill="#b4deff"
                />
                <p className="text-sm font-semibold pl-2">
                  {calculateDuration(startDate,endDate)}
                </p>
              </div>
              <div className="flex flex-row items-center mt-2">
                <CircleCheck
                  size={15}
                  className="font-semibold text-xs text-[#ff8000]"
                  fill="#ffcc99"
                />
                <p className="text-sm font-semibold pl-2">
                  {startDate
                    ? format(new Date(startDate), 'dd/MMM/yyyy')
                    : 'Select dates'}
                  {endDate ? ` - ${format(new Date(endDate), 'dd/MMM/yyyy')}` : ''}
                </p>
              </div>
            </div>
            <Separator />

            {/* {selectedOption && (
              <>
                <p className="text-sm font-semibold pt-4">
                  Checkout Calculation
                </p>
                <div className="flex flex-row items-center justify-between py-4 w-full px-4">
                  <p className="text-sm font-medium text-gray-500">
                    {selectedOption}
                  </p>
                  <p className="font-semibold text-sm">{price ? `${price} DZD` : 'N/A'}</p>
                </div>
                <Separator />
              </>
            )} */}
            <div className="flex flex-col gap-y-2 pb-4 pt-4">
      
              <DropDownBookingComponent 
                onSelect={handleSelectDeparture} 
                data={departureDates} 
                title='Select a departure' 
              />
                    {/* {selectedDeparture ?
              <DropDownBookingComponent 
                onSelect={handleSelectRoom} 
                data={roomNames} 
                title='Kind of room' 
              />:null} */}
            </div>
            <Separator /> 
            
                 <div className="pt-4">
                 <Button className="px-14" variant={'rihlatic'} disabled={!selectedDeparture}
                 onClick={handleClickBook}
            
                 >
                   Book Now
                 </Button>
     
             </div>

       
          </div>
        </CardContent>
      </Card> 
      <RoomsDetailsBooking 
      isOpen={isOpen} 
      setIsOpen={() => setIsOpen(!isOpen)} 
      selectedDeparture={selectedDeparture} 
      selectedRoom={selectedRoom}
      />
    </div>
  );
}