import Navbar from '@/app/Layout/Header/Navbar/navbar';
import MainNavbar from '@/app/Layout/Main/mainNavbar';

const ReservationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <MainNavbar />
      {children}
    </>
  );
};

export default ReservationLayout;
