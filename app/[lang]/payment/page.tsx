'use client';

import PaymentTitleComponent from '@/app/Components/payment/paymentTitle';
import { Provider } from 'react-redux';
import { store } from '@/lib/store/store';
import PaymentCardComponent from '@/app/Components/payment/paymentCard';
import PaymentProgressComponent from '@/app/Components/payment/paymentProgress';

export default function Packages() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <PaymentTitleComponent
        location="Istanbul, Turkiye"
        month="August"
        startDate="12-August-2024"
        endDate="20-August-2024"
      />

      <Provider store={store}>
        <PaymentProgressComponent />
        <PaymentCardComponent />
      </Provider>
    </div>
  );
}
