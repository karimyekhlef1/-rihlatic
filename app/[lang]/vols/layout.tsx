"use client";
import Footer from "@/app/commonComponents/footer";
import VolSearchComponent from "@/app/Components/home/engine/vol/volSearchComponent";
import Navbar from "@/app/Layout/Header/Navbar/navbar";
import { useEffect, useState } from "react";
import Loading from "@/app/Components/home/Loading";

const VolsLayout = ({ children }: { children: React.ReactNode }) => {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="top-0 z-50 w-full bg-white">
        <Navbar />
      </div>
      {initialLoading ? (
        <div className="pt-[64px] min-h-screen">
          <Loading />
        </div>
      ) : (
        <>
       
          <main className="min-h-screen bg-[#F8F8F8]">
            <div className=" mx-auto ">{children}</div>
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default VolsLayout;
