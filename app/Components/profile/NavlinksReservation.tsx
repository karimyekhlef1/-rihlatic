import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

// Navigation links with routes
const links = [
  { name: 'Flights', route: '/reservations/flights' },
  { name: 'Packages', route: '/reservations/packages' },
  { name: 'Hotels', route: '/reservations/hotels' },
  { name: 'Omra', route: '/reservations/omra' },
];

function isActiveLink(pathname: string , route : string): boolean {
  const pathPart = pathname.split('/')[3]
  const routePart = route.split('/')[2]
  return routePart === pathPart
}
export default function NavlinksReservation() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <div className="h-full flex-col items-center flex pt-8 pb-8 bg-[#f8f8f8]">
      <div className="flex flex-col gap-y-3 md:flex-row gap-x-4">
        {links.map((link) => {
          return (
            <Button
              key={link.route}
              className="w-full px-32 md:px-10 h-10"
              variant={isActiveLink(pathname , link.route) ? 'rihlatic' : 'rihlatic2'}
              onClick={() => handleNavigation(link.route)}
            >
              {link.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
