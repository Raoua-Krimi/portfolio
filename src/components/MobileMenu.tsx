"use client";

// The menu on a phone: a button in the header that opens the section links
// full height under it. The page behind does not scroll while it is open, and
// Escape or a tap on a link closes it.
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRightIcon, CloseIcon, MenuIcon } from "./icons";

export function MobileMenu({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close the menu" : "Open the menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[3px] border border-line text-soft transition-colors hover:border-accent hover:text-accent"
      >
        {open ? <CloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
      </button>

      {/* Positioned from the header, which is this panel's containing block. */}
      <div id="mobile-menu" hidden={!open} className="absolute inset-x-0 top-full h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-bg px-4 py-6">
        <nav className="flex flex-col">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ "--d": `${i * 60}ms` } as React.CSSProperties}
              className="row-in flex items-center justify-between border-b border-line py-5 text-2xl font-semibold tracking-tight text-ink"
            >
              {l.label}
              <ArrowRightIcon className="h-5 w-5 text-accent" />
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
