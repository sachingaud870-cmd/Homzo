import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

const themeScript = `
  (function () {
    try {
      var theme = localStorage.getItem("homzo-theme");
      if (theme !== "light" && theme !== "dark") {
        theme = "dark";
      }
      document.documentElement.setAttribute("data-theme", theme);
    } catch (error) {}
  })();
`;

export const metadata: Metadata = {
  title: "Homzo",
  description: "Luxury real estate, modern living, and smarter property decisions.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (

    <html
      lang="en"
      className="scroll-smooth"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >

      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>

      <body className={`${inter.variable} ${instrumentSerif.variable}`}>
        <Navbar />

        {children}

      </body>

    </html>

  );

}
