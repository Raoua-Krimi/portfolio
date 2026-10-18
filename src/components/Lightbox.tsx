"use client";

// Every [data-zoom] figure on the page opens full screen. The lightbox walks
// through the page's figures in order (arrows, swipe), and closes on Escape,
// the close button or a click outside the image.
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./icons";

type Shot = { src: string; alt: string; w: number; h: number };

function figures(): HTMLElement[] {
  return [...document.querySelectorAll<HTMLElement>("main [data-zoom]")].filter((el) => el.getClientRects().length > 0);
}

const read = (el: HTMLElement): Shot => ({
  src: el.dataset.zoom!,
  alt: el.dataset.zoomAlt ?? "",
  w: Number(el.dataset.zoomW),
  h: Number(el.dataset.zoomH),
});

export function Lightbox() {
  const [index, setIndex] = useState<number | null>(null);
  const [shots, setShots] = useState<Shot[]>([]);
  const touchX = useRef(0);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-zoom]");
      if (!el) return;
      const all = figures();
      setShots(all.map(read));
      setIndex(Math.max(0, all.indexOf(el)));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + shots.length) % shots.length)), [shots.length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    document.documentElement.dataset.lightbox = "open";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      delete document.documentElement.dataset.lightbox;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, step]);

  if (index === null || !shots[index]) return null;
  const s = shots[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={s.alt}
      className="fade-in fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={close}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- the image is already loaded by the page at this size */}
      <img
        key={s.src}
        src={s.src}
        alt={s.alt}
        width={s.w}
        height={s.h}
        onClick={(e) => e.stopPropagation()}
        className="lightbox-in max-h-[88dvh] max-w-[94vw] rounded-[4px] object-contain shadow-2xl"
      />
      <p className="pointer-events-none absolute bottom-5 left-1/2 max-w-[80vw] -translate-x-1/2 text-center text-sm text-white/75">
        {s.alt} <span className="ml-2 tabular-nums text-white/45">{index + 1} / {shots.length}</span>
      </p>
      <button type="button" aria-label="Close" onClick={close} className="absolute top-4 right-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
        <CloseIcon className="h-5 w-5" />
      </button>
      {shots.length > 1 ? (
        <>
          <button type="button" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:flex">
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button type="button" aria-label="Next image" onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:flex">
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </>
      ) : null}
    </div>
  );
}

/** The arrow keys move to the previous / next case study, unless the lightbox or a field has them. */
export function CaseKeys({ prev, next }: { prev: string; next: string }) {
  const router = useRouter();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (document.documentElement.dataset.lightbox || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t?.closest("input, textarea, [contenteditable]")) return;
      if (e.key === "ArrowRight") router.push(next);
      if (e.key === "ArrowLeft") router.push(prev);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, prev, next]);
  return null;
}
