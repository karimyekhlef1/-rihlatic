'use client';

import ProfilePicture from '@/components/Main/profile-picture';
import PersonalDetails from '@/components/Main/personal-details';
import LanguageAndCurrency from '@/components/Main/lang-and-currency';
import Notifications from '@/components/Main/notifications';

export default function AccountSettings() {
  return (
    <div className="h-full flex flex-col items-center md:flex-row md:justify-center pt-8 pb-20 bg-[#f8f8f8]">
      <div className="flex flex-col md:px-20">
        <h1 className="font-semibold">Account Settings</h1>
        <p className="box-content font-medium text-[14px] w-[315px] h-[63px] text-gray-500">
          Set your preferred account details to ensure you always receive a
          personalized experience with us.
        </p>
      </div>

      <div className="flex flex-col px-20">
        <ProfilePicture />
        <PersonalDetails />
        <LanguageAndCurrency />
        <Notifications />
      </div>
    </div>
  );
}
