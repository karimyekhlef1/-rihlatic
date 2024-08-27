import { NavbarItem } from '@/app/Types/Common/navLink';
import React from 'react';

const LinkNav: React.FC<NavbarItem> = ({ name, route, isSelected }) => {
  return (
    <a
      href="#"
      className={`inline-flex items-center ${isSelected ? 'text-[#FF8000] border-b-2 border-[#FF8000]' : 'text-gray-900'} px-1 pt-1 text-sm font-medium`}
    >
      {name}
    </a>
  );
};

export default LinkNav;
