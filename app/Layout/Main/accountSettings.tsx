'use client';
import { useEffect } from 'react';
import ProfilePicture from '@/app/Components/profile/profile-picture';
import PersonalDetails from '@/app/Components/profile/personal-details';
import LanguageAndCurrency from '@/app/Components/profile/lang-and-currency';
import Notifications from '@/app/Components/profile/notifications';
import { useDispatch, useSelector } from 'react-redux';
import { accountFunc } from '@/lib/store/api/account/accountSlice';
import { updateField ,AccountState } from '@/lib/store/custom/mainSlices/accountSlice';




export default function AccountSettings() {
  const { loading, accountData } = useSelector((state: any) => state.authAccount);
  const dispatch = useDispatch<any>();
  const accountState = useSelector((state: any) => state.account)
  const handleUpdatingField = (field: keyof AccountState, value: string) => {
    dispatch(updateField({ field, value }));
  };
  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const result = await dispatch(accountFunc()).unwrap(); // Ensure we have clean error handling
        const user = result.user;
        Object.keys(user).forEach((field) => {
          if (accountState.hasOwnProperty(field)) {
            handleUpdatingField(field as keyof AccountState, user[field]);
          }
        });
        
      } catch (error) {
        console.error('Failed to fetch account data:', error);
      }
    };
    fetchAccountData();
  }, []);
// if (loading) {
//     return <h1>Loading...</h1>;
// }

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
        <LanguageAndCurrency />
        <Notifications />
      </div>
    </div>
  );
}
