import mainNavbarItems from '@/app/Data/main-navbar';
import { NavbarItem } from '@/app/Types/Common/navLink';
import LinkNav from '@/app/Layout/Header/Navbar/linkNav';
import InfoCard from '@/components/Main/info-card';

export default function MainNavbar() {
  return (
    <div className="h-full overflow-x-auto flex flex-col items-center justify-between bg-white drop-shadow-xl">
      <div className="flex py-6">
        <InfoCard />
      </div>

      <div className="flex h-[3.5rem] gap-4 text-nowrap md:ml-6 md:space-x-10">
        {/* To fix the clipping issue of the first item when scrolling on mobile */}
        <div className="block md:hidden w-24"></div> {/* Spacer element */}
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
