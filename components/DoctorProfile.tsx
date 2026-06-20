import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { SectionHeading } from "@/components/SectionHeading";
import { GraduationCapIcon } from "@/components/icons";

export function DoctorProfile() {
  return (
    <section id="doctor" className="bg-white py-10 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Meet Our Doctors"
          title="Expert care with a gentle touch"
          description="Our pediatricians bring clinical experience and a warm, reassuring approach to every consultation."
        />

        <div className="mt-8 grid gap-8 sm:mt-12 sm:grid-cols-2">
          {siteConfig.doctors.map((doctor) => (
            <article
              key={doctor.name}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-medical-teal/30 hover:shadow-lg hover:shadow-medical-teal/10"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-gradient-to-br from-medical-blue-light to-medical-teal-light">
                <Image
                  src={doctor.image}
                  alt={`Portrait of ${doctor.name}`}
                  fill
                  className="object-contain p-2 transition duration-300 group-hover:scale-105"
                  sizes="(min-width: 640px) 50vw, 100vw"
                  priority
                />
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

                <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-4">
                  {doctor.education.map((entry) => (
                    <li
                      key={entry.degree}
                      className="flex items-start gap-2 text-sm text-slate-600"
                    >
                      <GraduationCapIcon className="mt-0.5 h-4 w-4 shrink-0 text-medical-teal" />
                      <span>
                        <span className="font-semibold text-slate-800">{entry.degree}</span>
                        {" — "}
                        {entry.institution}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {doctor.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
