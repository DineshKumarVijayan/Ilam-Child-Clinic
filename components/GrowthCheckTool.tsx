"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ActivityIcon,
  CalendarIcon,
  CheckIcon,
  CloseIcon,
  RulerIcon,
  WeightIcon,
} from "@/components/icons";
import { getWhatsAppUrl } from "@/lib/site-config";

type Gender = "boy" | "girl";

type GrowthStatus = "expected" | "monitor" | "consult";

type AgeBand = {
  maxMonths: number;
  expectedLow: number;
  expectedHigh: number;
  monitorLow: number;
  monitorHigh: number;
};

// Approximate healthy BMI-for-age bands, loosely derived from published
// WHO / CDC pediatric BMI percentile midpoints. This is a simplified
// guidance heuristic, not a clinical percentile calculation.
const AGE_BANDS: AgeBand[] = [
  { maxMonths: 23, expectedLow: 15.0, expectedHigh: 18.5, monitorLow: 14.0, monitorHigh: 19.5 },
  { maxMonths: 35, expectedLow: 14.5, expectedHigh: 17.5, monitorLow: 13.5, monitorHigh: 19.0 },
  { maxMonths: 59, expectedLow: 14.0, expectedHigh: 17.0, monitorLow: 13.0, monitorHigh: 18.5 },
  { maxMonths: 83, expectedLow: 13.5, expectedHigh: 16.5, monitorLow: 12.5, monitorHigh: 18.5 },
  { maxMonths: 107, expectedLow: 13.5, expectedHigh: 17.0, monitorLow: 12.5, monitorHigh: 19.5 },
  { maxMonths: 131, expectedLow: 14.0, expectedHigh: 18.5, monitorLow: 13.0, monitorHigh: 21.0 },
  { maxMonths: 155, expectedLow: 14.5, expectedHigh: 20.0, monitorLow: 13.5, monitorHigh: 22.5 },
  { maxMonths: 179, expectedLow: 15.5, expectedHigh: 21.5, monitorLow: 14.5, monitorHigh: 24.0 },
  { maxMonths: 203, expectedLow: 16.5, expectedHigh: 22.5, monitorLow: 15.5, monitorHigh: 25.0 },
  { maxMonths: 227, expectedLow: 17.5, expectedHigh: 23.5, monitorLow: 16.5, monitorHigh: 26.0 },
];

function getBand(ageMonths: number): AgeBand {
  return AGE_BANDS.find((band) => ageMonths <= band.maxMonths) ?? AGE_BANDS[AGE_BANDS.length - 1];
}

function getStatus(bmi: number, band: AgeBand): GrowthStatus {
  if (bmi >= band.expectedLow && bmi <= band.expectedHigh) return "expected";
  if (bmi >= band.monitorLow && bmi <= band.monitorHigh) return "monitor";
  return "consult";
}

const STATUS_COPY: Record<
  GrowthStatus,
  {
    label: string;
    headline: string;
    badgeClass: string;
    tips: string[];
  }
> = {
  expected: {
    label: "Looks within expected range",
    headline: "Your child's growth looks broadly within the expected range.",
    badgeClass: "bg-medical-teal/10 text-medical-teal",
    tips: [
      "Continue balanced, age-appropriate meals",
      "Track height and weight every 3 months",
      "Keep up with regular vaccinations and checkups",
    ],
  },
  monitor: {
    label: "Needs monitoring",
    headline:
      "Your child's BMI is a little outside the typical range for their age — worth keeping an eye on.",
    badgeClass: "bg-amber-100 text-amber-700",
    tips: [
      "Keep a simple log of meals, sleep, and activity",
      "Re-check height and weight in 4–6 weeks",
      "Mention this at your next pediatrician visit",
    ],
  },
  consult: {
    label: "Please discuss with pediatrician",
    headline:
      "This reading falls outside the usual range for this age — a quick chat with the doctor will help.",
    badgeClass: "bg-medical-blue/10 text-medical-blue",
    tips: [
      "Book a consultation to review growth in detail",
      "Bring past growth or vaccination records if available",
      "Avoid making diet changes on your own before the visit",
    ],
  },
};

function formatAge(years: number, months: number) {
  const yearPart = years > 0 ? `${years} year${years === 1 ? "" : "s"}` : "";
  const monthPart = months > 0 ? `${months} month${months === 1 ? "" : "s"}` : "";
  return [yearPart, monthPart].filter(Boolean).join(" ") || "0 months";
}

type Result = {
  ageLabel: string;
  height: number;
  weight: number;
  bmi: number;
  status: GrowthStatus;
  band: AgeBand;
};

type FieldErrors = {
  general?: string;
  height?: string;
  weight?: string;
};

function BmiGauge({ bmi, band }: { bmi: number; band: AgeBand }) {
  const [animated, setAnimated] = useState(false);
  const [hoverPct, setHoverPct] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setAnimated(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const domainMin = band.monitorLow - 1.5;
  const domainMax = band.monitorHigh + 1.5;
  const toPct = (value: number) => {
    const clamped = Math.min(Math.max(value, domainMin), domainMax);
    return ((clamped - domainMin) / (domainMax - domainMin)) * 100;
  };
  const toValue = (pct: number) => domainMin + (pct / 100) * (domainMax - domainMin);
  const zoneAt = (value: number) => {
    if (value < band.expectedLow) return "Lower";
    if (value > band.expectedHigh) return "Higher";
    return "Ideal range";
  };

  const expectedLeft = toPct(band.expectedLow);
  const expectedWidth = toPct(band.expectedHigh) - expectedLeft;
  const markerPos = animated ? toPct(bmi) : 0;

  function handleHover(event: React.MouseEvent<HTMLDivElement>) {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = Math.min(Math.max(((event.clientX - rect.left) / rect.width) * 100, 0), 100);
    setHoverPct(pct);
  }

  return (
    <div className="mt-4">
      <div className="relative" style={{ height: 80 }}>
        <div
          className="absolute flex -translate-x-1/2 flex-col items-center transition-all duration-700 ease-out"
          style={{ left: `${markerPos}%`, top: 0 }}
        >
          <span className="whitespace-nowrap rounded-md bg-slate-900 px-1.5 py-0.5 text-[10px] font-semibold text-white shadow">
            BMI {bmi}
          </span>
          <span className="-mt-1 h-2 w-2 rotate-45 bg-slate-900" />
        </div>

        <div
          ref={trackRef}
          className="absolute inset-x-0 h-3 cursor-crosshair overflow-hidden rounded-full bg-gradient-to-r from-amber-100 via-slate-100 to-amber-100"
          style={{ top: 28 }}
          onMouseMove={handleHover}
          onMouseLeave={() => setHoverPct(null)}
        >
          <div
            className="absolute inset-y-0 rounded-full bg-medical-teal/40 transition-all duration-700 ease-out"
            style={{ left: `${expectedLeft}%`, width: `${expectedWidth}%` }}
          />
        </div>

        <div
          className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-medical-teal shadow-md transition-all duration-700 ease-out"
          style={{ left: `${markerPos}%`, top: 34 }}
        />

        {hoverPct !== null && (
          <div
            className="pointer-events-none absolute flex -translate-x-1/2 flex-col items-center"
            style={{ left: `${hoverPct}%`, top: 46 }}
          >
            <span className="-mb-1 h-2 w-2 rotate-45 bg-slate-700" />
            <span className="whitespace-nowrap rounded-md bg-slate-700 px-1.5 py-0.5 text-[10px] font-semibold text-white shadow">
              {toValue(hoverPct).toFixed(1)} · {zoneAt(toValue(hoverPct))}
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between text-[11px] text-slate-400">
        <span>Lower</span>
        <span className="font-semibold text-medical-teal">Ideal range</span>
        <span>Higher</span>
      </div>
    </div>
  );
}

export function GrowthCheckTool({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [years, setYears] = useState("");
  const [months, setMonths] = useState("");
  const [gender, setGender] = useState<Gender | null>(null);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [result, setResult] = useState<Result | null>(null);
  const [submitCount, setSubmitCount] = useState(0);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  function validate(): FieldErrors {
    const fieldErrors: FieldErrors = {};
    const y = years === "" ? 0 : Number(years);
    const m = months === "" ? 0 : Number(months);

    if (years === "" && months === "") {
      fieldErrors.general = "Please enter your child's age.";
    } else if (Number.isNaN(y) || y < 0) {
      fieldErrors.general = "Please enter a valid number of years.";
    } else if (Number.isNaN(m) || m < 0 || m > 11) {
      fieldErrors.general = "Months should be between 0 and 11.";
    } else if (y * 12 + m > 216) {
      fieldErrors.general = "This tool supports ages up to 18 years.";
    } else if (gender === null) {
      fieldErrors.general = "Please select your child's gender.";
    }

    const h = Number(height);
    if (height === "" || Number.isNaN(h) || h < 30 || h > 200) {
      fieldErrors.height = "Enter a height between 30 and 200 cm.";
    }

    const w = Number(weight);
    if (weight === "" || Number.isNaN(w) || w < 1 || w > 120) {
      fieldErrors.weight = "Enter a weight between 1 and 120 kg.";
    }

    return fieldErrors;
  }

  function resetAll() {
    setYears("");
    setMonths("");
    setGender(null);
    setHeight("");
    setWeight("");
    setErrors({});
    setResult(null);
  }

  function handleClose() {
    resetAll();
    onClose();
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    const y = years === "" ? 0 : Number(years);
    const m = months === "" ? 0 : Number(months);
    const h = Number(height);
    const w = Number(weight);
    const ageMonths = y * 12 + m;
    const bmi = w / (h / 100) ** 2;
    const band = getBand(ageMonths);
    const status = getStatus(bmi, band);

    setResult({
      ageLabel: formatAge(y, m),
      height: h,
      weight: w,
      bmi: Math.round(bmi * 10) / 10,
      status,
      band,
    });
    setSubmitCount((count) => count + 1);
  }

  if (!open) return null;

  const statusCopy = result ? STATUS_COPY[result.status] : null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/55 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="growth-check-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-100 bg-white/95 px-6 py-5 backdrop-blur">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-medical-teal/10 text-medical-teal">
              <ActivityIcon className="h-5 w-5" />
            </span>
            <div>
              <h2 id="growth-check-title" className="text-lg font-bold text-slate-900">
                Growth Check Tool
              </h2>
              <p className="mt-0.5 text-sm text-slate-500">
                A quick snapshot of your child&apos;s growth — for guidance only
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="shrink-0 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-6">
          {!result ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-slate-700">Child&apos;s Age</label>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={17}
                      placeholder="Years"
                      value={years}
                      onChange={(event) => setYears(event.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-medical-teal focus:bg-white focus:ring-2 focus:ring-medical-teal/20"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={11}
                      placeholder="Months"
                      value={months}
                      onChange={(event) => setMonths(event.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-medical-teal focus:bg-white focus:ring-2 focus:ring-medical-teal/20"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">Gender</label>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  {(["boy", "girl"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setGender(option)}
                      className={`rounded-xl border px-4 py-2.5 text-sm font-medium capitalize transition ${
                        gender === option
                          ? "border-medical-teal bg-medical-teal/10 text-medical-teal"
                          : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                    <RulerIcon className="h-3.5 w-3.5 text-medical-teal" />
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    max={200}
                    placeholder="e.g. 88"
                    value={height}
                    onChange={(event) => setHeight(event.target.value)}
                    className={`mt-2 w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:bg-white focus:ring-2 ${
                      errors.height
                        ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100"
                        : "border-slate-200 focus:border-medical-teal focus:ring-medical-teal/20"
                    }`}
                  />
                  {errors.height && (
                    <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.height}</p>
                  )}
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                    <WeightIcon className="h-3.5 w-3.5 text-medical-teal" />
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    max={120}
                    placeholder="e.g. 12.5"
                    value={weight}
                    onChange={(event) => setWeight(event.target.value)}
                    className={`mt-2 w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:bg-white focus:ring-2 ${
                      errors.weight
                        ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100"
                        : "border-slate-200 focus:border-medical-teal focus:ring-medical-teal/20"
                    }`}
                  />
                  {errors.weight && (
                    <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.weight}</p>
                  )}
                </div>
              </div>

              {errors.general && (
                <p className="text-sm font-medium text-rose-600">{errors.general}</p>
              )}

              <button
                type="submit"
                className="w-full rounded-full bg-medical-teal px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-medical-teal/30 transition hover:bg-medical-teal-dark"
              >
                Check Growth
              </button>

              <p className="text-center text-xs leading-relaxed text-slate-400">
                This tool offers general guidance only and does not replace a doctor consultation.
              </p>
            </form>
          ) : (
            <div className="space-y-5">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4">
                <p className="text-sm font-semibold text-slate-900">Your Child&apos;s Growth Snapshot</p>
                <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-xs text-slate-500">Age</p>
                    <p className="mt-0.5 text-sm font-semibold text-slate-900">{result.ageLabel}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Height</p>
                    <p className="mt-0.5 text-sm font-semibold text-slate-900">{result.height} cm</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Weight</p>
                    <p className="mt-0.5 text-sm font-semibold text-slate-900">{result.weight} kg</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between rounded-xl bg-white px-4 py-3">
                  <span className="text-sm text-slate-500">BMI</span>
                  <span className="text-lg font-bold text-slate-900">{result.bmi}</span>
                </div>

                <BmiGauge key={submitCount} bmi={result.bmi} band={result.band} />
              </div>

              <div>
                <span
                  className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-semibold ${statusCopy!.badgeClass}`}
                >
                  {statusCopy!.label}
                </span>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-700">{statusCopy!.headline}</p>
              </div>

              <div className="rounded-2xl border border-slate-100 px-5 py-4">
                <p className="text-sm font-semibold text-slate-900">What parents can do</p>
                <ul className="mt-3 space-y-2">
                  {statusCopy!.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-medical-teal" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="rounded-xl bg-medical-blue-light/60 px-4 py-3 text-center text-xs leading-relaxed text-slate-500">
                This tool is only for guidance and does not replace a doctor consultation.
              </p>

              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={resetAll}
                  className="flex-1 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Check Another Child
                </button>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-medical-teal px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-medical-teal-dark"
                >
                  <CalendarIcon className="h-3.5 w-3.5" />
                  Book a Visit
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
