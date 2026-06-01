import { motion, useScroll, useSpring, useInView } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TravelWiseCase from "./pages/TravelWiseCase";

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconArrow = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);
const IconCheck = ({ active }: { active: boolean }) => (
  <svg
    className={`shrink-0 mt-0.5 ${active ? "text-emerald-500" : "text-zinc-300"}`}
    width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconSend = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);
const IconMail = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const IconPhone = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);
const IconLocation = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const IconCpu = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
  </svg>
);
const IconBrain = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);
const IconGlobe = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
  </svg>
);
const IconMenu = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const IconClose = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// ─── Scroll Progress Bar ───────────────────────────────────────────────────────

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-emerald-500 z-[100] origin-left"
    />
  );
};

// ─── Custom Cursor ────────────────────────────────────────────────────────────

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const style = document.createElement("style");
    style.id = "custom-cursor-hide";
    style.textContent = "* { cursor: none !important; }";
    document.head.appendChild(style);
    setVisible(true);

    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const onOver = (e: MouseEvent) => {
      const el = e.target as Element;
      setIsPointer(!!el.closest("a, button, [role='button'], input, textarea"));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      document.getElementById("custom-cursor-hide")?.remove();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-emerald-500/50"
        animate={{
          x: pos.x - 20,
          y: pos.y - 20,
          scale: isPointer ? 1.6 : 1,
          borderColor: isPointer ? "rgba(16,185,129,0.8)" : "rgba(16,185,129,0.4)",
          backgroundColor: isPointer ? "rgba(16,185,129,0.06)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.6 }}
        style={{ width: 40, height: 40 }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-[6px] h-[6px] rounded-full bg-emerald-500"
        animate={{ x: pos.x - 3, y: pos.y - 3, scale: isPointer ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 800, damping: 35 }}
      />
    </>
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

// ─── Shared ────────────────────────────────────────────────────────────────────

const SectionLabel = ({ children }: { children: string }) => (
  <p className="text-xs font-semibold tracking-[0.08em] uppercase text-zinc-500 mb-2">
    {children}
  </p>
);

// ─── Navbar ────────────────────────────────────────────────────────────────────

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("hero");

  const links = [
    { label: "About", href: "#about", id: "about" },
    { label: "Case Studies", href: "#projects", id: "projects" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const sectionIds = ["hero", ...links.map((l) => l.id)];
    const onScroll = () => {
      const scrollY = window.scrollY + 100;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollY) {
          setActive(sectionIds[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200"
    >
      <div className="flex justify-between items-center max-w-[1440px] mx-auto px-5 md:px-14 py-4">
        <motion.a
          href="#"
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="text-xl font-bold tracking-tight text-zinc-900 hover:opacity-75 transition-opacity font-display"
        >
          Nick Wilsan
        </motion.a>
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <a
                key={l.label}
                href={l.href}
                className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "text-zinc-900 bg-zinc-100"
                    : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                }`}
              >
                {l.label}
                {isActive && (
                  <motion.span
                    layoutId="navLine"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-emerald-500 rounded-full"
                  />
                )}
              </a>
            );
          })}
          <motion.a
            href="https://drive.google.com/file/d/1D5LhKvryphWln2RgZ449tl2pWoVg8FXj/view"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="ml-3 bg-zinc-900 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-emerald-500 transition-colors"
          >
            Resume
          </motion.a>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-zinc-900">
          {isOpen ? <IconClose /> : <IconMenu />}
        </button>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="md:hidden absolute top-full left-0 w-full bg-white border-b border-zinc-200 py-6 px-5 flex flex-col gap-2 shadow-sm"
        >
          {links.map((l, i) => {
            const isActive = active === l.id;
            return (
              <motion.a
                key={l.label}
                href={l.href}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-zinc-900 bg-zinc-100"
                    : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                }`}
              >
                {isActive && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 mb-0.5" />
                )}
                {l.label}
              </motion.a>
            );
          })}
          <motion.a
            href="https://drive.google.com/file/d/1D5LhKvryphWln2RgZ449tl2pWoVg8FXj/view"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: links.length * 0.05 }}
            className="mt-2 text-center bg-zinc-900 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-emerald-500 transition-colors"
          >
            Resume
          </motion.a>
        </motion.div>
      )}
    </motion.nav>
  );
};

// ─── Hero ──────────────────────────────────────────────────────────────────────

const heroStats = [
  { num: "30+", label: "Survey Responses" },
  { num: "96.7%", label: "Problem Validation" },
  { num: "5", label: "User Stories" },
  { num: "3", label: "MVP Features" },
];

const toolkitItems = ["PRD Writing", "User Research", "RICE", "AI Workflow", "Go-to-Market", "Figma"];

const Hero = () => {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  return (
    <section
      id="hero"
      className="relative max-w-[1440px] mx-auto px-5 md:px-14 pt-36 md:pt-44 pb-[120px] overflow-hidden"
    >
      {/* Aurora background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Primary emerald blob */}
        <motion.div
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)" }}
          animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Indigo accent blob */}
        <motion.div
          className="absolute top-[20%] left-[-8%] w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)" }}
          animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        {/* Cyan subtle blob */}
        <motion.div
          className="absolute bottom-0 right-[20%] w-[400px] h-[400px] rounded-full blur-[90px]"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)" }}
          animate={{ x: [0, 20, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        />
        {/* Subtle dot grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="#18181b" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-12 xl:gap-16 items-center">
        {/* ── Left: Text ── */}
        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel>PRODUCT MANAGEMENT TRAINEE AT HARISENIN.COM</SectionLabel>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="font-display text-[2.75rem] sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem] font-extrabold leading-[1.1] tracking-[-0.02em] text-zinc-900"
          >
            Turning User Problems{" "}
            <span className="text-zinc-300">into</span>{" "}
            Product Decisions.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
            className="text-lg leading-7 text-zinc-600 max-w-lg"
          >
            Information Systems student at Universitas Brawijaya with hands-on
            experience in Product Management, user research, and AI-augmented
            workflows.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-wrap gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04, backgroundColor: "#10b981" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="flex items-center gap-2 bg-zinc-900 text-white px-8 py-4 rounded-full text-base font-semibold shadow-sm transition-colors"
            >
              View Portfolio <IconArrow />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, borderColor: "#10b981", color: "#10b981" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="flex items-center gap-2 border border-zinc-200 text-zinc-900 px-8 py-4 rounded-full text-base font-semibold transition-colors"
            >
              Start a Conversation
            </motion.a>
          </motion.div>
        </div>

        {/* ── Right: Visual cards (desktop only) ── */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          className="hidden lg:flex flex-col gap-4"
        >
          {/* Stats grid */}
          <div ref={statsRef} className="bg-slate-50 rounded-2xl border border-zinc-200 p-6">
            <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-zinc-400 mb-5">
              FROM THE WORK
            </p>
            <div className="grid grid-cols-2 gap-3">
              {heroStats.map((s, i) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, y: 12 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  whileHover={{ scale: 1.04, borderColor: "#10b981" }}
                  className="bg-white rounded-xl border border-zinc-200 p-4 transition-colors cursor-default"
                >
                  <p className="font-display text-2xl font-bold text-zinc-900">
                    <CountUp value={s.num} active={statsInView} />
                  </p>
                  <p className="text-xs text-zinc-500 mt-1 leading-snug">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Toolkit strip */}
          <div className="bg-zinc-900 rounded-2xl p-5">
            <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-white/40 mb-3">
              TOOLKIT
            </p>
            <div className="flex flex-wrap gap-2">
              {toolkitItems.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 + i * 0.07 }}
                  whileHover={{ scale: 1.08, backgroundColor: "rgba(16,185,129,0.2)", borderColor: "rgba(16,185,129,0.4)" }}
                  className="text-xs font-semibold bg-white/10 text-white/80 px-3 py-1.5 rounded-full border border-white/10 cursor-default"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── Background ────────────────────────────────────────────────────────────────

const Background = () => (
  <section id="about" className="bg-slate-50 py-[120px] border-y border-zinc-200">
    <div className="max-w-[1440px] mx-auto px-5 md:px-14 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6">
      <motion.div
        className="md:col-span-4"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-[2rem] md:text-[2.5rem] font-bold tracking-tight text-zinc-900 relative inline-block">
          Background
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="absolute -bottom-2 left-0 w-12 h-[3px] bg-zinc-900 block origin-left"
          />
        </h2>
      </motion.div>
      <div className="md:col-span-8 flex flex-col gap-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-5"
        >
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="border-l-4 border-emerald-500 pl-5 py-1"
          >
            <h3 className="font-display text-[1.5rem] font-semibold leading-8 text-zinc-900">
              Information Systems student at Universitas Brawijaya with hands-on
              experience in Product Management, user research, and AI-augmented
              workflows.
            </h3>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base leading-6 text-zinc-600"
          >
            I specialize in evidence-based product thinking — from conducting
            user research and defining problems, to scoping MVPs and writing
            requirements engineers can actually build to. Currently advancing
            through an intensive PM bootcamp at Harisenin.com.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base leading-6 text-zinc-600"
          >
            My edge: I integrate AI tools into every stage of the PM workflow,
            and I bring enough technical depth to write ML-informed acceptance
            criteria — not just feature wishlists.
          </motion.p>
        </motion.div>
      </div>
    </div>
  </section>
);

// ─── TravelWise thumbnail ──────────────────────────────────────────────────────

const TravelWiseThumbnail = () => (
  <div className="h-64 bg-zinc-900 relative overflow-hidden flex items-center justify-center p-6">
    {/* Animated route line */}
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <svg width="100%" height="60" viewBox="0 0 400 60" preserveAspectRatio="none">
        <motion.path
          d="M 30 50 Q 200 5 370 30"
          fill="none"
          stroke="#10B981"
          strokeDasharray="5 4"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        <circle cx="30" cy="50" r="4" fill="#10B981" />
        <circle cx="370" cy="30" r="4" fill="#10B981" />
      </svg>
    </motion.div>

    <div className="w-full h-full border border-white/10 rounded-lg p-4 flex flex-col gap-2 relative">
      <div className="flex justify-between items-center text-white/40 text-[10px] font-semibold tracking-[0.15em] uppercase">
        <span>SURABAYA</span>
        <span>DESTINATION</span>
      </div>
      <div className="mt-auto grid grid-cols-3 gap-2 text-white">
        {[
          { num: "96.7%", label: "DON'T BUY FIRST APP" },
          { num: "100%", label: "BUYER'S REMORSE" },
          { num: "~2M", label: "TRANSACTIONS/YR" },
        ].map((s) => (
          <div key={s.num}>
            <div className="font-display text-xl font-bold">{s.num}</div>
            <div className="text-[8px] text-white/40 uppercase tracking-wide leading-tight mt-0.5">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Projects ──────────────────────────────────────────────────────────────────

const Projects = () => (
  <section id="projects" className="py-[120px] max-w-[1440px] mx-auto px-5 md:px-14">
    <motion.div
      className="mb-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <SectionLabel>CASE STUDIES</SectionLabel>
      <h2 className="font-display text-[2.75rem] md:text-[4rem] font-extrabold tracking-[-0.02em] text-zinc-900">
        Selected Works
      </h2>
    </motion.div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* TravelWise */}
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -6 }}
        className="bg-slate-50 rounded-xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 group"
      >
        <Link to="/case/travelwise" className="block">
          <TravelWiseThumbnail />
          <div className="p-6 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <h3 className="font-display text-[1.5rem] font-semibold text-zinc-900 group-hover:text-emerald-500 transition-colors">
                TravelWise AI
              </h3>
              <span className="text-xs font-semibold tracking-widest uppercase bg-white text-zinc-900 border border-zinc-200 px-2 py-1 rounded shrink-0 ml-2">
                2026
              </span>
            </div>
            <p className="text-base leading-6 text-zinc-600">
              AI-powered multi-modal travel aggregator — PRD, market research,
              RICE prioritization, and go-to-market strategy for Harisenin.com
              bootcamp.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Product Manager", "Research", "PRD", "AI"].map((t) => (
                <motion.span
                  key={t}
                  whileHover={{ scale: 1.07 }}
                  className="text-[11px] font-semibold tracking-wider uppercase bg-zinc-100 text-zinc-700 border border-zinc-200 px-3 py-1 rounded-full cursor-default"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>
        </Link>
      </motion.article>

      {/* ReStylo */}
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.12 }}
        whileHover={{ y: -6 }}
        className="bg-slate-50 rounded-xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 group"
      >
        <div className="h-64 bg-zinc-900 relative overflow-hidden flex items-center justify-center">
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-white rounded-full" />
          </motion.div>
          <motion.p
            className="font-display text-6xl font-bold text-white/20 select-none"
            animate={{ opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            RS
          </motion.p>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <h3 className="font-display text-[1.5rem] font-semibold text-zinc-900 group-hover:text-emerald-500 transition-colors">
              ReStylo Application
            </h3>
            <span className="text-xs font-semibold tracking-widest uppercase bg-white text-zinc-900 border border-zinc-200 px-2 py-1 rounded shrink-0 ml-2">
              2026
            </span>
          </div>
          <p className="text-base leading-6 text-zinc-600">
            Academic project focusing on business case design, market trend
            analysis, and strategic KPI definition.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Business Case", "Analysis", "Strategy"].map((t) => (
              <motion.span
                key={t}
                whileHover={{ scale: 1.07 }}
                className="text-[11px] font-semibold tracking-wider uppercase bg-zinc-100 text-zinc-700 border border-zinc-200 px-3 py-1 rounded-full cursor-default"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.article>
    </div>
  </section>
);

// ─── Experience ────────────────────────────────────────────────────────────────

const Experience = () => {
  const experiences = [
    {
      period: "AUG 2024 — PRESENT",
      role: "Bachelor of Information Systems",
      company: "Universitas Brawijaya",
      active: true,
      items: [
        "Current GPA: 3.69 / 4.00 (Expected Graduation: Dec 2027)",
        "Relevant Courseworks: System Analysis and Design, Requirements Engineering, User Interface Design, Programming & Algorithm.",
      ],
    },
    {
      period: "FEB 2026 — PRESENT",
      role: "Product Manager Trainee",
      company: "Harisenin.com",
      active: false,
      items: [
        "Developed comprehensive PRDs across multiple bootcamp missions, detailing product vision, user personas, and technical requirements.",
        "Formulated go-to-market strategies and structured business models to ensure market fit and clear monetization paths.",
        "Conducted market research and competitor analysis to identify feature gaps and propose data-driven improvements.",
      ],
    },
    {
      period: "JAN 2022 — FEB 2023",
      role: "Logistics Staff",
      company: "University Event Committees",
      active: false,
      items: [
        "Coordinated logistics, equipment, and resource management for 2 major university events.",
        "Collaborated with cross-functional committee divisions to optimize resource allocation and troubleshoot bottlenecks.",
      ],
    },
  ];

  return (
    <section id="experience" className="bg-slate-50 py-[120px] border-y border-zinc-200">
      <div className="max-w-[1440px] mx-auto px-5 md:px-14 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6">
        <motion.div
          className="md:col-span-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-[2rem] md:text-[2.5rem] font-bold leading-tight text-zinc-900 md:sticky md:top-32">
            Experience &<br className="hidden md:block" /> Education
          </h2>
        </motion.div>
        <div className="md:col-span-8 relative border-l border-zinc-200 pl-8 md:pl-12 ml-2 md:ml-0 flex flex-col gap-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className={`absolute -left-[41px] md:-left-[57px] top-1.5 w-4 h-4 rounded-full z-10 flex items-center justify-center ${
                exp.active ? "bg-emerald-500" : "bg-white border-2 border-zinc-300"
              }`}>
                {exp.active && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-emerald-400"
                    animate={{ scale: [1, 2], opacity: [0.6, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
              </div>

              <p className="text-xs font-semibold tracking-[0.05em] uppercase text-zinc-500 mb-2">
                {exp.period}
              </p>
              <h3 className="font-display text-[1.5rem] font-semibold text-zinc-900 mb-1">
                {exp.role}
              </h3>
              <p className="text-lg font-semibold text-zinc-900 mb-4">{exp.company}</p>
              <ul className="flex flex-col gap-3">
                {exp.items.map((item, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.12 + j * 0.07 }}
                    className="flex items-start gap-2 text-base text-zinc-600"
                  >
                    <IconCheck active={exp.active} />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Skills ────────────────────────────────────────────────────────────────────

const Skills = () => {
  const groups = [
    {
      icon: <IconCpu />,
      title: "Technical Skills",
      color: "bg-emerald-50 border-emerald-200 text-emerald-700",
      hoverColor: "hover:bg-emerald-100",
      skills: [
        "Product Management",
        "PRD Writing",
        "Business Case Development",
        "Market Research",
        "Agile Methodology",
        "Wireframing & Prototyping (Figma, Adobe XD)",
        "Basic Programming (HTML, CSS, JS)",
      ],
    },
    {
      icon: <IconBrain />,
      title: "Soft Skills",
      color: "bg-blue-50 border-blue-200 text-blue-700",
      hoverColor: "hover:bg-blue-100",
      skills: [
        "Analytical Thinking",
        "Problem Solving",
        "Cross-functional Communication",
        "Time Management",
        "Adaptability",
        "Detail-Oriented",
      ],
    },
    {
      icon: <IconGlobe />,
      title: "Languages",
      color: "bg-violet-50 border-violet-200 text-violet-700",
      hoverColor: "hover:bg-violet-100",
      skills: ["Indonesian (Native)", "English (Intermediate/Advanced)"],
    },
  ];

  return (
    <section id="skills" className="py-[120px] max-w-[1440px] mx-auto px-5 md:px-14">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionLabel>EXPERTISE</SectionLabel>
        <h2 className="font-display text-[2.75rem] md:text-[4rem] font-extrabold tracking-[-0.02em] text-zinc-900">
          Skills & Tools
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {groups.map((group, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" }}
            className="bg-slate-50 rounded-xl border border-zinc-200 p-6 transition-shadow"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="w-10 h-10 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-zinc-900"
              >
                {group.icon}
              </motion.div>
              <h3 className="font-display text-[1.25rem] font-semibold text-zinc-900">
                {group.title}
              </h3>
            </div>
            <motion.div
              className="flex flex-wrap gap-2"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: i * 0.1 } },
              }}
            >
              {group.skills.map((s) => (
                <motion.span
                  key={s}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    show: { opacity: 1, scale: 1 },
                  }}
                  whileHover={{ scale: 1.08 }}
                  className={`text-[11px] font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full border cursor-default ${group.color}`}
                >
                  {s}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// ─── Contact ───────────────────────────────────────────────────────────────────

const Contact = () => (
  <section id="contact" className="bg-slate-50 py-[120px] border-t border-zinc-200">
    <div className="max-w-[1440px] mx-auto px-5 md:px-14 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-[2.75rem] md:text-[4rem] font-extrabold tracking-[-0.02em] text-zinc-900 mb-6">
          Let's build
        </h2>
        <p className="text-lg leading-7 text-zinc-600 mb-12 max-w-sm">
          Open for product internships, strategic collaborations, or discussions
          about the intersection of IS and PM.
        </p>
        <div className="flex flex-col gap-6">
          {[
            { icon: <IconMail />, label: "EMAIL", value: "wilsannick55@gmail.com" },
            { icon: <IconPhone />, label: "PHONE", value: "081249730818" },
            { icon: <IconLocation />, label: "LOCATION", value: "Malang / Jakarta, Indonesia" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-center gap-4 group"
            >
              <motion.div
                whileHover={{ scale: 1.12, backgroundColor: "#10b981", borderColor: "#10b981", color: "#fff" }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-900 shrink-0 transition-colors"
              >
                {item.icon}
              </motion.div>
              <div>
                <p className="text-xs font-semibold tracking-[0.08em] uppercase text-zinc-400 mb-0.5">
                  {item.label}
                </p>
                <p className="text-lg font-semibold text-zinc-900">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-2xl p-8 shadow-sm border border-zinc-200"
      >
        <form
          action="https://formspree.io/f/xvzvbqgw"
          method="POST"
          className="flex flex-col gap-6"
        >
          <div>
            <label className="block text-xs font-semibold tracking-[0.08em] uppercase text-zinc-500 mb-2">
              MESSAGE
            </label>
            <textarea
              name="message"
              required
              placeholder="Tell me about your project..."
              rows={5}
              className="w-full bg-slate-50 border border-zinc-200 rounded-lg p-4 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all resize-none"
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, backgroundColor: "#10b981" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-full bg-zinc-900 text-white py-4 rounded-lg text-base font-semibold flex items-center justify-center gap-2 transition-colors tracking-wide"
          >
            SEND MESSAGE <IconSend />
          </motion.button>
        </form>
      </motion.div>
    </div>
  </section>
);

// ─── Footer ────────────────────────────────────────────────────────────────────

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="bg-slate-50 border-t border-zinc-200 py-6"
  >
    <div className="flex flex-col md:flex-row justify-between items-center max-w-[1440px] mx-auto px-5 md:px-14 gap-4">
      <p className="font-display text-xl font-bold text-zinc-900 tracking-tight">NICK WILSAN</p>
      <p className="text-xs font-semibold tracking-[0.05em] uppercase text-zinc-500 text-center">
        © 2026 Product Management Portfolio. Built with strategic focus.
      </p>
      <div className="flex gap-6">
        {[
          { href: "https://linkedin.com/in/nick-wilsan", label: "LinkedIn" },
          { href: "https://github.com/nick-wilsan", label: "GitHub" },
          { href: "mailto:wilsannick55@gmail.com", label: "Email" },
        ].map((l) => (
          <motion.a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ color: "#10b981", y: -2 }}
            transition={{ duration: 0.2 }}
            className="text-xs font-semibold tracking-[0.05em] uppercase text-zinc-500 transition-colors"
          >
            {l.label}
          </motion.a>
        ))}
      </div>
    </div>
  </motion.footer>
);

// ─── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Routes>
        <Route
          path="/"
          element={
            <div className="bg-white text-zinc-900 selection:bg-emerald-500 selection:text-white">
              <ScrollProgressBar />
              <Navbar />
              <main>
                <Hero />
                <Background />
                <Projects />
                <Experience />
                <Skills />
                <Contact />
              </main>
              <Footer />
            </div>
          }
        />
        <Route path="/case/travelwise" element={<TravelWiseCase />} />
      </Routes>
    </BrowserRouter>
  );
}
