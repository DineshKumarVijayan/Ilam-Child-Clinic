import { getPhoneUrl, getWhatsAppUrl } from "@/lib/site-config";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";

export function FloatingActions() {
  return (
    <>
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book appointment on WhatsApp"
        className="fixed bottom-24 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition hover:scale-105 hover:bg-[#1fb855] sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
      >
        <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
      </a>

      <a
        href={getPhoneUrl()}
        aria-label="Call clinic"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-medical-blue text-white shadow-lg shadow-medical-blue/40 transition hover:scale-105 hover:bg-medical-blue-dark md:hidden"
      >
        <PhoneIcon className="h-6 w-6" />
      </a>
    </>
  );
}
