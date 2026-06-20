import { getPhoneUrl, getWhatsAppUrl, siteConfig } from "@/lib/site-config";
import { InstagramIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center gap-3 sm:bottom-6 sm:right-6">
      <a
        href={siteConfig.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow us on Instagram"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white shadow-lg shadow-[#d62976]/40 transition hover:scale-105 sm:h-16 sm:w-16"
      >
        <InstagramIcon className="h-6 w-6 sm:h-7 sm:w-7" />
      </a>

      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book appointment on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition hover:scale-105 hover:bg-[#1fb855] sm:h-16 sm:w-16"
      >
        <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
      </a>

      <a
        href={getPhoneUrl()}
        aria-label="Call clinic"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-medical-blue text-white shadow-lg shadow-medical-blue/40 transition hover:scale-105 hover:bg-medical-blue-dark md:hidden"
      >
        <PhoneIcon className="h-6 w-6" />
      </a>
    </div>
  );
}
