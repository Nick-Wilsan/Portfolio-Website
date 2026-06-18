import { useEffect, Fragment, type ReactNode, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring, useInView } from "motion/react";
import { ArrowLeft, ExternalLink, Download } from "lucide-react";

// ─── Scroll Progress ──────────────────────────────────────────────────────────
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

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { value: "96.7%", label: "of users don't buy from the first app they open" },
  { value: "60%", label: "open 3 or more apps per search session" },
  { value: "100%", label: "experienced buyer's remorse after paying" },
  { value: "~2M", label: "est. annual transactions from students alone" },
];

const competitors = [
  { name: "Traveloka / Tiket.com", price: "Flights only", modal: "No", kai: "No", booking: "Partial" },
  { name: "Skyscanner", price: "Yes", modal: "No", kai: "No", booking: "No (redirect)" },
  { name: "Google Flights", price: "Flights only", modal: "No", kai: "No", booking: "No (redirect)" },
  { name: "TravelWise AI", price: "Yes", modal: "Yes", kai: "Yes", booking: "Yes", highlight: true },
];

const riceData = [
  { feature: "Universal Price Aggregator", reach: 9, impact: 9, conf: "90%", effort: 5, score: 145, mvp: true },
  { feature: "Price Drop Alert", reach: 7, impact: 8, conf: "80%", effort: 4, score: 112, mvp: true },
  { feature: "Smart Cross-Modal Route Finder", reach: 7, impact: 10, conf: "70%", effort: 9, score: 54, mvp: true },
  { feature: "AI Itinerary Builder", reach: 5, impact: 7, conf: "60%", effort: 8, score: 26, mvp: false },
  { feature: "Student Promo Verification", reach: 5, impact: 6, conf: "50%", effort: 9, score: 17, mvp: false },
];

const userStories = [
  { id: "US-01", story: "Search & compare ticket prices across OTAs in one screen", priority: "Critical" },
  { id: "US-02", story: "Book a cross-modal route (train + flight) in one checkout", priority: "Critical" },
  { id: "US-03", story: "Set a price-drop alert on a watched route", priority: "High" },
  { id: "US-04", story: "See true total price up front, no hidden fees", priority: "Critical" },
  { id: "US-05", story: "Register & onboard in 3 steps or fewer", priority: "Medium" },
];

const metrics = [
  { metric: "Search-to-booking conversion", target: "≥ 15%", method: "Funnel analytics", star: true },
  { metric: "Users not opening another OTA after use", target: "≥ 80%", method: "In-app exit survey", star: false },
  { metric: "Cross-modal bookings as % of total", target: "≥ 30%", method: "Transaction logs", star: false },
  { metric: "Month-2 retention rate", target: "≥ 30%", method: "Cohort analysis", star: false },
];

const journeySteps = [
  { phase: "1. Trigger", action: "Break announced, needs to plan trip home", feel: '"Here we go again"' },
  { phase: "2. Search", action: "Opens 3-4 OTA apps, compares manually", feel: "Overwhelmed, tab fatigue" },
  { phase: "3. Route", action: "Manually figures out train to flight transit", feel: "Confused, anxious about timing" },
  { phase: "4. Checkout", action: "Hidden fees appear; pays anyway", feel: "Feels tricked" },
  { phase: "5. After", action: "Spots cheaper price elsewhere", feel: "Regret (100%)" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-8 flex items-baseline gap-3"
    >
      <span className="text-sm font-mono tracking-widest text-accent">{number}</span>
      <h2 className="font-display text-3xl md:text-[2.75rem] font-medium tracking-tight text-ink">
        {title}
      </h2>
    </motion.div>
  );
}

function Divider() {
  return <div className="border-t border-line my-16 md:my-20" />;
}

function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, string> = {
    Critical: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
    High: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    Medium: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${map[priority] ?? ""}`}>
      {priority}
    </span>
  );
}

function Callout({
  color,
  label,
  children,
}: {
  color: "blue" | "amber" | "violet" | "green";
  label: string;
  children: ReactNode;
}) {
  const map = {
    blue: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-500/10 dark:border-blue-500/30 dark:text-blue-200",
    amber: "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-500/10 dark:border-amber-500/30 dark:text-amber-200",
    violet: "bg-violet-50 border-violet-200 text-violet-800 dark:bg-violet-500/10 dark:border-violet-500/30 dark:text-violet-200",
    green: "bg-accent-soft border-accent/30 text-accent-ink",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl border p-5 my-6 ${map[color]}`}
    >
      <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-70">{label}</p>
      <div className="text-sm leading-relaxed">{children}</div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const sidebarSections = [
  { id: "context", label: "Context & Problem", num: "01" },
  { id: "approach", label: "User & Approach", num: "02" },
  { id: "prioritization", label: "Prioritization", num: "03" },
  { id: "requirements", label: "Requirements", num: "04" },
  { id: "outcome", label: "Outcome & Reflection", num: "05" },
];

export default function TravelWiseCase() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-20px" });

  const [activeSection, setActiveSection] = useState("context");

  useEffect(() => {
    const observers = sidebarSections.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-15% 0px -70% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-accent selection:text-paper">
      <ScrollProgressBar />
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 w-full z-50 bg-paper/85 backdrop-blur-xl border-b border-line">
        <div className="flex justify-between items-center max-w-6xl mx-auto px-6 md:px-8 py-4 md:py-5">
          <Link to="/" className="font-display text-lg font-medium tracking-tight text-ink">
            Nick Wilsan
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted hover:text-ink transition-colors font-medium"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Back to portfolio
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="border-b border-line pt-[72px] md:pt-[84px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24"
        >
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-center">
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border border-line text-muted">
                  Product Management
                </span>
                <span className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border border-line text-muted">
                  Case Study
                </span>
              </div>

              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight leading-[0.95] mb-6 text-ink">
                TravelWise AI
              </h1>
              <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
                Designing an AI-powered multi-modal travel aggregator that helps
                Indonesian students stop juggling 3+ apps to book a single trip
                home.
              </p>

              <div className="mt-10">
                <a
                  href="/TravelWise_AI_Case_Study.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3 rounded-full font-medium text-sm hover:bg-accent transition-colors"
                >
                  View full PRD document
                  <ExternalLink size={16} strokeWidth={2} />
                </a>
              </div>
            </div>

            <motion.figure
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="rounded-lg overflow-hidden border border-line shadow-[0_24px_60px_-24px_rgba(0,0,0,0.4)]">
                <img
                  src="/work/prd-01.png"
                  alt="Cover page of the TravelWise AI product requirements document"
                  className="w-full"
                />
              </div>
            </motion.figure>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-12 border-t border-line">
            {[
              { k: "Role", v: "Product Manager (Solo)" },
              { k: "Timeline", v: "Feb - Apr 2026" },
              { k: "Context", v: "Harisenin.com Bootcamp" },
              { k: "Scope", v: "Research, Strategy, PRD" },
            ].map((item) => (
              <div key={item.k}>
                <p className="text-xs font-bold uppercase tracking-widest text-faint mb-1">{item.k}</p>
                <p className="text-sm font-medium text-ink">{item.v}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="lg:grid lg:grid-cols-[200px_1fr] xl:grid-cols-[240px_1fr] lg:gap-12 xl:gap-16 items-start">
          {/* ── SIDEBAR NAVIGATION ── */}
          <aside className="hidden lg:block sticky top-32 self-start">
            <nav className="flex flex-col gap-0.5">
              {sidebarSections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <a
                    key={section.id}
                    href={"#" + section.id}
                    className="group relative flex items-center gap-3 py-2.5 pl-5 pr-2"
                  >
                    <span className="absolute left-0 inset-y-0 w-px bg-line" />
                    {isActive && (
                      <motion.span
                        layoutId="sidebarIndicator"
                        className="absolute left-0 w-[2px] rounded-full bg-accent"
                        style={{ top: "20%", bottom: "20%" }}
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className={`text-[10px] tracking-widest font-mono shrink-0 w-5 transition-colors ${isActive ? "text-accent font-bold" : "text-faint"}`}>
                      {section.num}
                    </span>
                    <span className={`text-xs font-medium leading-snug transition-colors ${isActive ? "text-ink" : "text-muted"}`}>
                      {section.label}
                    </span>
                  </a>
                );
              })}
            </nav>

            <div className="mt-6 pl-5">
              <div className="text-[10px] text-faint font-semibold tracking-widest uppercase mb-2">
                Progress
              </div>
              <div className="h-1 w-full bg-surface rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent rounded-full"
                  animate={{
                    width: `${((sidebarSections.findIndex(s => s.id === activeSection) + 1) / sidebarSections.length) * 100}%`,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
              <div className="text-[10px] text-faint mt-1.5">
                {sidebarSections.findIndex(s => s.id === activeSection) + 1} / {sidebarSections.length}
              </div>
            </div>
          </aside>

          {/* ── MAIN SECTIONS ── */}
          <div className="min-w-0">

            {/* ── MOBILE SECTION NAV ── */}
            <div className="lg:hidden sticky top-[57px] md:top-[69px] z-40 bg-paper/90 backdrop-blur-md border-b border-line -mx-6 md:-mx-8 mb-8">
              <div className="overflow-x-auto px-6 md:px-8 py-3 scrollbar-none">
                <div className="flex gap-2 w-max">
                  {sidebarSections.map((section) => {
                    const isActive = activeSection === section.id;
                    return (
                      <a key={section.id} href={"#" + section.id} className="flex-shrink-0">
                        <div className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors ${isActive ? "bg-accent text-paper" : "bg-surface text-muted"}`}>
                          <span className={`font-mono text-[9px] ${isActive ? "text-paper/70" : "text-faint"}`}>
                            {section.num}
                          </span>
                          {section.label}
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
              <div className="h-[2px] bg-surface">
                <motion.div
                  className="h-full bg-accent"
                  animate={{
                    width: `${((sidebarSections.findIndex(s => s.id === activeSection) + 1) / sidebarSections.length) * 100}%`,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
            </div>

            {/* ── 01 CONTEXT & PROBLEM ── */}
            <div id="context" className="scroll-mt-32"></div>
            <SectionLabel number="01" title="Context & Problem" />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-base md:text-lg text-muted leading-relaxed mb-8"
            >
              Booking a trip home should take minutes. For{" "}
              <em>mahasiswa rantau</em> (students studying away from hometown),
              it takes hours and still ends in regret. I ran a survey to verify
              the friction was real before designing anything.
            </motion.p>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((s, index) => (
                <motion.div
                  key={s.value}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-5 rounded-xl border border-line bg-surface"
                >
                  <p className="font-display text-3xl md:text-4xl font-medium tracking-tight text-ink">
                    <CountUp value={s.value} active={statsInView} />
                  </p>
                  <p className="text-xs text-muted mt-2 leading-snug">{s.label}</p>
                </motion.div>
              ))}
            </div>

            <Callout color="blue" label="Problem Statement">
              Indonesian students who travel between cities, especially those
              needing multi-modal connections (train to flight), waste hours
              across 3+ separate apps, frequently overpay, and have no single
              platform that handles cross-modal search and booking end-to-end.
            </Callout>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-base font-bold mt-8 mb-4 text-ink">
                Why existing solutions fall short
              </h3>
              <div className="overflow-x-auto rounded-xl border border-line">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-ink text-paper">
                      {["Platform", "Multi-OTA price", "Cross-modal", "KAI integration", "End-to-end booking"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {competitors.map((c, i) => (
                      <tr
                        key={c.name}
                        className={`border-t border-line ${
                          c.highlight ? "bg-accent-soft font-semibold" : i % 2 === 0 ? "bg-surface/60" : ""
                        }`}
                      >
                        <td className="px-4 py-3 text-ink">{c.name}</td>
                        <td className="px-4 py-3 text-muted">{c.price}</td>
                        <td className="px-4 py-3 text-muted">{c.modal}</td>
                        <td className="px-4 py-3 text-muted">{c.kai}</td>
                        <td className="px-4 py-3 text-muted">{c.booking}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <Divider />

            {/* ── 02 USER & APPROACH ── */}
            <div id="approach" className="scroll-mt-32"></div>
            <SectionLabel number="02" title="User & Approach" />

            {/* Persona */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-base font-bold mb-4 text-ink">Primary persona</h3>
              <div className="rounded-xl overflow-hidden border border-line mb-8">
                <div className="grid md:grid-cols-[200px_1fr]">
                  <div className="bg-ink text-paper p-6">
                    <div className="w-12 h-12 rounded-full bg-paper/20 flex items-center justify-center text-2xl font-display font-medium mb-4">
                      R
                    </div>
                    <p className="text-xl font-display font-medium">Raka</p>
                    <p className="text-xs mt-1 opacity-70 leading-snug">
                      21, Engineering student, Universitas Brawijaya. From
                      Banjarmasin, studying in Malang.
                    </p>
                    <p className="text-xs mt-4 italic opacity-60 leading-relaxed border-t border-paper/20 pt-3">
                      "I always feel like there's a cheaper ticket somewhere, I
                      just don't have time to check five apps."
                    </p>
                  </div>
                  <div className="p-6 grid gap-4 bg-surface">
                    {[
                      { k: "Goals", v: "Get home 2-3× a year on the cheapest reliable route. Avoid overpaying. Spend less time planning." },
                      { k: "Frustrations", v: "No direct flight to hometown, must manually stitch a train-to-airport leg. Hidden fees appear only at checkout." },
                      { k: "Behavior", v: "Opens 3-4 apps per search, screenshots prices to compare, often delays and loses the cheap fare." },
                    ].map((row) => (
                      <div key={row.k}>
                        <p className="text-xs font-bold uppercase tracking-widest text-faint mb-1">{row.k}</p>
                        <p className="text-sm text-muted">{row.v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Journey */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-base font-bold mb-4 text-ink">
                Current journey: where it breaks
              </h3>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 mb-8">
              {journeySteps.map((s, index) => (
                <motion.div
                  key={s.phase}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-3 rounded-lg border-t-2 border-red-400 bg-red-50 dark:bg-red-500/10"
                >
                  <p className="text-xs font-bold text-ink mb-1">{s.phase}</p>
                  <p className="text-xs text-muted mb-2 leading-snug">{s.action}</p>
                  <p className="text-xs italic text-red-500 dark:text-red-400 leading-snug">{s.feel}</p>
                </motion.div>
              ))}
            </div>

            <Callout color="violet" label="AI-Assisted Research Synthesis">
              After collecting 30 survey responses, I fed the anonymized
              open-ended answers into <strong>Claude AI</strong> to cluster them
              into recurring pain-point themes, compressing what would have
              been hours of manual affinity mapping into roughly{" "}
              <strong>45 minutes</strong>. The output gave me four clusters:
              price fragmentation, multi-modal complexity, hidden-fee distrust,
              and buyer's remorse. The interpretation, prioritization, and every
              product decision after that were mine. AI accelerated the
              synthesis step; it did not replace the thinking.
            </Callout>

            <Divider />

            {/* ── 03 PRIORITIZATION ── */}
            <div id="prioritization" className="scroll-mt-32"></div>
            <SectionLabel number="03" title="Prioritization & Scope" />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-sm text-muted mb-6 leading-relaxed"
            >
              I scored every candidate feature with{" "}
              <strong className="text-ink">RICE</strong> (Reach × Impact ×
              Confidence ÷ Effort) to get a defensible basis for scoping the
              MVP.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="overflow-x-auto rounded-xl border border-line mb-6"
            >
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-ink text-paper">
                    {["Feature", "Reach", "Impact", "Conf.", "Effort", "RICE", "Decision"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {riceData.map((r, i) => (
                    <tr key={r.feature} className={`border-t border-line ${i % 2 === 0 ? "bg-surface/60" : ""}`}>
                      <td className="px-4 py-3 font-medium text-ink">{r.feature}</td>
                      <td className="px-4 py-3 text-muted">{r.reach}</td>
                      <td className="px-4 py-3 text-muted">{r.impact}</td>
                      <td className="px-4 py-3 text-muted">{r.conf}</td>
                      <td className="px-4 py-3 text-muted">{r.effort}</td>
                      <td className="px-4 py-3 font-bold text-ink">{r.score}</td>
                      <td className="px-4 py-3">
                        {r.mvp ? (
                          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-accent-soft text-accent-ink">
                            MVP
                          </span>
                        ) : (
                          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-surface text-faint">
                            Phase 2
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            <Callout color="amber" label="The judgment call RICE couldn't make for me">
              By raw score, the Cross-Modal Route Finder (54) ranks{" "}
              <em>below</em> Price Drop Alert (112) because its effort is high.
              But I still made it the core MVP feature, because it's the one
              capability no competitor offers, and the actual reason a user
              would choose us over Traveloka.{" "}
              <strong>RICE is a decision aid, not a decision maker.</strong>{" "}
              Shipping only the high-score, low-effort features would have
              produced a faster product with no reason to exist.
            </Callout>

            <Divider />

            {/* ── 04 REQUIREMENTS ── */}
            <div id="requirements" className="scroll-mt-32"></div>
            <SectionLabel number="04" title="Requirements & AI Feature Spec" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-base font-bold mb-4 text-ink">User stories</h3>
              <div className="rounded-xl border border-line overflow-hidden mb-8">
                {userStories.map((s, i) => (
                  <div
                    key={s.id}
                    className={`flex items-center gap-4 px-5 py-4 ${
                      i < userStories.length - 1 ? "border-b border-line" : ""
                    } ${i % 2 === 0 ? "bg-surface/60" : ""}`}
                  >
                    <span className="text-xs font-mono font-bold text-faint w-12 shrink-0">{s.id}</span>
                    <span className="text-sm flex-1 text-ink">{s.story}</span>
                    <PriorityBadge priority={s.priority} />
                  </div>
                ))}
              </div>
            </motion.div>

            <Callout color="violet" label="Spotlight: Writing requirements for the AI matching engine (US-02)">
              <p className="mb-3">
                A generic PM writes: <em>"AI finds the cheapest route."</em>{" "}
                Because I've worked hands-on with ML pipelines, I could specify
                requirements an engineer can actually build to:
              </p>
              <ul className="space-y-2">
                {[
                  "Enforce a minimum 90-minute transit buffer between modes, accounting for real train delays and airport transfer time, not just theoretical connection time.",
                  "Rank options by a composite score (price 60%, total time 30%, transit risk 10%) rather than cheapest-first, because the cheapest route is often the riskiest.",
                  "Degrade gracefully: if one OTA's data is unavailable, show partial results with a clear notice instead of failing the whole search.",
                  "Cache prices with a 5-15 min TTL, fresh enough to stay accurate at checkout, long enough to avoid hammering OTA APIs on every keystroke.",
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-sm">
                    <span className="shrink-0 mt-0.5">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Callout>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-base font-bold mt-8 mb-4 text-ink">Success metrics</h3>
              <div className="rounded-xl border border-line overflow-hidden">
                {metrics.map((m, i) => (
                  <div
                    key={m.metric}
                    className={`grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_auto] gap-4 px-5 py-4 items-center ${
                      i < metrics.length - 1 ? "border-b border-line" : ""
                    } ${i % 2 === 0 ? "bg-surface/60" : ""}`}
                  >
                    <span className="text-sm text-ink">
                      {m.metric}
                      {m.star && (
                        <span className="ml-2 text-xs font-bold px-2 py-0.5 rounded-full bg-accent text-paper">
                          North Star
                        </span>
                      )}
                    </span>
                    <span className="text-sm font-bold text-right text-ink">{m.target}</span>
                    <span className="text-xs text-faint text-right hidden md:block">{m.method}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <Divider />

            {/* ── 05 OUTCOME & REFLECTION ── */}
            <div id="outcome" className="scroll-mt-32"></div>
            <SectionLabel number="05" title="Outcome & Reflection" />

            <Callout color="green" label="Honest framing">
              This was a research-and-design deliverable, not a launched
              product. The points below are validated learning and a concrete
              validation plan, not live performance metrics. I'd rather show
              honest reasoning than invent numbers.
            </Callout>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-sm text-muted leading-relaxed mt-6 mb-8"
            >
              A 96.7% problem-confirmation rate across 30 respondents, for a
              pain point this specific, is a strong signal to continue to
              solution design. The fragmentation and multi-modal pains are real
              and currently unserved by any major player in Indonesia.
            </motion.p>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-base font-bold mb-4 text-ink"
            >
              What I'd do differently
            </motion.h3>
            <div className="space-y-4 mb-8">
              {[
                {
                  color: "amber" as const,
                  label: "1. Validate API access before scoping",
                  text: "The whole MVP assumes Traveloka, Tiket.com, and KAI expose usable APIs. In reality, Indonesian OTAs are often restrictive. I should have run a short technical-discovery sprint before locking 'universal aggregator' as the core. This is the single biggest unmitigated risk.",
                },
                {
                  color: "amber" as const,
                  label: "2. Add qualitative depth to the research",
                  text: "30 survey responses told me what happens but not why. Why do 60% open 3+ apps: distrust, habit, or loyalty points? Even 5 short interviews alongside the survey would have sharpened both the persona and the solution.",
                },
                {
                  color: "violet" as const,
                  label: "3. Applying RICE later changed how I see prioritization",
                  text: "Scoring formally after the fact revealed that my gut-chosen core feature was the lowest-RICE of the three MVP items. Rather than invalidating the choice, it taught me to separate 'highest score' from 'most strategic', and to state that trade-off explicitly.",
                },
              ].map((item) => (
                <Fragment key={item.label}>
                  <Callout color={item.color} label={item.label}>
                    {item.text}
                  </Callout>
                </Fragment>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 md:p-8 rounded-xl bg-ink text-paper"
            >
              <p className="text-sm font-bold mb-2">What this taught me about being a PM</p>
              <p className="text-sm leading-relaxed opacity-80">
                <strong className="opacity-100">
                  Out of scope is a product decision, not a limitation.
                </strong>{" "}
                The strongest part of this project wasn't the features I
                included. It was being able to defend every feature I cut. And
                using AI well means using it to move faster on the mechanical
                work, so I can spend more judgment on the decisions only a human
                should make.
              </p>
            </motion.div>

            <Divider />

            {/* ── CTA ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
            >
              <div>
                <p className="text-sm text-muted">Want the full document?</p>
                <p className="text-xs text-faint mt-0.5">
                  Includes all user stories, acceptance criteria, and roadmap.
                </p>
              </div>
              <a
                href="/TravelWise_AI_Case_Study.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink text-paper text-sm font-medium hover:bg-accent transition-colors"
              >
                View full PRD
                <Download size={14} strokeWidth={2.5} />
              </a>
            </motion.div>

            <div className="pb-16 md:pb-24" />
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="bg-surface border-t border-line py-8">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto px-6 md:px-8 gap-4">
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
    </div>
  );
}
