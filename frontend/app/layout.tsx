import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";


export const metadata: Metadata = {
  title: "PropVerse",
  description: "Property Management Platform",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (

    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">

      <body>


        <Navbar />


        {children}


      </body>

    </html>

  );

}