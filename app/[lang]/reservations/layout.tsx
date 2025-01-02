'use client'
import Footer from '@/app/commonComponents/footer';
import Navbar from '@/app/Layout/Header/Navbar/navbar';
import MainNavbar from '@/app/Layout/Main/mainNavbar';
import { store } from '@/lib/store/store';
import { Provider } from 'react-redux';
import NavlinksReservation from '@/app/Components/profile/NavlinksReservation';
import { Toaster } from "@/components/ui/sonner";

const ReservationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <Navbar />
      <MainNavbar />
      <NavlinksReservation />
      {children}
      <Footer />
      <Toaster />
    </Provider>
  );
};

export default ReservationLayout;
