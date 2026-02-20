import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

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
      <body>
        <Navbar />
        {/* This is the missing piece that gives margins + layout everywhere */}
        <main className="site-main page">{children}</main>
      </body>
    </html>
  );
}