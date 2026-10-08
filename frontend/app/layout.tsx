import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";

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

function FontLinks() {
  return (
    <>
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
    </>
  );
}


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

      <body>
        <FontLinks />

        <Navbar />

        {children}

      </body>

    </html>

  );

}
