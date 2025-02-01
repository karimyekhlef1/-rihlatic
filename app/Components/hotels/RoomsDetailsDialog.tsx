"use client";
import React, { useState,useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"; 
  import { ScrollArea } from "@/components/ui/scroll-area";
  import { Room } from "@/app/Types/hotel/HotelDetails";
  import { useDispatch, useSelector } from "react-redux";
  import { useRouter } from "next/navigation";
  import { Separator } from "@/components/ui/separator";
  import { Button } from "@/components/ui/button";
  import { Card, CardContent } from "@/components/ui/card";
  import { hotelPrebook } from "@/lib/store/api/hotels/hotelsSlice";
import { toast } from "sonner";
import { format, differenceInDays } from "date-fns";
import { useParams,useSearchParams} from "next/navigation";
import { AppDispatch } from "@/lib/store/store";
import { Loader2 } from "lucide-react";
import { setPreeBook } from "@/lib/store/custom/hotelSlices/paymentHotelSlices";
interface RoomsDetailsDialogProps {
    isOpen: boolean;
    onClose: () => void;
    data?: Room[];
  }
  
  const RoomsDetailsDialog: React.FC<RoomsDetailsDialogProps> = ({
    isOpen,
    onClose,
    data,
  }) => {
    const  router= useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams();
    const searchParams = useSearchParams();
    const selectedDestination = useSelector((state: any) => state.hotelSearchSlice.selectedDestination);
    const dateRange = useSelector((state: { hotelSearchSlice: { dateRange: any } }) => state.hotelSearchSlice?.dateRange);
    const hotel =  useSelector((state: any) => state.hotelPayment.hotel);
    const rooms =  useSelector((state: any) => state.hotelPayment.rooms);
    const [bodyData,setBodyData]= useState<any>(null)
    const { loadingPreBook } = useSelector((state: any) => state.hotels);

    // useEffect(() => {
    //   const roomsObj = rooms.reduce((acc :any, room:any, index:any) => {
    //     acc[index] = room;
    //     return acc;
    //   }, {});
    //   const ref = params.ref.toString();
    //   const supplier = searchParams.get('supplier');
    //   if(selectedDestination){
    //   const requestBody = {
    //     supplier,
    //     checkin: format(dateRange.from, "yyyy-MM-dd"),
    //     checkout: format(dateRange.to || dateRange.from, "yyyy-MM-dd"),
    //     city: {
    //       mygo: { id: selectedDestination.mygo_code },
    //       cng: { id: selectedDestination.cng_code },
    //       hb: { id: null },
    //     },
    //     hotel: ref,
    //     number:hotel.number,
    //     rooms:roomsObj
    //   };
    //   setBodyData(requestBody)
    // }

    // else{
    //   toast.error("select destination")
  
    // }
  
     
    // }, [hotel, params.ref, dateRange]);
  
    const handelCompletBook =async()=>{
      const roomsObj = rooms.reduce((acc :any, room:any, index:any) => {
        acc[index] = room;
        return acc;
      }, {});
      const ref = params.ref.toString();
      const supplier = searchParams.get('supplier');
      if(selectedDestination){
      const requestBody = {
        supplier,
        checkin: format(dateRange.from, "yyyy-MM-dd"),
        checkout: format(dateRange.to || dateRange.from, "yyyy-MM-dd"),
        city: {
          mygo: { id: selectedDestination.mygo_code },
          cng: { id: selectedDestination.cng_code },
          hb: { id: null },
        },
        hotel: ref,
        number:hotel.number,
        rooms:roomsObj
      };

      const result = await dispatch(hotelPrebook(requestBody))
      if (result.payload.success){
        dispatch(setPreeBook(result.payload.result.preBook))
        router.push("/hotels/payment")

      } else{
      toast.error(result.payload.message)
    }
    }

    else{
      toast.error("select destination")
  
    }
      

    }
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] md:max-w-2xl bg-gray-100 p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold mb-4">
              Details
            </DialogTitle>
          </DialogHeader>
  
          <ScrollArea className="overflow-y-auto max-h-[80vh]">
            {data?.map((room, roomIndex) => (
              <div key={roomIndex}>
                {room.boardings.map((boarding, boardingIndex) => (
                  <Card key={boardingIndex} className=" p-4 my-2">
                    <h3 className="text-lg font-bold mb-2">{room.room_name}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Rate: {room.rate} DZD
                    </p>
  
                    <h4 className="text-md font-semibold mb-2">
                      Cancellation Policy
                    </h4>
                    <table className="w-full border-collapse border border-gray-300 mb-4">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border px-4 py-2 text-sm font-medium">
                            From
                          </th>
                          <th className="border px-4 py-2 text-sm font-medium">
                            Penalty %
                          </th>
                          <th className="border px-4 py-2 text-sm font-medium">
                            Penalty
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {boarding?.cancellation_policy.map((policy, index) => (
                          <tr key={index}>
                            <td className="border px-4 py-2 text-sm">
                              {policy.date_from}
                            </td>
                            <td className="border px-4 py-2 text-sm">
                              {policy.percentage} %
                            </td>
                            <td className="border px-4 py-2 text-sm text-red-600 font-semibold">
                              {`You pay ${policy.amount} DZD`}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
  
                    <h4 className="text-md font-semibold mb-2">
                      Special Offers & Notes
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 mb-2">
                      {room.boardings[0]?.notes.map((note, index) => (
                        <li key={index}>{note}</li>
                      ))}
                    </ul>
                    <Separator />
                    <div className=" flex justify-between font-semibold mt-2">
                      <div>Tarif de 1 chambre</div>
                      <div>{`${boarding.bookingDetails.room_rate} DZD`}</div>
                    </div>
                  </Card>
                ))}
              </div>
            ))}
          </ScrollArea>
  
          <DialogFooter className=" flex justify-between font-semibold mt-2 ">
            <div className=" flex  w-full space-x-2">
              <div>Total</div>
              <div>
                {`${data?.reduce((total: number, room: Room) => total + (room.rate || 0), 0)} DZD`}
              </div>
            </div>
          
            <Button variant="rihlatic" onClick={handelCompletBook}>
              {
                loadingPreBook ?<Loader2 className="animate-spin text-gray-200" size={24} />
                :"Complete"
              }
              </Button>
  
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  

  export default RoomsDetailsDialog