"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

export function HeroImageCarousel() {
  const { images, intervalMs } = siteConfig.heroCarousel;
  const count: number = images.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number) => setIndex((next + count) % count),
    [count],
  );

  useEffect(() => {
    if (paused || count <= 1) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [paused, count, intervalMs]);

  if (count === 0) return null;

  // Shortest signed distance from the active slide, accounting for wraparound.
  const offsetOf = (i: number) => {
    let diff = i - index;
    if (diff > count / 2) diff -= count;
    else if (diff < -count / 2) diff += count;
    return diff;
  };

  return (
    <section aria-label="Helpful health tips" className="bg-white py-8 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between border-b border-slate-200 pb-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-medical-teal">
            Helpful Tips
          </p>
          <p className="text-sm font-medium text-slate-400">
            <span className="text-slate-700">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="mx-1">/</span>
            {String(count).padStart(2, "0")}
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0].clientX;
          }}
          onTouchEnd={(event) => {
            if (touchStartX.current === null) return;
            const delta = event.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(delta) > 50) goTo(index + (delta < 0 ? 1 : -1));
            touchStartX.current = null;
          }}
        >
          <div className="relative h-[220px] overflow-hidden sm:h-[380px] lg:h-[480px]">
            {images.map((image, imageIndex) => {
              const diff = offsetOf(imageIndex);
              const isCenter = diff === 0;
              const isNeighbor = Math.abs(diff) === 1;
              const scale = isCenter ? 1 : isNeighbor ? 0.78 : 0.6;
              const opacity = isCenter ? 1 : isNeighbor ? 0.55 : 0;

              return (
                <button
                  type="button"
                  key={image.src}
                  aria-label={isCenter ? image.alt : `Go to slide ${imageIndex + 1}`}
                  aria-hidden={Math.abs(diff) > 1}
                  tabIndex={Math.abs(diff) > 1 ? -1 : 0}
                  onClick={() => !isCenter && goTo(imageIndex)}
                  className="absolute left-1/2 top-1/2 h-[92%] cursor-pointer overflow-hidden rounded-2xl shadow-2xl shadow-slate-900/15 transition-[transform,opacity] duration-500 ease-out aria-[hidden=true]:pointer-events-none"
                  style={{
                    aspectRatio: "4 / 3",
                    transform: `translate(-50%, -50%) translateX(${diff * 70}%) scale(${scale})`,
                    opacity,
                    zIndex: 20 - Math.abs(diff),
                  }}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1152px) 80vw, 720px"
                    quality={90}
                    fetchPriority={imageIndex === 0 ? "high" : "auto"}
                    loading={imageIndex === 0 ? "eager" : "lazy"}
                  />
                  {!isCenter && (
                    <span className="absolute inset-0 bg-white/30" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>

          {count > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous slide"
                onClick={() => goTo(index - 1)}
                className="absolute left-0 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-lg backdrop-blur transition hover:bg-white hover:text-medical-blue sm:h-12 sm:w-12 lg:-left-2"
              >
                <ChevronLeftIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <button
                type="button"
                aria-label="Next slide"
                onClick={() => goTo(index + 1)}
                className="absolute right-0 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-lg backdrop-blur transition hover:bg-white hover:text-medical-blue sm:h-12 sm:w-12 lg:-right-2"
              >
                <ChevronRightIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </>
          )}

          <div className="mt-5 flex items-center justify-center gap-2 sm:mt-8">
            {images.map((image, dotIndex) => (
              <button
                key={image.src}
                type="button"
                aria-label={`Go to slide ${dotIndex + 1}`}
                aria-current={dotIndex === index}
                onClick={() => goTo(dotIndex)}
                className={`h-1.5 rounded-full transition-all ${
                  dotIndex === index
                    ? "w-8 bg-gradient-to-r from-medical-blue to-medical-teal"
                    : "w-4 bg-slate-200 hover:bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
