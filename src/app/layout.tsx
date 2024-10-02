import type { Metadata, Viewport } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Number Base Converter",
  description: "",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
};

const inter = Inter({
  subsets: [
    "latin"
  ],
  weight: "300",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`main-bg w-screen h-screen  ${inter.className} overflow-x-hidden`}> 
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
