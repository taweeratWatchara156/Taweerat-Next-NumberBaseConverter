import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Number Base Converter",
  description: "",
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
