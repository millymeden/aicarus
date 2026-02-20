import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "./components/Navbar";
import NewsletterGate from "./components/NewsletterGate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aicarus",
  description: "AI Safety",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
    
        className={`${geistSans.variable} ${geistMono.variable} antialiased aicarus-page`}
      >
        <Navbar />

        <main className="site-main page">{children}</main>

        <NewsletterGate />
      </body>
    </html>
  );
}