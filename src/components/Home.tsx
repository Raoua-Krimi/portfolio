// The home page, section by section, as Raoua designed it: hero, projects,
// toolkit, strengths and contact.
import Image from "next/image";
import Link from "next/link";
import { hero, projects, site, strengths, tools, type Project } from "@/content/site";
import { ArrowRightIcon, LinkedinIcon, MailIcon } from "./icons";
import { ButtonLink, Container, SectionHeading, Tag, stagger } from "./ui";

export function Hero() {
  return (
    <section data-parallax-stage className="relative overflow-hidden">
      {/* A soft violet light behind the portrait. */}
      <div aria-hidden className="pointer-events-none absolute -top-40 right-[-10%] h-[38rem] w-[38rem] rounded-full bg-accent/10 blur-3xl" data-parallax="30" />

      <Container className="relative grid items-center gap-14 pt-16 pb-20 sm:pt-24 lg:grid-cols-[1.4fr_1fr] lg:gap-14 lg:pt-28">
        <div data-reveal>
          <p className="mb-6 inline-flex items-center gap-2.5 text-sm text-muted">
            <span className="pulse h-2 w-2 rounded-full bg-available" aria-hidden />
            Available for work
          </p>

          <h1 className="text-[3rem] leading-[1.04] font-semibold tracking-[-0.035em] text-ink sm:text-7xl lg:text-[4.1rem]">
            <span className="line-mask"><span>Hello</span></span>
            <span className="line-mask"><span style={stagger(1, 120)} className="whitespace-nowrap">
              My name is <span className="serif-accent pr-2 text-[1.12em] leading-none">{site.name}</span>
            </span></span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-[1.75] text-muted" data-reveal style={stagger(3, 120)}>
            {hero.intro}
          </p>

          <div className="mt-10 flex flex-wrap gap-3" data-reveal style={stagger(4, 120)}>
            <ButtonLink href="#case-studies" magnetic>
              View my work
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary" magnetic>
              Get in touch
            </ButtonLink>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-10" data-reveal style={stagger(5, 120)}>
            {hero.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-3xl font-semibold tracking-tight text-ink tabular-nums sm:text-4xl" data-count={s.value} data-suffix={s.suffix}>
                  {s.value}
                  {s.suffix}
                </dd>
                <dd className="mt-2 text-sm text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div data-reveal="zoom" style={stagger(2, 120)} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div data-tilt="5" className="relative">
            <div className="relative overflow-hidden rounded-[4px] shadow-[var(--shadow)]">
              <Image
                src={site.portrait.src}
                width={site.portrait.width}
                height={site.portrait.height}
                alt={`Portrait of ${site.name}`}
                priority
                sizes="(min-width: 1024px) 420px, 90vw"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            {/* Two floating notes, drifting slightly against the pointer. */}
            <div data-parallax="18" className="absolute -left-4 bottom-10 sm:-left-10">
              <div className="float rounded-[4px] border border-line bg-bg/90 px-4 py-3 shadow-[var(--shadow)] backdrop-blur" style={{ "--fd": "-2s" } as React.CSSProperties}>
                <p className="text-xs text-muted">Focus</p>
                <p className="text-sm font-medium text-ink">Brand · Product · Motion</p>
              </div>
            </div>
            <div data-parallax="26" className="absolute -right-3 top-8 sm:-right-8">
              <div className="float flex items-center gap-2 rounded-[4px] border border-line bg-bg/90 px-4 py-3 shadow-[var(--shadow)] backdrop-blur">
                <span className="serif-accent text-2xl leading-none">5+</span>
                <span className="text-xs leading-tight text-muted">years of<br />design</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function CardMedia({ p, className }: { p: Project; className: string }) {
  if (!p.image) {
    return (
      <div className={`flex items-center justify-center bg-[radial-gradient(120%_90%_at_20%_0%,color-mix(in_srgb,var(--accent)_28%,transparent),transparent_60%),linear-gradient(135deg,var(--surface-2),var(--surface))] ${className}`}>
        <div className="text-center">
          <p className="serif-accent text-4xl">{p.title}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">Case study coming soon</p>
        </div>
      </div>
    );
  }
  return (
    <div className={`zoom-media ${className}`}>
      <Image src={p.image.src} width={p.image.width} height={p.image.height} alt={`${p.title}, cover`} sizes="(min-width: 1024px) 600px, 100vw" className="h-full w-full object-cover" />
    </div>
  );
}

function CardText({ p, big }: { p: Project; big?: boolean }) {
  return (
    <>
      <div className="flex items-center justify-between text-sm text-muted">
        <span>{p.company}</span>
        <span className="tabular-nums">{p.year}</span>
      </div>
      <h3 className={`mt-5 font-semibold tracking-[-0.02em] text-ink ${big ? "text-3xl leading-[1.15] sm:text-[2.1rem]" : "text-[1.75rem] leading-tight"}`}>{p.title}</h3>
      <p className="mt-4 text-[15px] leading-relaxed text-muted">{p.summary}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {p.tags.map((t) => <Tag key={t}>{t}</Tag>)}
      </div>
      <p className={`nudge mt-8 inline-flex items-center gap-2 text-[15px] ${p.slug ? "text-accent" : "text-muted"}`}>
        {p.slug ? "Read case study" : "Coming soon"}
        {p.slug ? <ArrowRightIcon className="h-4 w-4" /> : null}
      </p>
    </>
  );
}

/** A card is a link when its case study exists. */
function CardShell({ p, className, children }: { p: Project; className: string; children: React.ReactNode }) {
  const cls = `group glow-card block rounded-[4px] ${className}`;
  return p.slug ? (
    <Link href={`/work/${p.slug}`} className={cls} aria-label={`${p.title}: read the case study`}>{children}</Link>
  ) : (
    <div className={cls}>{children}</div>
  );
}

export function Projects() {
  const wide = projects.filter((p) => p.wide);
  const grid = projects.filter((p) => !p.wide);
  return (
    <section className="pt-10 pb-24 sm:pb-32">
      <Container>
        <SectionHeading n="02" eyebrow="In-depth" title="My projects" note="UX/UI research, design systems, brand identity, AI design." />

        <div id="case-studies" className="scroll-mt-28 space-y-10">
          {wide.map((p, i) => (
            <div key={p.title} data-reveal style={stagger(i, 100)}>
              <CardShell p={p} className="border border-tag-line transition-shadow duration-500 hover:shadow-[var(--shadow)]">
                <div className="glow-inner grid overflow-hidden md:grid-cols-[0.77fr_1fr]">
                  <div className="order-2 p-7 sm:p-8 md:order-1">
                    <CardText p={p} big />
                  </div>
                  <CardMedia p={p} className="order-1 aspect-[16/11] md:order-2 md:aspect-auto md:min-h-[26rem]" />
                </div>
              </CardShell>
            </div>
          ))}
        </div>

        <div id="branding" className="mt-10 grid scroll-mt-28 gap-8 md:grid-cols-2">
          {grid.map((p, i) => (
            <div key={p.title} data-reveal style={stagger(i, 100)}>
              <CardShell p={p} className="h-full border border-line transition-shadow duration-500 hover:shadow-[var(--shadow)]">
                <div className="glow-inner flex flex-col overflow-hidden">
                  <CardMedia p={p} className="aspect-[510/350]" />
                  <div className="p-7">
                    <CardText p={p} />
                  </div>
                </div>
              </CardShell>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ToolChip({ t }: { t: (typeof tools)[number] }) {
  return (
    <div className="group flex items-center gap-4 rounded-[4px] px-2 py-2 transition-colors hover:bg-surface">
      <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-[4px] ring-1 ring-line transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
        <Image src={t.logo.src} width={t.logo.width} height={t.logo.height} alt="" className="h-full w-full object-contain" />
      </span>
      <span className="whitespace-nowrap text-base font-medium text-ink">{t.name}</span>
    </div>
  );
}

export function Toolkit() {
  return (
    <section id="tools" className="scroll-mt-20 py-24 sm:py-28">
      <Container>
        <SectionHeading n="03" eyebrow="Toolkit" title="My tech stack" note="The software I rely on day to day." />
        {/* Desktop: one row, as designed. Phone: the row slides. */}
        <div className="hidden justify-between gap-4 lg:flex">
          {tools.map((t, i) => (
            <div key={t.name} data-reveal style={stagger(i, 70)}>
              <ToolChip t={t} />
            </div>
          ))}
        </div>
        <div className="marquee lg:hidden" data-reveal>
          <div className="marquee-track gap-6">
            {[0, 1].map((copy) => (
              <div key={copy} className={`flex gap-6 ${copy ? "marquee-dup" : ""}`} aria-hidden={copy === 1}>
                {tools.map((t) => <ToolChip key={t.name} t={t} />)}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Strengths() {
  return (
    <section id="skills" className="scroll-mt-20 py-24 sm:py-28">
      <Container>
        <SectionHeading n="04" eyebrow="Strengths" title="What I Bring" />
        <div className="grid gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {strengths.map((s, i) => (
            <div
              key={s.title}
              data-reveal
              data-spotlight
              style={stagger(i, 70)}
              className="group flex gap-5 bg-bg px-1 py-8 transition-colors duration-300 hover:bg-surface sm:px-6"
            >
              <span className="serif-accent w-8 shrink-0 text-3xl leading-none transition-transform duration-300 group-hover:-translate-y-0.5">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Contact() {
  const email = `mailto:${site.email}`;
  const linkedin = site.social.linkedin;
  return (
    <section id="contact" data-spotlight className="scroll-mt-20 overflow-hidden py-28 sm:py-36">
      <Container className="text-center">
        <p data-reveal className="text-sm text-accent">06 — Contact</p>
        <h2 data-reveal style={stagger(1, 120)} className="mx-auto mt-8 max-w-4xl text-6xl leading-[0.98] font-semibold tracking-[-0.045em] text-ink sm:text-8xl">
          Let’s make <span className="serif-accent text-[1.08em]">something</span>
          <br />
          great.
        </h2>
        <p data-reveal style={stagger(2, 120)} className="mt-10 text-lg text-muted sm:text-xl">
          Have a project in mind? I’d love to hear about it.
        </p>
        <div data-reveal style={stagger(3, 120)} className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href={email} magnetic>
            <MailIcon className="h-4 w-4" /> Email
          </ButtonLink>
          <ButtonLink href={linkedin} variant="secondary" magnetic>
            <LinkedinIcon className="h-4 w-4" /> LinkedIn
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
