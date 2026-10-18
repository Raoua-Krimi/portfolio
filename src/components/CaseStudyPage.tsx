// One case study, laid out as Raoua's template: hero image, "Project at",
// title, intro, tags, role / deliverables / team, numbered sections with their
// figures, the numbers, then the previous and next projects.
import Image from "next/image";
import Link from "next/link";
import { neighbours, type CaseStudy, type Figure } from "@/content/cases";
import { ArrowLeftIcon, ArrowRightIcon, ExpandIcon } from "./icons";
import { CaseKeys, Lightbox } from "./Lightbox";
import { Container, stagger } from "./ui";

function Zoomable({ f, priority = false }: { f: Figure; priority?: boolean }) {
  return (
    <button
      type="button"
      data-zoom={f.img.src}
      data-zoom-alt={f.alt}
      data-zoom-w={f.img.width}
      data-zoom-h={f.img.height}
      aria-label={`Enlarge: ${f.alt}`}
      className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[4px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--case-ink)]"
    >
      <Image
        src={f.img.src}
        width={f.img.width}
        height={f.img.height}
        alt={f.alt}
        priority={priority}
        sizes="(min-width: 1056px) 1056px, 100vw"
        className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.012]"
      />
      <span className="pointer-events-none absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
        <ExpandIcon className="h-4 w-4" />
      </span>
    </button>
  );
}

export function CaseStudyPage({ c }: { c: CaseStudy }) {
  const { prev, next } = neighbours(c.slug);
  // Sections are numbered in order: 01, 02, ...
  const numbers = c.blocks.map((b, i) => c.blocks.slice(0, i + 1).filter((x) => x.kind === "text").length);

  return (
    <main className="case" style={{ "--case": c.accent } as React.CSSProperties}>
      <Lightbox />
      <CaseKeys prev={`/work/${prev.slug}`} next={`/work/${next.slug}`} />

      <Container className="pt-10 sm:pt-14">
        <div data-reveal="zoom">
          <Zoomable f={{ img: c.hero, alt: `${c.name}, cover` }} priority />
        </div>

        <div className="mt-14 sm:mt-16">
          <p data-reveal className="flex items-center gap-2 text-sm">
            <span className="text-case">Project at</span>
            <span className="text-ink">{c.company}</span>
          </p>
          <h1 data-reveal style={stagger(1)} className="mt-5 text-[2.6rem] leading-[1.05] font-semibold tracking-[-0.035em] text-ink sm:text-6xl">
            {c.title}
          </h1>
          {c.intro.map((p, i) => (
            <p key={i} data-reveal style={stagger(2)} className="mt-6 max-w-4xl text-[17px] leading-[1.75] text-muted">{p}</p>
          ))}
          <div data-reveal style={stagger(3)} className="mt-7 flex flex-wrap gap-2">
            {c.tags.map((t, i) => (
              <span key={t} className={`rounded-[3px] border px-3 py-1.5 text-sm leading-none ${i === 0 ? "border-[var(--case-ink)] text-case" : "border-line text-soft"}`}>{t}</span>
            ))}
          </div>

          <div className="mt-16 grid gap-10 border-b border-line pb-16 sm:grid-cols-3">
            {c.facts.map((f, i) => (
              <div key={f.label} data-reveal style={stagger(i)}>
                <p className="text-sm text-case">{f.label}</p>
                <ul className="mt-4 space-y-2">
                  {f.items.map((it) => (
                    <li key={it} className="flex items-center gap-3 text-[15px] text-soft">
                      <span className="h-1 w-1 rounded-full bg-[var(--case-ink)]" aria-hidden />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6">
          {c.blocks.map((b, i) => {
            if (b.kind === "text") {
              return (
                <section key={i} className="mt-20 sm:mt-24">
                  {b.label ? (
                    <p data-reveal className="text-sm text-case">
                      <span className="tabular-nums">{String(numbers[i]).padStart(2, "0")}</span> — {b.label}
                    </p>
                  ) : null}
                  <h2 data-reveal style={stagger(1)} className="mt-4 text-3xl leading-[1.15] font-semibold tracking-[-0.025em] text-ink sm:text-[2.6rem]">{b.title}</h2>
                  {b.body?.map((p, j) => (
                    <p key={j} data-reveal style={stagger(2)} className="mt-6 max-w-4xl text-[17px] leading-[1.75] text-muted">{p}</p>
                  ))}
                </section>
              );
            }
            return (
              <div key={i} className={b.title ? "mt-14" : "mt-10"}>
                {b.title ? (
                  <div data-reveal className="mb-5">
                    <h3 className="text-xl font-semibold text-ink">{b.title}</h3>
                    {b.caption ? <p className="mt-2 max-w-3xl text-[15px] text-muted">{b.caption}</p> : null}
                  </div>
                ) : null}
                <div className="space-y-6">
                  {b.items.map((f) => (
                    <div key={f.img.src} data-reveal>
                      <Zoomable f={f} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {c.stats ? (
          <dl className="mt-16 flex flex-wrap gap-x-16 gap-y-8">
            {c.stats.map((s, i) => (
              <div key={s.label} data-reveal style={stagger(i, 100)}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-6xl font-semibold tracking-tight text-ink tabular-nums" data-count={s.value} data-suffix={s.suffix ?? ""}>
                  {s.value}
                  {s.suffix}
                </dd>
                <dd className="mt-3 text-sm text-case">{s.label}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {/* Pagination between case studies. The arrow keys do the same. */}
        <nav aria-label="Other projects" className="mt-24 grid gap-4 border-t border-line pt-12 pb-10 sm:grid-cols-2">
          <Link href={`/work/${prev.slug}`} className="nudge-back group rounded-[4px] p-4 -m-4 transition-colors hover:bg-surface" data-reveal>
            <span className="flex items-center gap-1.5 text-sm text-muted">
              <ArrowLeftIcon className="h-3.5 w-3.5 transition-transform" /> Previous project
            </span>
            <span className="mt-2 block text-2xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">{prev.name}</span>
          </Link>
          <Link href={`/work/${next.slug}`} className="nudge group rounded-[4px] p-4 -m-4 text-right transition-colors hover:bg-surface sm:col-start-2" data-reveal style={stagger(1)}>
            <span className="flex items-center justify-end gap-1.5 text-sm text-muted">
              Next project <ArrowRightIcon className="h-3.5 w-3.5" />
            </span>
            <span className="mt-2 block text-2xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">{next.name}</span>
          </Link>
        </nav>
      </Container>
    </main>
  );
}
