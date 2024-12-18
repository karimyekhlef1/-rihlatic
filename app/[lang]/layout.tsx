import type { Metadata } from "next";
import localFont from "next/font/local";
// import { Poppins } from 'next/font/google';
import "./globals.css";
import "./index.scss";
import { Providers } from "@/lib/Providers";
import { Toaster } from "@/components/ui/sonner";
import { store } from "@/lib/store/store";

const poppins = localFont({
  src: [
    {
      path: "../../public/fonts/Poppins-Thin.ttf",
      weight: "100",
    },
    {
      path: "../../public/fonts/Poppins-ExtraLight.ttf",
      weight: "200",
    },
    {
      path: "../../public/fonts/Poppins-Light.ttf",
      weight: "300",
    },
    {
      path: "../../public/fonts/Poppins-Regular.ttf",
      weight: "400",
    },
    {
      path: "../../public/fonts/Poppins-Medium.ttf",
      weight: "500",
    },
    {
      path: "../../public/fonts/Poppins-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "../../public/fonts/Poppins-Bold.ttf",
      weight: "700",
    },
    {
      path: "../../public/fonts/Poppins-ExtraBold.ttf",
      weight: "800",
    },
    {
      path: "../../public/fonts/Poppins-Black.ttf",
      weight: "900",
    },
  ],
  variable: "--font-poppins",
});

const rubik = localFont({
  src: [
    {
      path: "../../public/fonts/Rubik-Regular.ttf",
      weight: "400",
    },
    {
      path: "../../public/fonts/Rubik-Medium.ttf",
      weight: "500",
    },
    {
      path: "../../public/fonts/Rubik-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "../../public/fonts/Rubik-Bold.ttf",
      weight: "700",
    },
  ],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "Rihlatic",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${rubik.variable} font-sans`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
