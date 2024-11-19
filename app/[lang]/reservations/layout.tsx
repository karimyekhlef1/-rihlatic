'use client'
import Footer from '@/app/commonComponents/footer';
import Navbar from '@/app/Layout/Header/Navbar/navbar';
import MainNavbar from '@/app/Layout/Main/mainNavbar';
import { store } from '@/lib/store/store';
import { Provider } from 'react-redux';
import NavlinksReservation from '@/app/Components/profile/NavlinksReservation';
const ReservationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <Navbar />
      <MainNavbar />
      <NavlinksReservation />
      {children}
      <Footer />
    </Provider>
  );
};

export default ReservationLayout;
