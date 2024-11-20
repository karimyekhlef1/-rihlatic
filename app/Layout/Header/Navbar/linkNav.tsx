'use client'
import { NavbarItem } from '@/app/Types/Common/navLink';
import React from 'react';
import { usePathname } from 'next/navigation';
interface LinkNavProps extends NavbarItem {
  onClick?: () => void;
}

const getSecondPathSegment = (pathname: string): string => {
  return pathname.split('/')[2] ?? '';
};
const LinkNav: React.FC<LinkNavProps> = ({
  name,
  route,
  isSelected,
  onClick,
}) => {
  const pathname = usePathname();
  const secondSegment = getSecondPathSegment(pathname);
  const isCurrentPath = secondSegment.toLowerCase() === route.split('/')[1].toLowerCase();

  return (
    <a
      href={route}
      onClick={onClick}
      className={`inline-flex items-center ${isCurrentPath ? 'text-[#FF8000] border-b-2 border-[#FF8000]' : 'text-gray-500'} px-1 pt-1 text-sm font-semibold`}
    >
      {name}
    </a>
  );
};

export default LinkNav;
