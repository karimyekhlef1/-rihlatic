import navbarItems from '@/app/Data/navbar';
import { NavbarItem } from '@/app/Types/Common/navLink';
import LinkNav from '../Header/Navbar/linkNav';

export default function MainNavbar() {
  return (
    <div className="h-full flex flex-col items-center justify-between bg-white drop-shadow-xl">
      <div className="flex py-6">
        <div className="flex gap-4 items-center">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="h-8 w-8 rounded-full"
          />
          <span className="text-black text-lg font-semibold">
            yakoubbatouche21@gmail.com
          </span>
        </div>
      </div>

      <div className="hidden gap-10 sm:ml-6 sm:flex sm:space-x-8">
        {navbarItems.map((item: NavbarItem, index: number) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <LinkNav name={item.name} isSelected={item.isSelected} route="" />
          );
        })}
      </div>
    </div>
  );
}
