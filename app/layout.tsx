import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteShell from "./components/SiteShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Aicarus",
  description: "AI safety, clearly explained.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} bg-gradient-to-b from-white to-[#fafbff] text-gray-900 antialiased font-sans`}
      >
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}