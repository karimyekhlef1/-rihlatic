import Footer from '@/app/commonComponents/footer';
import Navbar from '@/app/Layout/Header/Navbar/navbar';
import MainNavbar from '@/app/Layout/Main/mainNavbar';
// first commit karim branch "0.0.0" 
const ReservationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <MainNavbar />
      {children}
      <Footer />
    </>
  );
};

export default ReservationLayout;
