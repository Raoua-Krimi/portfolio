// The few icons the site needs, drawn inline: no icon library to ship.
type P = { className?: string };

const base = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const MailIcon = ({ className }: P) => (
  <svg {...base} className={className}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
);
export const ArrowRightIcon = ({ className }: P) => (
  <svg {...base} className={className}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
);
export const ArrowLeftIcon = ({ className }: P) => (
  <svg {...base} className={className}><path d="M19 12H5" /><path d="m11 6-6 6 6 6" /></svg>
);
export const SunIcon = ({ className }: P) => (
  <svg {...base} className={className}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
);
export const MoonIcon = ({ className }: P) => (
  <svg {...base} className={className}><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" /></svg>
);
export const LinkedinIcon = ({ className }: P) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.05c.53-1 1.83-1.85 3.65-1.85 3.9 0 4.6 2.4 4.6 5.6V21h-4v-5.2c0-1.25-.02-2.85-1.8-2.85s-2.05 1.35-2.05 2.75V21h-4.25V9.75Z" /></svg>
);
export const MenuIcon = ({ className }: P) => (
  <svg {...base} className={className}><path d="M4 7h16M4 12h16M4 17h10" /></svg>
);
export const CloseIcon = ({ className }: P) => (
  <svg {...base} className={className}><path d="m6 6 12 12M18 6 6 18" /></svg>
);
export const ArrowUpRightIcon = ({ className }: P) => (
  <svg {...base} className={className}><path d="M7 17 17 7" /><path d="M8 7h9v9" /></svg>
);
export const ArrowUpIcon = ({ className }: P) => (
  <svg {...base} className={className}><path d="M12 19V5" /><path d="m6 11 6-6 6 6" /></svg>
);
export const ExpandIcon = ({ className }: P) => (
  <svg {...base} className={className}><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
);
export const ChevronLeftIcon = ({ className }: P) => (
  <svg {...base} className={className}><path d="m15 18-6-6 6-6" /></svg>
);
export const ChevronRightIcon = ({ className }: P) => (
  <svg {...base} className={className}><path d="m9 18 6-6-6-6" /></svg>
);
