"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinkClass =
  "text-[20px] font-medium text-gray-800 tracking-wide " +
  "transition-all duration-200 ease-out " +
  "hover:text-blue-600 hover:-translate-y-[1px] " +
  "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full " +
  "after:origin-left after:scale-x-0 after:rounded-full after:bg-blue-600 " +
  "after:transition-transform after:duration-200 after:ease-out " +
  "hover:after:scale-x-100";

const mobileLinkClass =
  "block w-full rounded-md px-7 py-3 text-sm font-medium text-white/90 " +
  "hover:bg-white/10 hover:text-white transition-colors";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav className="bg-white border-b border-gray-200/70 relative">
      {/* subtle high-tech top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="flex items-center px-6 py-2">
        {/* Left group */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center leading-none shrink-0">
            <Image
              src="/logo.png"
              alt="Aicarus Logo"
              width={1036}
              height={704}
              className="block h-35 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8 whitespace-nowrap">
            <li>
              <Link href="/about" className={navLinkClass}>
                About
              </Link>
            </li>
           
            <li>
              <Link href="/basics" className={navLinkClass}>
                The Basics
              </Link>
            </li>
             <li>
              <Link href="/blog" className={navLinkClass}>
                Making Sense of AI?
              </Link>
            </li>
            <li>
              <Link href="/visual" className={navLinkClass}>
                Where Are We Now?
              </Link>
            </li>
          </ul>
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center">
          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-lg p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {/* Prettier high-tech hamburger (more spacing) */}
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 7H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M5 17H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile overlay + right floating panel */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* dim overlay (click to close) */}
          <button
            aria-label="Close menu overlay"
            className="absolute inset-0 bg-black/20"
            onClick={() => setOpen(false)}
          />

          {/* floating panel (only as tall as needed) */}
          <div className="absolute right-3 top-3 w-1/2 min-w-[240px] max-w-[360px]">
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-950/60 backdrop-blur-md shadow-2xl">
              {/* subtle left-edge glow */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-blue-400/50 via-blue-500/25 to-transparent" />

              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <span className="text-sm font-semibold tracking-wide text-white/90">
                  Menu
                </span>

                <button
                  aria-label="Close menu"
                  className="rounded-md p-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 6L18 18M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="px-4 py-4 space-y-1">
                <Link href="/about" className={mobileLinkClass}>
                  About
                </Link>
                
                <Link href="/basics" className={mobileLinkClass}>
                  The Basics
                </Link>
                <Link href="/blog" className={mobileLinkClass}>
                  Making Sense of AI?
                </Link>
                <Link href="/visual" className={mobileLinkClass}>
                  Where Are We Now?
                </Link>
              </div>

              <div className="px-5 py-4 border-t border-white/10">
                <p className="text-xs text-white/50">
                  Aicarus — AI safety, clearly explained.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}