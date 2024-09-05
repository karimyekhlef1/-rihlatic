import Navbar from '@/app/Layout/Header/Navbar/navbar';

const HotelsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="bg-[#F8F8F8] h-full">{children}</div>
    </>
  );
};

export default HotelsLayout;
