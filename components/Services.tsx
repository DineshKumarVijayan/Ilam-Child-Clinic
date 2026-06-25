import { siteConfig } from "@/lib/site-config";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceIcon } from "@/components/icons";

export function Services() {
  return (
    <section id="services" className="bg-white py-10 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Services"
          title="Services we provide"
          description="From newborn care and vaccination to growth tracking, nutrition counselling, and management of childhood asthma, allergies, and infections — comprehensive pediatric care under one trusted roof."
        />

        <div className="mt-8 flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-12 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:gap-6 sm:overflow-visible sm:snap-none sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {siteConfig.services.map((service, index) => {
            const isBlue = index % 2 === 0;
            return (
              <article
                key={service.title}
                className={`group relative w-[78%] shrink-0 snap-center overflow-hidden rounded-3xl border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:w-auto sm:shrink ${
                  isBlue
                    ? "border-medical-blue/15 bg-gradient-to-br from-medical-blue-light via-white to-white hover:border-medical-blue/30 hover:shadow-medical-blue/10"
                    : "border-medical-teal/15 bg-gradient-to-br from-medical-teal-light via-white to-white hover:border-medical-teal/30 hover:shadow-medical-teal/10"
                }`}
              >
                <ServiceIcon
                  name={service.icon}
                  className={`pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 rotate-6 transition-transform duration-300 group-hover:rotate-0 group-hover:scale-110 ${
                    isBlue ? "text-medical-blue/10" : "text-medical-teal/10"
                  }`}
                />

                <div className="relative">
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl transition group-hover:text-white ${
                      isBlue
                        ? "bg-medical-blue/10 text-medical-blue group-hover:bg-medical-blue"
                        : "bg-medical-teal/10 text-medical-teal group-hover:bg-medical-teal"
                    }`}
                  >
                    <ServiceIcon name={service.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
        <p className="mt-3 text-center text-xs text-slate-400 sm:hidden">
          Swipe to see all services →
        </p>
      </div>
    </section>
  );
}
