import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  /** Optional icon shown inside a pill badge instead of the default plain-text eyebrow. */
  eyebrowIcon?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  eyebrowIcon,
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl";

  return (
    <div className={alignment}>
      {eyebrowIcon ? (
        <span
          className={`inline-flex items-center gap-2 rounded-full bg-medical-teal/10 px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-medical-teal ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {eyebrowIcon}
          {eyebrow}
        </span>
      ) : (
        <p className="text-sm font-semibold uppercase tracking-wide text-medical-teal">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}
