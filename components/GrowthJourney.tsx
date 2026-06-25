import { siteConfig, getWhatsAppUrl } from "@/lib/site-config";
import { SectionHeading } from "@/components/SectionHeading";
import { PhotoWithFallback } from "@/components/HeroMedia";
import {
  CalendarCheckIcon,
  CheckIcon,
  HeartIcon,
  JourneyIcon,
  LeafIcon,
  LightbulbIcon,
  PlaneIcon,
  StarIcon,
} from "@/components/icons";

const bannerIconMap = {
  lightbulb: LightbulbIcon,
  calendar: CalendarCheckIcon,
};

export function GrowthJourney() {
  const stages = siteConfig.growthJourney;

  return (
    <section
      id="growth-journey"
      className="relative overflow-hidden bg-gradient-to-b from-medical-blue-light/40 via-white to-white py-10 sm:py-20"
    >
      {/* decorative scattered doodles */}
      <HeartIcon className="pointer-events-none absolute left-[8%] top-[10%] hidden h-5 w-5 fill-rose-200 text-rose-300 lg:block" />
      <HeartIcon className="pointer-events-none absolute left-[14%] top-[24%] hidden h-4 w-4 fill-medical-blue/20 text-medical-blue/30 lg:block" />
      <StarIcon className="pointer-events-none absolute left-[26%] top-[14%] hidden h-4 w-4 fill-amber-200 text-amber-300 lg:block" />
      <StarIcon className="pointer-events-none absolute right-[16%] top-[20%] hidden h-3.5 w-3.5 fill-medical-blue/20 text-medical-blue/30 lg:block" />
      <PlaneIcon className="pointer-events-none absolute right-[10%] top-[8%] hidden h-6 w-6 -rotate-12 text-medical-blue/30 lg:block" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Growth & Nutrition Journey"
          title="Your child's journey, stage by stage"
          description="From first smiles to big dreams — milestones and nutrition guidance for every important step."
          align="center"
          eyebrowIcon={<LeafIcon className="h-4 w-4" />}
        />

        {/* connecting wave + numbered nodes */}
        <div className="relative mx-auto mt-16 hidden max-w-4xl lg:block">
          <svg
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
            className="absolute left-0 top-0 h-16 w-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="journey-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--medical-blue)" />
                <stop offset="50%" stopColor="var(--medical-teal)" />
                <stop offset="100%" stopColor="var(--medical-blue)" />
              </linearGradient>
            </defs>
            <path
              d="M0,50 Q125,15 250,50 T500,50 Q625,15 750,50 T1000,50"
              fill="none"
              stroke="url(#journey-line)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <div className="relative flex h-16 items-center justify-between">
            {stages.map((stage, index) => (
              <span
                key={stage.age}
                className={`flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold text-white shadow-md ring-4 ring-white ${
                  index % 2 === 0 ? "bg-medical-blue" : "bg-medical-teal"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            ))}
          </div>
        </div>

        {/* stage cards */}
        <div className="relative mt-6 flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:gap-6 sm:overflow-visible sm:snap-none sm:grid-cols-2 lg:mt-0 lg:grid-cols-4">
          {stages.map((stage, index) => {
            const isBlue = index % 2 === 0;
            return (
              <div
                key={stage.age}
                className="flex w-[78%] shrink-0 snap-center flex-col rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:w-auto sm:shrink"
              >
                {/* mobile-only number badge */}
                <span
                  className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white lg:hidden ${
                    isBlue ? "bg-medical-blue" : "bg-medical-teal"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span
                  className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${
                    isBlue
                      ? "bg-medical-blue/10 text-medical-blue"
                      : "bg-medical-teal/10 text-medical-teal"
                  }`}
                >
                  {stage.age}
                </span>
                <h3 className="mt-1.5 text-xl font-bold text-slate-900">{stage.stage}</h3>

                <div className="relative mt-3 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100">
                  <PhotoWithFallback
                    src={stage.image}
                    alt={`${stage.stage} stage`}
                    fallback={<JourneyIcon name={stage.icon} className="h-8 w-8" />}
                  />
                  <span
                    className={`absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md ${
                      isBlue ? "text-medical-blue" : "text-medical-teal"
                    }`}
                  >
                    <JourneyIcon name={stage.icon} className="h-4.5 w-4.5" />
                  </span>
                </div>

                <p
                  className={`mt-4 text-xs font-bold uppercase tracking-wide ${
                    isBlue ? "text-medical-blue" : "text-medical-teal"
                  }`}
                >
                  Milestones
                </p>
                <ul className="mt-1.5 space-y-1">
                  {stage.milestones.map((item) => (
                    <li key={item} className="flex items-start gap-1.5 text-sm text-slate-600">
                      <CheckIcon
                        className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                          isBlue ? "text-medical-blue" : "text-medical-teal"
                        }`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <p
                  className={`mt-3 text-xs font-bold uppercase tracking-wide ${
                    isBlue ? "text-medical-blue" : "text-medical-teal"
                  }`}
                >
                  Nutrition Guide
                </p>
                <p className="mt-1.5 flex items-start gap-2 text-sm text-slate-600">
                  <JourneyIcon
                    name={stage.nutritionIcon}
                    className={`mt-0.5 h-4 w-4 shrink-0 ${
                      isBlue ? "text-medical-blue" : "text-medical-teal"
                    }`}
                  />
                  {stage.nutrition}
                </p>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-center text-xs text-slate-400 sm:hidden">
          Swipe to see every stage →
        </p>

        {/* bottom banner */}
        <div className="mt-10 flex flex-col gap-6 rounded-3xl bg-medical-teal-light/50 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:divide-x lg:divide-medical-teal/15">
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-10 lg:pr-8">
            {siteConfig.growthBanner.tips.map((tip) => {
              const Icon = bannerIconMap[tip.icon as keyof typeof bannerIconMap];
              return (
                <div key={tip.title} className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-medical-teal">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-bold text-slate-900">{tip.title}</p>
                    <p className="mt-0.5 max-w-xs text-sm text-slate-600">{tip.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-medical-teal px-6 py-3 text-sm font-semibold text-white shadow-md shadow-medical-teal/25 transition hover:bg-medical-teal-dark lg:self-center lg:pl-8"
          >
            <CalendarCheckIcon className="h-4 w-4" />
            {siteConfig.growthBanner.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
