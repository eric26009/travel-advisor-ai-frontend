import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "./components";
import Script from "next/script";
import { Suspense } from "react";

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
      <Script
        src="https://kit.fontawesome.com/42d341f801.js"
        crossOrigin="anonymous"
      />
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          {children}
          {/* <Footer /> */}
        </Suspense>
      </body>
    </html>
  );
}
