"use client";

import { usePathname } from "next/navigation";
import NewsletterSignup from "./NewsletterSignup";

export default function NewsletterGate() {
  const pathname = usePathname();

  if (pathname === "/basics" || pathname === "/visual") return null;

  return <NewsletterSignup />;
}