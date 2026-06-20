import type { ComponentType } from "react";
import {
  Baby,
  CalendarCheck,
  Clock,
  Heart,
  HeartHandshake,
  HeartPulse,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Stethoscope,
  Syringe,
  User,
  Users,
} from "lucide-react";
import { siteConfig, getWhatsAppUrl, getPhoneUrl } from "@/lib/site-config";
import { HeroPhoto, SafeImg } from "@/components/HeroMedia";
import { WhatsAppIcon } from "@/components/icons";

const iconByName: Record<string, ComponentType<{ className?: string }>> = {
  doctor: Stethoscope,
  syringe: Syringe,
  handheart: HeartHandshake,
  heart: Heart,
  baby: Baby,
  shield: ShieldCheck,
  family: Users,
  pulse: HeartPulse,
  phone: Phone,
};

export function Hero() {
  const { hero, timings, doctors, googleRating } = siteConfig;

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-medical-teal-light/40 via-white to-white"
    >
      <div className="pointer-events-none absolute -right-24 top-12 h-72 w-72 rounded-full bg-medical-teal/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 top-40 h-72 w-72 rounded-full bg-medical-blue/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
          {/* LEFT */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-medical-teal/20 bg-white px-4 py-1.5 text-xs font-semibold text-medical-teal shadow-sm">
              <ShieldCheck className="h-4 w-4" />
              {hero.badge}
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.3rem] xl:text-6xl">
              {hero.headingLine1}
              <br />
              <span className="text-medical-teal">{hero.headingLine2}</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-slate-600 sm:text-lg">
              {hero.subtext}
            </p>

            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-4 sm:mt-8 sm:gap-y-5">
              {hero.highlights.map((item) => {
                const Icon = iconByName[item.icon];
                return (
                  <li key={item.label} className="flex w-24 flex-col items-center gap-2 text-center sm:items-start sm:text-left">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-medical-teal/10 text-medical-teal">
                      {Icon && <Icon className="h-5 w-5" />}
                    </span>
                    <span className="text-xs font-medium leading-snug text-slate-600">
                      {item.label}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
              <a
                href={getPhoneUrl()}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-medical-teal px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-medical-teal/30 transition hover:bg-medical-teal-dark"
              >
                <CalendarCheck className="h-5 w-5" />
                Book Appointment
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-medical-teal/30 bg-white px-7 py-3.5 text-base font-semibold text-medical-teal transition hover:border-medical-teal/50 hover:bg-medical-teal/5"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Book via WhatsApp
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative lg:flex lg:items-center">
            {/* hero image */}
            <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none lg:flex-1">
              {/* decorative shapes */}
              <Star className="absolute -left-2 top-2 z-10 h-6 w-6 text-medical-teal/30" />
              <Heart className="absolute right-10 top-0 z-10 h-5 w-5 text-amber-300" />
              <Heart className="absolute -left-4 bottom-24 z-10 h-5 w-5 text-medical-teal/40" />

              <div
                className="relative aspect-[6/5] w-full overflow-hidden bg-white shadow-2xl shadow-slate-900/10 ring-1 ring-slate-100"
                style={{ borderRadius: "47% 53% 56% 44% / 46% 44% 56% 54%" }}
              >
                <HeroPhoto src={hero.image} alt={hero.imageAlt} />
              </div>

              {/* family badge */}
              <div className="absolute -bottom-3 left-2 z-20 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-2.5 shadow-lg ring-1 ring-slate-100 backdrop-blur sm:left-6">
                <SafeImg
                  src={hero.familyBadge.avatar}
                  alt="Happy families"
                  className="h-9 w-auto object-contain"
                />
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    {hero.familyBadge.label}
                  </p>
                  <p className="text-amber-400" aria-label="5 star rating">
                    ★★★★★
                  </p>
                </div>
              </div>
            </div>

            {/* floating stats + clinic hours card */}
            <div className="relative z-30 mt-8 w-full rounded-3xl border border-slate-100 bg-white p-4 shadow-2xl shadow-medical-blue/10 sm:mt-12 lg:mt-0 lg:-ml-6 lg:w-[290px] lg:shrink-0">
              <div className="grid grid-cols-2 gap-3">
                <StatTile icon={User} value={String(doctors.length)} label="Pediatricians" />
                <StatTile
                  icon={Star}
                  iconClass="text-amber-400"
                  value={`${googleRating}/5`}
                  label="Google Rating"
                />
              </div>

              <div className="mt-3 flex items-start gap-3 rounded-2xl bg-slate-50 p-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-medical-blue/10 text-medical-blue">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Vanagaram, Chennai
                  </p>
                  <p className="text-xs text-slate-500">{hero.locationNote}</p>
                </div>
              </div>

              <div className="relative mt-3 rounded-2xl bg-medical-teal p-4 text-white">
                <p className="flex items-center gap-1.5 text-sm font-medium text-white/85">
                  <Clock className="h-4 w-4" />
                  Clinic Hours
                </p>
                <p className="mt-2 text-sm font-semibold">{timings[0].day}</p>
                <p className="text-sm text-white/90">{timings[0].hours}</p>
                <p className="mt-1.5 text-sm font-semibold">{timings[1].day}</p>
                <p className="text-sm text-white/90">{timings[1].hours}</p>
                <a
                  href="#timings"
                  className="mt-3 inline-flex text-sm font-semibold underline decoration-white/40 underline-offset-4 transition hover:decoration-white"
                >
                  View all timings →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM FEATURE STRIP */}
        <div className="relative z-10 mt-8 grid gap-x-6 gap-y-5 rounded-3xl border border-slate-100 bg-white/90 p-6 shadow-xl shadow-medical-blue/5 backdrop-blur sm:mt-12 sm:grid-cols-2 sm:p-8 lg:mt-16 lg:grid-cols-5 lg:divide-x lg:divide-slate-100">
          {hero.features.map((feature) => {
            const Icon = iconByName[feature.icon];
            return (
              <div key={feature.title} className="flex items-start gap-3 lg:px-4 lg:first:pl-0 lg:last:pr-0">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-medical-teal/10 text-medical-teal">
                  {Icon && <Icon className="h-5 w-5" />}
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-900">{feature.title}</p>
                  <p className="mt-0.5 text-xs leading-snug text-slate-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StatTile({
  icon: Icon,
  iconClass = "text-medical-blue",
  value,
  label,
}: {
  icon: ComponentType<{ className?: string }>;
  iconClass?: string;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3">
      <span className={`inline-flex h-7 w-7 items-center justify-center ${iconClass}`}>
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-1 text-xl font-bold text-slate-900">{value}</p>
      <p className="text-xs font-medium text-slate-500">{label}</p>
    </div>
  );
}
