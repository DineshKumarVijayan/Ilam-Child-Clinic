import { siteConfig } from "@/lib/site-config";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceIcon } from "@/components/icons";

export function Services() {
  return (
    <section id="services" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Services"
          title="Services we provide"
          description="Child clinic, vaccination, nebulisation, ENT, and skin care — all under one trusted pediatric centre."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {siteConfig.services.map((service) => (
            <article
              key={service.title}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-medical-teal/30 hover:shadow-lg hover:shadow-medical-teal/10"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-medical-teal/10 text-medical-teal transition group-hover:bg-medical-teal group-hover:text-white">
                <ServiceIcon name={service.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-slate-900">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
