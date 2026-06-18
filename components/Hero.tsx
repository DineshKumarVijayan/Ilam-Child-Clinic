import { siteConfig, getWhatsAppUrl, getPhoneUrl } from "@/lib/site-config";
import { CheckIcon, PhoneIcon } from "@/components/icons";

const highlights = [
  "Experienced pediatric specialists",
  "Vaccination centre with child-friendly care",
  "Easy appointment booking via WhatsApp",
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-medical-blue-light via-white to-medical-teal-light"
    >
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-medical-teal/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-medical-blue/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
        <div>
          <span className="inline-flex items-center rounded-full border border-medical-teal/20 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-medical-teal shadow-sm">
            Trusted Pediatric Care · Chennai
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]">
            Caring for your child&apos;s{" "}
            <span className="bg-gradient-to-r from-medical-blue to-medical-teal bg-clip-text text-transparent">
              health &amp; happiness
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            {siteConfig.tagline}. From newborn check-ups to vaccinations and
            adolescent care, we provide compassionate pediatric services for every
            stage of childhood.
          </p>

          <ul className="mt-8 space-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-3 text-slate-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-medical-teal/15 text-medical-teal">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-medium sm:text-base">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-medical-teal px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-medical-teal/30 transition hover:bg-medical-teal-dark"
            >
              Book Appointment
            </a>
            <a
              href={getPhoneUrl()}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-medical-blue/20 bg-white px-8 py-3.5 text-base font-semibold text-medical-blue transition hover:border-medical-blue/40 hover:bg-medical-blue/5"
            >
              <PhoneIcon className="h-5 w-5" />
              {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-2xl shadow-medical-blue/10 backdrop-blur-sm sm:p-8">
            <div className="grid grid-cols-2 gap-4">
              <StatCard label="Pediatricians" value="2" />
              <StatCard label="Google Rating" value={`${siteConfig.googleRating}/5`} />
              <StatCard label="Location" value="Chennai" />
              <StatCard label="Services" value="5" accent />
            </div>

            <div className="mt-6 rounded-2xl bg-gradient-to-br from-medical-blue to-medical-teal p-6 text-white">
              <p className="text-sm font-medium text-white/80">Clinic hours</p>
              <p className="mt-1 text-lg font-semibold">
                Mon–Sat · 1 PM – 10 PM
              </p>
              <p className="mt-1 text-sm text-white/90">Sun · 10 AM – 1 PM</p>
              <a
                href="#timings"
                className="mt-4 inline-flex text-sm font-semibold underline decoration-white/40 underline-offset-4 transition hover:decoration-white"
              >
                View clinic timings →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-4 ${
        accent
          ? "bg-medical-teal/10 text-medical-teal"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      <p className="text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
    </div>
  );
}
