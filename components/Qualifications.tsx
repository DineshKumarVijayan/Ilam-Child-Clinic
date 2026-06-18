import { siteConfig } from "@/lib/site-config";
import { SectionHeading } from "@/components/SectionHeading";
import { CheckIcon } from "@/components/icons";

export function Qualifications() {
  return (
    <section id="qualifications" className="bg-medical-blue-light/40 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Credentials"
          title="Qualifications & experience"
          description="Both Dr. Tarun and Dr. Akshaya are qualified with MBBS and MD (Pediatrics), bringing trusted expertise to every consultation."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Education & qualifications</h3>
            <ul className="mt-6 space-y-4">
              {siteConfig.qualifications.map((item, index) => (
                <li
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 transition hover:border-medical-teal/20 hover:bg-white"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-medical-blue/10 text-sm font-bold text-medical-blue">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Professional experience</h3>
            <ul className="mt-6 space-y-4">
              {siteConfig.experience.map((item) => (
                <li key={item} className="flex gap-3 text-slate-700">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-medical-teal/15 text-medical-teal">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm leading-relaxed sm:text-base">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl bg-gradient-to-r from-medical-blue to-medical-teal p-6 text-white">
              <p className="text-sm font-medium text-white/80">Our commitment</p>
              <p className="mt-2 text-lg font-semibold leading-snug">
                Every child receives personalized attention, clear communication with
                parents, and evidence-based treatment plans.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
