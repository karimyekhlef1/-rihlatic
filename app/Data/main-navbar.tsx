import { NavbarItem } from '@/app/Types/Common/navLink';

const mainNavbarItems: NavbarItem[] = [
  { name: 'My reservations', route: '/reservations', isSelected: true },
  { name: 'Inbox', route: '/inbox', isSelected: false },
  { name: 'Price alerts', route: '/price-alert', isSelected: false },
  { name: 'Preferences', route: '/preferences', isSelected: false },
  { name: 'Account Settings', route: '/profile', isSelected: false },
];

export default mainNavbarItems;
