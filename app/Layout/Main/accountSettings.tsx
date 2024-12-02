'use client';
import ProfilePicture from '@/app/Components/profile/profile-picture';
import PersonalDetails from '@/app/Components/profile/personal-details';
import PasswordChange from '@/app/Components/profile/password-change';
import LanguageAndCurrency from '@/app/Components/profile/lang-and-currency';
import Notifications from '@/app/Components/profile/notifications';
import { withAuth } from '@/middleware/withAuth';


export default withAuth(function AccountSettings() {
  return (
    <div className="flex overflow-x-auto flex-wrap flex-col items-center md:items-start md:flex-row md:justify-center pt-8 pb-20 bg-[#f8f8f8]">
      <div className="flex flex-col md:px-20">
        <h1 className="font-semibold">Account Settings</h1>
        <p className="box-content font-medium text-[14px] w-[315px] h-[63px] text-gray-500">
          Set your preferred account details to ensure you always receive a
          personalized experience with us.
        </p>
      </div>

      <div className="flex flex-wrap flex-col md:px-20">
        <ProfilePicture />
        <PersonalDetails />
        <PasswordChange />
        <LanguageAndCurrency />
        <Notifications />
      </div>
    </div>
  );
});
