import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Belles Offres - Marketplace Afrique",
  description: "Marketplace de mise en relation directe via WhatsApp",
  applicationName: "Belles Offres",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Belles Offres",
  },
  formatDetection: {
    telephone: false,
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} antialiased bg-white text-black dark:bg-black dark:text-white`}>
        {children}
      </body>
    </html>
  );
}
