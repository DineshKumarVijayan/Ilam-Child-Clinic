"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig, getWhatsAppUrl } from "@/lib/site-config";
import {
  ActivityIcon,
  CalendarIcon,
  ChevronDownIcon,
  CloseIcon,
  ClockIcon,
  GridIcon,
  HomeIcon,
  MailIcon,
  MenuIcon,
  QuestionIcon,
  StarIcon,
  StethoscopeIcon,
} from "@/components/icons";
import { GrowthCheckTool } from "@/components/GrowthCheckTool";

const navIconMap: Record<string, ComponentType<{ className?: string }>> = {
  "#home": HomeIcon,
  "#doctor": StethoscopeIcon,
  "#services": GridIcon,
  "#timings": ClockIcon,
  "#reviews": StarIcon,
  "#faq": QuestionIcon,
  "#contact": MailIcon,
};

const tools = [{ label: "Growth Checker Tool", icon: ActivityIcon }];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [growthCheckOpen, setGrowthCheckOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!toolsOpen) return;
    const onClickOutside = (event: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [toolsOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md will-change-transform">
      <div className="mx-auto flex max-w-[1480px] items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="#home" className="logo-link group flex items-center gap-3">
          <Image
            src={siteConfig.logo}
            alt={`${siteConfig.shortName} logo`}
            width={213}
            height={128}
            className="logo-img block h-16 w-auto shrink-0 sm:h-20"
            priority
          />
          <div className="hidden min-[420px]:block">
            {/* Compact stacked lockup — used while the nav needs the room (below 2xl). */}
            <div className="2xl:hidden">
              <p className="font-baloo text-xl font-bold leading-none tracking-tight text-medical-teal sm:text-2xl">
                ILAM
              </p>
              <p className="mt-0.5 max-w-[170px] font-cinzel text-[11px] font-semibold leading-tight tracking-wide text-slate-900 sm:text-xs">
                Child Clinic &amp; Vaccination Centre
              </p>
              <p className="mt-0.5 text-[11px] text-slate-500 sm:text-xs">
                Vanagaram, Chennai
              </p>
            </div>

            {/* Wide single-line wordmark — only once there's enough room at 2xl+. */}
            <div className="hidden 2xl:block">
              <div className="flex items-center gap-2">
                <p className="font-baloo whitespace-nowrap text-2xl font-bold leading-none tracking-tight text-medical-teal sm:text-[1.75rem]">
                  ILAM
                </p>
                <p className="font-cinzel whitespace-nowrap text-xs font-semibold leading-none tracking-wide text-slate-900 sm:text-sm">
                  Child Clinic &amp; Vaccination Centre
                </p>
              </div>
              <p className="mt-1.5 text-[11px] leading-none text-slate-500 sm:text-xs">
                Vanagaram, Chennai
              </p>
            </div>
          </div>
        </Link>

        <nav className="hidden flex-1 items-center justify-evenly gap-4 xl:flex">
          {siteConfig.navLinks.map((link) => {
            const Icon = navIconMap[link.href];
            return (
              <a
                key={link.href}
                href={link.href}
                className="group flex flex-col items-center gap-1 whitespace-nowrap text-xs font-medium text-slate-600 transition-colors hover:text-medical-blue"
              >
                {Icon && (
                  <Icon className="h-5 w-5 text-medical-blue/60 transition-colors group-hover:text-medical-blue" />
                )}
                {link.label}
              </a>
            );
          })}

          <div ref={toolsRef} className="relative">
            <button
              type="button"
              onClick={() => setToolsOpen((openState) => !openState)}
              aria-expanded={toolsOpen}
              className="group flex flex-col items-center gap-1 whitespace-nowrap text-xs font-medium text-slate-600 transition-colors hover:text-medical-blue"
            >
              <ActivityIcon className="h-5 w-5 text-medical-blue/60 transition-colors group-hover:text-medical-blue" />
              <span className="flex items-center gap-0.5">
                Parent Tools
                <ChevronDownIcon
                  className={`h-3 w-3 text-slate-400 transition-transform ${toolsOpen ? "rotate-180" : ""}`}
                />
              </span>
            </button>

            {toolsOpen && (
              <div className="absolute left-1/2 top-full z-20 mt-2 w-56 -translate-x-1/2 overflow-hidden rounded-2xl border border-slate-100 bg-white py-2 shadow-xl shadow-slate-900/10">
                {tools.map((tool) => (
                  <button
                    key={tool.label}
                    type="button"
                    onClick={() => {
                      setToolsOpen(false);
                      setGrowthCheckOpen(true);
                    }}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-medical-teal/10 hover:text-medical-teal"
                  >
                    <tool.icon className="h-4 w-4 text-medical-teal" />
                    {tool.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="ml-auto hidden shrink-0 xl:block">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-medical-teal px-3.5 py-2 text-sm font-semibold text-white shadow-sm shadow-medical-teal/20 transition hover:bg-medical-teal-dark"
          >
            <CalendarIcon className="h-3.5 w-3.5" />
            Book Appointment
          </a>
        </div>

        <button
          type="button"
          className="ml-auto inline-flex rounded-xl p-2 text-slate-700 transition hover:bg-slate-100 xl:hidden"
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
        <div className="border-t border-slate-200 bg-white px-4 py-4 xl:hidden">
          <nav className="flex flex-col gap-1">
            {siteConfig.navLinks.map((link) => {
              const Icon = navIconMap[link.href];
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="group flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-medical-blue"
                  onClick={() => setMobileOpen(false)}
                >
                  {Icon && (
                    <Icon className="h-4 w-4 text-medical-blue/60 transition-colors group-hover:text-medical-blue" />
                  )}
                  {link.label}
                </a>
              );
            })}

            <p className="mt-2 px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Parent Tools
            </p>
            {tools.map((tool) => (
              <button
                key={tool.label}
                type="button"
                className="group flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-medical-blue"
                onClick={() => {
                  setMobileOpen(false);
                  setGrowthCheckOpen(true);
                }}
              >
                <tool.icon className="h-4 w-4 text-medical-blue/60 transition-colors group-hover:text-medical-blue" />
                {tool.label}
              </button>
            ))}

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-medical-teal px-5 py-3 text-sm font-semibold text-white"
              onClick={() => setMobileOpen(false)}
            >
              <CalendarIcon className="h-4 w-4" />
              Book Appointment
            </a>
          </nav>
        </div>
      )}

      <GrowthCheckTool open={growthCheckOpen} onClose={() => setGrowthCheckOpen(false)} />
    </header>
  );
}
