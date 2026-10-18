// Shared building blocks: page width, section heading, tags and buttons.
import Link from "next/link";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[66rem] px-4 sm:px-8 lg:px-0 ${className}`}>{children}</div>;
}

/** The small "02 — In-depth" label above a title. */
export function Eyebrow({ n, children, className = "" }: { n?: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-sm text-accent ${className}`}>
      {n ? <span className="tabular-nums">{n} — </span> : null}
      {children}
    </p>
  );
}

export function SectionHeading({ n, eyebrow, title, note }: { n: string; eyebrow: string; title: React.ReactNode; note?: string }) {
  return (
    <div data-reveal className="mb-12 flex flex-col gap-6 sm:mb-16 md:flex-row md:items-end md:justify-between">
      <div>
        <Eyebrow n={n} className="mb-4">{eyebrow}</Eyebrow>
        <h2 className="text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">{title}</h2>
      </div>
      {note ? <p className="max-w-xs text-base leading-relaxed text-muted md:pb-2">{note}</p> : null}
    </div>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-[3px] border border-tag-line bg-bg/40 px-3 py-1.5 text-sm leading-none text-soft">{children}</span>
  );
}

/** The `--d` delay that staggers a group of revealed siblings. */
export function stagger(i: number, step = 80): React.CSSProperties {
  return { "--d": `${i * step}ms` } as React.CSSProperties;
}

const buttonBase =
  "inline-flex h-12 items-center justify-center gap-2 rounded-[3px] px-6 text-[15px] font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function ButtonLink({
  href, children, variant = "primary", magnetic = false, className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  /** Drifts toward the pointer (see Interactions). */
  magnetic?: boolean;
  className?: string;
}) {
  const cls = `${buttonBase} ${
    variant === "primary"
      ? "bg-accent text-accent-ink hover:shadow-[0_10px_30px_-10px_var(--accent)] hover:brightness-110"
      : "border border-accent text-accent hover:bg-accent hover:text-accent-ink"
  } ${className}`;
  const extra = magnetic ? { "data-magnetic": "" } : {};
  const external = /^(https?:|mailto:)/.test(href);
  if (external) {
    return (
      <a href={href} className={cls} {...extra} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return <Link href={href} className={cls} {...extra}>{children}</Link>;
}
