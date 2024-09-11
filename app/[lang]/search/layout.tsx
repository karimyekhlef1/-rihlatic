import Footer from '@/app/commonComponents/footer';
import Navbar from '@/app/Layout/Header/Navbar/navbar';
import MainNavbar from '@/app/Layout/Main/mainNavbar';

const SearchLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default SearchLayout;
