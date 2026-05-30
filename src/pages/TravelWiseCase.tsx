import { useEffect, Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

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
  { id: "US-04", story: "See true total price up front — no hidden fees", priority: "Critical" },
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
  { phase: "2. Search", action: "Opens 3–4 OTA apps, compares manually", feel: "Overwhelmed, tab fatigue" },
  { phase: "3. Route", action: "Manually figures out train → flight transit", feel: "Confused, anxious about timing" },
  { phase: "4. Checkout", action: "Hidden fees appear; pays anyway", feel: "Feels tricked" },
  { phase: "5. After", action: "Spots cheaper price elsewhere", feel: "Regret (100%)" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">{number}</span>
      <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-1 text-zinc-900">{title}</h2>
    </motion.div>
  );
}

function Divider() {
  return <div className="border-t border-zinc-200 my-16 md:my-20" />;
}

function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, string> = {
    Critical: "bg-red-50 text-red-600",
    High: "bg-amber-50 text-amber-600",
    Medium: "bg-blue-50 text-blue-600",
  };
  return (
    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${map[priority] ?? ""}`}>
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
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    amber: "bg-amber-50 border-amber-200 text-amber-700",
    violet: "bg-violet-50 border-violet-200 text-violet-700",
    green: "bg-green-50 border-green-200 text-green-700",
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

export default function TravelWiseCase() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-black selection:text-white">

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-zinc-100">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-8 py-4 md:py-6">
          <Link to="/" className="text-lg font-bold tracking-tighter text-zinc-900">
            Nick Wilsan
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors duration-300 font-medium"
          >
            <ArrowLeft size={14} />
            Back to Portfolio
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="border-b border-zinc-200 pt-[72px] md:pt-[88px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-28"
        >
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border border-zinc-300 text-zinc-500">
              Product Management
            </span>
            <span className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border border-zinc-300 text-zinc-500">
              Case Study
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none mb-6">
            TravelWise AI
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 max-w-2xl leading-relaxed">
            Designing an AI-powered multi-modal travel aggregator that helps Indonesian students
            stop juggling 3+ apps to book a single trip home.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-zinc-200">
            {[
              { k: "Role", v: "Product Manager (Solo)" },
              { k: "Timeline", v: "Feb – Apr 2026" },
              { k: "Context", v: "Harisenin.com Bootcamp" },
              { k: "Scope", v: "Research · Strategy · PRD" },
            ].map((item) => (
              <div key={item.k}>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">{item.k}</p>
                <p className="text-sm font-medium text-zinc-800">{item.v}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a
              href="/TravelWise_AI_Case_Study.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-zinc-700 transition-colors"
            >
              View Full PRD Document
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">

        {/* ── 01 CONTEXT & PROBLEM ── */}
        <SectionLabel number="01" title="Context & Problem" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-base md:text-lg text-zinc-600 leading-relaxed mb-8"
        >
          Booking a trip home should take minutes. For <em>mahasiswa rantau</em> — students studying away from hometown —
          it takes hours and still ends in regret. I ran a survey to verify the friction was real before designing anything.
        </motion.p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s, index) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-5 rounded-xl border border-zinc-200 bg-zinc-50"
            >
              <p className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900">{s.value}</p>
              <p className="text-xs text-zinc-500 mt-2 leading-snug">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <Callout color="blue" label="Problem Statement">
          Indonesian students who travel between cities — especially those needing multi-modal connections
          (train → flight) — waste hours across 3+ separate apps, frequently overpay, and have no single
          platform that handles cross-modal search and booking end-to-end.
        </Callout>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-base font-bold mt-8 mb-4 text-zinc-900">Why existing solutions fall short</h3>
          <div className="overflow-x-auto rounded-xl border border-zinc-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-900 text-white">
                  {["Platform", "Multi-OTA price", "Cross-modal", "KAI integration", "End-to-end booking"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {competitors.map((c, i) => (
                  <tr
                    key={c.name}
                    className={`border-t border-zinc-200 ${
                      c.highlight ? "bg-zinc-50 font-semibold" : ""
                    } ${i % 2 === 0 && !c.highlight ? "bg-zinc-50/50" : ""}`}
                  >
                    <td className="px-4 py-3 text-zinc-900">{c.name}</td>
                    <td className="px-4 py-3 text-zinc-500">{c.price}</td>
                    <td className="px-4 py-3 text-zinc-500">{c.modal}</td>
                    <td className="px-4 py-3 text-zinc-500">{c.kai}</td>
                    <td className="px-4 py-3 text-zinc-500">{c.booking}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <Divider />

        {/* ── 02 USER & APPROACH ── */}
        <SectionLabel number="02" title="User & Approach" />

        {/* Persona */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-base font-bold mb-4 text-zinc-900">Primary persona</h3>
          <div className="rounded-xl overflow-hidden border border-zinc-200 mb-8">
            <div className="grid md:grid-cols-[200px_1fr]">
              <div className="bg-zinc-900 text-white p-6">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl font-black mb-4">
                  R
                </div>
                <p className="text-xl font-black">Raka</p>
                <p className="text-xs mt-1 opacity-70 leading-snug">
                  21 · Engineering student, Universitas Brawijaya. From Banjarmasin, studying in Malang.
                </p>
                <p className="text-xs mt-4 italic opacity-60 leading-relaxed border-t border-white/20 pt-3">
                  "I always feel like there's a cheaper ticket somewhere — I just don't have time to check five apps."
                </p>
              </div>
              <div className="p-6 grid gap-4">
                {[
                  { k: "Goals", v: "Get home 2–3× a year on the cheapest reliable route. Avoid overpaying. Spend less time planning." },
                  { k: "Frustrations", v: "No direct flight to hometown — must manually stitch a train-to-airport leg. Hidden fees appear only at checkout." },
                  { k: "Behavior", v: "Opens 3–4 apps per search, screenshots prices to compare, often delays and loses the cheap fare." },
                ].map((row) => (
                  <div key={row.k}>
                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">{row.k}</p>
                    <p className="text-sm text-zinc-600">{row.v}</p>
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
          <h3 className="text-base font-bold mb-4 text-zinc-900">Current journey — where it breaks</h3>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {journeySteps.map((s, index) => (
            <motion.div
              key={s.phase}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-3 rounded-lg border-t-2 border-red-400 bg-red-50"
            >
              <p className="text-xs font-bold text-zinc-800 mb-1">{s.phase}</p>
              <p className="text-xs text-zinc-600 mb-2 leading-snug">{s.action}</p>
              <p className="text-xs italic text-red-500 leading-snug">{s.feel}</p>
            </motion.div>
          ))}
        </div>

        <Callout color="violet" label="⚡ AI-Assisted Research Synthesis">
          After collecting 30 survey responses, I fed the anonymized open-ended answers into{" "}
          <strong>Claude AI</strong> to cluster them into recurring pain-point themes — compressing
          what would have been hours of manual affinity mapping into roughly <strong>45 minutes</strong>.
          The output gave me four clusters: price fragmentation, multi-modal complexity, hidden-fee
          distrust, and buyer's remorse. The interpretation, prioritization, and every product decision
          after that were mine. AI accelerated the synthesis step; it did not replace the thinking.
        </Callout>

        <Divider />

        {/* ── 03 PRIORITIZATION ── */}
        <SectionLabel number="03" title="Prioritization & Scope" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-sm text-zinc-600 mb-6 leading-relaxed"
        >
          I scored every candidate feature with <strong className="text-zinc-900">RICE</strong> —
          Reach × Impact × Confidence ÷ Effort — to get a defensible basis for scoping the MVP.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto rounded-xl border border-zinc-200 mb-6"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-900 text-white">
                {["Feature", "Reach", "Impact", "Conf.", "Effort", "RICE", "Decision"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {riceData.map((r, i) => (
                <tr
                  key={r.feature}
                  className={`border-t border-zinc-200 ${i % 2 === 0 ? "bg-zinc-50/50" : ""}`}
                >
                  <td className="px-4 py-3 font-medium text-zinc-900">{r.feature}</td>
                  <td className="px-4 py-3 text-zinc-500">{r.reach}</td>
                  <td className="px-4 py-3 text-zinc-500">{r.impact}</td>
                  <td className="px-4 py-3 text-zinc-500">{r.conf}</td>
                  <td className="px-4 py-3 text-zinc-500">{r.effort}</td>
                  <td className="px-4 py-3 font-black text-zinc-900">{r.score}</td>
                  <td className="px-4 py-3">
                    {r.mvp ? (
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-50 text-green-600">MVP</span>
                    ) : (
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-400">Phase 2</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <Callout color="amber" label="The judgment call RICE couldn't make for me">
          By raw score, the Cross-Modal Route Finder (54) ranks <em>below</em> Price Drop Alert (112)
          because its effort is high. But I still made it the core MVP feature — because it's the one
          capability no competitor offers, and the actual reason a user would choose us over Traveloka.{" "}
          <strong>RICE is a decision aid, not a decision maker.</strong> Shipping only the high-score,
          low-effort features would have produced a faster product with no reason to exist.
        </Callout>

        <Divider />

        {/* ── 04 REQUIREMENTS ── */}
        <SectionLabel number="04" title="Requirements & AI Feature Spec" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-base font-bold mb-4 text-zinc-900">User stories</h3>
          <div className="rounded-xl border border-zinc-200 overflow-hidden mb-8">
            {userStories.map((s, i) => (
              <div
                key={s.id}
                className={`flex items-center gap-4 px-5 py-4 ${
                  i < userStories.length - 1 ? "border-b border-zinc-200" : ""
                } ${i % 2 === 0 ? "bg-zinc-50/50" : ""}`}
              >
                <span className="text-xs font-mono font-bold text-zinc-400 w-12 shrink-0">{s.id}</span>
                <span className="text-sm flex-1 text-zinc-700">{s.story}</span>
                <PriorityBadge priority={s.priority} />
              </div>
            ))}
          </div>
        </motion.div>

        <Callout color="violet" label="⚡ Spotlight — Writing requirements for the AI matching engine (US-02)">
          <p className="mb-3">
            A generic PM writes: <em>"AI finds the cheapest route."</em> Because I've worked hands-on
            with ML pipelines, I could specify requirements an engineer can actually build to:
          </p>
          <ul className="space-y-2">
            {[
              "Enforce a minimum 90-minute transit buffer between modes — accounting for real train delays and airport transfer time, not just theoretical connection time.",
              "Rank options by a composite score (price 60% · total time 30% · transit risk 10%) rather than cheapest-first, because the cheapest route is often the riskiest.",
              "Degrade gracefully: if one OTA's data is unavailable, show partial results with a clear notice instead of failing the whole search.",
              "Cache prices with a 5–15 min TTL — fresh enough to stay accurate at checkout, long enough to avoid hammering OTA APIs on every keystroke.",
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
          <h3 className="text-base font-bold mt-8 mb-4 text-zinc-900">Success metrics</h3>
          <div className="rounded-xl border border-zinc-200 overflow-hidden">
            {metrics.map((m, i) => (
              <div
                key={m.metric}
                className={`grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_auto] gap-4 px-5 py-4 items-center ${
                  i < metrics.length - 1 ? "border-b border-zinc-200" : ""
                } ${i % 2 === 0 ? "bg-zinc-50/50" : ""}`}
              >
                <span className="text-sm text-zinc-700">
                  {m.metric}
                  {m.star && (
                    <span className="ml-2 text-xs font-bold px-2 py-0.5 rounded-full bg-zinc-900 text-white">
                      North Star
                    </span>
                  )}
                </span>
                <span className="text-sm font-bold text-right text-zinc-900">{m.target}</span>
                <span className="text-xs text-zinc-400 text-right hidden md:block">{m.method}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <Divider />

        {/* ── 05 OUTCOME & REFLECTION ── */}
        <SectionLabel number="05" title="Outcome & Reflection" />

        <Callout color="green" label="Honest framing">
          This was a research-and-design deliverable, not a launched product. The points below are
          validated learning and a concrete validation plan — not live performance metrics. I'd rather
          show honest reasoning than invent numbers.
        </Callout>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-sm text-zinc-600 leading-relaxed mt-6 mb-8"
        >
          A 96.7% problem-confirmation rate across 30 respondents — for a pain point this specific —
          is a strong signal to continue to solution design. The fragmentation and multi-modal pains
          are real and currently unserved by any major player in Indonesia.
        </motion.p>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-base font-bold mb-4 text-zinc-900"
        >
          What I'd do differently
        </motion.h3>
        <div className="space-y-4 mb-8">
          {[
            {
              color: "amber" as const,
              label: "1 · Validate API access before scoping",
              text: "The whole MVP assumes Traveloka, Tiket.com, and KAI expose usable APIs. In reality, Indonesian OTAs are often restrictive. I should have run a short technical-discovery sprint before locking 'universal aggregator' as the core — this is the single biggest unmitigated risk.",
            },
            {
              color: "amber" as const,
              label: "2 · Add qualitative depth to the research",
              text: "30 survey responses told me what happens but not why. Why do 60% open 3+ apps — distrust, habit, or loyalty points? Even 5 short interviews alongside the survey would have sharpened both the persona and the solution.",
            },
            {
              color: "violet" as const,
              label: "3 · Applying RICE later changed how I see prioritization",
              text: "Scoring formally after the fact revealed that my gut-chosen core feature was the lowest-RICE of the three MVP items. Rather than invalidating the choice, it taught me to separate 'highest score' from 'most strategic' — and to state that trade-off explicitly.",
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
          className="p-6 md:p-8 rounded-xl bg-zinc-900 text-white"
        >
          <p className="text-sm font-bold mb-2">What this taught me about being a PM</p>
          <p className="text-sm leading-relaxed opacity-80">
            <strong className="opacity-100">Out of scope is a product decision, not a limitation.</strong>{" "}
            The strongest part of this project wasn't the features I included — it was being able to defend
            every feature I cut. And using AI well means using it to move faster on the mechanical work,
            so I can spend more judgment on the decisions only a human should make.
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
            <p className="text-sm text-zinc-500">Want the full document?</p>
            <p className="text-xs text-zinc-400 mt-0.5">Includes all user stories, acceptance criteria, and roadmap.</p>
          </div>
          <a
            href="/TravelWise_AI_Case_Study.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-zinc-900 text-white text-sm font-bold hover:bg-zinc-700 transition-colors"
          >
            View Full PRD
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 11l5 5 5-5M12 4v12" />
            </svg>
          </a>
        </motion.div>

        {/* Bottom spacing */}
        <div className="pb-16 md:pb-24" />
      </div>
    </div>
  );
}
