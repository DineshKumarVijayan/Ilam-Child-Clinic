"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  ActivityIcon,
  CalendarIcon,
  CloseIcon,
  RulerIcon,
  WeightIcon,
} from "@/components/icons";
import { getPhoneUrl } from "@/lib/site-config";
import {
  calculateAgeInMonths,
  calculateBMI,
  formatAgeLabel,
  getBMIScreeningStatus,
  getGrowthMessage,
  getGrowthStandard,
  getReferenceBand,
  MAX_AGE_MONTHS,
  type BmiScreeningStatus,
  type Gender,
} from "@/lib/growth-calculations";

type FieldErrors = {
  age?: string;
  height?: string;
  weight?: string;
};

type Result = {
  childName: string;
  ageMonths: number;
  ageLabel: string;
  standard: string;
  height: number;
  weight: number;
  bmi: number;
  status: BmiScreeningStatus;
};

const STATUS_UI: Record<
  BmiScreeningStatus,
  { label: string; badgeClass: string; zoneClass: string }
> = {
  below: {
    label: "Below healthy range",
    badgeClass: "bg-sky-100 text-sky-700",
    zoneClass: "bg-sky-100",
  },
  healthy: {
    label: "Healthy range",
    badgeClass: "bg-medical-teal/15 text-medical-teal-dark",
    zoneClass: "bg-medical-teal/25",
  },
  monitor: {
    label: "Needs monitoring",
    badgeClass: "bg-amber-100 text-amber-700",
    zoneClass: "bg-amber-100",
  },
  above: {
    label: "Above expected range",
    badgeClass: "bg-orange-100 text-orange-700",
    zoneClass: "bg-orange-100",
  },
};

const WEIGHT_GUIDANCE: Record<BmiScreeningStatus, string> = {
  healthy:
    "Your child's weight looks appropriate for their height and age. Keep offering balanced, age-appropriate meals.",
  below:
    "Weight is on the lower side for this height and age. Focus on nutrient-dense meals and re-check in a few weeks.",
  monitor:
    "Weight is a little higher than the typical range. A simple log of meals and activity can help.",
  above:
    "Weight is on the higher side for this height and age. A pediatrician can help plan a balanced diet and activity routine.",
};

const HEIGHT_GUIDANCE: Record<BmiScreeningStatus, string> = {
  healthy: "Keep tracking height every few months to make sure growth stays on a steady curve.",
  below: "If height also feels low for age, mention this alongside weight at the next visit.",
  monitor: "Height tracking alongside weight will help the doctor see the fuller growth picture.",
  above: "Height and weight together give a fuller picture — bring recent measurements to your next visit.",
};

// 16px input text avoids the iOS/Android auto-zoom-on-focus behavior that
// otherwise leaves the page zoomed in after the user taps into a field.
const inputClass =
  "mt-2 w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-base sm:text-sm text-slate-900 outline-none transition focus:bg-white focus:ring-2";

function BmiRanger({ bmi, ageMonths }: { bmi: number; ageMonths: number }) {
  const [animated, setAnimated] = useState(false);
  const band = useMemo(() => getReferenceBand(ageMonths), [ageMonths]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setAnimated(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const domainMin = Math.max(band.expectedLow - 3, 8);
  const domainMax = band.monitorHigh + 3;
  const span = domainMax - domainMin;

  const zones: { key: BmiScreeningStatus; from: number; to: number }[] = [
    { key: "below", from: domainMin, to: band.expectedLow },
    { key: "healthy", from: band.expectedLow, to: band.expectedHigh },
    { key: "monitor", from: band.expectedHigh, to: band.monitorHigh },
    { key: "above", from: band.monitorHigh, to: domainMax },
  ];

  const markerPct = animated
    ? ((Math.min(Math.max(bmi, domainMin), domainMax) - domainMin) / span) * 100
    : 0;

  return (
    <div className="mt-4">
      <div className="relative" style={{ height: 46 }}>
        <div
          className="absolute flex -translate-x-1/2 flex-col items-center transition-all duration-700 ease-out"
          style={{ left: `${markerPct}%`, top: 0 }}
        >
          <span className="whitespace-nowrap rounded-md bg-slate-900 px-1.5 py-0.5 text-[10px] font-semibold text-white shadow">
            BMI {bmi}
          </span>
          <span className="-mt-1 h-2 w-2 rotate-45 bg-slate-900" />
        </div>
        <div className="absolute inset-x-0 flex h-3 overflow-hidden rounded-full" style={{ top: 26 }}>
          {zones.map((zone) => (
            <div
              key={zone.key}
              className={STATUS_UI[zone.key].zoneClass}
              style={{ width: `${((zone.to - zone.from) / span) * 100}%` }}
            />
          ))}
        </div>
        <div
          className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-slate-900 shadow-md transition-all duration-700 ease-out"
          style={{ left: `${markerPct}%`, top: 32 }}
        />
      </div>
      <div className="mt-1.5 grid grid-cols-4 gap-1 text-center text-[10px] leading-tight text-slate-400">
        <span>Below healthy</span>
        <span className="font-semibold text-medical-teal">Healthy</span>
        <span>Monitoring</span>
        <span>Above expected</span>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-slate-500">
        BMI is only one screening value. Children&apos;s growth should be interpreted with age,
        gender, height, weight, and clinical examination.
      </p>
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
  const [mounted, setMounted] = useState(false);
  const [childName, setChildName] = useState("");
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
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const previewAgeMonths = useMemo(() => {
    if (years === "" && months === "") return null;
    const y = years === "" ? 0 : Number(years);
    const m = months === "" ? 0 : Number(months);
    if (Number.isNaN(y) || Number.isNaN(m)) return null;
    return calculateAgeInMonths(y, m);
  }, [years, months]);

  function validate(): FieldErrors {
    const fieldErrors: FieldErrors = {};
    const y = years === "" ? 0 : Number(years);
    const m = months === "" ? 0 : Number(months);

    if (years === "" && months === "") {
      fieldErrors.age = "Please enter your child's age.";
    } else if (Number.isNaN(y) || y < 0 || y > 18) {
      fieldErrors.age = "Please enter an age between 0 and 18 years.";
    } else if (Number.isNaN(m) || m < 0 || m > 11) {
      fieldErrors.age = "Months should be between 0 and 11.";
    } else if (calculateAgeInMonths(y, m) > MAX_AGE_MONTHS) {
      fieldErrors.age = "This tool supports ages up to 18 years.";
    }

    if (height === "") {
      fieldErrors.height = "Please enter your child's height.";
    } else {
      const h = Number(height);
      if (Number.isNaN(h) || h < 30 || h > 200) {
        fieldErrors.height = "Please enter a height between 30 and 200 cm.";
      }
    }

    if (weight === "") {
      fieldErrors.weight = "Please enter your child's weight.";
    } else {
      const w = Number(weight);
      if (Number.isNaN(w) || w < 1 || w > 120) {
        fieldErrors.weight = "Please enter a weight between 1 and 120 kg.";
      }
    }

    return fieldErrors;
  }

  function resetAll() {
    setChildName("");
    setYears("");
    setMonths("");
    setGender(null);
    setHeight("");
    setWeight("");
    setErrors({});
    setResult(null);
  }

  function handleClose() {
    setMounted(false);
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
    const ageMonths = calculateAgeInMonths(y, m);
    const bmi = calculateBMI(w, h);
    const standard = getGrowthStandard(ageMonths);
    const status = getBMIScreeningStatus(bmi, ageMonths, gender);

    setResult({
      childName: childName.trim(),
      ageMonths,
      ageLabel: formatAgeLabel(y, m),
      standard,
      height: h,
      weight: w,
      bmi,
      status,
    });
    setSubmitCount((count) => count + 1);
  }

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-medical-teal-dark/30 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="growth-check-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <div
        className={`max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl transition-all duration-200 ease-out ${
          mounted ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-medical-teal-light bg-white/95 px-6 py-5 backdrop-blur">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-medical-teal/10 text-medical-teal">
              <ActivityIcon className="h-5 w-5" />
            </span>
            <div>
              <h2 id="growth-check-title" className="text-lg font-bold text-slate-900">
                Ilam Growth Check
              </h2>
              <p className="mt-0.5 text-sm text-slate-500">
                A simple height and weight screening tool for children from birth to 18 years.
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
                <label htmlFor="gct-name" className="text-sm font-semibold text-slate-700">
                  Child&apos;s Name <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <input
                  id="gct-name"
                  type="text"
                  placeholder="e.g. Aarav"
                  value={childName}
                  onChange={(event) => setChildName(event.target.value)}
                  className={`${inputClass} border-slate-200 focus:border-medical-teal focus:ring-medical-teal/20`}
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">Child&apos;s Age</label>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="gct-years" className="sr-only">
                      Years
                    </label>
                    <input
                      id="gct-years"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={18}
                      placeholder="Years"
                      value={years}
                      onChange={(event) => setYears(event.target.value)}
                      className={`${inputClass} ${
                        errors.age
                          ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100"
                          : "border-slate-200 focus:border-medical-teal focus:ring-medical-teal/20"
                      }`}
                    />
                  </div>
                  <div>
                    <label htmlFor="gct-months" className="sr-only">
                      Months
                    </label>
                    <input
                      id="gct-months"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={11}
                      placeholder="Months"
                      value={months}
                      onChange={(event) => setMonths(event.target.value)}
                      className={`${inputClass} ${
                        errors.age
                          ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100"
                          : "border-slate-200 focus:border-medical-teal focus:ring-medical-teal/20"
                      }`}
                    />
                  </div>
                </div>
                {errors.age && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.age}</p>}
                {!errors.age && previewAgeMonths !== null && (
                  <p className="mt-1.5 text-xs font-medium text-medical-teal">
                    Growth standard used: {getGrowthStandard(previewAgeMonths)}
                  </p>
                )}
              </div>

              <div>
                <span className="text-sm font-semibold text-slate-700">Gender</span>
                <div className="mt-2 grid grid-cols-2 gap-3" role="group" aria-label="Gender">
                  {(["boy", "girl"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={gender === option}
                      onClick={() => setGender(option)}
                      className={`rounded-full border px-4 py-2.5 text-sm font-medium capitalize transition ${
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
                  <label
                    htmlFor="gct-weight"
                    className="flex items-center gap-1.5 text-sm font-semibold text-slate-700"
                  >
                    <WeightIcon className="h-3.5 w-3.5 text-medical-teal" />
                    Weight (kg)
                  </label>
                  <input
                    id="gct-weight"
                    type="number"
                    inputMode="decimal"
                    step={0.1}
                    min={0}
                    max={120}
                    placeholder="e.g. 12.5"
                    value={weight}
                    onChange={(event) => setWeight(event.target.value)}
                    className={`${inputClass} ${
                      errors.weight
                        ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100"
                        : "border-slate-200 focus:border-medical-teal focus:ring-medical-teal/20"
                    }`}
                  />
                  {errors.weight && (
                    <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.weight}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="gct-height"
                    className="flex items-center gap-1.5 text-sm font-semibold text-slate-700"
                  >
                    <RulerIcon className="h-3.5 w-3.5 text-medical-teal" />
                    Height (cm)
                  </label>
                  <input
                    id="gct-height"
                    type="number"
                    inputMode="decimal"
                    step={0.1}
                    min={0}
                    max={200}
                    placeholder="e.g. 88"
                    value={height}
                    onChange={(event) => setHeight(event.target.value)}
                    className={`${inputClass} ${
                      errors.height
                        ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100"
                        : "border-slate-200 focus:border-medical-teal focus:ring-medical-teal/20"
                    }`}
                  />
                  {errors.height && (
                    <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.height}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-medical-teal px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-medical-teal/30 transition hover:bg-medical-teal-dark"
              >
                Check Growth
              </button>

              <p className="text-center text-xs leading-relaxed text-slate-400">
                This tool is for general screening only. It does not replace a pediatrician&apos;s
                consultation or an official growth chart assessment.
              </p>
            </form>
          ) : (
            <div className="space-y-5">
              <div className="rounded-2xl bg-medical-teal-light/60 px-5 py-4">
                <p className="text-sm font-semibold text-slate-900">Growth Summary</p>
                <p className="mt-0.5 text-sm text-slate-600">
                  {result.childName ? `${result.childName}'s` : "Your child's"} growth screening
                  result
                </p>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl bg-white px-2 py-3 shadow-sm">
                    <p className="text-xs text-slate-500">Age</p>
                    <p className="mt-0.5 text-sm font-bold text-slate-900">{result.ageLabel}</p>
                  </div>
                  <div className="rounded-xl bg-white px-2 py-3 shadow-sm">
                    <p className="text-xs text-slate-500">Standard</p>
                    <p className="mt-0.5 text-sm font-bold text-slate-900">{result.standard}</p>
                  </div>
                  <div className="rounded-xl bg-white px-2 py-3 shadow-sm">
                    <p className="text-xs text-slate-500">BMI</p>
                    <p className="mt-0.5 text-sm font-bold text-slate-900">{result.bmi}</p>
                  </div>
                </div>

                <BmiRanger key={submitCount} bmi={result.bmi} ageMonths={result.ageMonths} />
              </div>

              <div className="rounded-2xl border border-slate-100 px-5 py-4">
                <span
                  className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-semibold ${STATUS_UI[result.status].badgeClass}`}
                >
                  {STATUS_UI[result.status].label}
                </span>
                <p className="mt-3 text-sm font-semibold text-slate-900">BMI Status</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  {getGrowthMessage(result.status)}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 px-5 py-4">
                  <p className="text-sm font-semibold text-slate-900">Weight Guidance</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    {WEIGHT_GUIDANCE[result.status]}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-100 px-5 py-4">
                  <p className="text-sm font-semibold text-slate-900">Height Guidance</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    {HEIGHT_GUIDANCE[result.status]}
                  </p>
                </div>
              </div>

              <p className="text-center text-sm font-medium text-slate-700">
                Suggest a pediatric consultation for exact growth chart interpretation.
              </p>

              <p className="rounded-xl bg-medical-blue-light/60 px-4 py-3 text-center text-xs leading-relaxed text-slate-500">
                This tool is for general screening only. It does not replace a pediatrician&apos;s
                consultation or an official growth chart assessment.
              </p>

              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={resetAll}
                  className="flex-1 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Check Again
                </button>
                <a
                  href={getPhoneUrl()}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-medical-teal px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-medical-teal-dark"
                >
                  <CalendarIcon className="h-3.5 w-3.5" />
                  Book Appointment
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
