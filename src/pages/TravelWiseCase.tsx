// TravelWiseCase.tsx
// Drop this file into your src/pages/ or src/components/ folder.
// See INTEGRATION.md for routing setup instructions.

import { useEffect } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

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

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-8">
      <span className="text-xs font-bold tracking-widest text-neutral-400 uppercase">{number}</span>
      <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-1">{title}</h2>
    </div>
  );
}

function Divider() {
  return <div className="border-t border-neutral-200 dark:border-neutral-800 my-16" />;
}

function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, string> = {
    Critical: "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400",
    High: "bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
    Medium: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
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
  children: React.ReactNode;
}) {
  const map = {
    blue: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300",
    amber: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300",
    violet: "bg-violet-50 dark:bg-violet-950/40 border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300",
    green: "bg-green-50 dark:bg-green-950/40 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300",
  };
  return (
    <div className={`rounded-xl border p-5 my-6 ${map[color]}`}>
      <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-70">{label}</p>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function TravelWiseCase() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
          ← Back to Projects
        </Link>
      </div>

      {/* ── HERO ── */}
      <div className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-500">
              Product Management
            </span>
            <span className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-500">
              Case Study
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
            TravelWise AI
          </h1>
          <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
            Designing an AI-powered multi-modal travel aggregator that helps Indonesian students 
            stop juggling 3+ apps to book a single trip home.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-neutral-200 dark:border-neutral-800">
            {[
              { k: "Role", v: "Product Manager (Solo)" },
              { k: "Timeline", v: "Feb – Apr 2026" },
              { k: "Context", v: "Harisenin.com Bootcamp" },
              { k: "Scope", v: "Research · Strategy · PRD" },
            ].map((item) => (
              <div key={item.k}>
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">{item.k}</p>
                <p className="text-sm font-medium">{item.v}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a 
              href="/TravelWise_AI_Case_Study.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-6 py-3 rounded-full font-bold text-sm hover:opacity-90 transition-opacity"
            >
              View Full PRD Document
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">

        {/* ── 01 CONTEXT & PROBLEM ── */}
        <SectionLabel number="01" title="Context & Problem" />

        <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
          Booking a trip home should take minutes. For <em>mahasiswa rantau</em> — students studying away from hometown — 
          it takes hours and still ends in regret. I ran a survey to verify the friction was real before designing anything.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {stats.map((s) => (
            <div
              key={s.value}
              className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900"
            >
              <p className="text-4xl font-black tracking-tight">{s.value}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>

        <Callout color="blue" label="Problem Statement">
          Indonesian students who travel between cities — especially those needing multi-modal connections 
          (train → flight) — waste hours across 3+ separate apps, frequently overpay, and have no single 
          platform that handles cross-modal search and booking end-to-end.
        </Callout>

        <h3 className="text-base font-bold mt-8 mb-4">Why existing solutions fall short</h3>
        <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900">
                {["Platform", "Multi-OTA price", "Cross-modal", "KAI integration", "End-to-end booking"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {competitors.map((c, i) => (
                <tr
                  key={c.name}
                  className={`border-t border-neutral-200 dark:border-neutral-800 ${
                    c.highlight ? "bg-neutral-50 dark:bg-neutral-900 font-semibold" : ""
                  } ${i % 2 === 0 && !c.highlight ? "bg-neutral-50/50 dark:bg-neutral-900/30" : ""}`}
                >
                  <td className="px-4 py-3">{c.name}</td>
                  <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400">{c.price}</td>
                  <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400">{c.modal}</td>
                  <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400">{c.kai}</td>
                  <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400">{c.booking}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Divider />

        {/* ── 02 USER & APPROACH ── */}
        <SectionLabel number="02" title="User & Approach" />

        {/* Persona */}
        <h3 className="text-base font-bold mb-4">Primary persona</h3>
        <div className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 mb-8">
          <div className="grid md:grid-cols-[180px_1fr]">
            <div className="bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 p-6">
              <div className="w-12 h-12 rounded-full bg-white/20 dark:bg-neutral-900/20 flex items-center justify-center text-2xl font-black mb-4">
                R
              </div>
              <p className="text-xl font-black">Raka</p>
              <p className="text-xs mt-1 opacity-70 leading-snug">
                21 · Engineering student, Universitas Brawijaya. From Banjarmasin, studying in Malang.
              </p>
              <p className="text-xs mt-4 italic opacity-60 leading-relaxed border-t border-white/20 dark:border-neutral-900/20 pt-3">
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
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">{row.k}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{row.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Journey */}
        <h3 className="text-base font-bold mb-4">Current journey — where it breaks</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {journeySteps.map((s) => (
            <div
              key={s.phase}
              className="p-3 rounded-lg border-t-2 border-red-400 bg-red-50 dark:bg-red-950/20"
            >
              <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-1">{s.phase}</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-2 leading-snug">{s.action}</p>
              <p className="text-xs italic text-red-500 dark:text-red-400 leading-snug">{s.feel}</p>
            </div>
          ))}
        </div>

        {/* AI Workflow */}
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

        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
          I scored every candidate feature with <strong className="text-neutral-900 dark:text-neutral-100">RICE</strong> — 
          Reach × Impact × Confidence ÷ Effort — to get a defensible basis for scoping the MVP.
        </p>

        <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800 mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900">
                {["Feature", "Reach", "Impact", "Conf.", "Effort", "RICE", "Decision"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {riceData.map((r, i) => (
                <tr
                  key={r.feature}
                  className={`border-t border-neutral-200 dark:border-neutral-800 ${
                    i % 2 === 0 ? "bg-neutral-50/50 dark:bg-neutral-900/30" : ""
                  }`}
                >
                  <td className="px-4 py-3 font-medium">{r.feature}</td>
                  <td className="px-4 py-3 text-neutral-500">{r.reach}</td>
                  <td className="px-4 py-3 text-neutral-500">{r.impact}</td>
                  <td className="px-4 py-3 text-neutral-500">{r.conf}</td>
                  <td className="px-4 py-3 text-neutral-500">{r.effort}</td>
                  <td className="px-4 py-3 font-black text-neutral-900 dark:text-neutral-100">{r.score}</td>
                  <td className="px-4 py-3">
                    {r.mvp ? (
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400">
                        MVP
                      </span>
                    ) : (
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-400 dark:bg-neutral-800">
                        Phase 2
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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

        <h3 className="text-base font-bold mb-4">User stories</h3>
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden mb-8">
          {userStories.map((s, i) => (
            <div
              key={s.id}
              className={`flex items-center gap-4 px-5 py-4 ${
                i < userStories.length - 1 ? "border-b border-neutral-200 dark:border-neutral-800" : ""
              } ${i % 2 === 0 ? "bg-neutral-50/50 dark:bg-neutral-900/30" : ""}`}
            >
              <span className="text-xs font-mono font-bold text-neutral-400 w-12 shrink-0">{s.id}</span>
              <span className="text-sm flex-1">{s.story}</span>
              <PriorityBadge priority={s.priority} />
            </div>
          ))}
        </div>

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

        <h3 className="text-base font-bold mt-8 mb-4">Success metrics</h3>
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
          {metrics.map((m, i) => (
            <div
              key={m.metric}
              className={`grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-4 items-center ${
                i < metrics.length - 1 ? "border-b border-neutral-200 dark:border-neutral-800" : ""
              } ${i % 2 === 0 ? "bg-neutral-50/50 dark:bg-neutral-900/30" : ""}`}
            >
              <span className="text-sm">
                {m.metric}
                {m.star && (
                  <span className="ml-2 text-xs font-bold px-2 py-0.5 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900">
                    North Star
                  </span>
                )}
              </span>
              <span className="text-sm font-bold text-right">{m.target}</span>
              <span className="text-xs text-neutral-400 text-right hidden md:block">{m.method}</span>
            </div>
          ))}
        </div>

        <Divider />

        {/* ── 05 OUTCOME & REFLECTION ── */}
        <SectionLabel number="05" title="Outcome & Reflection" />

        <Callout color="green" label="Honest framing">
          This was a research-and-design deliverable, not a launched product. The points below are 
          validated learning and a concrete validation plan — not live performance metrics. I'd rather 
          show honest reasoning than invent numbers.
        </Callout>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mt-6 mb-8">
          A 96.7% problem-confirmation rate across 30 respondents — for a pain point this specific — 
          is a strong signal to continue to solution design. The fragmentation and multi-modal pains 
          are real and currently unserved by any major player in Indonesia.
        </p>

        <h3 className="text-base font-bold mb-4">What I'd do differently</h3>
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
            <Callout key={item.label} color={item.color} label={item.label}>
              {item.text}
            </Callout>
          ))}
        </div>

        <div className="p-6 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900">
          <p className="text-sm font-bold mb-2">What this taught me about being a PM</p>
          <p className="text-sm leading-relaxed opacity-80">
            <strong className="opacity-100">Out of scope is a product decision, not a limitation.</strong>{" "}
            The strongest part of this project wasn't the features I included — it was being able to defend 
            every feature I cut. And using AI well means using it to move faster on the mechanical work, 
            so I can spend more judgment on the decisions only a human should make.
          </p>
        </div>

        <Divider />

        {/* ── CTA ── */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Want the full document?</p>
            <p className="text-xs text-neutral-400 mt-0.5">Includes all user stories, acceptance criteria, and roadmap.</p>
          </div>
          <a
            href="/TravelWise_AI_Case_Study.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-bold hover:opacity-80 transition-opacity"
          >
            View Full PRD
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 11l5 5 5-5M12 4v12" />
            </svg>
          </a>
        </div>

      </div>
    </div>
  );
}
