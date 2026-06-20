"use client";

import { useEffect, useState } from "react";
import { BabyIcon } from "@/components/icons";

/**
 * Probes whether an image URL actually loads. A plain <img onError> can miss
 * a fast local 404 that fires before React hydrates and attaches the
 * listener, so this checks the load outcome independently via a detached
 * Image() instance.
 */
function useImageStatus(src: string) {
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setStatus("ok");
    img.onerror = () => setStatus("error");
    img.src = src;
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return status;
}

/** Main hero photo. Shows a styled placeholder until the real file exists. */
export function HeroPhoto({ src, alt }: { src: string; alt: string }) {
  const status = useImageStatus(src);

  if (status === "error") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-medical-blue-light via-white to-medical-teal-light text-medical-teal">
        <BabyIcon className="h-16 w-16" />
        <p className="px-6 text-center text-sm font-medium text-slate-500">
          Add your hero photo at
          <br />
          <span className="font-semibold text-slate-700">{src}</span>
        </p>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="h-full w-full object-cover" />
  );
}

/** General-purpose photo with a styled placeholder until the real file exists. */
export function PhotoWithFallback({
  src,
  alt,
  fallback,
  className,
}: {
  src: string;
  alt: string;
  fallback?: React.ReactNode;
  className?: string;
}) {
  const status = useImageStatus(src);

  if (status === "error") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-medical-blue-light via-white to-medical-teal-light text-medical-teal">
        {fallback ?? <BabyIcon className="h-10 w-10" />}
        <p className="px-4 text-center text-xs font-medium text-slate-500">
          Add photo at <span className="font-semibold text-slate-700">{src}</span>
        </p>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className ?? "h-full w-full object-cover"} />
  );
}

/** Decorative image (giraffe, avatars). Renders nothing until the file exists. */
export function SafeImg({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const status = useImageStatus(src);
  if (status !== "ok") return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} />
  );
}
