import React from "react"
import type { Metadata, Viewport } from "next";
import { Pacifico, Poppins, Dancing_Script } from "next/font/google";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pacifico",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing",
});

export const metadata: Metadata = {
  title: "Happy Birthday! 🎂",
  description: "A special birthday surprise made with love",
};

export const viewport: Viewport = {
  themeColor: "#f2c4ce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${pacifico.variable} ${dancingScript.variable} font-sans antialiased`}
      >
        {children}
        <audio
  src="/music.mpeg"
  autoPlay
  loop
  controls
  className="fixed bottom-4 right-4 z-50 opacity-80"
/>

      </body>
    </html>
  );
}
