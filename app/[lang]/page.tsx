'use client';

import Footer from '@/app/commonComponents/footer';
import Navbar from '@/app/Layout/Header/Navbar/navbar';
import MainNavbar from '@/app/Layout/Main/mainNavbar';
import MainPage from '@/app/Layout/Main/mainPage';
import MainTable from '@/app/Layout/Main/mainTable';
import AccountSettings from '@/app/Layout/Main/accountSettings';

export default function Home() {
  const func = function (e: any) {
    alert('Some');
  };

  return (
    <div>
      <Navbar />

      <MainNavbar />

      {/* <MainPage /> */}

      {/* <MainTable /> */}

      <AccountSettings />

      <Footer />
    </div>
  );
}
