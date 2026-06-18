"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig, getWhatsAppUrl } from "@/lib/site-config";
import { CloseIcon, MenuIcon } from "@/components/icons";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="#home" className="group flex items-center gap-3">
          <Image
            src={siteConfig.logo}
            alt={`${siteConfig.shortName} logo`}
            width={56}
            height={56}
            className="h-12 w-12 rounded-xl object-contain sm:h-14 sm:w-14"
            priority
          />
          <div className="hidden min-[420px]:block">
            <p className="text-sm font-bold leading-tight tracking-tight text-slate-900 sm:text-base">
              {siteConfig.shortName}
            </p>
            <p className="text-[11px] text-slate-500 sm:text-xs">
              Vaccination Centre · Chennai
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {siteConfig.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-medical-blue"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-medical-teal px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-medical-teal/25 transition hover:bg-medical-teal-dark"
          >
            Book Appointment
          </a>
        </div>

        <button
          type="button"
          className="inline-flex rounded-xl p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? (
            <CloseIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {siteConfig.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-medical-blue"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-medical-teal px-5 py-3 text-sm font-semibold text-white"
              onClick={() => setMobileOpen(false)}
            >
              Book Appointment
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
