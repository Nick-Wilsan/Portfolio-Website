import { Fragment, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { brandStyle, projectBySlug, projects } from "./projects";
import { Accent, Glow, Rise, SectionTitle, ThemeToggle } from "./ui";

// One shipped product in depth: problem, users, flow, the calls behind it,
// how it was checked, and where it stands. Content lives in ./projects.tsx.

const TopBar = () => (
  <header className="fixed top-0 inset-x-0 z-50 px-4 pt-4">
    <nav className="mx-auto max-w-7xl flex items-center justify-between rounded-full border border-line bg-surface px-5 py-2.5">
      <Link to="/v2" className="font-heading text-xl font-extrabold text-ink">
        Nick<span className="text-accent">.</span>
      </Link>
      <a
        href="/v2#products"
        aria-label="All products"
        className="group inline-flex items-center gap-2 rounded-full px-3 sm:px-4 py-2.5 text-sm text-muted hover:text-ink transition-colors"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
        <span className="hidden sm:inline">All products</span>
      </a>
      <div className="flex items-center gap-1">
        <ThemeToggle />
        <a
          href="/v2#contact"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent hover:bg-accent-ink transition-colors"
        >
          Contact me
        </a>
      </div>
    </nav>
  </header>
);

export default function ProjectPage() {
  const { slug } = useParams();
  const p = projectBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (p) document.title = `${p.name} - Nick Wilsan`;
  }, [p]);

  if (!p) return <Navigate to="/v2" replace />;
  const d = p.detail;
  const next = projects[(projects.indexOf(p) + 1) % projects.length];

  return (
    <div className="v2 min-h-screen overflow-x-clip bg-paper text-ink font-body selection:bg-accent selection:text-on-accent">
      <div className="v2-grain" aria-hidden />
      <TopBar />
      {/* The page body speaks in the product's color; the top bar stays Nick's green */}
      {/* key: moving between projects only changes :slug, so React would reuse
          this tree, and a reused <video> keeps playing the old file. A fresh
          subtree per project resets the video, its chapters and the reveals. */}
      <main key={p.slug} style={brandStyle(p.brand)} className="brand selection:bg-accent selection:text-on-accent">
        {/* Header */}
        <section className="mx-auto max-w-7xl px-5 pt-36 md:pt-44 pb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent-ink">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {p.status}
          </span>
          <h1 className="font-heading text-[clamp(2.8rem,8vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.035em] text-ink mt-6 text-balance">
            {p.name}
          </h1>
          <p className="text-xl text-muted leading-relaxed mt-6 max-w-3xl text-pretty">{p.oneLiner}</p>
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 mt-12 pt-8 border-t border-line">
            {d.facts.map((f) => (
              <div key={f.label}>
                <dt className="text-sm text-faint">{f.label}</dt>
                <dd className="text-base text-ink mt-1 text-pretty">{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 text-sm text-faint">
            <span>{p.stack.join("  ·  ")}</span>
            {p.link && (
              <a
                href={p.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-semibold text-accent py-2"
              >
                {p.link.label}
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}
          </div>
        </section>

        {/* Film */}
        <section className="mx-auto max-w-7xl px-5">
          <Rise className="relative">
            <Glow color={p.brand.glow} className="-inset-x-[18%] -inset-y-[30%]" />
            <div className="relative">{p.film}</div>
          </Rise>
        </section>

        {/* Problem */}
        <section className="mx-auto max-w-7xl px-5 py-16 md:py-24 grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16">
          <div>
            <h2 className="font-heading text-[clamp(1.9rem,3.6vw,3rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink text-balance">
              {d.problem.lead}
            </h2>
            <p className="text-base text-muted leading-relaxed mt-6 max-w-xl text-pretty">{d.problem.body}</p>
          </div>
          <div className="rounded-[2rem] border border-line bg-surface px-6 md:px-8 py-2 self-start">
            <h3 className="text-sm text-faint pt-5">Before</h3>
            <ul>
              {d.problem.before.map((b) => (
                <li key={b} className="py-4 border-b border-line last:border-b-0 text-[0.95rem] text-ink leading-snug text-pretty">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Users */}
        <section className="mx-auto max-w-7xl px-5 pb-16 md:pb-24">
          <SectionTitle>
            Who <Accent>uses it</Accent>
          </SectionTitle>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
            {d.users.map((u) => (
              <div key={u.role} className="pt-6 border-t border-line">
                <h3 className="text-lg font-semibold text-ink">{u.role}</h3>
                <p className="text-sm text-muted leading-relaxed mt-2 text-pretty">{u.does}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Flow: a real sequence, so it is numbered */}
        <section className="bg-surface border-y border-line py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16">
            <div className="lg:sticky lg:top-32 self-start">
              <h2 className="font-heading text-[clamp(2.5rem,6vw,4.75rem)] font-extrabold leading-[1] tracking-[-0.03em] text-ink text-balance">
                How it <Accent>works</Accent>
              </h2>
              <p className="text-base text-muted leading-relaxed mt-5 max-w-sm text-pretty">
                The path one order takes, from the first screen to the last.
              </p>
            </div>
            <ol className="relative">
              {d.flow.map((s, i) => (
                <li key={s.title} className="relative grid grid-cols-[3.5rem_1fr] gap-4 pb-10 last:pb-0">
                  {i < d.flow.length - 1 && (
                    <span aria-hidden className="absolute left-[1.35rem] top-12 bottom-1 w-px bg-line" />
                  )}
                  <span className="font-heading text-3xl font-extrabold text-accent leading-none pt-1">{i + 1}</span>
                  <div>
                    <h3 className="font-heading text-xl font-extrabold text-ink">{s.title}</h3>
                    <p className="text-[0.95rem] text-muted leading-relaxed mt-2 max-w-xl text-pretty">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Decisions */}
        <section className="mx-auto max-w-7xl px-5 py-16 md:py-24">
          <SectionTitle aside="The product calls behind the build, and why I made them.">
            Calls I <Accent>made</Accent>
          </SectionTitle>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
            {d.decisions.map((c, i) => (
              <Fragment key={c.call}>
                <Rise delay={(i % 2) * 0.08}>
                  <div className="pt-7 border-t border-line">
                    <h3 className="font-heading text-[1.55rem] font-extrabold leading-[1.15] tracking-[-0.02em] text-ink text-balance">
                      {c.call}
                    </h3>
                    <p className="text-[0.95rem] text-muted leading-relaxed mt-3 text-pretty">{c.why}</p>
                  </div>
                </Rise>
              </Fragment>
            ))}
          </div>
        </section>

        {/* Quality */}
        <section className="relative mx-auto max-w-7xl px-5 pb-16 md:pb-24">
          <Glow color={p.brand.glow} className="inset-x-0 -top-[20%] bottom-[5%]" />
          <div className="relative rounded-[2rem] bg-accent text-on-accent p-7 md:p-12 grid lg:grid-cols-[1fr_1.3fr] gap-8 lg:gap-14">
            <div>
              <h2 className="font-heading text-[clamp(1.9rem,3.6vw,2.8rem)] font-extrabold leading-[1.05] tracking-[-0.025em] text-balance">
                How I made sure it works
              </h2>
              <p className="text-base leading-relaxed mt-4 opacity-80 text-pretty">{d.quality.lead}</p>
            </div>
            <ul className="flex flex-col gap-4">
              {d.quality.points.map((q) => (
                <li key={q} className="flex gap-3 text-[0.95rem] leading-relaxed">
                  <Check size={18} strokeWidth={2.75} className="shrink-0 mt-0.5" />
                  <span className="text-pretty">{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Status & lessons */}
        <section className="mx-auto max-w-7xl px-5 pb-16 md:pb-24 grid lg:grid-cols-2 gap-6">
          <div className="rounded-[2rem] border border-line bg-surface p-7 md:p-9">
            <h2 className="font-heading text-2xl font-extrabold text-ink">Where it stands</h2>
            <p className="text-base text-muted leading-relaxed mt-4 text-pretty">{d.status}</p>
          </div>
          <div className="rounded-[2rem] border border-line bg-surface p-7 md:p-9">
            <h2 className="font-heading text-2xl font-extrabold text-ink">What I learned</h2>
            <ul className="flex flex-col gap-4 mt-4">
              {d.learned.map((l) => (
                <li key={l} className="text-base text-muted leading-relaxed text-pretty">
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Next */}
        {next.slug !== p.slug && (
          <section className="mx-auto max-w-7xl px-5 pb-16 md:pb-24">
            <Link
              to={`/v2/projects/${next.slug}`}
              style={brandStyle(next.brand)}
              className="brand group flex flex-col md:flex-row md:items-end md:justify-between gap-6 rounded-[2rem] border border-line p-7 md:p-10 hover:border-accent transition-colors"
            >
              <div>
                <p className="text-sm text-faint">Next product</p>
                <p className="font-heading text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-[1] tracking-[-0.03em] text-ink mt-3 group-hover:text-accent transition-colors">
                  {next.name}
                </p>
                <p className="text-base text-muted mt-4 max-w-xl text-pretty">{next.oneLiner}</p>
              </div>
              <span className="shrink-0 w-14 h-14 rounded-full border border-line grid place-items-center text-ink group-hover:bg-accent group-hover:border-accent group-hover:text-on-accent transition-colors">
                <ArrowUpRight size={24} strokeWidth={2.25} />
              </span>
            </Link>
          </section>
        )}
      </main>
      <footer className="border-t border-line">
        <p className="mx-auto max-w-7xl px-5 py-8 text-xs text-faint">© 2026 Nick Wilsan</p>
      </footer>
    </div>
  );
}
