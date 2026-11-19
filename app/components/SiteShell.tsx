"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import NewsletterSignup from "./NewsletterSignup";

// Newsletter signup is hidden everywhere for now. The component and the
// /api/subscribe endpoint are untouched; set this to true to bring it back.
const SHOW_NEWSLETTER = false;

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Admin pages are completely self-contained — skip all site chrome
  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  // Hide newsletter on Basics + Visual pages
  const hideNewsletter = pathname === "/basics" || pathname === "/visual";

  // The home page lays out its own full-width sections (e.g. the hero)
  if (pathname === "/") {
    return (
      <>
        <Navbar />
        <main>
          {children}
          {SHOW_NEWSLETTER && (
            <div className="site-main pb-14">
              <NewsletterSignup />
            </div>
          )}
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="site-main page">
        {children}
        {SHOW_NEWSLETTER && !hideNewsletter && <NewsletterSignup />}
      </main>
    </>
  );
}