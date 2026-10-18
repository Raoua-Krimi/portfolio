"use client";

// One place for every pointer and scroll behaviour of the site.
//
// Components stay server-rendered and only DECLARE what they want with a data
// attribute; this component, mounted once per page, makes them move:
//
//   data-reveal            fade and rise when scrolled into view
//   data-count="1600"      count up from zero when revealed
//   data-spotlight         a glow that follows the pointer
//   data-tilt="8"          3D tilt toward the pointer (max degrees)
//   data-magnetic          drift toward the pointer
//   data-parallax="14"     shift against the pointer inside the hero (px)
//   data-progress          scroll progress (sets --progress)
//   data-nav="#tools"      menu link, marked current when its section is in view
//
// Pointer effects use event delegation, so elements that appear later need no
// registration. Everything is skipped for
// visitors who ask for reduced motion, and on touch screens for the pointer
// effects.
import { useEffect, useRef } from "react";

export function Interactions() {
  const anchor = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    /* The page this instance belongs to. The router keeps the page you just
       left in the document, hidden, so that going back is instant: a search
       of the whole document would also find ITS menu and ITS sections, and a
       hidden section measures as "at the top", which marked the last menu
       link as current on every other page. Everything is therefore looked up
       from this page's own header, and a section only counts when it is
       actually rendered. */
    const header = anchor.current?.closest("header") ?? document.body;
    const rendered = (el: Element) => el.getClientRects().length > 0;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: Array<() => void> = [];

    // ── Reveal + counters ────────────────────────────────────────────────
    const count = (el: HTMLElement) => {
      const target = Number(el.dataset.count);
      if (!Number.isFinite(target) || reduce) return;
      const fmt = new Intl.NumberFormat(document.documentElement.lang || "en");
      const start = performance.now();
      const duration = 1400;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = fmt.format(Math.round(target * eased)) + (el.dataset.suffix ?? "");
        if (t < 1) requestAnimationFrame(tick);
      };
      el.textContent = "0" + (el.dataset.suffix ?? "");
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.classList.add("in");
          el.querySelectorAll<HTMLElement>("[data-count]").forEach(count);
          if (el.dataset.count) count(el);
          io.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    // ── Scroll: progress bar, current menu link ──────────────────────────
    const progress = header.querySelector<HTMLElement>("[data-progress]");
    const navLinks = [...header.querySelectorAll<HTMLElement>("[data-nav]")];
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.dataset.nav ?? ""))
      .filter((s): s is HTMLElement => !!s);
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        progress?.style.setProperty("--progress", max > 0 ? String(Math.min(1, window.scrollY / max)) : "0");

        // The section whose top passed the reading line last, whatever the
        // order of the menu links.
        const line = window.innerHeight * 0.35;
        let current = "";
        let best = -Infinity;
        for (const s of sections) {
          if (!rendered(s)) continue;
          const r = s.getBoundingClientRect();
          if (r.top <= line && r.bottom > 0 && r.top > best) {
            best = r.top;
            current = `#${s.id}`;
          }
        }
        for (const l of navLinks) {
          if (l.dataset.nav === current) l.setAttribute("aria-current", "true");
          else l.removeAttribute("aria-current");
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    cleanups.push(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    });

    // ── Pointer: spotlight, tilt, magnetic, parallax ─────────────────────
    if (fine && !reduce) {
      let lit: HTMLElement[] = [];
      let tilted: HTMLElement | null = null;
      let pulled: HTMLElement | null = null;

      const release = (el: HTMLElement | null, props: string[]) => {
        if (el) for (const p of props) el.style.removeProperty(p);
      };

      const onMove = (e: PointerEvent) => {
        const target = e.target as Element | null;
        if (!target?.closest) return;

        // Every spotlight surface under the pointer (a card inside a section).
        const nowLit: HTMLElement[] = [];
        let node = target.closest<HTMLElement>("[data-spotlight], .glow-card");
        while (node) {
          const r = node.getBoundingClientRect();
          node.style.setProperty("--mx", `${e.clientX - r.left}px`);
          node.style.setProperty("--my", `${e.clientY - r.top}px`);
          node.style.setProperty("--spot", "1");
          nowLit.push(node);
          node = node.parentElement?.closest<HTMLElement>("[data-spotlight], .glow-card") ?? null;
        }
        for (const el of lit) if (!nowLit.includes(el)) el.style.setProperty("--spot", "0");
        lit = nowLit;

        const tilt = target.closest<HTMLElement>("[data-tilt]");
        if (tilt !== tilted) release(tilted, ["--rx", "--ry"]);
        tilted = tilt;
        if (tilt) {
          const r = tilt.getBoundingClientRect();
          const max = Number(tilt.dataset.tilt) || 6;
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          tilt.style.setProperty("--ry", `${(px * max * 2).toFixed(2)}deg`);
          tilt.style.setProperty("--rx", `${(-py * max * 2).toFixed(2)}deg`);
        }

        const mag = target.closest<HTMLElement>("[data-magnetic]");
        if (mag !== pulled) release(pulled, ["--tx", "--ty"]);
        pulled = mag;
        if (mag) {
          const r = mag.getBoundingClientRect();
          mag.style.setProperty("--tx", `${((e.clientX - (r.left + r.width / 2)) * 0.22).toFixed(1)}px`);
          mag.style.setProperty("--ty", `${((e.clientY - (r.top + r.height / 2)) * 0.3).toFixed(1)}px`);
        }

        const stage = target.closest<HTMLElement>("[data-parallax-stage]");
        if (stage) {
          const r = stage.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          stage.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
            const d = Number(el.dataset.parallax) || 10;
            el.style.transform = `translate3d(${(-px * d).toFixed(1)}px, ${(-py * d).toFixed(1)}px, 0)`;
          });
        }
      };

      const onLeave = () => {
        for (const el of lit) el.style.setProperty("--spot", "0");
        lit = [];
        release(tilted, ["--rx", "--ry"]);
        release(pulled, ["--tx", "--ty"]);
        tilted = pulled = null;
      };

      document.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        document.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("pointerleave", onLeave);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return <span ref={anchor} hidden />;
}
