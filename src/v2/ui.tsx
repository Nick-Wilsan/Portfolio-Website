import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, Moon, Sun } from "lucide-react";

// Pieces shared by the v2 homepage and the project pages.

export const ease = [0.16, 1, 0.3, 1] as const;

// Same switch as the old site: .dark on <html>, remembered in localStorage,
// applied before paint by the script in index.html (no flash).
export const ThemeToggle = () => {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* storage blocked: the choice just won't persist */
    }
    setDark(next);
  };
  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="w-11 h-11 grid place-items-center rounded-full text-muted hover:text-ink transition-colors"
    >
      {dark ? <Sun size={18} strokeWidth={1.9} /> : <Moon size={18} strokeWidth={1.9} />}
    </button>
  );
};

// Slides content up into place. It never starts invisible, so nothing ships
// blank if the animation is skipped (hidden tab, reduced motion, crawler).
export const Rise = ({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { y: 40 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Soft colored light behind a brand surface, so its color spreads into the
// dark page instead of ending at a hard edge. A plain radial gradient (no blur
// filter) keeps it cheap to paint. Place it first inside a `relative` parent.
export const Glow = ({ color, className = "" }: { color: string; className?: string }) => (
  <div
    aria-hidden
    className={`pointer-events-none absolute ${className}`}
    style={{ background: `radial-gradient(closest-side, ${color}, transparent)` }}
  />
);

export const Accent = ({ children }: { children: ReactNode }) => <span className="text-accent">{children}</span>;

// Section heading with an optional one-line aside, split left/right on desktop.
export const SectionTitle = ({ children, aside }: { children: ReactNode; aside?: string }) => (
  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10 md:mb-12">
    <h2 className="font-heading text-[clamp(2.5rem,6vw,4.75rem)] font-extrabold leading-[1] tracking-[-0.03em] text-ink text-balance">
      {children}
    </h2>
    {aside && <p className="text-base text-muted max-w-sm leading-relaxed text-pretty md:text-right">{aside}</p>}
  </div>
);

export const ButtonPrimary = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-on-accent hover:bg-accent-ink transition-colors"
  >
    {children}
    <ArrowRight size={16} strokeWidth={2.25} className="group-hover:translate-x-0.5 transition-transform" />
  </a>
);

export const ButtonGhost = ({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) => (
  <a
    href={href}
    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-semibold text-ink hover:border-accent hover:text-accent transition-colors"
  >
    {children}
  </a>
);
