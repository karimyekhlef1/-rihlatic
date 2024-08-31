import { NavbarItem } from '@/app/Types/Common/navLink';
import React from 'react';

interface LinkNavProps extends NavbarItem {
  onClick: () => void;
}

const LinkNav: React.FC<LinkNavProps> = ({
  name,
  route,
  isSelected,
  onClick,
}) => {
  return (
    <a
      href="#"
      onClick={onClick}
      className={`inline-flex items-center ${isSelected ? 'text-[#FF8000] border-b-2 border-[#FF8000]' : 'text-gray-500'} px-1 pt-1 text-sm font-semibold`}
    >
      {name}
    </a>
  );
};

export default LinkNav;
