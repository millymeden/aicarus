"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import NewsletterSignup from "./NewsletterSignup";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide newsletter on Basics + Visual pages
  const hideNewsletter = pathname === "/basics" || pathname === "/visual";

  return (
    <>
      <Navbar />
      <main className="site-main page">
        {children}
        {!hideNewsletter && <NewsletterSignup />}
      </main>
    </>
  );
}