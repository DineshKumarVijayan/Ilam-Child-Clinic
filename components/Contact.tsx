import { siteConfig, getWhatsAppUrl, getPhoneUrl } from "@/lib/site-config";
import { SectionHeading } from "@/components/SectionHeading";
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";

export function Contact() {
  return (
    <section id="contact" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Visit us or reach out anytime"
          description="We're here to answer your questions and help you schedule an appointment for your child."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <ContactCard
              icon={<PhoneIcon className="h-5 w-5" />}
              title="Phone"
              content={siteConfig.phoneDisplay}
              href={getPhoneUrl()}
            />
            <ContactCard
              icon={<MailIcon className="h-5 w-5" />}
              title="Email"
              content={siteConfig.email}
              href={`mailto:${siteConfig.email}`}
            />
            <ContactCard
              icon={<MapPinIcon className="h-5 w-5" />}
              title="Address"
              content={
                <>
                  {siteConfig.address.line1}
                  <br />
                  {siteConfig.address.line2}
                </>
              }
            />
            <ContactCard
              icon={<ClockIcon className="h-5 w-5" />}
              title="Quick note"
              content="Appointments recommended. Walk-ins accepted based on availability."
            />

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-medical-teal px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-medical-teal/25 transition hover:bg-medical-teal-dark sm:w-auto"
            >
              Message on WhatsApp
            </a>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
              <p className="font-semibold text-slate-900">Clinic Location</p>
              <p className="text-sm text-slate-500">
                ILAM Child Clinic &amp; Vaccination Centre, Vanagaram, Chennai
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full bg-slate-200 lg:aspect-auto lg:min-h-[360px]">
              <iframe
                title={`${siteConfig.name} location map`}
                src={siteConfig.mapEmbedUrl}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon,
  title,
  content,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
  href?: string;
}) {
  const inner = (
    <div className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition hover:border-medical-blue/20 hover:bg-white hover:shadow-sm">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-medical-blue/10 text-medical-blue">
        {icon}
      </span>
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          {title}
        </p>
        <div className="mt-1 text-base font-medium text-slate-900">{content}</div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {inner}
      </a>
    );
  }

  return inner;
}
