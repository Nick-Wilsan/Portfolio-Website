import { motion } from "motion/react";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TravelWiseCase from "./pages/TravelWiseCase";

// ─── Icons (inline SVG to remove lucide dependency from this file) ────────────

const IconArrow = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);
const IconCheck = ({ active }: { active: boolean }) => (
  <svg className={`shrink-0 mt-0.5 ${active ? "text-emerald-500" : "text-zinc-300"}`} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
    <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
    <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/>
  </svg>
);
const IconBrain = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);
const IconGlobe = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
  </svg>
);
const IconMenu = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const IconX = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// ─── Shared label style ────────────────────────────────────────────────────────

const SectionLabel = ({ children }: { children: string }) => (
  <p className="text-xs font-semibold tracking-[0.05em] uppercase text-zinc-500 mb-2">
    {children}
  </p>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { label: "About", href: "#about" },
    { label: "Case Studies", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
      <div className="flex justify-between items-center max-w-[1280px] mx-auto px-5 md:px-20 py-4">
        <a href="#" className="text-xl font-bold tracking-tight text-zinc-900 hover:opacity-75 transition-opacity font-display">
          PM Trainee Portfolio
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.label} href={l.href}
              className="text-sm font-semibold text-zinc-600 hover:text-zinc-900 transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#contact"
            className="ml-4 bg-zinc-900 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-emerald-500 transition-colors">
            Let's Build
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-zinc-900">
          {isOpen ? <IconX /> : <IconMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 w-full bg-white border-b border-zinc-200 py-6 px-5 flex flex-col gap-5 shadow-sm"
        >
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setIsOpen(false)}
              className="text-sm font-semibold text-zinc-600 hover:text-zinc-900 transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setIsOpen(false)}
            className="text-center bg-zinc-900 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-emerald-500 transition-colors">
            Let's Build
          </a>
        </motion.div>
      )}
    </nav>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────

const Hero = () => (
  <section id="hero" className="max-w-[1280px] mx-auto px-5 md:px-20 pt-36 md:pt-44 pb-[120px] flex flex-col items-start gap-8">
    <SectionLabel>PRODUCT MANAGEMENT TRAINEE AT HARISENIN.COM</SectionLabel>

    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="font-display text-[2.75rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] font-extrabold leading-[1.1] tracking-[-0.02em] text-zinc-900 max-w-4xl"
    >
      Turning User Problems{" "}
      <span className="text-zinc-300">into</span>{" "}
      Product Decisions.
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
      className="text-lg leading-7 text-zinc-600 max-w-2xl"
    >
      Information Systems student at Universitas Brawijaya with hands-on experience in Product Management,
      user research, and AI-augmented workflows.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      className="flex flex-wrap gap-4 mt-2"
    >
      <a href="#projects"
        className="flex items-center gap-2 bg-zinc-900 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-emerald-500 transition-colors shadow-sm">
        View Portfolio <IconArrow />
      </a>
      <a href="#contact"
        className="flex items-center gap-2 bg-transparent border border-zinc-200 text-zinc-900 px-8 py-4 rounded-full text-base font-semibold hover:border-emerald-500 hover:text-emerald-500 transition-colors">
        Start a Conversation
      </a>
    </motion.div>
  </section>
);

// ─── Background ───────────────────────────────────────────────────────────────

const Background = () => (
  <section id="about" className="bg-slate-50 py-[120px] border-y border-zinc-200">
    <div className="max-w-[1280px] mx-auto px-5 md:px-20 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6">
      <div className="md:col-span-4">
        <h2 className="font-display text-[2rem] md:text-[2.5rem] font-bold tracking-tight text-zinc-900 relative inline-block">
          Background
          <span className="absolute -bottom-2 left-0 w-12 h-[3px] bg-zinc-900 block" />
        </h2>
      </div>

      <div className="md:col-span-8 flex flex-col gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <h3 className="font-display text-[1.5rem] font-semibold leading-8 text-zinc-900">
            Information Systems student at Universitas Brawijaya with hands-on experience in
            Product Management, user research, and AI-augmented workflows.
          </h3>
          <p className="text-base leading-6 text-zinc-600">
            I specialize in evidence-based product thinking — from conducting user research and
            defining problems, to scoping MVPs and writing requirements engineers can actually
            build to. Currently advancing through an intensive PM bootcamp at Harisenin.com.
          </p>
          <p className="text-base leading-6 text-zinc-600">
            My edge: I integrate AI tools into every stage of the PM workflow, and I bring enough
            technical depth to write ML-informed acceptance criteria — not just feature wishlists.
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

// ─── TravelWise card thumbnail ────────────────────────────────────────────────

const TravelWiseThumbnail = () => (
  <div className="h-64 bg-zinc-900 relative overflow-hidden flex items-center justify-center p-6">
    <div className="w-full h-full border border-white/10 rounded-lg p-4 flex flex-col gap-2 relative">
      {/* Route labels */}
      <div className="flex justify-between items-center text-white/40 text-[10px] font-semibold tracking-[0.15em] uppercase">
        <span>SURABAYA</span>
        <span>DESTINATION</span>
      </div>
      {/* Arc SVG */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6">
        <svg width="100%" height="60" viewBox="0 0 400 60" preserveAspectRatio="none">
          <path d="M 30 50 Q 200 5 370 30" fill="none" stroke="#10B981" strokeDasharray="5 4" strokeWidth="2" />
          <circle cx="30" cy="50" r="4" fill="#10B981" />
          <circle cx="370" cy="30" r="4" fill="#10B981" />
        </svg>
      </div>
      {/* Stats */}
      <div className="mt-auto grid grid-cols-3 gap-2 text-white">
        {[
          { num: "96.7%", label: "DON'T BUY FROM FIRST APP" },
          { num: "100%",  label: "BUYER'S REMORSE" },
          { num: "~2M",   label: "EST. TRANSACTIONS/YR" },
        ].map((s) => (
          <div key={s.num}>
            <div className="font-display text-xl font-bold">{s.num}</div>
            <div className="text-[8px] text-white/40 uppercase tracking-wide leading-tight mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Projects (Selected Works) ────────────────────────────────────────────────

const Projects = () => (
  <section id="projects" className="py-[120px] max-w-[1280px] mx-auto px-5 md:px-20">
    <div className="mb-10">
      <SectionLabel>CASE STUDIES</SectionLabel>
      <h2 className="font-display text-[2.75rem] md:text-[4rem] font-extrabold tracking-[-0.02em] text-zinc-900">
        Selected Works
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* TravelWise AI */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-slate-50 rounded-xl border border-zinc-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
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
              AI-powered multi-modal travel aggregator — PRD, market research, RICE prioritization,
              and go-to-market strategy for Harisenin.com bootcamp.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Product Manager", "Research", "PRD", "AI"].map((t) => (
                <span key={t} className="text-[11px] font-semibold tracking-wider uppercase bg-zinc-100 text-zinc-700 border border-zinc-200 px-3 py-1 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Link>
      </motion.article>

      {/* ReStylo */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-slate-50 rounded-xl border border-zinc-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
      >
        <div className="h-64 bg-zinc-900 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-white rounded-full" />
          </div>
          <p className="font-display text-6xl font-bold text-white/20 select-none">RS</p>
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
            Academic project focusing on business case design, market trend analysis, and strategic KPI definition.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Business Case", "Analysis", "Strategy"].map((t) => (
              <span key={t} className="text-[11px] font-semibold tracking-wider uppercase bg-zinc-100 text-zinc-700 border border-zinc-200 px-3 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.article>
    </div>
  </section>
);

// ─── Experience & Education ───────────────────────────────────────────────────

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
      <div className="max-w-[1280px] mx-auto px-5 md:px-20 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6">
        <div className="md:col-span-4">
          <h2 className="font-display text-[2rem] md:text-[2.5rem] font-bold leading-tight text-zinc-900 md:sticky md:top-32">
            Experience &<br className="hidden md:block" /> Education
          </h2>
        </div>

        <div className="md:col-span-8 relative border-l border-zinc-200 pl-8 md:pl-12 ml-2 md:ml-0 flex flex-col gap-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className={`absolute -left-[41px] md:-left-[57px] top-1.5 w-4 h-4 rounded-full z-10 ${
                exp.active
                  ? "bg-white border-2 border-zinc-900"
                  : "bg-white border-2 border-zinc-300"
              }`} />

              <p className="text-xs font-semibold tracking-[0.05em] uppercase text-zinc-500 mb-2">
                {exp.period}
              </p>
              <h3 className="font-display text-[1.5rem] font-semibold text-zinc-900 mb-1">
                {exp.role}
              </h3>
              <p className="text-lg font-semibold text-zinc-900 mb-4">{exp.company}</p>
              <ul className="flex flex-col gap-3">
                {exp.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-base text-zinc-600">
                    <IconCheck active={exp.active} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Skills ───────────────────────────────────────────────────────────────────

const Skills = () => {
  const groups = [
    {
      icon: <IconCpu />,
      title: "Technical Skills",
      skills: [
        "Product Management", "PRD Writing", "Business Case Development",
        "Market Research", "Agile Methodology",
        "Wireframing & Prototyping (Figma, Adobe XD)", "Basic Programming (HTML, CSS, JS)",
      ],
    },
    {
      icon: <IconBrain />,
      title: "Soft Skills",
      skills: [
        "Analytical Thinking", "Problem Solving", "Cross-functional Communication",
        "Time Management", "Adaptability", "Detail-Oriented",
      ],
    },
    {
      icon: <IconGlobe />,
      title: "Languages",
      skills: ["Indonesian (Native)", "English (Intermediate/Advanced)"],
    },
  ];

  return (
    <section id="skills" className="py-[120px] max-w-[1280px] mx-auto px-5 md:px-20">
      <div className="mb-12">
        <SectionLabel>EXPERTISE</SectionLabel>
        <h2 className="font-display text-[2.75rem] md:text-[4rem] font-extrabold tracking-[-0.02em] text-zinc-900">
          Skills & Tools
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
        {groups.map((group, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-slate-50 border border-zinc-200 flex items-center justify-center text-zinc-900">
                {group.icon}
              </div>
              <h3 className="font-display text-[1.5rem] font-semibold text-zinc-900">{group.title}</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {group.skills.map((s) => (
                <span key={s} className="text-xs font-semibold tracking-wide uppercase bg-slate-50 text-zinc-900 border border-zinc-200 px-4 py-2 rounded">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// ─── Contact ──────────────────────────────────────────────────────────────────

const Contact = () => {
  const contactItems = [
    { icon: <IconMail />,     label: "EMAIL",    value: "wilsannick55@gmail.com" },
    { icon: <IconPhone />,    label: "PHONE",    value: "081249730818" },
    { icon: <IconLocation />, label: "LOCATION", value: "Malang / Jakarta, Indonesia" },
  ];

  return (
    <section id="contact" className="bg-slate-50 py-[120px] border-t border-zinc-200">
      <div className="max-w-[1280px] mx-auto px-5 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-[2.75rem] md:text-[4rem] font-extrabold tracking-[-0.02em] text-zinc-900 mb-6">
            Let's build
          </h2>
          <p className="text-lg leading-7 text-zinc-600 mb-12 max-w-sm">
            Open for product internships, strategic collaborations, or discussions about the
            intersection of IS and PM.
          </p>
          <div className="flex flex-col gap-6">
            {contactItems.map((item) => (
              <div key={item.label} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-900 group-hover:border-emerald-500 group-hover:text-emerald-500 transition-colors shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-[0.05em] uppercase text-zinc-500 mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-lg font-semibold text-zinc-900">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-zinc-200 self-start">
          <form action="https://formspree.io/f/xvzvbqgw" method="POST" className="flex flex-col gap-6">
            <div>
              <label className="block text-xs font-semibold tracking-[0.05em] uppercase text-zinc-500 mb-2">
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
            <button
              type="submit"
              className="w-full bg-zinc-900 text-white py-4 rounded-lg text-base font-semibold flex items-center justify-center gap-2 hover:bg-emerald-500 transition-colors tracking-wide"
            >
              SEND MESSAGE <IconSend />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────

const Footer = () => (
  <footer className="bg-slate-50 border-t border-zinc-200 py-6">
    <div className="flex flex-col md:flex-row justify-between items-center max-w-[1280px] mx-auto px-5 md:px-20 gap-4">
      <p className="font-display text-xl font-bold text-zinc-900 tracking-tight">
        NICK WILSAN
      </p>
      <p className="text-xs font-semibold tracking-[0.05em] uppercase text-zinc-500 text-center">
        © 2024 Product Management Portfolio. Built with strategic focus.
      </p>
      <div className="flex gap-6">
        {[
          { href: "https://linkedin.com/in/nick-wilsan", label: "LinkedIn" },
          { href: "https://behance.net/oryzasativaporto", label: "Behance" },
          { href: "mailto:wilsannick55@gmail.com", label: "Email" },
        ].map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
            className="text-xs font-semibold tracking-[0.05em] uppercase text-zinc-500 hover:text-emerald-500 transition-colors">
            {l.label}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="bg-white text-zinc-900 selection:bg-emerald-500 selection:text-white">
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
        } />
        <Route path="/case/travelwise" element={<TravelWiseCase />} />
      </Routes>
    </BrowserRouter>
  );
}
