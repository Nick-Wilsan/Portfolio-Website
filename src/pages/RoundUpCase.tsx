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
  { value: "70%", label: "of Indonesians don't save at all (GoodStats, 2024)" },
  { value: "23.4%", label: "of those who do save admit it's inconsistent" },
  { value: "34.5%", label: "say impulsive spending is the #1 reason they fail" },
  { value: "28.2%", label: "cite income as too tight — the group most at risk from rigid round-up" },
];

const competitors = [
  { name: "Bank Saqu — Tabungmatic", auto: "Yes (fixed Rp5k/10k/50k)", adaptive: "No", cross: "No — Bank Saqu QRIS only" },
  { name: "Jenius — Round Up Saver", auto: "Yes (to nearest thousand)", adaptive: "No", cross: "No — Jenius debit card only" },
  { name: "This product", auto: "Yes", adaptive: "Yes — AI adjusts per transaction", cross: "Yes — via SNAP/aggregator", highlight: true },
];

const riceData = [
  { feature: "AI adaptive amount & pause logic (hybrid)", reach: 9, impact: 9, conf: "80%", effort: 6, score: 108, decision: "MVP" },
  { feature: "Core round-up engine (1-2 SNAP partners)", reach: 8, impact: 9, conf: "70%", effort: 7, score: 72, decision: "MVP" },
  { feature: "Goal-based pacing (custom targets)", reach: 6, impact: 6, conf: "60%", effort: 5, score: 43, decision: "Phase 2" },
  { feature: "Multi-platform linking (2-3 e-wallets, Phase 1)", reach: 6, impact: 7, conf: "60%", effort: 8, score: 32, decision: "MVP (limited)" },
  { feature: "Universal coverage (all ID banks/e-wallets)", reach: 10, impact: 9, conf: "30%", effort: 10, score: 27, decision: "North star" },
  { feature: "Personalized re-engagement nudge", reach: 5, impact: 6, conf: "50%", effort: 6, score: 25, decision: "Phase 2" },
];

const userStories = [
  { id: "US-01", story: "As a user, transactions on my linked accounts get rounded up and saved automatically", priority: "Critical" },
  { id: "US-02", story: "I don't want round-up to fire when my balance is sitting at a risky low", priority: "Critical" },
  { id: "US-03", story: "I want the AI to adjust the round-up size against my savings goal", priority: "High" },
  { id: "US-04", story: "If I start ignoring or disabling the feature, remind me with something relevant, not a generic notification", priority: "High" },
  { id: "US-05", story: "I can link 2+ e-wallets/banks inside one savings dashboard", priority: "Medium" },
];

const metrics = [
  { metric: "% of linked transactions successfully rounded up", target: "≥ 95%", method: "Internal reliability target", star: true },
  { metric: "Active-feature retention after 90 days", target: "Higher than static round-up baseline", method: "Relative — no public competitor data", star: false },
  { metric: "Avg. savings accumulated / month", target: "Rp 50,000–150,000 (rough estimate)", method: "Directional, from Acorns (US) benchmark", star: false },
  { metric: "Disable / override rate", target: "Lower than static round-up baseline", method: "Relative — no public competitor data", star: false },
];

const journeySteps = [
  { phase: "1. Payday", action: "Salary lands, intends to set money aside", feel: '"This time I\'ll stick to it"' },
  { phase: "2. Week 1-2", action: "Daily QRIS spend scattered across 2-3 apps, each too small to notice", feel: "Relaxed, unaware it adds up" },
  { phase: "3. Week 3", action: "Balance thins in one wallet, manual transfers between wallets get annoying", feel: "Starting to worry" },
  { phase: "4. Week 4 (pre-payday)", action: "Riskiest point if round-up keeps cutting while balance is thin", feel: "Frustrated (still a hypothesis)" },
  { phase: "5. Payday again", action: "Cycle repeats, savings stay minimal or inconsistent", feel: "Mild letdown, tries again" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative flex items-end gap-4 md:gap-6 mb-10 md:mb-12"
    >
      <span className="font-display text-[clamp(3.2rem,7vw,5.5rem)] leading-[0.8] text-accent/15 select-none -mb-1">
        {number}
      </span>
      <h2 className="font-display text-3xl md:text-[2.75rem] font-medium tracking-tight text-ink pb-1">
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

export default function RoundUpCase() {
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
        <div className="flex justify-between items-center max-w-[1320px] mx-auto px-6 md:px-8 py-4 md:py-5">
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
          className="max-w-[1320px] mx-auto px-6 md:px-8 py-16 md:py-24"
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
                AI Adaptive Round-Up Savings
              </h1>
              <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
                Designing an automatic round-up savings mechanism that stops
                pushing when a user's balance is running risky-low — built
                across Indonesia's payment systems instead of locked into one
                bank.
              </p>

              <div className="mt-10">
                <a
                  href="/AI_Adaptive_Universal_RoundUp_Savings_Case_Study.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3 rounded-full font-medium text-sm hover:bg-accent transition-colors"
                >
                  View full case study document
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
                  src="/work/roundup-01.png"
                  alt="Cover page of the AI Adaptive Universal Round-Up Savings case study"
                  className="w-full"
                />
              </div>
            </motion.figure>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-12 border-t border-line">
            {[
              { k: "Role", v: "Product Manager (Solo)" },
              { k: "Target Industry", v: "Fintech / E-Wallet" },
              { k: "Scope", v: "Research, RICE, AI Spec" },
              { k: "Status", v: "Strategy Deliverable" },
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
      <div className="max-w-[1320px] mx-auto px-6 md:px-8 py-16 md:py-20">
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
                        layoutId="sidebarIndicatorRoundUp"
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
              The brief: help a fintech's users save consistently through
              transaction round-ups that adapt to their day-to-day cash flow,
              instead of a fixed rule that fires no matter what. Before
              designing anything, I checked whether the underlying saving
              problem was real and specific enough to build for.
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

            <p className="text-xs text-faint mb-8 leading-relaxed">
              Source: GoodStats consumer savings survey, published December
              2024. Of those who fail to save, 34.5% cite impulsive spending,
              28.2% cite insufficient income, 10.3% aren't in the habit yet,
              and 7% don't know how.
            </p>

            <Callout color="blue" label="Problem statement">
              Help users save consistently through automatic transaction
              round-ups that adapt to daily financial conditions — measured
              against active-feature retention and total savings accumulated,
              compared to the static round-up mechanisms already on the
              market.
            </Callout>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-sm text-muted leading-relaxed mb-6"
            >
              <p className="mb-3">
                Round-up is a logical fit here: since the #1 reason people
                fail to save is impulsive spending, a mechanism that's
                automatic and doesn't require an active decision should
                outperform approaches that demand conscious discipline
                (manual budgeting, manual targets) — a pattern already
                proven across the round-up savings category broadly.
              </p>
              <p>
                But the 28.2% who say their income is too tight are exactly
                the group most exposed if round-up fires blindly, with no
                read on their cash-flow health. That's a reasonable design
                argument from the data, not a claim already proven by direct
                evidence — see the assumptions note in Section 05.
              </p>
            </motion.div>

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
                      {["Platform", "Auto round-up?", "Adapts to balance?", "Cross-platform?"].map((h) => (
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
                        <td className="px-4 py-3 text-muted">{c.auto}</td>
                        <td className="px-4 py-3 text-muted">{c.adaptive}</td>
                        <td className="px-4 py-3 text-muted">{c.cross}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted leading-relaxed mt-5">
                The validated gap: every existing solution is locked to a
                single platform, none of them aggregate a user's full payment
                footprint (QRIS, e-wallets, bank) into one savings mechanism,
                and every one of them uses a fixed round-up rule with no
                read on the user's real-time cash-flow health.
              </p>
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
              <Callout color="amber" label="Proto-persona — synthesized from secondary data, not yet validated by direct research">
                The persona and journey map below are a deliberate research
                trade-off, not a finished interview output. Treat them as a
                hypothesis to test, not a confirmed user.
              </Callout>
              <div className="rounded-xl overflow-hidden border border-line mb-8">
                <div className="grid md:grid-cols-[200px_1fr]">
                  <div className="bg-ink text-paper p-6">
                    <div className="w-12 h-12 rounded-full bg-paper/20 flex items-center justify-center text-2xl font-display font-medium mb-4">
                      D
                    </div>
                    <p className="text-xl font-display font-medium">Dinda</p>
                    <p className="text-xs mt-1 opacity-70 leading-snug">
                      26, administrative staff at a private company, based in
                      Jakarta. Paid monthly, around the 25th.
                    </p>
                    <p className="text-xs mt-4 italic opacity-60 leading-relaxed border-t border-paper/20 pt-3">
                      "My salary always feels 'just enough' by the end of the
                      month."
                    </p>
                  </div>
                  <div className="p-6 grid gap-4 bg-surface">
                    {[
                      { k: "Payment habits", v: "GoPay and Dana for daily spend (coffee, lunch, ride-hailing), one mobile-banking app for transfers and bills. Nearly all small daily purchases go through QRIS." },
                      { k: "Goals", v: "Wants an emergency fund and a yearly vacation fund, but has never sustained saving past 2-3 months." },
                      { k: "Frustrations / behavior", v: "Income feels too tight by month-end (proxy for the 28.2% who cite insufficient income); frequent small impulsive QRIS buys (proxy for the 34.5% who spend on impulse). Has tried an auto-savings feature on a digital bank before, but doesn't remember when or why she stopped." },
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
                Journey map (hypothesis, based on the proto-persona)
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
                  className="p-3 rounded-lg border border-line bg-surface"
                >
                  <p className="text-xs font-bold text-ink mb-1">{s.phase}</p>
                  <p className="text-xs text-muted mb-2 leading-snug">{s.action}</p>
                  <p className="text-xs italic text-muted leading-snug">{s.feel}</p>
                </motion.div>
              ))}
            </div>

            <Callout color="violet" label="Methodology decision">
              I deliberately chose to scope with a proto-persona now and
              validate with real research in the next iteration, rather than
              stall the requirements work waiting for interviews. That's a
              conscious trade-off: faster to a working skeleton of
              requirements and prioritization, but it means the persona and
              journey map above stay hypotheses until tested. The risk is
              logged explicitly in Section 05, not discovered after the
              fact.
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
                        {r.decision === "MVP" ? (
                          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-accent-soft text-accent-ink">
                            MVP
                          </span>
                        ) : r.decision === "North star" ? (
                          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                            North star
                          </span>
                        ) : r.decision === "MVP (limited)" ? (
                          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-accent-soft text-accent-ink">
                            MVP (limited)
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
            <p className="text-xs text-faint mb-6">
              Formula: Score = Reach × Impact × (Confidence ÷ 10) ÷ Effort.
            </p>

            <Callout color="amber" label="Two calls that deliberately override the raw score order">
              <p className="mb-3">
                <strong>1. Multi-platform linking</strong> scores lower (32)
                than goal-based pacing (43), but it still made the MVP.
                Without it, this product is just another Tabungmatic — it
                loses the one structural thing that separates it from
                competitors. Goal-based pacing is a refinement, not the core
                differentiator.
              </p>
              <p>
                <strong>2. Universal coverage</strong> has the lowest
                confidence (30%) because it depends on the pace of Bank
                Indonesia's Open Finance Phase 3 regulation, which is outside
                the product team's control. That's why it's a "north star"
                and not a Day-1 promise — not because the feature doesn't
                matter.
              </p>
            </Callout>

            <Callout color="blue" label="Risk & dependency — SNAP / Open Finance">
              <p className="mb-3">
                The "combine all payment systems" claim is a phased roadmap,
                not a Day-1 decision. Open finance in Indonesia is still
                maturing — Bank Indonesia targets Open Finance Phase 3
                (banking, pension funds, insurance, and investment under one
                interoperable data model) for 2026 and beyond. Read access
                (viewing transactions) is also further along than write
                access (executing fund transfers), which requires a formal
                partnership with a licensed payment provider (PJP).
              </p>
              <p>
                <strong>Scoping decision:</strong> the MVP starts with 2-3
                e-wallet/bank partners whose SNAP compliance is most mature
                (through an aggregator like Brankas or Ayoconnect), not a
                "universal" claim from day one. This is the single largest
                risk the product side can't fully mitigate — it depends on
                regulatory pace and business partnerships.
              </p>
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

            <Callout color="violet" label="Spotlight: writing requirements for the adaptive round-up engine (US-02)">
              <p className="mb-3">
                A generic spec says: <em>"AI pauses round-up when balance is
                low."</em> Here's what I specified so an engineer could
                actually build it:
              </p>
              <ul className="space-y-2">
                {[
                  "Adaptive round-up logic: weighs balance trend, days to payday, spend velocity, and savings-goal pace to set the round-up amount per transaction — it can be Rp0 if conditions look risky.",
                  "Personalized threshold, not a fixed number: the model learns each user's own cyclical balance pattern, spend velocity, and payday date to decide what 'risky' means for that specific user, not a generic number applied to everyone.",
                  "Cold start handling: a new user has no history yet. Before 30 days or 20 transactions of data exist, the system uses a conservative default threshold (balance below 20% of average monthly inflow) instead of guessing aggressively with no basis.",
                  "Retraining cadence: the personal threshold recalculates on a rolling 90-day window, so it tracks life changes like a raise or a new job.",
                  "Fallback behavior: if balance data from the aggregator is stale or fails to sync, or model confidence is low (irregular income pattern), the system defaults to skipping the round-up or to the conservative threshold — it never assumes the balance is safe.",
                  "Dedup logic: prevents a double round-up when multiple linked accounts fire near-simultaneous transactions.",
                  "Personalization engine: detects a disengagement pattern (feature turned off, N consecutive skipped round-ups) and triggers a contextual nudge instead of a generic notification.",
                  "Explainability: every time the AI skips or pauses, the user gets a short, human-readable reason — e.g. 'We skipped round-up this time because your balance is usually tighter this week.'",
                  "Privacy note: this logic stores and analyzes a user's historical transaction patterns, which needs a clear data-retention and consent policy aligned with SNAP's consumer-protection principles.",
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
              <h3 className="text-base font-bold mt-8 mb-4 text-ink">Acceptance criteria (Gherkin)</h3>
              <div className="rounded-xl border border-line bg-surface p-5 mb-8 overflow-x-auto">
                <pre className="text-xs leading-relaxed text-muted font-mono whitespace-pre">
{`Given the user's balance is below the AI-determined safe threshold
When a transaction occurs that would normally be rounded up
Then the system skips the round-up and logs it as "paused - low balance"

Given the user has skipped or disabled the feature 3x in a row within 2 weeks
When the system detects this pattern
Then it sends a personalized nudge with relevant context, not a generic alert

Given a new user with less than 30 days or fewer than 20 transactions of history
When the system evaluates whether the balance condition is risky
Then it uses the conservative default threshold and tells the user the AI is still "learning" their habits`}
                </pre>
              </div>
            </motion.div>

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
                          Reliability target
                        </span>
                      )}
                    </span>
                    <span className="text-sm font-bold text-right text-ink">{m.target}</span>
                    <span className="text-xs text-faint text-right hidden md:block">{m.method}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <Callout color="amber" label="Honest note on these metrics">
              Only one target (the reliability number) is a pure internal
              decision that needs no external benchmark. The other three are
              relative to a baseline, not absolute numbers already proven by
              market research — there's no public data specific enough about
              how Tabungmatic or Round Up Saver actually perform. That felt
              more honest than inventing a precise number just to look
              "already benchmarked."
            </Callout>

            <Divider />

            {/* ── 05 OUTCOME & REFLECTION ── */}
            <div id="outcome" className="scroll-mt-32"></div>
            <SectionLabel number="05" title="Outcome & Reflection" />

            <Callout color="green" label="Honest framing">
              This is a research-and-strategy deliverable, not a shipped
              product. The quantitative validation I used — the GoodStats
              survey on Indonesian saving habits — is real and publicly
              checkable. But the persona, journey map, and some metric
              targets in this case study are still a proto-persona and
              directional estimates, not the result of primary research with
              real users. The deliberate choice was to be transparent about
              what's validated and what's still an assumption, rather than
              present everything as if it were fully researched.
            </Callout>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-sm text-muted leading-relaxed mt-6 mb-8"
            >
              A 70% non-saving rate, sourced from a real published survey, is
              a strong enough signal to keep investing in this direction. The
              fragmentation and lack of balance-awareness in existing
              round-up tools are real gaps, currently unserved by any major
              player in Indonesia.
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
                  label: "1. Validate the proto-persona through real interviews, starting at the most critical point",
                  text: "The journey map in Section 02 has one fully hypothetical point: disengagement in the week before payday. That's what should get tested with real people first, not the whole persona from scratch.",
                },
                {
                  color: "amber" as const,
                  label: "2. Test the disengagement hypothesis specifically, rather than assume it's correct",
                  text: "If people actually stop using round-up for reasons other than balance anxiety — forgetting about it, or not seeing the benefit — the entire 'adaptive pause' feature in Section 04 needs a redesign from zero.",
                },
                {
                  color: "amber" as const,
                  label: "3. Validate SNAP / aggregator partnership cost and timeline concretely",
                  text: "Before 'universal coverage' gets published as a roadmap commitment — right now it's built from reading Bank Indonesia's public roadmap, not from a real conversation with a prospective partner.",
                },
                {
                  color: "violet" as const,
                  label: "4. A process lesson from building this case study itself",
                  text: "Before landing on this idea, a few other ideas looked original at first glance but turned out to already exist elsewhere (AI marketplace search, AI sprint retrospectives, AI employee year-in-review). The lesson: in 2026, the competitive landscape needs validating before solution design, not after.",
                },
              ].map((item) => (
                <Fragment key={item.label}>
                  <Callout color={item.color} label={item.label}>
                    {item.text}
                  </Callout>
                </Fragment>
              ))}
            </div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-base font-bold mb-4 text-ink"
            >
              Unvalidated assumptions
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-xl border border-line bg-surface p-5 mb-8"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-faint mb-3">
                Logged from the start, not discovered after the fact
              </p>
              <ol className="space-y-3 text-sm text-muted leading-relaxed list-decimal list-inside">
                <li>
                  The problem statement in Section 01 deliberately does{" "}
                  <strong className="text-ink">not</strong> claim that static
                  round-up causes disengagement as fact — it's a reasonable
                  design assumption from the data (28.2% income-constrained),
                  not yet confirmed by direct evidence.
                </li>
                <li>
                  The "Dinda" persona is a proto-persona — synthesized from
                  secondary data plus assumption, not the result of real
                  interviews or surveys. Validating her for real is the first
                  research priority if this project moves to the next stage.
                </li>
              </ol>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 md:p-8 rounded-xl bg-ink text-paper"
            >
              <p className="text-sm font-bold mb-2">What this taught me about being a PM</p>
              <p className="text-sm leading-relaxed opacity-80">
                Differentiation isn't about having an idea nobody's had
                before — that gets rarer every year as AI gets cheaper to
                bolt onto any product. The real differentiation is in the
                combination:{" "}
                <strong className="opacity-100">
                  being honest about what's evidenced versus what's still
                  assumed, being willing to change scope when the evidence
                  doesn't support the original idea, and writing requirements
                  precise enough that an engineer can execute without
                  guessing.
                </strong>{" "}
                AI can help scan the competitive landscape and draft faster —
                but the call to keep a feature even when its score is low
                only comes from human judgment.
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
                  Includes all user stories, acceptance criteria, and the
                  full AI feature spec.
                </p>
              </div>
              <a
                href="/AI_Adaptive_Universal_RoundUp_Savings_Case_Study.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink text-paper text-sm font-medium hover:bg-accent transition-colors"
              >
                View full case study
                <Download size={14} strokeWidth={2.5} />
              </a>
            </motion.div>

            <div className="pb-16 md:pb-24" />
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="bg-surface border-t border-line py-8">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-[1320px] mx-auto px-6 md:px-8 gap-4">
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
