import { NavbarItem } from '@/app/Types/Common/navLink';

const navbarItems: NavbarItem[] = [
    { name: "Home", route: "/", isSelected: true },
    { name: "Packages", route: "/about", isSelected: false },
    { name: "Hotels", route: "/services", isSelected: false },
    { name: "Vols", route: "/vols", isSelected: false },
    { name: "Omras", route: "/omrats", isSelected: false },
];

export default navbarItems;