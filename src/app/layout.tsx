import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Script from "next/script";
import { Suspense } from "react";
import { Navbar } from "@/customComponents";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Travel Advisor",
  description: "AI Travel Web App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Script
          src="https://kit.fontawesome.com/42d341f801.js"
          crossOrigin="anonymous"
        />
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
