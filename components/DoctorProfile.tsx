import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { SectionHeading } from "@/components/SectionHeading";

export function DoctorProfile() {
  return (
    <section id="doctor" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Meet Our Doctors"
          title="Expert care with a gentle touch"
          description="Our pediatricians bring clinical experience and a warm, reassuring approach to every consultation."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {siteConfig.doctors.map((doctor) => (
            <article
              key={doctor.name}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/70 shadow-sm transition hover:shadow-md"
            >
              <div className="grid sm:grid-cols-[180px_1fr]">
                <div className="bg-gradient-to-br from-medical-blue-light to-medical-teal-light p-4 sm:p-5">
                  <div className="relative mx-auto aspect-square w-full max-w-[180px] overflow-hidden rounded-2xl bg-white">
                    <Image
                      src={doctor.image}
                      alt={`Portrait of ${doctor.name}`}
                      fill
                      className="object-cover"
                      sizes="180px"
                    />
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <p className="text-sm font-semibold uppercase tracking-wide text-medical-teal">
                    {doctor.title}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-slate-900">{doctor.name}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {doctor.qualifications.map((qualification) => (
                      <span
                        key={qualification}
                        className="rounded-full bg-medical-blue/10 px-3 py-1 text-xs font-semibold text-medical-blue"
                      >
                        {qualification}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                    {doctor.bio}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
