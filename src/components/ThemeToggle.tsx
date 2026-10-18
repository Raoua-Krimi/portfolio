"use client";

import { MoonIcon, SunIcon } from "./icons";

export function ThemeToggle({ label }: { label: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable: the choice lasts for this page only */
    }
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-accent hover:text-accent"
    >
      <MoonIcon className="theme-moon h-4 w-4" />
      <SunIcon className="theme-sun h-4 w-4" />
    </button>
  );
}
