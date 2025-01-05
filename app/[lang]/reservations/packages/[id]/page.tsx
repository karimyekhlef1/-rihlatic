"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DepartureInfoInBooking from "@/app/Components/packages/DepartureInfoInBooking";
import { useSelector, useDispatch } from "react-redux";
import { getPackagesReservationDetails } from "@/lib/store/api/packages/packagesSlice";
import Loading from "@/app/Components/home/Loading";
import BookingDetailsPricing from "@/app/Components/packages/BookingDetailsPricing";
export default function page() {
  const dispatch = useDispatch<any>();
  const { loading, packagesData } = useSelector((state: any) => state.packages);

  const { id } = useParams();
  const [bookinPackagesDetails, setBookinPackageDetails] = useState<
    any | undefined
  >(undefined);

  useEffect(() => {
    const getData = async () => {
      const result = await dispatch(
        getPackagesReservationDetails({
          id,
          include: "departure,departure.package,departure.flight",
        })
      );
      setBookinPackageDetails(result.payload.result.booking);
    };
    getData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="bg-[#F8F8F8] flex justify-center">
      <div>
      <DepartureInfoInBooking departure={bookinPackagesDetails?.departure} />
      </div>
     <BookingDetailsPricing data={bookinPackagesDetails} />
    </div>
  );
}
