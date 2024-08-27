import mainNavbarItems from '@/app/Data/main-navbar';
import { NavbarItem } from '@/app/Types/Common/navLink';
import LinkNav from '@/app/Layout/Header/Navbar/linkNav';
import InfoCard from '@/components/Main/info-card';

export default function MainNavbar() {
  return (
    <div className="h-full flex flex-col items-center justify-between bg-white drop-shadow-xl">
      <div className="flex py-6">
        <InfoCard />
      </div>

      <div className="flex h-[3.5rem] gap-5 sm:ml-6 sm:flex sm:space-x-8">
        {mainNavbarItems.map((item: NavbarItem, index: number) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <LinkNav name={item.name} isSelected={item.isSelected} route="" />
          );
        })}
      </div>
    </div>
  );
}
