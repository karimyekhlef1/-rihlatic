'use client'
import Footer from '@/app/commonComponents/footer';
import Navbar from '@/app/Layout/Header/Navbar/navbar';
import MainNavbar from '@/app/Layout/Main/mainNavbar';
import { store } from '@/lib/store/store';
import { Provider } from 'react-redux';

const ReservationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <Navbar />
      <MainNavbar />
      {children}
      <Footer />
    </Provider>
  );
};

export default ReservationLayout;
