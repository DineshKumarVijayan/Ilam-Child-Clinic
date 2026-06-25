import type { ComponentType } from "react";
import { siteConfig } from "@/lib/site-config";
import { StarRating } from "@/components/StarRating";
import {
  ArrowRightIcon,
  BadgeCheckIcon,
  HeartIcon,
  PawPrintIcon,
  PlusIcon,
  QuoteIcon,
  ShieldCheckIcon,
  SmileIcon,
  StarIcon,
  UserIcon,
  UsersIcon,
  WhatsAppIcon,
} from "@/components/icons";

const highlightIconMap: Record<string, ComponentType<{ className?: string }>> = {
  shieldcheck: ShieldCheckIcon,
  whatsapp: WhatsAppIcon,
  plus: PlusIcon,
  smile: SmileIcon,
};

const avatarColorMap: Record<string, string> = {
  teal: "bg-medical-teal/15 text-medical-teal",
  amber: "bg-amber-100 text-amber-600",
  blue: "bg-medical-blue/15 text-medical-blue",
};

const cardAccentMap = ["bg-medical-teal-light/50", "bg-amber-50", "bg-medical-blue-light/50"];

export function GoogleReviews() {
  const { doctors, googleRating, googleReviewCount, reviews, reviewHighlights, reviewsCta } =
    siteConfig;
  const leftHighlights = reviewHighlights.slice(0, 2);
  const rightHighlights = reviewHighlights.slice(2, 4);

  const stats = [
    { icon: StarIcon, value: `${googleRating}/5`, label: "Average rating" },
    { icon: UsersIcon, value: googleReviewCount, label: "Happy families" },
    { icon: UserIcon, value: String(doctors.length), label: "Experienced pediatricians" },
    { icon: null, value: "Easy", label: "appointment booking" },
  ];

  return (
    <section id="reviews" className="relative overflow-hidden bg-white py-10 sm:py-20">
      {/* decorative doodles */}
      <HeartIcon className="pointer-events-none absolute left-[8%] top-[8%] hidden h-6 w-6 text-medical-teal/20 lg:block" />
      <StarIcon className="pointer-events-none absolute right-[8%] top-[14%] hidden h-7 w-7 fill-medical-teal/10 text-medical-teal/20 lg:block" />
      <PawPrintIcon className="pointer-events-none absolute bottom-[6%] left-[6%] hidden h-10 w-10 text-medical-teal/15 lg:block" />
      <HeartIcon className="pointer-events-none absolute bottom-[10%] right-[10%] hidden h-5 w-5 text-medical-teal/20 lg:block" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2">
            <span className="h-px w-10 bg-medical-teal/30" />
            <p className="text-sm font-bold uppercase tracking-widest text-medical-teal">
              Patient Feedback
            </p>
            <span className="h-px w-10 bg-medical-teal/30" />
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Trusted by parents
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Families in Chennai choose ILAM Child Clinic for compassionate care,
            clear guidance, and a welcoming environment for children.
          </p>
        </div>

        {/* rating hero + side highlights */}
        <div className="mt-10 grid items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
          <div className="hidden flex-col gap-4 lg:flex">
            {leftHighlights.map((item) => (
              <HighlightPill key={item.title} item={item} />
            ))}
          </div>

          <div className="mx-auto flex w-full max-w-md flex-col items-center rounded-3xl border border-slate-100 bg-white px-8 py-7 text-center shadow-lg shadow-medical-blue/5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-medical-teal/10 text-medical-teal">
              <BadgeCheckIcon className="h-6 w-6" />
            </span>
            <p className="mt-2 flex items-baseline gap-1 font-bold text-slate-900">
              <span className="text-5xl">{googleRating.toFixed(1)}</span>
              <span className="text-lg text-slate-400">/5</span>
            </p>
            <StarRating rating={googleRating} size="lg" />
            <p className="mt-2 text-sm text-slate-500">
              Based on <span className="font-bold text-medical-teal">{googleReviewCount}</span>{" "}
              parent reviews
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col">
            {rightHighlights.map((item) => (
              <HighlightPill key={item.title} item={item} />
            ))}
          </div>
        </div>

        {/* review cards */}
        <div className="mt-8 flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-12 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:gap-6 sm:overflow-visible sm:snap-none md:grid-cols-3">
          {reviews.map((review, index) => (
            <article
              key={review.name}
              className="relative flex h-full w-[78%] shrink-0 snap-center flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:w-auto sm:shrink"
            >
              <span
                className={`pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full ${cardAccentMap[index % cardAccentMap.length]}`}
              />
              <div className="relative flex items-start justify-between">
                <StarRating rating={review.rating} />
                <QuoteIcon className="h-7 w-7 text-medical-teal/20" />
              </div>
              <p className="relative mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                {review.text}
              </p>
              <div className="relative mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${avatarColorMap[review.avatarColor] ?? avatarColorMap.teal}`}
                >
                  <UserIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-slate-900">{review.name}</p>
                  <p className="text-xs text-slate-500">{review.date}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-medical-teal">
                    <BadgeCheckIcon className="h-3.5 w-3.5" />
                    Verified Parent
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-slate-400 sm:hidden">
          Swipe to read more reviews →
        </p>

        {/* stats strip */}
        <div className="mt-10 grid grid-cols-2 gap-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-4 lg:divide-x lg:divide-slate-100">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 lg:px-4 lg:first:pl-0">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-medical-teal/10 text-medical-teal">
                {stat.icon ? <stat.icon className="h-5 w-5" /> : <UsersIcon className="h-5 w-5" />}
              </span>
              <div>
                <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs leading-snug text-slate-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={siteConfig.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-medical-teal px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-medical-teal/25 transition hover:bg-medical-teal-dark"
          >
            <HeartIcon className="h-4 w-4" />
            {reviewsCta}
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function HighlightPill({
  item,
}: {
  item: { icon: string; title: string; subtitle: string };
}) {
  const Icon = highlightIconMap[item.icon];
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-medical-teal/10 text-medical-teal">
        {Icon && <Icon className="h-5 w-5" />}
      </span>
      <p className="text-sm leading-snug text-slate-700">
        <span className="block font-bold text-slate-900">{item.title}</span>
        {item.subtitle}
      </p>
    </div>
  );
}
