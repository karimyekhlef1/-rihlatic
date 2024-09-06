import { NavbarItem } from '@/app/Types/Common/navLink';

const navbarItems: NavbarItem[] = [
  { name: 'Home', route: '/home', isSelected: true },
  { name: 'Packages', route: '/packages', isSelected: false },
  { name: 'Hotels', route: '/hotels', isSelected: false },
  { name: 'Vols', route: '/vols', isSelected: false },
  { name: 'Omras', route: '/omrats', isSelected: false },
];

export default navbarItems;
