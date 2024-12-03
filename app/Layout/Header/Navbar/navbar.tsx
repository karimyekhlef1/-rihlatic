'use client';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { CircleUserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';

import Image from 'next/image';
import logo from '@/public/images/logo.svg';
import { env } from 'process';
import LinkNav from './linkNav';
import navbarItems from '@/app/Data/navbar';
import { NavbarItem } from '@/app/Types/Common/navLink';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store/store';
import { openDialogSignUp } from '@/lib/store/custom/mainSlices/dialogSlice';
import SignUpDialog from '@/app/commonComponents/signupComponent';
import { useRouter } from 'next/navigation';
import { storageUtils } from '@/utils/localStorage';
import { logoutUser } from '@/lib/store/api/logout/logoutSlice';
import { clearSinginState } from '@/lib/store/api/signin/signinSlice';
import { toast } from 'sonner';

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const isDialogOpen = useSelector(
    (state: RootState) => state.dialog.isDetailOpen
  );

  const { success, userData, isInitialized } = useSelector(
    (state: RootState) => state.signIn
  );

  const handleOpenDialogSignUp = () => {
    dispatch(openDialogSignUp());
  };

  const router = useRouter();

  const handleLogout = async () => {
    try {
      const token = storageUtils.getToken();

      if (!token) {
        console.log('No token found, redirecting...');
        storageUtils.clearAuth();
        dispatch(clearSinginState());
        router.push('/');
        return;
      }

      const result = await dispatch(logoutUser(token)).unwrap();
      console.log('Logout successful:', result);
      toast.success('Logout successful!');

      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Optionally clear token on error if you want to force logout
      storageUtils.clearAuth();
      dispatch(clearSinginState());
      router.push('/');
    }
  };

  return (
    <Disclosure as="nav" className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Image
                alt={env.NEXT_APP_NAME || ''}
                src={logo.src}
                width={60}
                height={60}
              />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navbarItems.map((item: NavbarItem, index: number) => {
                return (
                  <LinkNav
                    name={item.name}
                    key={index}
                    isSelected={item.isSelected}
                    route={item.route}
                  />
                );
              })}
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            {isInitialized && success && userData ? (
              // Profile dropdown for logged in users
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <div className="flex gap-2 items-center">
                      <Image
                        alt="profile"
                        src={userData?.user.avatar}
                        className="h-8 w-8 rounded-full"
                        height={50}
                        width={50}
                      />
                      <span className="text-black font-medium">
                        {userData?.user.username || 'User'}
                      </span>
                    </div>
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Your Profile
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Sign out
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              // Sign in button for non-logged in users
              <Button variant={'login'} onClick={handleOpenDialogSignUp}>
                <CircleUserRound className="h-5 w-5 mr-2" />
                Sign-in
              </Button>
            )}
            <SignUpDialog />
          </div>
        </div>
      </div>
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 pb-4 pt-2">
          {navbarItems.map((item: NavbarItem, index: number) => {
            return (
              <DisclosureButton
                key={index}
                as="a"
                href={item.route}
                className={`block py-2 pl-3 pr-4 text-base font-medium ${item.isSelected ? 'border-l-4 bg-indigo-50  border-indigo-500 text-indigo-700' : ''}`}
              >
                {item.name}
              </DisclosureButton>
            );
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
