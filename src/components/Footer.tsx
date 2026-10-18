import Link from "next/link";
import { site } from "@/content/site";
import { ArrowUpIcon } from "./icons";
import { Container } from "./ui";

export function Footer() {
  const columns = [
    { title: "Work", links: [{ label: "Branding & Motion", href: "/#branding" }, { label: "Case Studies", href: "/#case-studies" }] },
    {
      title: "About",
      links: [
        { label: "Tools", href: "/#tools" },
        { label: "Skills", href: "/#skills" },
        ...(site.resume ? [{ label: "Resume", href: site.resume }] : []),
      ],
    },
    {
      title: "Social",
      links: [
        { label: "LinkedIn", href: site.social.linkedin },
        { label: "Behance", href: site.social.behance },
        { label: "Instagram", href: site.social.instagram },
      ].filter((l) => l.href),
    },
  ].filter((c) => c.links.length);

  return (
    <footer className="mt-10 border-t border-line">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-ink">{site.fullName}</p>
          <p className="mt-3 text-[15px] text-muted">{site.role}.</p>
        </div>
        {columns.map((c) => (
          <div key={c.title}>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">{c.title}</p>
            <ul className="mt-4 space-y-3">
              {c.links.map((l) => (
                <li key={l.label}>
                  {l.href.startsWith("http") ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-[15px] text-soft transition-colors hover:text-accent">{l.label}</a>
                  ) : (
                    <Link href={l.href} className="text-[15px] text-soft transition-colors hover:text-accent">{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <Container className="flex items-center justify-between border-t border-line py-6 text-sm text-muted">
        <p>© {2026} {site.fullName}</p>
        <a href="#top" className="group inline-flex items-center gap-1.5 transition-colors hover:text-accent">
          Back to top
          <ArrowUpIcon className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
        </a>
      </Container>
    </footer>
  );
}
