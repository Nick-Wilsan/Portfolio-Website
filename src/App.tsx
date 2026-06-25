import { motion, useScroll, useSpring, useInView, useReducedMotion, useTransform } from "motion/react";
import { useState, useEffect, useRef, Fragment, type ReactNode, type FormEvent } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Mail, Phone, MapPin, Menu, X, Sun, Moon, Check, AlertCircle } from "lucide-react";
import TravelWiseCase from "./pages/TravelWiseCase";
import RoundUpCase from "./pages/RoundUpCase";

// ─── Scroll Progress Bar ───────────────────────────────────────────────────────

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-accent z-[100] origin-left"
    />
  );
};

// ─── Theme Toggle ──────────────────────────────────────────────────────────────

const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch (e) { /* ignore */ }
    setDark(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="p-2 -m-2 text-muted hover:text-ink transition-colors"
    >
      {dark ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
    </button>
  );
};

// ─── Mask reveal — text rises from behind a clip ────────────────────────────────

const MaskReveal = ({
  children,
  className,
  load,
}: {
  children: ReactNode;
  className?: string;
  load?: boolean;
}) => {
  const reduce = useReducedMotion();
  if (reduce) return <span className={`block ${className ?? ""}`}>{children}</span>;
  // `load` plays immediately (for above-the-fold headings that whileInView would miss).
  const motionProps = load
    ? { initial: { y: "120%" }, animate: { y: 0 } }
    : { initial: { y: "120%" }, whileInView: { y: 0 }, viewport: { once: true, amount: 0.2 } };
  return (
    <span className="block overflow-hidden pb-[0.15em] -mb-[0.15em]">
      <motion.span
        className={`block ${className ?? ""}`}
        {...motionProps}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
};

// ─── Parallax — gentle vertical drift as it scrolls through ─────────────────────

const Parallax = ({ children, className }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [30, -30]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

// ─── Count Up ─────────────────────────────────────────────────────────────────

function CountUp({ value, active }: { value: string; active: boolean }) {
  const match = value.match(/^(~?)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return <>{value}</>;
  const [, prefix, numStr, suffix] = match;
  const target = parseFloat(numStr);
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1400;
    const startTime = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setCurrent(parseFloat((ease * target).toFixed(decimals)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, decimals]);

  const display = decimals > 0 ? current.toFixed(decimals) : Math.round(current);
  return <>{prefix}{display}{suffix}</>;
}

// ─── Section heading (quiet numbered index) ─────────────────────────────────────

const SectionHead = ({ num, title }: { num: string; title: string }) => (
  <div className="relative flex items-end gap-5 md:gap-8 mb-14 md:mb-20">
    <motion.span
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="font-display text-[clamp(4.5rem,11vw,9rem)] leading-[0.8] text-accent/15 select-none -mb-2"
    >
      {num}
    </motion.span>
    <h2 className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.02em] text-ink pb-2">
      <MaskReveal>{title}</MaskReveal>
    </h2>
  </div>
);

// ─── Navbar ────────────────────────────────────────────────────────────────────

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("hero");

  const links = [
    { label: "about", href: "#about", id: "about" },
    { label: "work", href: "#work", id: "work" },
    { label: "experience", href: "#experience", id: "experience" },
    { label: "skills", href: "#skills", id: "skills" },
    { label: "contact", href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const sectionIds = ["hero", ...links.map((l) => l.id)];
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-30% 0px -65% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 bg-paper/85 backdrop-blur-md border-b border-line"
    >
      <div className="flex justify-between items-center max-w-[1440px] mx-auto px-5 md:px-10 py-4">
        <a href="#" className="font-display text-2xl font-medium tracking-[-0.01em] text-ink">
          Nick Wilsan
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <a
                key={l.label}
                href={l.href}
                className={`relative text-[0.8rem] tracking-wide transition-colors ${
                  isActive ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {l.label}
                {isActive && (
                  <motion.span
                    layoutId="navUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                  />
                )}
              </a>
            );
          })}
          <ThemeToggle />
          <a
            href="https://drive.google.com/file/d/1D5LhKvryphWln2RgZ449tl2pWoVg8FXj/view"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.8rem] tracking-wide text-ink border-b border-accent pb-0.5 hover:text-accent transition-colors"
          >
            résumé
          </a>
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)} className="p-1 text-ink" aria-label="Menu">
            {isOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-line bg-paper px-5 py-6 flex flex-col gap-4"
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setIsOpen(false)}
              className="text-base text-muted hover:text-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://drive.google.com/file/d/1D5LhKvryphWln2RgZ449tl2pWoVg8FXj/view"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="text-base text-ink border-b border-accent pb-0.5 w-fit"
          >
            résumé
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
};

// ─── Hero ──────────────────────────────────────────────────────────────────────

const heroFacts = [
  { label: "Education", value: "Information Systems, Univ. Brawijaya" },
  { label: "Currently", value: "PM Trainee, Harisenin.com" },
  { label: "Edge", value: "AI-augmented PM workflow" },
];

const Hero = () => (
  <section
    id="hero"
    className="max-w-[1440px] mx-auto px-5 md:px-10 min-h-[100dvh] flex flex-col justify-center pt-28 pb-16 lg:flex-row lg:items-center lg:gap-16"
  >
    <div className="lg:flex-1">
    <div className="max-w-5xl">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-[0.8rem] uppercase tracking-[0.2em] text-faint mb-8"
      >
        product manager · information systems
      </motion.p>

      <h1 className="font-display text-[clamp(2.75rem,7vw,6rem)] font-medium leading-[0.96] tracking-[-0.03em] text-ink">
        <MaskReveal load>
          I turn messy user problems into product decisions worth{" "}
          <span className="italic text-accent">defending</span>.
        </MaskReveal>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="text-xl leading-relaxed text-muted max-w-2xl mt-8"
      >
        I'm Nick, an Information Systems student at Universitas Brawijaya. I work
        in research, prioritization, and the unglamorous craft of writing
        requirements engineers don't hate.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.32, ease: "easeOut" }}
        className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-10"
      >
        <a
          href="#work"
          className="group inline-flex items-center gap-2 bg-ink text-paper px-7 py-3.5 rounded-full text-sm font-medium hover:bg-accent transition-colors"
        >
          See the work
          <ArrowRight size={16} strokeWidth={2} className="group-hover:translate-x-0.5 transition-transform" />
        </a>
        <a
          href="#contact"
          className="text-sm text-ink border-b border-line pb-0.5 hover:border-accent transition-colors"
        >
          Get in touch
        </a>
      </motion.div>
    </div>

    {/* Person-level facts — about me, not one project */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-10 border-t border-line max-w-4xl">
      {heroFacts.map((f, i) => (
        <motion.div
          key={f.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 + 0.08 * i }}
        >
          <div className="text-xs uppercase tracking-[0.12em] text-faint mb-1.5">{f.label}</div>
          <div className="text-base text-ink">{f.value}</div>
        </motion.div>
      ))}
    </div>
    </div>

    {/* Margin annotation — quiet counterweight to the wide right column on large desktops */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="hidden lg:flex lg:flex-col lg:items-center lg:gap-4 lg:shrink-0 lg:self-stretch lg:py-4"
    >
      <span className="text-[0.7rem] uppercase tracking-[0.2em] text-faint [writing-mode:vertical-rl]">
        case file · nº 01
      </span>
      <span className="flex-1 w-px bg-line" />
      <span className="text-[0.7rem] uppercase tracking-[0.2em] text-faint [writing-mode:vertical-rl]">
        malang, id
      </span>
    </motion.div>
  </section>
);

// ─── About ───────────────────────────────────────────────────────────────────

const approachSteps = [
  { title: "Research", desc: "Talk to users and run surveys until the problem is undeniable." },
  { title: "Prioritize", desc: "Score honestly with RICE, then make the call RICE can't." },
  { title: "Specify", desc: "Write requirements an engineer can build without guessing." },
  { title: "Defend", desc: "Cut ruthlessly, and justify every feature that stays." },
];

const About = () => (
  <section id="about" className="bg-surface py-24 md:py-32">
    <div className="max-w-[1440px] mx-auto px-5 md:px-10">
      <SectionHead num="01" title="about" />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-display text-[clamp(1.9rem,3.6vw,3.2rem)] font-medium leading-[1.1] tracking-tight text-ink max-w-4xl"
      >
        I like the part of product work most people skip: getting the problem
        right before anyone writes code.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 mt-12 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base leading-relaxed text-muted"
        >
          My approach is evidence-based, not opinion-based. I run the research,
          define the problem, scope the MVP, and write requirements an engineer
          can actually build to. Right now I'm working through an intensive PM
          bootcamp at Harisenin.com alongside my degree.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base leading-relaxed text-muted"
        >
          I also bring enough technical depth to use AI across the workflow and
          to write ML-informed acceptance criteria, not just feature wishlists.
          I'd rather ship a smaller thing I can defend than a longer list I
          can't.
        </motion.p>
      </div>

      {/* How I work — project-agnostic method */}
      <div className="mt-20">
        <h3 className="text-xs uppercase tracking-[0.14em] text-faint mb-10">how I work</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">
          {approachSteps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <span className="font-mono text-sm text-accent">0{i + 1}</span>
              <h4 className="font-display text-xl font-medium text-ink mt-2">{s.title}</h4>
              <p className="text-sm leading-relaxed text-muted mt-2">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─── Work ──────────────────────────────────────────────────────────────────────

// To add a project: append an object below and pick a `tier`.
//   feature → big, image + text (image side auto-alternates)
//   card    → medium, shown in a 2-up grid (needs an image)
//   text    → quiet row, for minor / in-progress work
// Keep it curated: promote your strongest work to `feature`, demote older work.
type Project = {
  title: string;
  meta: string;
  blurb: string;
  tags: string[];
  tier: "feature" | "card" | "text";
  href?: string;       // "/case/..." internal route, or "https://..." external
  image?: string;      // e.g. "/work/cover.png"
  imageAlt?: string;
  note?: string;       // e.g. "Write-up in progress"
  stats?: { num: string; label: string }[];
};

const projects: Project[] = [
  {
    title: "TravelWise AI",
    meta: "2026 · solo product manager",
    blurb:
      "An AI-powered multi-modal travel aggregator for Indonesian students juggling 3+ apps to book one trip home. I owned the research, RICE prioritization, PRD, and go-to-market story.",
    tags: ["Research", "Prioritization", "PRD", "GTM"],
    tier: "feature",
    href: "/case/travelwise",
    image: "/work/prd-02.png",
    imageAlt:
      "A research page from the TravelWise AI PRD showing survey stats and a competitor comparison table",
    stats: [
      { num: "30+", label: "survey responses" },
      { num: "96.7%", label: "problem validated" },
      { num: "5", label: "user stories" },
    ],
  },
  {
    title: "AI Adaptive Round-Up Savings",
    meta: "2026 · solo product manager",
    blurb:
      "A round-up savings mechanism for Indonesian fintech that pauses itself when a user's balance is running low, designed to work across e-wallets and banks instead of locking users into one. I owned the research, RICE prioritization, AI feature spec, and acceptance criteria.",
    tags: ["Research", "RICE", "AI Spec"],
    tier: "feature",
    href: "/case/roundup-savings",
    image: "/work/roundup-01.png",
    imageAlt:
      "Cover page of the AI Adaptive Universal Round-Up Savings case study, showing a savings widget rounding Rp 17.583 up to Rp 20.000",
    stats: [
      { num: "70%", label: "of Indonesians don't save at all" },
      { num: "34.5%", label: "say impulsive spending is why" },
      { num: "0", label: "existing round-up apps adapt to balance health" },
    ],
  },
];

const isInternal = (href?: string) => !!href && href.startsWith("/");

const ProjectLink = ({
  href,
  className,
  children,
}: {
  href?: string;
  className?: string;
  children: ReactNode;
}) => {
  if (isInternal(href)) return <Link to={href!} className={className}>{children}</Link>;
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
  return <div className={className}>{children}</div>;
};

const Tags = ({ tags, outline }: { tags: string[]; outline?: boolean }) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((t) => (
      <span
        key={t}
        className={
          outline
            ? "text-xs tracking-wide text-muted border border-line px-3 py-1 rounded-full"
            : "text-xs tracking-wide text-accent-ink bg-accent-soft px-3 py-1 rounded-full"
        }
      >
        {t}
      </span>
    ))}
  </div>
);

const ProjectStats = ({ stats }: { stats: { num: string; label: string }[] }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="flex flex-wrap gap-x-10 gap-y-4 mt-7">
      {stats.map((s, i) => (
        <motion.div
          key={s.num}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <div className="font-display text-2xl md:text-3xl font-medium text-ink">
            <CountUp value={s.num} active={inView} />
          </div>
          <div className="text-xs uppercase tracking-[0.12em] text-faint mt-0.5">{s.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

// Frames a project image like a browser window + crops to a clean landscape preview.
const BrowserFrame = ({ src, alt, interactive }: { src: string; alt: string; interactive?: boolean }) => (
  <div className="rounded-xl border border-line bg-raised overflow-hidden shadow-[0_24px_60px_-26px_rgba(0,0,0,0.5)]">
    <div className="flex items-center gap-2 px-4 py-3 border-b border-line">
      <span className="w-2.5 h-2.5 rounded-full bg-line" />
      <span className="w-2.5 h-2.5 rounded-full bg-line" />
      <span className="w-2.5 h-2.5 rounded-full bg-line" />
    </div>
    <div className="aspect-[16/10] overflow-hidden">
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-top"
        whileHover={interactive ? { scale: 1.03 } : undefined}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  </div>
);

// Big project — image + text. Image side alternates via `flip`.
const FeatureProject = ({ p, flip }: { p: Project; flip: boolean }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6 }}
    className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
  >
    {p.image && (
      <Parallax className={flip ? "lg:order-2" : "lg:order-1"}>
        <ProjectLink href={p.href} className="group block">
          <BrowserFrame src={p.image} alt={p.imageAlt ?? p.title} interactive={!!p.href} />
        </ProjectLink>
      </Parallax>
    )}

    <div className={flip ? "lg:order-1" : "lg:order-2"}>
      <p className="text-sm text-faint mb-3">{p.meta}</p>
      <h3 className="font-display text-[2rem] md:text-[2.75rem] font-medium leading-tight tracking-tight text-ink">
        {p.title}
      </h3>
      <p className="text-base leading-relaxed text-muted mt-4 max-w-md">{p.blurb}</p>
      {p.stats && <ProjectStats stats={p.stats} />}
      <div className="mt-7">
        <Tags tags={p.tags} />
      </div>
      {p.href && (
        <ProjectLink
          href={p.href}
          className="group inline-flex items-center gap-1.5 text-sm text-ink border-b border-accent pb-0.5 mt-8 hover:text-accent transition-colors"
        >
          {isInternal(p.href) ? "Read the case study" : "View project"}
          <ArrowUpRight size={15} strokeWidth={2} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </ProjectLink>
      )}
    </div>
  </motion.article>
);

// Medium project — shown in a 2-up grid.
const CardProject = ({ p }: { p: Project }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.6 }}
  >
    <ProjectLink href={p.href} className="group block">
      {p.image && (
        <div className="mb-5">
          <BrowserFrame src={p.image} alt={p.imageAlt ?? p.title} interactive={!!p.href} />
        </div>
      )}
      <p className="text-sm text-faint mb-2">{p.meta}</p>
      <h3 className="font-display text-[1.6rem] font-medium tracking-tight text-ink group-hover:text-accent transition-colors">
        {p.title}
      </h3>
      <p className="text-sm leading-relaxed text-muted mt-2">{p.blurb}</p>
      <div className="mt-4">
        <Tags tags={p.tags} />
      </div>
    </ProjectLink>
  </motion.article>
);

// Minor / in-progress project — a quiet row.
const TextProject = ({ p }: { p: Project }) => (
  <motion.article
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.5 }}
    className="pt-8 border-t border-line grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 md:gap-12"
  >
    <p className="text-sm text-faint">{p.meta}</p>
    <div className="max-w-2xl">
      <div className="flex items-baseline gap-3 flex-wrap">
        <h3 className="font-display text-[1.6rem] md:text-[2rem] font-medium tracking-tight text-ink">
          {p.title}
        </h3>
        {p.note && <span className="text-xs text-faint">{p.note}</span>}
      </div>
      <p className="text-base leading-relaxed text-muted mt-3">{p.blurb}</p>
      <div className="mt-5">
        <Tags tags={p.tags} outline />
      </div>
    </div>
  </motion.article>
);

const Work = () => {
  const features = projects.filter((p) => p.tier === "feature");
  const cards = projects.filter((p) => p.tier === "card");
  const texts = projects.filter((p) => p.tier === "text");

  return (
    <section id="work" className="py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        <SectionHead num="02" title="selected work" />

        {features.length > 0 && (
          <div className="flex flex-col gap-24">
            {features.map((p, i) => (
              <Fragment key={p.title}>
                <FeatureProject p={p} flip={i % 2 === 1} />
              </Fragment>
            ))}
          </div>
        )}

        {cards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 mt-20">
            {cards.map((p) => (
              <Fragment key={p.title}>
                <CardProject p={p} />
              </Fragment>
            ))}
          </div>
        )}

        {texts.length > 0 && (
          <div className="mt-20 flex flex-col gap-8">
            {texts.map((p) => (
              <Fragment key={p.title}>
                <TextProject p={p} />
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// ─── Experience ────────────────────────────────────────────────────────────────

const experiences = [
  {
    period: "Aug 2024 - now",
    role: "Bachelor of Information Systems",
    company: "Universitas Brawijaya",
    active: true,
    items: [
      "Current GPA 3.69 / 4.00, expected graduation Dec 2027.",
      "Coursework that matters here: System Analysis & Design, Requirements Engineering, UI Design, Programming & Algorithms.",
    ],
  },
  {
    period: "Feb 2026 - now",
    role: "Product Manager Trainee",
    company: "Harisenin.com",
    active: false,
    items: [
      "Wrote full PRDs across bootcamp missions: product vision, personas, and technical requirements.",
      "Built go-to-market strategies and business models for clear market fit and monetization.",
      "Ran market and competitor research to find feature gaps and propose data-driven calls.",
    ],
  },
  {
    period: "Jan 2022 - Feb 2023",
    role: "Logistics Staff",
    company: "University Event Committees",
    active: false,
    items: [
      "Coordinated logistics, equipment, and resources for 2 major university events.",
      "Worked across committee divisions to allocate resources and unblock bottlenecks.",
    ],
  },
];

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 80%", "end 25%"],
  });
  const lineGrow = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  useEffect(() => {
    const observers = experiences.map((_, i) => {
      const el = itemRefs.current[i];
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i); },
        { rootMargin: "-20% 0px -55% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  return (
    <section id="experience" className="bg-surface py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        <SectionHead num="03" title="experience & education" />

        <div className="grid lg:grid-cols-12 gap-x-16 gap-y-14">
          <div
            ref={lineRef}
            className="relative pl-8 md:pl-10 flex flex-col gap-14 lg:col-span-7"
          >
            <div className="absolute left-0 top-1 bottom-1 w-px bg-line" />
            <motion.div
              className="absolute left-0 top-1 bottom-1 w-px bg-accent origin-top"
              style={{ scaleY: lineGrow }}
            />

            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                ref={(el) => { itemRefs.current[i] = el; }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative"
              >
                <motion.div
                  className="absolute -left-[37px] md:-left-[45px] top-1.5 w-3 h-3 rounded-full border-2"
                  animate={{
                    backgroundColor: activeIndex === i ? "var(--accent)" : "var(--paper)",
                    borderColor: activeIndex === i ? "var(--accent)" : "var(--faint)",
                  }}
                  transition={{ duration: 0.3 }}
                />
                <p className="text-xs uppercase tracking-[0.12em] text-faint mb-2">{exp.period}</p>
                <h3 className="font-display text-[1.4rem] font-medium text-ink">{exp.role}</h3>
                <p className="text-sm text-accent mb-4">{exp.company}</p>
                <ul className="flex flex-col gap-2.5 max-w-lg">
                  {exp.items.map((item, j) => (
                    <li key={j} className="text-[0.95rem] leading-relaxed text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <aside className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:sticky lg:top-36 border-t border-line pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10"
            >
              <p className="font-display text-[clamp(1.5rem,2.2vw,1.9rem)] leading-snug text-ink">
                Three years of coursework and one bootcamp later, the thread hasn&apos;t changed: get the problem right before anyone writes a line of code.
              </p>
              <div className="mt-8 flex flex-col gap-1">
                <span className="text-xs uppercase tracking-[0.14em] text-faint">currently</span>
                <span className="text-sm text-muted">PM Trainee at Harisenin.com, finishing a degree in Information Systems</span>
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </section>
  );
};

// ─── Skills ────────────────────────────────────────────────────────────────────

const skillSet = [
  {
    title: "Technical",
    skills: [
      "Product Management",
      "PRD Writing",
      "Business Case Development",
      "Market Research",
      "Agile Methodology",
      "Figma",
      "HTML / CSS / JS",
    ],
  },
  {
    title: "Ways of working",
    skills: [
      "Analytical Thinking",
      "Problem Solving",
      "Cross-functional Communication",
      "Time Management",
      "Adaptability",
    ],
  },
  {
    title: "Languages",
    skills: ["Indonesian (native)", "English (advanced)"],
  },
];

const Skills = () => (
  <section id="skills" className="py-24 md:py-32">
    <div className="max-w-[1440px] mx-auto px-5 md:px-10">
      <SectionHead num="04" title="skills & tools" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xs uppercase tracking-[0.14em] text-faint pb-4 mb-5 border-b border-line">
            {skillSet[0].title}
          </h3>
          <ul className="flex flex-col gap-3">
            {skillSet[0].skills.map((s) => (
              <li key={s} className="text-[0.95rem] text-ink">
                {s}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="flex flex-col gap-14">
          {skillSet.slice(1).map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
            >
              <h3 className="text-xs uppercase tracking-[0.14em] text-faint pb-4 mb-5 border-b border-line">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {group.skills.map((s) => (
                  <li key={s} className="text-[0.95rem] text-ink">
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─── Contact ───────────────────────────────────────────────────────────────────

const contactItems = [
  { icon: <Mail size={18} strokeWidth={1.75} />, label: "email", value: "wilsannick55@gmail.com", href: "mailto:wilsannick55@gmail.com" },
  { icon: <Phone size={18} strokeWidth={1.75} />, label: "phone", value: "0812 4973 0818", href: "tel:+6281249730818" },
  { icon: <MapPin size={18} strokeWidth={1.75} />, label: "based in", value: "Malang / Jakarta, Indonesia", href: null },
];

type FormStatus = "idle" | "sending" | "success" | "error";

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
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="bg-surface py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        <SectionHead num="05" title="contact" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-display text-[1.7rem] md:text-[2.2rem] font-medium leading-snug tracking-tight text-ink max-w-md">
              If you're hiring for product, or just want to think through a problem
              together, I'm around.
            </p>
            <div className="flex flex-col gap-5 mt-10">
              {contactItems.map((item) => {
                const inner = (
                  <>
                    <span className="text-accent shrink-0">{item.icon}</span>
                    <span>
                      <span className="block text-xs uppercase tracking-[0.12em] text-faint">{item.label}</span>
                      <span className="block text-base text-ink">{item.value}</span>
                    </span>
                  </>
                );
                return item.href ? (
                  <a key={item.label} href={item.href} className="flex items-center gap-4 group">
                    <span className="group-hover:text-accent transition-colors flex items-center gap-4">{inner}</span>
                  </a>
                ) : (
                  <div key={item.label} className="flex items-center gap-4">{inner}</div>
                );
              })}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            action="https://formspree.io/f/xvzvbqgw"
            method="POST"
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <div>
              <label htmlFor="message" className="block text-xs uppercase tracking-[0.12em] text-faint mb-2">
                message
              </label>
              <textarea
                id="message"
                name="message"
                required
                disabled={status === "sending" || status === "success"}
                placeholder="What's on your mind?"
                rows={6}
                className="w-full bg-raised border border-line rounded-lg p-4 text-base text-ink placeholder:text-faint focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none disabled:opacity-60"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending" || status === "success"}
              className="group inline-flex items-center justify-center gap-2 bg-ink text-paper py-3.5 rounded-lg text-sm font-medium hover:bg-accent transition-colors disabled:opacity-70 disabled:hover:bg-ink"
            >
              {status === "sending" ? "Sending..." : status === "success" ? "Sent" : "Send message"}
              {status === "success" ? (
                <Check size={16} strokeWidth={2} />
              ) : (
                <ArrowRight size={16} strokeWidth={2} className="group-hover:translate-x-0.5 transition-transform" />
              )}
            </button>
            <div role="status" aria-live="polite">
              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-accent-ink"
                >
                  <Check size={15} strokeWidth={2} className="shrink-0" />
                  Thanks — I'll get back to you soon.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-red-500 dark:text-red-400"
                >
                  <AlertCircle size={15} strokeWidth={2} className="shrink-0" />
                  Something went wrong. Try again, or email me directly at{" "}
                  <a href="mailto:wilsannick55@gmail.com" className="underline">
                    wilsannick55@gmail.com
                  </a>
                  .
                </motion.p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

// ─── Footer ────────────────────────────────────────────────────────────────────

const Footer = () => (
  <footer className="bg-surface py-10">
    <div className="flex flex-col md:flex-row justify-between items-center max-w-[1440px] mx-auto px-5 md:px-10 gap-4">
      <p className="font-display text-lg font-medium text-ink tracking-tight">Nick Wilsan</p>
      <p className="text-xs text-faint text-center">
        © 2026 · Product Management Portfolio
      </p>
      <div className="flex gap-6">
        {[
          { href: "https://linkedin.com/in/nick-wilsan", label: "LinkedIn" },
          { href: "https://github.com/nick-wilsan", label: "GitHub" },
          { href: "mailto:wilsannick55@gmail.com", label: "Email" },
        ].map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-accent transition-colors"
          >
            {l.label}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

// ─── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="bg-paper text-ink selection:bg-accent selection:text-paper">
              <ScrollProgressBar />
              <Navbar />
              <main>
                <Hero />
                <About />
                <Work />
                <Experience />
                <Skills />
                <Contact />
              </main>
              <Footer />
            </div>
          }
        />
        <Route path="/case/travelwise" element={<TravelWiseCase />} />
        <Route path="/case/roundup-savings" element={<RoundUpCase />} />
      </Routes>
    </BrowserRouter>
  );
}
