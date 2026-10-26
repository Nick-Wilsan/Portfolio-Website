import type { CSSProperties, ReactNode } from "react";
import VideoFilm from "./VideoFilm";

// Each product carries its own color, taken from its logo, while the site
// chrome stays Nick's green. Two shades per brand because the pure logo color
// is too dark for small text on the dark page (red #d91920 is ~3.8:1):
//   accent / accentInk / accentSoft / onAccent → text, pills, buttons on dark
//   light.*      → the same roles on the white page (darker shades)
//   mat / matInk → the large brand-colored surface around the film
//   glow         → the light it spreads behind itself, so color fades into the
//                  page instead of sitting on it like a sticker
type Tones = { accent: string; accentInk: string; accentSoft: string; onAccent: string };
export type Brand = Tones & {
  light: Tones;
  mat: string;
  matInk: string;
  glow: string;
};

const HONGFU: Brand = {
  accent: "#6cbfe8",
  accentInk: "#9ad6f2",
  accentSoft: "#0e2430",
  onAccent: "#04121c",
  light: { accent: "#1d6fa3", accentInk: "#165a85", accentSoft: "#e3f1fa", onAccent: "#ffffff" },
  mat: "linear-gradient(135deg, #3f9fd0, #4fbfa6)",
  matInk: "#04121c",
  glow: "rgba(63, 159, 208, 0.34)",
};

const AKA: Brand = {
  accent: "#ff6066",
  accentInk: "#ff9a9e",
  accentSoft: "#2b1012",
  onAccent: "#1a0405",
  light: { accent: "#c8161d", accentInk: "#a31218", accentSoft: "#fde7e8", onAccent: "#ffffff" },
  mat: "linear-gradient(135deg, #d91920, #b5121a)",
  matInk: "#ffffff",
  glow: "rgba(217, 25, 32, 0.34)",
};

// The PM case studies, colored after their own documents: TravelWise royal
// blue, Round-Up emerald (kept deeper than the site green).
export const TRAVELWISE: Brand = {
  accent: "#7d9bf0",
  accentInk: "#a9bdf6",
  accentSoft: "#101a38",
  onAccent: "#050b1f",
  light: { accent: "#2852c9", accentInk: "#1f43a8", accentSoft: "#e6ecfc", onAccent: "#ffffff" },
  mat: "linear-gradient(135deg, #2858d0, #3d63db)",
  matInk: "#ffffff",
  glow: "rgba(40, 88, 208, 0.30)",
};

export const ROUNDUP: Brand = {
  accent: "#4fd1a1",
  accentInk: "#8ce5c2",
  accentSoft: "#0c2a1f",
  onAccent: "#03140d",
  light: { accent: "#167a55", accentInk: "#10603f", accentSoft: "#e2f5ec", onAccent: "#ffffff" },
  mat: "linear-gradient(135deg, #1f7a58, #2fa77b)",
  matInk: "#03140d",
  glow: "rgba(47, 167, 123, 0.28)",
};

// Hands a brand's shades to one element. Pair with className "brand": the
// stylesheet (.v2 .brand) picks the light or dark set for the current theme.
export const brandStyle = (b: Brand) =>
  ({
    "--bd-accent": b.accent,
    "--bd-accent-ink": b.accentInk,
    "--bd-accent-soft": b.accentSoft,
    "--bd-on-accent": b.onAccent,
    "--bl-accent": b.light.accent,
    "--bl-accent-ink": b.light.accentInk,
    "--bl-accent-soft": b.light.accentSoft,
    "--bl-on-accent": b.light.onAccent,
  }) as CSSProperties;

// Every shipped product, used by both the homepage (summary fields) and its
// own page at /v2/projects/:slug (detail fields).
//
// To add a product: append an entry, with its video in `film` through
// <VideoFilm> (muted H.264 MP4 + poster in public/work).
//
// Keep client data out of here: no customer names, prices, or formulas.

export type Project = {
  slug: string;
  name: string;
  status: string;
  oneLiner: string;
  role: string;
  did: string[];
  stack: string[];
  brand: Brand;
  film: ReactNode;
  link?: { href: string; label: string };
  detail: {
    facts: { label: string; value: string }[];
    problem: { lead: string; body: string; before: string[] };
    users: { role: string; does: string }[];
    flow: { title: string; body: string }[];
    decisions: { call: string; why: string }[];
    quality: { lead: string; points: string[] };
    status: string;
    learned: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "hongfu-system",
    name: "Hongfu System",
    status: "Client pilot, 2026",
    oneLiner:
      "A production and warehouse system for a liquid manufacturer in Batam. Every drum gets a unique QR, every move is a scan, and accounting stays in Accurate Online.",
    role: "Freelance, solo: requirements, design, build. 300+ commits in the first month.",
    did: [
      "Mapped the factory's paper flow (work orders, material requests) into one production plan",
      "Designed QR labels and an offline-capable scan flow for the warehouse",
      "Integrated with Accurate Online behind a Super Admin approval step",
    ],
    stack: ["Next.js", "PostgreSQL", "Drizzle", "Accurate API"],
    brand: HONGFU,
    // Made in Remotion. The web copy is a muted, compressed H.264 MP4 (see
    // public/work). A VP9 WebM from Remotion's ffmpeg failed to decode in
    // Chrome, so MP4 is the only source.
    film: (
      <VideoFilm
        label="Hongfu System"
        mat={{ bg: HONGFU.mat, ink: HONGFU.matInk }}
        mp4="/work/hongfu-film.mp4"
        poster="/work/hongfu-film-poster.jpg"
        chapters={[
          { caption: "The warehouse, before", start: 0 },
          // Starts sit just past each dip-to-black, so a jump lands on content
          { caption: "Meet Hongfu System", start: 6.5 },
          { caption: "A unique QR label for every drum", start: 10.6 },
          { caption: "Scan in, scan out", start: 20.6 },
          { caption: "Synced to Accurate Online", start: 30.6 },
          { caption: "Designed & built by Nick Wilsan", start: 39 },
        ]}
      />
    ),
    detail: {
      facts: [
        { label: "Client", value: "Liquid manufacturer (OEM/ODM), Batam" },
        { label: "Role", value: "Freelance, solo: discovery, PRD, design, build, testing" },
        { label: "Timeline", value: "Sep 2026 - now" },
        { label: "Platform", value: "Web app on laptops, phones as scanners" },
      ],
      problem: {
        lead: "The brief was three things: print labels, scan stock, export to Accurate. The real problem was the whole floor.",
        body: "Everything here is made to order. A planner builds tomorrow's production plan by hand, and every department works from paper that copies it. Accounting already lived in Accurate Online, so every number on the floor was typed twice, and nobody could say where a given drum was.",
        before: [
          "A daily production plan built by hand in Excel, one sheet per day, shared the evening before",
          "Up to 72 work orders and about 130 order lines on a busy day",
          "A paper work order form in four colored copies, one per department",
          "Labels made from templates by staff, with no digital record of stock in or out",
        ],
      },
      users: [
        { role: "Planner (PMC)", does: "Calculates formulas, plans production, issues work orders and labels" },
        { role: "Raw material warehouse", does: "Receives, stores and issues materials per container, oldest first" },
        { role: "Supervisor", does: "Approves material requests before anything leaves the warehouse" },
        { role: "Production & QC", does: "Records weighing, lot numbers, machine settings and a QC verdict" },
        { role: "Finished goods warehouse", does: "Scans drums in after production and out against a sales order" },
        { role: "Super Admin", does: "Manages users and approves every document sent to Accurate" },
      ],
      flow: [
        {
          title: "Order in",
          body: "Sales orders sync from Accurate. The app only reads master data there, it never edits it.",
        },
        {
          title: "Plan",
          body: "The formula calculation turns an order into materials needed versus stock, and raises a purchase request when something is short.",
        },
        {
          title: "Materials",
          body: "A material request goes to the supervisor, then the warehouse issues it container by container, each with its own QR.",
        },
        {
          title: "Produce & check",
          body: "The digital work order replaces the paper one: actual weight per container, lot numbers, QC pass or fail.",
        },
        {
          title: "Label",
          body: "One unique QR per drum on the client's existing 100 × 120 mm layout. Reprints need a reason and are logged.",
        },
        {
          title: "Scan & ship",
          body: "Scanning in posts the finished goods to Accurate. Scanning out against a sales order creates the delivery order.",
        },
      ],
      decisions: [
        {
          call: "Complement Accurate, don't replace it",
          why: "Finance already trusted Accurate for costing and invoicing. Replacing it would have turned a factory tool into an accounting migration nobody asked for.",
        },
        {
          call: "Every write to Accurate waits for approval at first",
          why: "I mapped all 15 processes that change Accurate and put approval on the send queue, not on each button. Going live starts with new orders only, so nothing doubles up with what admins typed by hand.",
        },
        {
          call: "Keep the label people already know",
          why: "The layout is measured from the client's own label template. The QR sits in the only empty corner, so nobody had to relearn the label or redesign it.",
        },
        {
          call: "No reprint without a reason",
          why: "A first print is allowed once. After that, reprints go through history with a reason, so two identical QR codes can't quietly end up on two drums.",
        },
        {
          call: "Phones as scanners, offline-capable",
          why: "Not every station has a 2D scanner, and warehouse Wi-Fi drops. A phone camera that keeps scanning offline removes both blockers.",
        },
        {
          call: "Rate limits per login, not per IP",
          why: "Every device in the factory shares one internet address. A per-address limit would have locked out the whole factory at once.",
        },
      ],
      quality: {
        lead: "Factory data that is quietly wrong is worse than no data, so I tested it like an employee would use it.",
        points: [
          "An employee-perspective review found 20+ issues ranked by risk. One example: typing \"1.000\" meant one thousand to staff but was saved as 1 kg. The form now refuses it and asks.",
          "A 13-layer security audit, from login rate limits to request origin checks",
          "Unit, integration and UI tests, with integration runs against a separate Accurate practice company so real books are never touched",
          "A usability script for 3 to 5 employees, one task set per role",
        ],
      },
      status:
        "Built and tested against an Accurate practice company. The switch to the client's real Accurate is built but still locked; the plan is to open it with one small order, then run a two-week trial with approvals on.",
      learned: [
        "Listening to the floor changed the scope more than any feature request. The label turned out to be the last step of a chain, not the product.",
        "Writing into someone else's accounting system is a trust problem before it is an API problem. The approval queue earned more confidence than any demo.",
      ],
    },
  },
  {
    slug: "akamobilindo",
    name: "AkaMobilindo",
    status: "Live on Google Play",
    oneLiner:
      "A mobile showroom for a used-car dealer in Batam. Fixed prices, standard specs, an installment estimate on every car, and direct chat with the showroom.",
    role: "Product owner & solo developer, thesis project.",
    did: [
      "Wrote the PRD from buyer pain points on general marketplaces",
      "Built filters that read from real stock instead of hardcoded options",
      "Turned the showroom's financing formula into an in-app estimator",
    ],
    stack: ["React Native", "Firebase", "FCM", "TypeScript"],
    brand: AKA,
    // Made in Remotion, same pipeline as Hongfu (muted H.264 web copy).
    film: (
      <VideoFilm
        label="AkaMobilindo"
        mat={{ bg: AKA.mat, ink: AKA.matInk }}
        mp4="/work/aka-film.mp4"
        poster="/work/aka-film-poster.jpg"
        chapters={[
          { caption: "Buying a used car online", start: 0 },
          { caption: "Meet AkaMobilindo", start: 6.5 },
          { caption: "Browse every car, no sign-up", start: 8.6 },
          { caption: "Know the monthly before you visit", start: 15.8 },
          { caption: "Ask about the exact car", start: 23.6 },
          { caption: "One link, the exact car", start: 30.2 },
          { caption: "Designed & built by Nick Wilsan", start: 40.2 },
        ]}
      />
    ),
    link: { href: "https://play.google.com/store/apps/details?id=com.akamobilindo", label: "View on Google Play" },
    detail: {
      facts: [
        { label: "Client", value: "Used-car showroom, Batam" },
        { label: "Role", value: "Product owner & solo developer, also my thesis research" },
        { label: "Timeline", value: "May 2026 - now" },
        { label: "Platform", value: "Android, live on Google Play" },
      ],
      problem: {
        lead: "Buying a used car online mostly means guessing.",
        body: "On general marketplaces, first-time buyers face listings with missing details, prices written as placeholders, and sellers who reply days later. The showroom had good cars and fixed prices, but no place that showed them clearly.",
        before: [
          "Listings with short descriptions and no standard spec sheet",
          "Prices hidden or written as \"123456\"",
          "Slow or no replies, with no way to tell if a car was still for sale",
          "No filters or favorites, so buyers drowned in choices",
        ],
      },
      users: [
        { role: "Guest", does: "Browses the full catalog, filters, and estimates installments, no account needed" },
        { role: "Buyer", does: "Saves favorites and chats with the showroom about a specific car" },
        { role: "Admin (staff)", does: "Uploads cars from a phone, answers chats, runs promo banners" },
        { role: "Owner", does: "Manages admin accounts and sees an audit trail of every action" },
      ],
      flow: [
        {
          title: "Upload",
          body: "Staff add a car from their phone in steps: photos, specs, description, review.",
        },
        {
          title: "Find",
          body: "The specs staff fill in become the buyer's filters automatically, so options always match real stock.",
        },
        {
          title: "Estimate",
          body: "Every car shows a monthly installment from the showroom's own formula, with an adjustable down payment and 1 to 5 year terms.",
        },
        {
          title: "Talk",
          body: "Chat opens with the car attached and quick replies ready, with notifications for both buyer and staff.",
        },
        {
          title: "Share",
          body: "One shared link opens the car in the app, or a web page if the app isn't installed, with a preview inside WhatsApp.",
        },
        {
          title: "Reserve & sell",
          body: "Staff switch a car between available, reserved and sold, and every buyer sees the change right away.",
        },
      ],
      decisions: [
        {
          call: "Browse everything without logging in",
          why: "Most buyers arrive from a WhatsApp link. A login wall at that moment pushes them out, so login is only needed for personal things: favorites and chat.",
        },
        {
          call: "One link, three behaviors",
          why: "The same link opens the app, falls back to a generated web page, and shows a photo, title and price preview in WhatsApp. Staff share one thing, every buyer lands somewhere useful.",
        },
        {
          call: "Filters come from the data",
          why: "Filter options are read from the cars actually in stock, so staff never maintain a second list and buyers never filter for something that doesn't exist.",
        },
        {
          call: "One chat room per buyer, car attached per message",
          why: "It keeps the security rule simple and reading a conversation cheap. The trade-off, old messages keep the old price, is actually correct as history.",
        },
        {
          call: "Record where every visit comes from",
          why: "Each car view is tagged with its source (shared link, search, banner, chat) and platform. That is what lets my thesis compare which channel actually brings buyers.",
        },
      ],
      quality: {
        lead: "A public app with real inventory had to be safe for guests and honest about its own gaps.",
        points: [
          "Roles enforced twice: in the app's navigation and in the database security rules",
          "25 automated test files, including deep link handling",
          "A forced-update screen, so old versions with known bugs can be retired",
          "A technical write-up that lists the code I know is weak, not just what works",
        ],
      },
      status:
        "Live on Google Play and collecting the visit data for my thesis. iOS is not released yet.",
      learned: [
        "The biggest product call was taking something away: the login wall. Fewer steps did more than any feature.",
        "Measuring the channel had to be designed in from the start. Retrofitting attribution later would have left the thesis with nothing to compare.",
      ],
    },
  },
];

export const projectBySlug = (slug?: string) => projects.find((p) => p.slug === slug);
