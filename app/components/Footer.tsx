import Link from "next/link";
import { wordmarkFont } from "@/lib/fonts";

const CONTACT_EMAIL = "emily.meden@gmail.com";
// Paste the full LinkedIn profile URL here; the LinkedIn link shows only when set.
const LINKEDIN_URL = "";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-10 bg-[#0a1f44] text-white">
      {/* thin brand accent along the top edge */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[var(--aicarus-blue)] via-[var(--aicarus-blue-dark)] to-[var(--aicarus-accent)]" />

      <div className="mx-auto max-w-5xl px-6 py-14 md:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              href="/"
              className={`${wordmarkFont.className} text-[28px] tracking-[0.12em] text-white leading-none`}
            >
              Aicarus
            </Link>
            <p className="mt-4 text-sm leading-6 text-white/65">
              Making AI policy technically grounded and enforceable
            </p>
          </div>

          {/* Contact */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
              Contact
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="group inline-flex items-center gap-3 text-white/85 transition-colors hover:text-white"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-[var(--aicarus-blue)]">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {CONTACT_EMAIL}
                </a>
              </li>
              {LINKEDIN_URL && (
                <li>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-white/85 transition-colors hover:text-white"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-[var(--aicarus-blue)]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 21 11.2 21 14.5V21h-4v-5.8c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.5-2.25 3.1V21H9z" />
                      </svg>
                    </span>
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/45">
          © {year} Aicarus. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
