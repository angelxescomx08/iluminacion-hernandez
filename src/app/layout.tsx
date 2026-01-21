import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { Header } from "./_components/header";

export const metadata: Metadata = {
	title: "Iluminación Hernández",
	description: "Tienda de iluminación",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html className={`${geist.variable}`} lang="es">
			<body>
				<TRPCReactProvider>
					<Header />
					<main className="min-h-[calc(100vh-4rem)]">{children}</main>
				</TRPCReactProvider>
			</body>
		</html>
	);
}
