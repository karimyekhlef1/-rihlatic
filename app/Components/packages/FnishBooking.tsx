"use client"
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function FnishBooking() {
    const RoomsData = useSelector((state: any) => state.paymentPackage.RoomsData);
    const departure = useSelector((state: any) => state.paymentPackage.departure);
    const [filtredRoomData, setFiltredRoomData] = useState()

    
    
    useEffect(()=>{
        console.log("departure",departure)
        console.log("RoomsData",RoomsData)
        const filteredRooms = RoomsData.filter((room:any) => {
            const { adults, children, infants } = room.passengers;
            return adults.length > 0 || children.length > 0 || infants.length > 0;
          });
          setFiltredRoomData(filteredRooms)

    },[RoomsData,departure])

    const handleComplet =()=>{
        console.log("departure",departure)
        console.log("RoomsData",RoomsData)
        const bodyData ={
            departure_id:departure.id,
            rooms:RoomsData
        }
    }
  return (
    <div>
           <Button variant={'active'} onClick={handleComplet} className="px-16">
             Complet
           </Button>


    </div>
  )
}
