import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "../providers/Providers";
import NavBar from "../components/sections/NavBar";
import Script from "next/script";
import type { Viewport } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Salah Tracker",
  description: "Track your salah",
  manifest: "/manifest.json",
  // https://uxwing.com/secure-date-calendar-icon/
  icons: "/secure-date-calendar-icon.png",
};

export const viewport: Viewport = {
  themeColor: "black",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script src="/register-sw.js" />
      <body className={`h-screen ${inter}`}>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
