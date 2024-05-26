import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "./components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "TomatoEgg",
	description: "Travel Web App codenamed tomatoEgg",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	);
}
