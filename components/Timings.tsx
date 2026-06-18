import { siteConfig } from "@/lib/site-config";
import { SectionHeading } from "@/components/SectionHeading";
import { ClockIcon } from "@/components/icons";

export function Timings() {
  return (
    <section id="timings" className="bg-medical-teal-light/50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Clinic Hours"
          title="When we're available for you"
          description="Flexible morning and evening slots to fit your family's schedule. Emergency consultations available by appointment."
          align="center"
        />

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-6 py-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-medical-blue/10 text-medical-blue">
                <ClockIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-slate-900">Opening Hours</p>
                <p className="text-sm text-slate-500">Plan your visit ahead of time</p>
              </div>
            </div>

            <ul className="divide-y divide-slate-100">
              {siteConfig.timings.map((slot) => (
                <li
                  key={slot.day}
                  className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="font-semibold text-slate-900">{slot.day}</span>
                  <span className="text-sm text-slate-600 sm:text-right">{slot.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Please arrive 10 minutes early for registration. For urgent concerns outside
            clinic hours, message us on WhatsApp.
          </p>
        </div>
      </div>
    </section>
  );
}
