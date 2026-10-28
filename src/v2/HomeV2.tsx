import { motion, useReducedMotion } from "motion/react";
import { Fragment, useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Mail,
  Menu,
  X,
  Check,
  ScanLine,
  Car,
  FileText,
  Github,
  Linkedin,
  Send,
  AlertCircle,
} from "lucide-react";
import { ROUNDUP, TRAVELWISE, brandStyle, projects, type Brand, type Project } from "./projects";
import { Accent, ButtonGhost, ButtonPrimary, Glow, Rise, SectionTitle, ThemeToggle, ease } from "./ui";

// Template v2: a bolder, Bedimcode-inspired layout (rounded panels, light by
// default with a dark toggle, Nick's green plus each product's own color).
// Products are shown as Remotion product films instead of app screenshots.
// Type is Archivo only: extra-wide for display, normal width for text, like a
// shipping label. This is the homepage at /.

const RESUME = "https://drive.google.com/file/d/1D5LhKvryphWln2RgZ449tl2pWoVg8FXj/view";

// ─── Navbar ────────────────────────────────────────────────────────────────────

const links = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Products", id: "products" },
  { label: "Case studies", id: "cases" },
  { label: "Experience", id: "experience" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observers = [...links.map((l) => l.id), "contact"].map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(([e]) => e.isIntersecting && setActive(id), {
        rootMargin: "-40% 0px -55% 0px",
      });
      obs.observe(el);
      return obs;
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observers.forEach((o) => o?.disconnect());
    };
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto max-w-7xl flex items-center justify-between rounded-full border px-5 py-2.5 transition-colors duration-300 ${
          scrolled ? "bg-surface border-line" : "bg-transparent border-transparent"
        }`}
      >
        <a href="#home" className="font-heading text-xl font-extrabold text-ink">
          Nick<span className="text-accent">.</span>
        </a>
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className={`relative rounded-full px-4 py-2.5 text-sm transition-colors ${
                  active === l.id ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {active === l.id && (
                  <motion.span layoutId="v2-nav" className="absolute inset-0 rounded-full bg-raised" transition={{ duration: 0.4, ease }} />
                )}
                <span className="relative">{l.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden md:inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent hover:bg-accent-ink transition-colors"
          >
            Contact me
          </a>
          <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} className="md:hidden w-11 h-11 -mr-2 grid place-items-center text-ink">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="md:hidden mx-auto max-w-7xl mt-2 rounded-3xl border border-line bg-surface p-3 flex flex-col">
          {[...links, { label: "Contact", id: "contact" }].map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-base text-muted hover:bg-raised hover:text-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

// ─── Hero ──────────────────────────────────────────────────────────────────────

// Each card wears its work's color: products use their brand mat; the case
// studies card blends TravelWise blue into Round-Up emerald (white ink reads
// on both ends).
const mat = (slug: string) => projects.find((p) => p.slug === slug)!.brand;
const heroCards = [
  { icon: <Car size={22} />, name: "AkaMobilindo", tag: "Mobile app, live", rotate: -9, side: -1, href: "#akamobilindo", bg: mat("akamobilindo").mat, ink: mat("akamobilindo").matInk, glow: mat("akamobilindo").glow },
  { icon: <ScanLine size={22} />, name: "Hongfu System", tag: "Factory web app", rotate: 0, side: 0, href: "#hongfu-system", bg: mat("hongfu-system").mat, ink: mat("hongfu-system").matInk, glow: mat("hongfu-system").glow },
  { icon: <FileText size={22} />, name: "PRD case studies", tag: "Research & specs", rotate: 9, side: 1, href: "#cases", bg: "linear-gradient(135deg, #2858d0, #1f7a58)", ink: "#ffffff", glow: "rgba(40, 110, 170, 0.32)" },
];

// What I actually do, as colored tags around the headline (desktop only; on a
// phone they'd sit on top of the words). Each wears the color of the work it
// came from. The float is slow and tiny, and stops for reduced motion.
const chips = [
  { label: "User research", bg: "#15803d", ink: "#ffffff", pos: "left-[4%] -top-2", rotate: -7 },
  { label: "PRD & RICE", bg: "linear-gradient(135deg, #2858d0, #3d63db)", ink: "#ffffff", pos: "right-[3%] top-4", rotate: 6 },
  { label: "Next.js", bg: "linear-gradient(135deg, #3f9fd0, #4fbfa6)", ink: "#04121c", pos: "left-[12%] bottom-0", rotate: 5 },
  { label: "React Native", bg: "linear-gradient(135deg, #d91920, #b5121a)", ink: "#ffffff", pos: "right-[13%] -bottom-3", rotate: -5 },
];

const HeroChips = () => {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden className="hidden lg:block">
      {chips.map((c, i) => (
        <motion.span
          key={c.label}
          className={`absolute ${c.pos} rounded-full px-4 py-2 text-sm font-semibold shadow-[0_14px_30px_-14px_rgba(0,0,0,0.5)]`}
          style={{ background: c.bg, color: c.ink, rotate: c.rotate }}
          animate={reduce ? undefined : { y: [0, -7, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
        >
          {c.label}
        </motion.span>
      ))}
    </div>
  );
};

const useIsWide = () => {
  const [wide, setWide] = useState(() => window.matchMedia("(min-width: 768px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const on = () => setWide(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return wide;
};

const Hero = () => {
  const reduce = useReducedMotion();
  // Side cards spread wider on desktop so their titles stay readable.
  const spread = useIsWide() ? 245 : 92;
  return (
    <section id="home" className="relative overflow-x-clip min-h-[100dvh] flex items-center pt-32 pb-24">
      {/* Clipped sideways only, so the cards' colored light can spill below.
          The page's one atmospheric glow: */}
      <div
        aria-hidden
        className="pointer-events-none absolute w-[760px] h-[760px] -top-72 left-1/2 -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--accent) 16%, transparent), transparent 65%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-5 w-full text-center">
        <p className="text-base text-muted">Hi, I'm Nick. Based in Malang, Indonesia.</p>
        {/* Lines come into focus one after another: the page's one choreographed
            entrance. Text is readable even if the animation never runs. */}
        <div className="relative">
        <HeroChips />
        <h1 className="font-heading text-[clamp(2.6rem,7.6vw,6rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-ink mt-6">
          {[<>Product Manager</>, <>who <Accent>ships</Accent>.</>].map((line, i) => (
            <motion.span
              key={i}
              className="block"
              initial={reduce ? false : { y: 22, filter: "blur(5px)" }}
              animate={{ y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.1 + i * 0.14, ease }}
            >
              {line}
            </motion.span>
          ))}
        </h1>
        </div>
        <p className="text-lg text-muted max-w-[34rem] mx-auto mt-7 leading-relaxed text-pretty">
          I research the problem, write the spec, and then build it. Two products are already running for real
          businesses in Batam.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-9">
          <ButtonPrimary href="#products">See my products</ButtonPrimary>
          <ButtonGhost href={RESUME} external>
            Résumé
          </ButtonGhost>
        </div>

        {/* Fan of product cards in place of a portrait; each jumps to its section */}
        <div className="relative h-[230px] md:h-[260px] mt-16 flex justify-center">
          {heroCards.map((c, i) => (
            <motion.a
              key={c.name}
              href={c.href}
              aria-label={`${c.name}: ${c.tag}`}
              whileHover={reduce ? undefined : { y: i === 1 ? -26 : 6, transition: { duration: 0.35, ease } }}
              initial={reduce ? false : { y: 90, rotate: c.rotate, x: c.side * spread }}
              animate={{ y: i === 1 ? -14 : 18, rotate: c.rotate, x: c.side * spread }}
              transition={{ duration: 1.1, delay: 0.45 + i * 0.08, ease }}
              // Each card casts light in its own color onto the page below it
              style={{ background: c.bg, color: c.ink, boxShadow: `0 40px 90px -20px ${c.glow}, 0 0 60px -10px ${c.glow}` }}
              className={`absolute w-[200px] md:w-[230px] h-[200px] md:h-[230px] rounded-[2rem] p-6 flex flex-col justify-between text-left hover:z-20 focus-visible:z-20 outline-none focus-visible:ring-4 focus-visible:ring-accent/60 ${
                i === 1 ? "z-10" : ""
              }`}
            >
              <span className="flex items-center justify-between">
                {c.icon}
                <ArrowDown size={18} strokeWidth={2.25} className="opacity-70" />
              </span>
              <div>
                <p className="font-heading text-xl font-extrabold leading-tight">{c.name}</p>
                <p className="text-sm mt-1 opacity-90">{c.tag}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Vertical socials, desktop only */}
      <div className="hidden lg:flex absolute left-8 bottom-12 flex-col items-center gap-2 text-muted">
        {[
          { href: "https://linkedin.com/in/nick-wilsan", label: "LinkedIn", icon: <Linkedin size={18} /> },
          { href: "https://github.com/nick-wilsan", label: "GitHub", icon: <Github size={18} /> },
          { href: "mailto:wilsannick55@gmail.com", label: "Email", icon: <Mail size={18} /> },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="w-11 h-11 grid place-items-center hover:text-accent transition-colors"
          >
            {s.icon}
          </a>
        ))}
        <span className="w-px h-16 bg-line mt-2" />
      </div>
    </section>
  );
};

// ─── About ─────────────────────────────────────────────────────────────────────

const About = () => (
  <section id="about" className="py-14 md:py-20">
    <div className="mx-auto max-w-7xl px-5 grid lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-20 items-end">
      <h2 className="font-heading text-[clamp(1.9rem,3.6vw,3rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink text-balance">
        An Information Systems student who takes products from <Accent>messy problem</Accent> to{" "}
        <Accent>working app</Accent>.
      </h2>
      <div>
        <p className="text-base text-muted leading-relaxed text-pretty">
          I like the part most people skip: getting the problem right before anyone writes code. I run the research,
          score priorities honestly, and write requirements an engineer can build to. Then, because I can code, I build
          the thing and put it in front of the people who asked for it. I use AI tools (Claude, Cursor, Claude Code) at
          every stage, from research synthesis to specs to code.
        </p>
        <div className="mt-7">
          <ButtonGhost href="#contact">Let's talk</ButtonGhost>
        </div>
      </div>
    </div>
  </section>
);

// ─── Products ──────────────────────────────────────────────────────────────────

// Each block takes its product's brand color; the rest of the page stays green.
const ProductBlock = ({ p, flip }: { p: Project; flip: boolean }) => (
  <article id={p.slug} style={brandStyle(p.brand)} className="brand scroll-mt-28 grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
    <Rise className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
      {/* The film lights the page around it in the product's color, so moving
          down the page reads as dark → blue → dark → red → dark */}
      <div className="relative">
        <Glow color={p.brand.glow} className="-inset-x-[30%] -inset-y-[55%]" />
        <div className="relative">{p.film}</div>
      </div>
    </Rise>
    <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
      <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent-ink">
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        {p.status}
      </span>
      <h3 className="font-heading text-[clamp(2.25rem,3.9vw,3.4rem)] font-extrabold leading-[1.02] tracking-[-0.025em] text-ink mt-5 text-balance">
        {p.name}
      </h3>
      <p className="text-base text-muted leading-relaxed mt-4 text-pretty">{p.oneLiner}</p>
      <p className="text-sm text-muted mt-5 text-pretty">
        <span className="text-ink font-semibold">Role:</span> {p.role}
      </p>
      <ul className="flex flex-col gap-3 mt-5">
        {p.did.map((d) => (
          <li key={d} className="flex gap-3 text-[0.95rem] text-muted leading-snug">
            <Check size={16} className="text-accent shrink-0 mt-0.5" strokeWidth={2.75} />
            {d}
          </li>
        ))}
      </ul>
      <p className="text-sm text-faint mt-6">{p.stack.join("  ·  ")}</p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-7">
        {/* Outline, not filled: the film mat is already this block's one big color */}
        <Link
          to={`/projects/${p.slug}`}
          className="group inline-flex items-center gap-2 rounded-full border border-accent px-5 py-3 text-sm font-semibold text-accent hover:bg-accent hover:text-on-accent transition-colors"
        >
          Read the full story
          <ArrowRight size={16} strokeWidth={2.25} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
        {p.link && (
          <a
            href={p.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent py-2"
          >
            {p.link.label}
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        )}
      </div>
    </div>
  </article>
);

const Products = () => (
  <section id="products" className="py-16 md:py-24">
    <div className="mx-auto max-w-7xl px-5">
      <SectionTitle aside="Two apps running for real businesses, each told in a short product film.">
        Things I've <Accent>built</Accent>
      </SectionTitle>
      <div className="flex flex-col gap-20 md:gap-28">
        {projects.map((p, i) => (
          <Fragment key={p.name}>
            <ProductBlock p={p} flip={i % 2 === 1} />
          </Fragment>
        ))}
      </div>
    </div>
  </section>
);

// ─── Case studies ──────────────────────────────────────────────────────────────

// Like the products, each case study wears the color of its own document:
// TravelWise's royal blue, Round-Up's emerald (kept deeper than the site green).
const cases: {
  title: string;
  kind: string;
  desc: string;
  href: string;
  image: string;
  alt: string;
  brand: Brand;
}[] = [
  {
    title: "TravelWise AI",
    kind: "Travel · Students",
    desc: "A multi-modal travel aggregator for students juggling 3+ apps to book one trip home. Research, RICE, PRD, GTM.",
    href: "/case/travelwise",
    image: "/work/prd-02.png",
    alt: "A research page from the TravelWise AI PRD with survey stats and a competitor table",
    brand: TRAVELWISE,
  },
  {
    title: "AI Adaptive Round-Up Savings",
    kind: "Fintech · E-wallets",
    desc: "Round-up savings that pause themselves when a balance runs low, across e-wallets and banks. Research, RICE, AI spec.",
    href: "/case/roundup-savings",
    image: "/work/roundup-01.png",
    alt: "Cover of the Round-Up Savings case study, rounding Rp 17.583 up to Rp 20.000",
    brand: ROUNDUP,
  },
];

const CaseStudies = () => (
  <section id="cases" className="py-16 md:py-24">
    <div className="mx-auto max-w-7xl px-5">
      <SectionTitle aside="Where I practice the PM half on paper: research, prioritization, full PRDs.">
        PM <Accent>case studies</Accent>
      </SectionTitle>
      <div className="grid md:grid-cols-2 gap-6">
        {cases.map((c, i) => (
          <Fragment key={c.title}>
            <Rise delay={i * 0.08} className="relative h-full">
              <Glow color={c.brand.glow} className="-inset-x-[12%] -inset-y-[16%]" />
              <Link
                to={c.href}
                style={brandStyle(c.brand)}
                className="brand relative group block h-full rounded-[2rem] border border-line bg-surface overflow-hidden hover:border-accent transition-colors"
              >
                {/* The document sits on its own color, like a cover. The color
                    layer runs past the image and fades out, so it melts into
                    the card body instead of stopping at a hard line. */}
                <div className="relative p-4 md:p-6">
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 -bottom-20"
                    style={{
                      background: c.brand.mat,
                      maskImage: "linear-gradient(to bottom, #000 55%, transparent)",
                      WebkitMaskImage: "linear-gradient(to bottom, #000 55%, transparent)",
                    }}
                  />
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-raised shadow-[0_18px_40px_-18px_rgba(0,0,0,0.55)]">
                    <img src={c.image} alt={c.alt} loading="lazy" className="w-full h-full object-cover object-top" />
                  </div>
                </div>
                <div className="relative flex items-start justify-between gap-6 p-5 md:p-6">
                  <div>
                    <p className="text-sm font-medium text-accent">{c.kind}</p>
                    <h3 className="font-heading text-2xl font-extrabold tracking-[-0.02em] text-ink mt-1.5 text-balance">{c.title}</h3>
                    <p className="text-sm text-muted leading-relaxed mt-2 text-pretty">{c.desc}</p>
                  </div>
                  <span className="shrink-0 w-11 h-11 rounded-full border border-line grid place-items-center text-ink group-hover:bg-accent group-hover:border-accent group-hover:text-on-accent transition-colors">
                    <ArrowUpRight size={20} strokeWidth={2.25} />
                  </span>
                </div>
              </Link>
            </Rise>
          </Fragment>
        ))}
      </div>
    </div>
  </section>
);

// ─── How I work ────────────────────────────────────────────────────────────────

// A real sequence, so the numbers carry meaning here (and only here).
const steps = [
  { title: "Research", desc: "Talk to users and run surveys until the problem is undeniable." },
  { title: "Prioritize", desc: "Score honestly with RICE, then make the call RICE can't." },
  { title: "Specify", desc: "Write requirements an engineer can build without guessing." },
  { title: "Build", desc: "Ship it, put it in real hands, and fix what they trip on." },
];

// Full-bleed band in the opposite theme: the page's one light/dark switch,
// which breaks the long run of same-colored sections.
const HowIWork = () => (
  <section className="band bg-paper text-ink py-16 md:py-24">
    <div className="mx-auto max-w-7xl px-5">
      <SectionTitle>
        From problem to <Accent>product</Accent>
      </SectionTitle>
      <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
        {steps.map((s, i) => (
          <li key={s.title} className="relative pt-8 border-t border-line">
            <motion.span
              aria-hidden
              className="absolute -top-px left-0 h-[2px] w-full bg-accent origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.18, ease }}
            />
            <span className="font-heading text-5xl font-extrabold text-accent leading-none">{i + 1}</span>
            <h3 className="font-heading text-xl font-extrabold text-ink mt-5">{s.title}</h3>
            <p className="text-sm text-muted leading-relaxed mt-2 text-pretty">{s.desc}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

// ─── Experience ────────────────────────────────────────────────────────────────

const experience = [
  {
    period: "May 2026 - Nov 2026",
    role: "Independent product builder",
    org: "Hongfu System, AkaMobilindo",
    desc: "Scoping, designing and building software for two Batam businesses, from first interview to production.",
  },
  {
    period: "Feb 2026 - Jun 2026",
    role: "PM Bootcamp",
    org: "Harisenin.com",
    desc: "Wrote full PRDs, go-to-market strategies, and competitor research across bootcamp missions.",
  },
  {
    period: "Aug 2024 - Dec 2027 (expected)",
    role: "Bachelor of Information Systems",
    org: "Universitas Brawijaya",
    desc: "GPA 3.69 / 4.00. System Analysis & Design, Requirements Engineering, UI Design.",
  },
];

const skillGroups = [
  { title: "Product", skills: ["PRD writing", "User research", "RICE", "GTM strategy", "Agile"] },
  { title: "Build", skills: ["Next.js", "React Native", "TypeScript", "PostgreSQL", "Firebase"] },
  { title: "Tools", skills: ["Figma", "AI-augmented workflow", "Git", "Notion"] },
];

const Experience = () => (
  <section id="experience" className="py-16 md:py-24">
    <div className="mx-auto max-w-7xl px-5">
      <SectionTitle>
        Experience & <Accent>skills</Accent>
      </SectionTitle>
      <div className="grid lg:grid-cols-[1.35fr_1fr] gap-6">
        {/* One panel, rows split by hairlines, instead of a card per entry */}
        <div className="rounded-[2rem] border border-line bg-surface px-6 md:px-8">
          {experience.map((it) => (
            <div key={it.role} className="grid sm:grid-cols-[9.5rem_1fr] gap-x-6 gap-y-1 py-7 border-b border-line last:border-b-0">
              <p className="text-sm text-accent pt-0.5">{it.period}</p>
              <div>
                <h3 className="text-lg font-semibold text-ink">{it.role}</h3>
                <p className="text-sm text-faint">{it.org}</p>
                <p className="text-sm text-muted leading-relaxed mt-2.5 text-pretty">{it.desc}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Colored panels cast their own light, like every other one on the page */}
        <div className="relative">
          <Glow color="rgba(89, 227, 140, 0.22)" className="-inset-x-[25%] -inset-y-[20%]" />
          <div className="relative h-full rounded-[2rem] bg-accent text-on-accent p-6 md:p-8 flex flex-col gap-8">
            {skillGroups.map((g) => (
              <div key={g.title}>
                <h3 className="font-heading text-2xl font-extrabold">{g.title}</h3>
                <p className="text-base leading-relaxed mt-2 opacity-80">{g.skills.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── Contact ───────────────────────────────────────────────────────────────────

type FormStatus = "idle" | "sending" | "success" | "error";

const contactRows = [
  { label: "Email", value: "wilsannick55@gmail.com", href: "mailto:wilsannick55@gmail.com" },
  { label: "Phone", value: "0812 4973 0818", href: "tel:+6281249730818" },
  { label: "Location", value: "Malang / Jakarta, Indonesia" },
];

const inputClass =
  "w-full rounded-2xl border border-line bg-raised px-5 py-4 text-base text-ink placeholder:text-faint outline-none focus:border-accent transition-colors disabled:opacity-60";

const Contact = () => {
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const locked = status === "sending" || status === "success";

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle aside="Hiring for product, or have a messy problem worth untangling? Write me.">
          Contact <Accent>me</Accent>
        </SectionTitle>
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
          <form
            action="https://formspree.io/f/xvzvbqgw"
            method="POST"
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-line bg-surface p-6 md:p-8 flex flex-col gap-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input name="name" placeholder="Your name" aria-label="Your name" disabled={locked} className={inputClass} />
              <input name="email" type="email" required placeholder="Your email" aria-label="Your email" disabled={locked} className={inputClass} />
            </div>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="What are you building?"
              aria-label="Message"
              disabled={locked}
              className={`${inputClass} resize-none`}
            />
            <button
              type="submit"
              disabled={locked}
              className="self-start inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-on-accent hover:bg-accent-ink transition-colors disabled:opacity-70"
            >
              {status === "sending" ? "Sending..." : status === "success" ? "Sent" : "Send message"}
              {status === "success" ? <Check size={16} /> : <Send size={16} />}
            </button>
            <div role="status" aria-live="polite" className="text-sm">
              {status === "success" && <p className="text-accent-ink">Thanks, I'll get back to you soon.</p>}
              {status === "error" && (
                <p className="flex items-center gap-2 text-red-400">
                  <AlertCircle size={15} /> Something went wrong. Email me directly instead.
                </p>
              )}
            </div>
          </form>
          <dl className="rounded-[2rem] border border-line bg-surface px-6 md:px-8">
            {contactRows.map((c) => (
              <div key={c.label} className="py-6 border-b border-line last:border-b-0">
                <dt className="text-sm text-faint">{c.label}</dt>
                <dd className="text-lg text-ink mt-1 break-words">
                  {c.href ? (
                    <a href={c.href} className="hover:text-accent transition-colors">
                      {c.value}
                    </a>
                  ) : (
                    c.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

// ─── Footer ────────────────────────────────────────────────────────────────────

const Footer = () => (
  <footer className="border-t border-line">
    <div className="mx-auto max-w-7xl px-5 py-16 grid md:grid-cols-[1.5fr_1fr] gap-10 items-end">
      <p className="font-heading text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-[1.02] tracking-[-0.025em] text-ink text-balance">
        Let's build something <Accent>useful</Accent> together.
      </p>
      <div className="flex md:justify-end gap-3">
        {[
          { href: "https://linkedin.com/in/nick-wilsan", label: "LinkedIn", icon: <Linkedin size={18} /> },
          { href: "https://github.com/nick-wilsan", label: "GitHub", icon: <Github size={18} /> },
          { href: "mailto:wilsannick55@gmail.com", label: "Email", icon: <Mail size={18} /> },
        ].map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={l.label}
            className="w-11 h-11 rounded-full border border-line grid place-items-center text-muted hover:text-on-accent hover:bg-accent hover:border-accent transition-colors"
          >
            {l.icon}
          </a>
        ))}
      </div>
    </div>
    <p className="text-center text-xs text-faint pb-8">© 2026 Nick Wilsan</p>
  </footer>
);

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function HomeV2() {
  // Coming back from a project page (/#products): jump to that section.
  useEffect(() => {
    document.title = "Nick Wilsan - PM Portfolio";
    const id = window.location.hash.slice(1);
    // Wait for the web font: wide Archivo reflows the page taller once it lands.
    if (id) document.fonts.ready.then(() => document.getElementById(id)?.scrollIntoView());
  }, []);

  return (
    <div className="v2 min-h-screen overflow-x-clip bg-paper text-ink font-body selection:bg-accent selection:text-on-accent">
      <div className="v2-grain" aria-hidden />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
        <CaseStudies />
        <HowIWork />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
