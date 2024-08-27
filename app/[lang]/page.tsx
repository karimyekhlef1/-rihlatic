'use client';

import { Button } from '@/components/ui/button';
import Footer from '../commonComponents/footer';
import Navbar from '../Layout/Header/Navbar/navbar';
import MainNavbar from '../Layout/Main/main-navbar';

export default function Home() {
  const func = function (e: any) {
    alert('Some');
  };

  return (
    <div>
      <Navbar />

      <MainNavbar />

      <Footer />
    </div>
  );
}
