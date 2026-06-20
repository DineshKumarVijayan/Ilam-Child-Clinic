import { siteConfig, getWhatsAppUrl, getPhoneUrl } from "@/lib/site-config";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-white">{siteConfig.name}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white">
              Quick Links
            </p>
            <ul className="mt-4 space-y-2">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 transition hover:text-medical-teal-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white">
              Contact
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>
                <a
                  href={getPhoneUrl()}
                  className="flex items-start gap-2.5 transition hover:text-medical-teal-light"
                >
                  <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-medical-teal-light" />
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-2.5 transition hover:text-medical-teal-light"
                >
                  <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-medical-teal-light" />
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-medical-teal-light" />
                <span>
                  {siteConfig.address.line1}
                  <br />
                  {siteConfig.address.line2}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 sm:mt-10 sm:flex-row sm:pt-8">
          <p className="text-sm text-slate-500">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-medical-teal-light transition hover:text-white"
          >
            Book via WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
