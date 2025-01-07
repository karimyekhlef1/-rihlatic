"use client";
import Footer from "@/app/commonComponents/footer";
import VolSearchComponent from "@/app/Components/home/engine/vol/volSearchComponent";
import Navbar from "@/app/Layout/Header/Navbar/navbar";

const VolsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="sticky top-0 z-50 w-full bg-white shadow-sm">
        <div className="container mx-auto py-4">
          <VolSearchComponent />
        </div>
      </div>
      <main className="min-h-screen bg-[#F8F8F8]">
        <div className="container mx-auto py-6">{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default VolsLayout;
