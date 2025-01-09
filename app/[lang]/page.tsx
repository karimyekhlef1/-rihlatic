'use client';

import Footer from '@/app/commonComponents/footer';
import Navbar from '@/app/Layout/Header/Navbar/navbar';
import HomePage from './home/page';
export default function Home() {
  return (
    <div>
      <Navbar />
        <HomePage />
      <Footer />
    </div>
  );
}
