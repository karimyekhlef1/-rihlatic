import Navbar from '@/app/Layout/Header/Navbar/navbar';
import MainNavbar from '@/app/Layout/Main/mainNavbar';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default ProfileLayout;
