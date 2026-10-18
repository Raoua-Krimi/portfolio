import Link from "next/link";
import { nav, site } from "@/content/site";
import { Interactions } from "./Interactions";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { Container } from "./ui";

export function Header() {
  const links = [
    ...nav.map((l) => ({ ...l, href: `/${l.id}` })),
    ...(site.resume ? [{ id: "", label: "Resume", href: site.resume }] : []),
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      {/* The header is on every page, so it is where the page's pointer and
          scroll behaviour is switched on. */}
      <Interactions />

      <Container className="flex h-[4.5rem] items-center justify-between gap-4">
        <Link href="/" aria-label={`${site.name}, home`} className="text-[15px] font-semibold tracking-wide text-ink transition-colors hover:text-accent">
          {site.name}
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              {...(l.id ? { "data-nav": l.id } : {})}
              className="relative py-1 text-sm text-muted transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:text-ink hover:after:scale-x-100 aria-[current=true]:text-ink aria-[current=true]:after:scale-x-100"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle label="Switch light / dark" />
          <Link
            href="/#contact"
            data-magnetic
            className="hidden h-10 items-center rounded-[3px] bg-accent px-5 text-sm font-medium text-accent-ink hover:shadow-[0_10px_30px_-10px_var(--accent)] hover:brightness-110 sm:inline-flex"
          >
            Let’s talk
          </Link>
          <MobileMenu links={[...links, { href: "/#contact", label: "Let’s talk" }]} />
        </div>
      </Container>

      <div data-progress className="progress absolute inset-x-0 -bottom-px h-0.5" aria-hidden />
    </header>
  );
}
