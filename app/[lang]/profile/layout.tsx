import Footer from '@/app/commonComponents/footer';
import Navbar from '@/app/Layout/Header/Navbar/navbar';
import MainNavbar from '@/app/Layout/Main/mainNavbar';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <MainNavbar />
      {children}
      <Footer />
    </>
  );
};

export default ProfileLayout;
