'use client';

import PaymentTitleComponent from '@/app/Components/payment/paymentTitle';
import PaymentCardComponent from '@/app/Components/payment/paymentCard';
import PaymentProgressComponent from '@/app/Components/payment/paymentProgress';
import Loading from '@/app/Components/home/Loading';
import { useSelector } from 'react-redux';
import RoomReservationInformation from '@/app/Components/packages/RoomReservationInformation';
import ChangePaymentSteps from '@/app/Components/packages/ChangePaymentSteps';
export default function PaymentPage() {

  const departure = useSelector((state: any) => state.paymentPackage.departure);
  const rooms = useSelector((state: any) => state.paymentPackage.rooms);
   const pkg =  useSelector((state: any) => state.paymentPackage.package);

  if (!departure || !rooms || !pkg) {
    return <Loading />;
  }


  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-16">
      <PaymentTitleComponent
        location={pkg.name}
        month="August"
        startDate={departure.departure_date}
        endDate={departure.return_date}
      />
      <PaymentProgressComponent />
      <RoomReservationInformation />

      <ChangePaymentSteps/>
    </div>
  );
}
