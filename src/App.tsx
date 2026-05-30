/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  ArrowRight, 
  Check, 
  Mail, 
  MapPin, 
  Send, 
  Linkedin, 
  Download,
  ExternalLink,
  Phone,
  Layout,
  Code,
  Figma,
  Cpu,
  Zap,
  Globe,
  Briefcase,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TravelWiseCase from "./pages/TravelWiseCase";
import travelwiseCover from "./assets/travelwise-cover.svg";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = ["About", "Projects", "Experience", "Skills", "Contact"];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-zinc-100">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-8 py-4 md:py-6">
        <div className="text-lg font-bold tracking-tighter text-zinc-900">
          Nick Wilsan
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {navItems.map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors duration-300 font-medium"
            >
              {item}
            </a>
          ))}
          <a 
            href="https://drive.google.com/file/d/1D5LhKvryphWln2RgZ449tl2pWoVg8FXj/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-all flex items-center gap-2"
          >
            Download CV <Download size={16} />
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="md:hidden p-2 -mr-2 text-zinc-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 w-full bg-white border-b border-zinc-100 py-6 px-6 shadow-xl shadow-black/5 flex flex-col gap-6"
        >
          {navItems.map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm uppercase tracking-widest text-zinc-600 hover:text-black font-medium"
            >
              {item}
            </a>
          ))}
          <a 
            href="https://drive.google.com/file/d/1D5LhKvryphWln2RgZ449tl2pWoVg8FXj/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-6 py-3.5 rounded-xl text-sm font-bold hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 mt-2"
          >
            Download CV <Download size={16} />
          </a>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="min-h-[100svh] flex flex-col justify-center px-6 md:px-8 pt-28 pb-16 max-w-7xl mx-auto overflow-hidden">
      <div className="text-left">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl"
        >
          <span className="text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-zinc-400 mb-6 md:mb-8 block font-bold leading-relaxed">
            Product Management Trainee at Harisenin.com
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold leading-[1.1] md:leading-[0.85] tracking-tighter mb-8 md:mb-10 text-black">
            Bridging Systems <br className="hidden md:block" /> 
            <span className="text-zinc-300 md:inline block">&</span> Product Strategy.
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl text-zinc-500 leading-relaxed mb-10 md:mb-12">
            Information Systems Student at Universitas Brawijaya. Synthesizing technical architecture with human-centric product management to build the next generation of digital solutions.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 items-start sm:items-center">
            <a 
              href="#projects"
              className="w-full sm:w-auto justify-center bg-black text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold tracking-tight flex items-center gap-3 hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95 text-sm md:text-base"
            >
              View Portfolio
              <ArrowRight size={20} />
            </a>
            <a 
              href="#contact"
              className="w-full sm:w-auto text-center text-black font-bold text-base md:text-lg hover:underline decoration-2 underline-offset-8 transition-all py-3"
            >
              Start a Conversation
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Background = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-zinc-50 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="col-span-1 md:col-span-4">
            <h2 className="text-3xl font-bold tracking-tight mb-4 md:mb-6">Background</h2>
            <div className="w-16 h-1 bg-black"></div>
          </div>
          <div className="col-span-1 md:col-span-8 lg:col-span-7 lg:col-start-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xl sm:text-2xl md:text-3xl leading-snug text-zinc-800 mb-8 md:mb-10 font-medium tracking-tight">
                I am a detail-oriented Information Systems student at Universitas Brawijaya with a strong foundation in Product Management, UI/UX Design, and Software Engineering.
              </p>
              <div className="space-y-6 text-zinc-500 leading-relaxed text-base sm:text-lg">
                <p>
                  I specialize in crafting PRDs, developing business cases, and translating complex user needs into actionable technical requirements. Currently advancing my skills through an intensive bootcamp at Harisenin.com.
                </p>
                <p>
                  My unique edge lies in the blend of technical fluency—proficient in HTML, CSS, and JavaScript—and a keen eye for design using Figma. This duality allows me to bridge the gap between engineering possibilities and user-centric solutions.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects: {
    title: string;
    description: string;
    year: string;
    image: string | null;
    large: boolean;
    link?: string;
  }[] = [
    {
      title: "TravelWise AI",
      description: "AI-powered multi-modal travel aggregator — PRD, market research, RICE prioritization, and go-to-market strategy for Harisenin.com bootcamp.",
      year: "2026",
      image: travelwiseCover,
      large: true,
      link: "/case/travelwise"
    },
    {
      title: "ReStylo Application",
      description: "Academic project focusing on business case design, market trend analysis, and strategic KPI definition.",
      year: "2026",
      image: null,
      large: false
    }
  ];

  return (
    <section id="projects" className="py-20 md:py-32 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-widest text-zinc-400 mb-4 block font-bold">Case Studies</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">Selected Works</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-12">
          {projects.map((project, index) => {
            const cardContent = (
              <>
                <div className="bg-zinc-100 rounded-[2rem] overflow-hidden mb-6 relative aspect-[4/3] lg:aspect-auto lg:h-[550px] border border-zinc-100">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-900 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-[0.07]">
                        <div className="absolute top-10 left-10 w-40 h-40 border-2 border-white rounded-full" />
                        <div className="absolute bottom-10 right-10 w-56 h-56 border-2 border-white rounded-full" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-white rounded-3xl rotate-12" />
                        <div className="absolute top-1/4 right-1/4 w-20 h-20 border-2 border-white rounded-full" />
                      </div>
                      <p className="text-8xl font-black text-white/10 tracking-tighter select-none z-10">RS</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                    <span className="bg-white text-black px-6 md:px-8 py-3 rounded-full font-bold flex items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-sm md:text-base">
                      {project.link ? "View Case Study" : "Coming Soon"} <ExternalLink size={18} />
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 px-2">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-zinc-500 transition-colors tracking-tight">{project.title}</h3>
                    <p className="text-zinc-500 max-w-lg text-base md:text-lg leading-relaxed">{project.description}</p>
                  </div>
                  <span className="text-xs md:text-sm font-bold text-black bg-zinc-100 px-4 py-2 rounded-full whitespace-nowrap">{project.year}</span>
                </div>
              </>
            );

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`col-span-1 ${project.large ? 'lg:col-span-8' : 'lg:col-span-4'} group cursor-pointer`}
              >
                {project.link ? (
                  <Link to={project.link} className="block w-full h-full">
                    {cardContent}
                  </Link>
                ) : (
                  <div className="block w-full h-full">
                    {cardContent}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const experiences = [
    {
      type: "EDUCATION",
      role: "Bachelor of Information Systems",
      company: "Universitas Brawijaya",
      period: "Aug 2024 — Present",
      achievements: [
        "Current GPA: 3.69 / 4.00 (Expected Graduation: Dec 2027)",
        "Relevant Courseworks: System Analysis and Design, Requirements Engineering, User Interface Design, Programming & Algorithm."
      ]
    },
    {
      type: "EXPERIENCE",
      role: "Product Manager Trainee",
      company: "Harisenin.com",
      period: "Feb 2026 — Present",
      achievements: [
        "Developed comprehensive PRDs across multiple bootcamp missions, detailing product vision, user personas, and technical requirements.",
        "Formulated go-to-market strategies and structured business models to ensure market fit and clear monetization paths.",
        "Conducted market research and competitor analysis to identify feature gaps and propose data-driven improvements."
      ]
    },
    {
      type: "EXPERIENCE",
      role: "Logistics Staff",
      company: "University Event Committees",
      period: "Jan 2022 — Feb 2023",
      achievements: [
        "Coordinated logistics, equipment, and resource management for 2 major university events.",
        "Collaborated with cross-functional committee divisions to optimize resource allocation and troubleshoot bottlenecks."
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 md:py-32 bg-zinc-50 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8 lg:mb-12 lg:sticky lg:top-32">Experience & <br className="hidden lg:block"/>Education</h2>
          </div>
          <div className="col-span-1 lg:col-span-8">
            <div className="space-y-16 md:space-y-24 relative before:content-[''] before:absolute before:left-[1px] md:before:left-[1px] before:top-2 before:bottom-0 before:w-[1px] before:bg-zinc-200">
              {experiences.map((exp, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="pl-8 md:pl-16 relative"
                >
                  <div className={`absolute left-0 top-2 w-[4px] h-8 md:h-12 ${exp.type === 'EDUCATION' ? 'bg-black' : 'bg-zinc-300'}`}></div>
                  <span className="text-[10px] md:text-xs font-bold tracking-widest text-zinc-400 block mb-2 md:mb-3 uppercase">{exp.period}</span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">{exp.role}</h3>
                  <p className="text-lg md:text-xl text-zinc-800 font-semibold mb-6 md:mb-8">{exp.company}</p>
                  <ul className="space-y-4 md:space-y-5">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3 md:gap-4 text-zinc-500 leading-relaxed text-base md:text-lg">
                        <Check size={20} className="mt-1 flex-shrink-0 text-black" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skillGroups = [
    {
      title: "Technical Skills",
      icon: <Cpu size={24} />,
      skills: ["Product Management", "PRD Writing", "Business Case Development", "Market Research", "Agile Methodology", "Wireframing & Prototyping (Figma, Adobe XD)", "Basic Programming (HTML, CSS, JS)"]
    },
    {
      title: "Soft Skills",
      icon: <Zap size={24} />,
      skills: ["Analytical Thinking", "Problem Solving", "Cross-functional Communication", "Time Management", "Adaptability", "Detail-Oriented"]
    },
    {
      title: "Languages",
      icon: <Globe size={24} />,
      skills: ["Indonesian (Native)", "English (Intermediate/Advanced)"]
    }
  ];

  return (
    <section id="skills" className="py-20 md:py-32 px-6 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-widest text-zinc-400 mb-4 block font-bold">Expertise</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">Skills & Tools</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {skillGroups.map((group, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="flex items-center gap-4 text-black">
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center flex-shrink-0">
                  {group.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {group.skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 md:px-4 md:py-2 bg-zinc-50 text-zinc-600 rounded-lg text-xs md:text-sm font-medium border border-zinc-100 hover:border-black transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-32 px-6 md:px-8 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="col-span-1 lg:col-span-5">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1] md:leading-[0.85] tracking-tighter mb-8 md:mb-10">
              Let’s build <br className="hidden sm:block"/>the vision.
            </h2>
            <p className="text-lg md:text-xl text-zinc-500 mb-10 md:mb-12 max-w-md leading-relaxed">
              Open for product internships, strategic collaborations, or discussions about the intersection of IS and PM.
            </p>
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center gap-4 md:gap-6 group cursor-pointer">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all shadow-sm flex-shrink-0">
                  <Mail size={20} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">Email</p>
                  <span className="text-base md:text-lg font-bold text-zinc-800 break-all">wilsannick55@gmail.com</span>
                </div>
              </div>
              <div className="flex items-center gap-4 md:gap-6 group cursor-pointer">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all shadow-sm flex-shrink-0">
                  <Phone size={20} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">Phone</p>
                  <span className="text-base md:text-lg font-bold text-zinc-800">081249730818</span>
                </div>
              </div>
              <div className="flex items-center gap-4 md:gap-6 group cursor-pointer">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all shadow-sm flex-shrink-0">
                  <MapPin size={20} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">Location</p>
                  <span className="text-base md:text-lg font-bold text-zinc-800">Malang / Jakarta, Indonesia</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-span-1 lg:col-span-7">
            <form action="https://formspree.io/f/xvzvbqgw" method="POST" className="space-y-6 md:space-y-8 bg-white p-6 sm:p-10 md:p-14 rounded-3xl md:rounded-[2.5rem] shadow-xl shadow-zinc-200/50 border border-zinc-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                <div className="space-y-2 md:space-y-3">
                  <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 ml-1">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full bg-zinc-50 border-none rounded-xl md:rounded-2xl p-4 md:p-5 focus:bg-white focus:ring-2 focus:ring-black transition-all outline-none text-base md:text-lg"
                  />
                </div>
                <div className="space-y-2 md:space-y-3">
                  <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 ml-1">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="w-full bg-zinc-50 border-none rounded-xl md:rounded-2xl p-4 md:p-5 focus:bg-white focus:ring-2 focus:ring-black transition-all outline-none text-base md:text-lg"
                  />
                </div>
              </div>
              <div className="space-y-2 md:space-y-3">
                <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 ml-1">Message</label>
                <textarea 
                  name="message"
                  required
                  placeholder="Tell me about your project..."
                  rows={4}
                  className="w-full bg-zinc-50 border-none rounded-xl md:rounded-2xl p-4 md:p-5 focus:bg-white focus:ring-2 focus:ring-black transition-all outline-none resize-none text-base md:text-lg"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-black text-white py-4 md:py-6 rounded-xl md:rounded-2xl font-bold tracking-widest uppercase hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 md:gap-4 text-sm md:text-lg hover:scale-[1.02] active:scale-95 shadow-lg shadow-black/10"
              >
                Send Message
                <Send size={18} className="md:w-5 md:h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="w-full py-12 md:py-20 bg-white border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-12">
          <div className="text-xl font-bold text-black tracking-tighter">
            NICK WILSAN
          </div>
          <p className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-400 font-bold text-center">
            © 2024 Nick Wilsan Portfolio.
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            <a href="https://linkedin.com/in/nick-wilsan" target="_blank" className="text-zinc-400 hover:text-black transition-all flex items-center gap-2 md:gap-3 text-[10px] md:text-xs uppercase tracking-widest font-bold">
              <Linkedin size={18} className="md:w-5 md:h-5"/> LinkedIn
            </a>
            <a href="https://behance.net/oryzasativaporto" target="_blank" className="text-zinc-400 hover:text-black transition-all flex items-center gap-2 md:gap-3 text-[10px] md:text-xs uppercase tracking-widest font-bold">
              <Layout size={18} className="md:w-5 md:h-5"/> Behance
            </a>
            <a href="mailto:wilsannick55@gmail.com" className="text-zinc-400 hover:text-black transition-all flex items-center gap-2 md:gap-3 text-[10px] md:text-xs uppercase tracking-widest font-bold">
              <Mail size={18} className="md:w-5 md:h-5"/> Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="bg-white font-sans selection:bg-black selection:text-white">
            <Navbar />
            <Hero />
            <Background />
            <Projects />
            <Experience />
            <Skills />
            <Contact />
            <Footer />
          </div>
        } />
        <Route path="/case/travelwise" element={<TravelWiseCase />} />
      </Routes>
    </BrowserRouter>
  );
}
