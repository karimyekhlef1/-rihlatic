import Image from 'next/image';
import logo from '@/public/images/logo.svg';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';

const rihlatic_services = [
  { name: 'Real estates ads', href: '#' },
  { name: 'Demands ads', href: '#' },
  { name: 'Free service option', href: '#' },
];

const contact_info = [
  { type: 'phone', value: '0557 85 92 27' },
  { type: 'phone', value: '0542 05 07 15' },
  { type: 'phone', value: '0661 55 89 42' },
  { type: 'email', value: 'Rihlatic@Rihlatic.com' },
];

const social_networks = [
  {
    name: 'Instagram',
    href: '#',
    icon: <FaInstagram size={25} className="text-black" />,
  },
  {
    name: 'Facebook',
    href: '#',
    icon: <FaFacebook size={25} className="text-black" />,
  },
];

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="mb-8 md:mb-0">
            <Image
              alt="Rihlatic"
              src={logo.src}
              width={150}
              height={100}
              className="mb-4"
            />
          </div>

          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Rihlatic services</h3>
            <ul className="space-y-2">
              {rihlatic_services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              {contact_info.map((info, index) => (
                <li key={index} className="text-gray-600">
                  {info.value}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Social network</h3>
            <div className="flex space-x-4">
              {social_networks.map((network) => (
                <a
                  key={network.name}
                  href={network.href}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">{network.name}</span>
                  {network.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-orange-500 py-4 text-center text-white">
        <p className="text-sm">
          Copyright © 2024 Rihlatic. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
