import type { Metadata } from 'next';
import localFont from 'next/font/local';
// import { Poppins } from 'next/font/google';
import './globals.css';
import './index.scss';

// const poppins = Poppins({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-poppins',
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
// });

const poppins = localFont({
  src: [
    {
      path: '../../public/fonts/Poppins-Thin.ttf',
      weight: '100',
    },
    {
      path: '../../public/fonts/Poppins-ExtraLight.ttf',
      weight: '200',
    },
    {
      path: '../../public/fonts/Poppins-Light.ttf',
      weight: '300',
    },
    {
      path: '../../public/fonts/Poppins-Regular.ttf',
      weight: '400',
    },
    {
      path: '../../public/fonts/Poppins-Medium.ttf',
      weight: '500',
    },
    {
      path: '../../public/fonts/Poppins-SemiBold.ttf',
      weight: '600',
    },
    {
      path: '../../public/fonts/Poppins-Bold.ttf',
      weight: '700',
    },
    {
      path: '../../public/fonts/Poppins-ExtraBold.ttf',
      weight: '800',
    },
    {
      path: '../../public/fonts/Poppins-Black.ttf',
      weight: '900',
    },
  ],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Rihlatic',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans`}>{children}</body>
    </html>
  );
}
