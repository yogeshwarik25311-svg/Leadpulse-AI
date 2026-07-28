// LeadPulse AI — simulated autonomous intelligence layer.
// Input: a raw URL. Output: fully structured lead intelligence. Zero manual entry.

const INDUSTRY_RULES = [
  { match: ["pay", "stripe", "bank", "fin", "invoice", "ledger", "capital"], industry: "Fintech & Payments" },
  { match: ["shop", "store", "cart", "commerce", "retail", "market"], industry: "E-commerce & Retail" },
  { match: ["health", "care", "med", "clinic", "bio", "pharma"], industry: "Healthcare & Life Sciences" },
  { match: ["learn", "edu", "academy", "school", "course", "campus"], industry: "Education & EdTech" },
  { match: ["travel", "trip", "tour", "flight", "hotel", "stay"], industry: "Travel & Hospitality" },
  { match: ["law", "legal", "attorney", "advocate"], industry: "Legal Services" },
  { match: ["real", "estate", "property", "realty", "home"], industry: "Real Estate & PropTech" },
  { match: ["logi", "ship", "freight", "cargo", "supply", "fleet"], industry: "Logistics & Supply Chain" },
  { match: ["media", "studio", "agency", "creative", "brand", "design"], industry: "Media & Creative Agency" },
  { match: ["ai", "data", "cloud", "dev", "tech", "labs", "soft", "app", "api"], industry: "B2B SaaS & Technology" },
  { match: ["food", "eat", "kitchen", "restaurant", "cafe", "brew"], industry: "Food & Beverage" },
  { match: ["energy", "solar", "green", "eco", "power"], industry: "Energy & Sustainability" },
];

const PAIN_POINTS = {
  "Fintech & Payments":
    "Compliance overhead and fragmented onboarding flows are inflating CAC. Their funnel leaks at KYC, and manual reconciliation work scales linearly with transaction volume instead of flattening.",
  "E-commerce & Retail":
    "Paid acquisition costs are compressing margins while repeat-purchase rate stays flat. Lifecycle messaging is generic, so high-intent carts are abandoned without any recovery sequence.",
  "Healthcare & Life Sciences":
    "Patient/partner intake is still coordinator-driven and paper-adjacent. Every new location multiplies admin headcount because none of the intake workflow is automated.",
  "Education & EdTech":
    "Enrollment demand is seasonal and support load spikes with it. Advisors spend most of their week answering repeatable questions instead of closing high-intent applicants.",
  "Travel & Hospitality":
    "Direct bookings lose to OTAs because the on-site experience lacks dynamic personalisation, so they surrender 15–25% margin on inventory they already own.",
  "Legal Services":
    "Billable capacity is the ceiling on revenue. Intake qualification, document review, and follow-up all consume senior hours that should be spent on matter work.",
  "Real Estate & PropTech":
    "Lead response time is measured in hours, not seconds. Inbound enquiries go cold before an agent replies, and no system scores intent before routing.",
  "Logistics & Supply Chain":
    "Exception handling is manual and phone-based. Dispatchers firefight instead of optimising lanes, and clients get status updates only when they chase them.",
  "Media & Creative Agency":
    "Delivery is people-heavy and margin is capped by hours sold. New business relies on referrals, so pipeline is unpredictable quarter to quarter.",
  "B2B SaaS & Technology":
    "Pipeline is top-of-funnel constrained. SDRs burn most of their day on manual research and list building rather than conversations, so outbound volume never compounds.",
  "Food & Beverage":
    "Ordering, loyalty, and delivery live in disconnected systems. They own the customer relationship on paper but not in data, so retention campaigns can't be targeted.",
  "Energy & Sustainability":
    "Long, technical sales cycles with multi-stakeholder committees. Without structured nurture, qualified opportunities stall in evaluation for two or three quarters.",
  Generic:
    "Growth operations are still human-powered. Research, qualification, and follow-up are handled manually, which caps throughput and makes revenue dependent on headcount.",
};

const PITCHES = {
  "Fintech & Payments":
    "Deploy an automated onboarding and reconciliation layer that cuts KYC drop-off and removes manual matching, converting compliance cost into a conversion advantage.",
  "E-commerce & Retail":
    "Layer behavioural segmentation and automated lifecycle flows over their existing stack to lift repeat revenue without increasing ad spend.",
  "Healthcare & Life Sciences":
    "Digitise intake end-to-end with smart forms, automated triage, and reminder sequences so each new site opens without adding admin headcount.",
  "Education & EdTech":
    "Introduce an AI advisor that handles tier-1 enquiries and scores applicant intent, freeing counsellors to work only the top of the list.",
  "Travel & Hospitality":
    "Build a direct-booking engine with dynamic offers and post-stay automation to shift share away from OTAs and reclaim margin.",
  "Legal Services":
    "Automate intake qualification and document pre-review so senior hours are reserved for billable matter work, raising effective capacity without hiring.",
  "Real Estate & PropTech":
    "Install instant-response lead routing with AI qualification so every enquiry is scored and answered in under sixty seconds.",
  "Logistics & Supply Chain":
    "Add proactive exception alerts and a client-facing status layer to eliminate chase calls and free dispatchers for lane optimisation.",
  "Media & Creative Agency":
    "Productise delivery with AI-assisted production and a predictable outbound engine, decoupling revenue growth from headcount growth.",
  "B2B SaaS & Technology":
    "Replace manual prospect research with an autonomous qualification engine so each rep runs 5–8× the outbound volume at higher personalisation.",
  "Food & Beverage":
    "Unify ordering and loyalty data into one profile, then trigger automated win-back and frequency campaigns off real behaviour.",
  "Energy & Sustainability":
    "Run a structured multi-threaded nurture programme that keeps every committee stakeholder engaged and compresses the evaluation window.",
  Generic:
    "Introduce an automation layer across research, qualification, and follow-up so pipeline throughput scales without adding operational headcount.",
};

const STEPS = [
  "Resolving domain and fetching metadata...",
  "Scraping company metadata and tech signals...",
  "Mapping industry taxonomy and firmographics...",
  "AI analyzing buyer intent and pain points...",
  "Scoring lead quality against ICP benchmarks...",
  "Generating custom pitch and cold email...",
  "Finalising audit report...",
];

export const ANALYSIS_STEPS = STEPS;

export function normalizeUrl(raw) {
  const trimmed = String(raw || "").trim();
  if (!trimmed) return null;
  const withProto = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const u = new URL(withProto);
    if (!u.hostname.includes(".")) return null;
    return { href: u.href, hostname: u.hostname.replace(/^www\./i, "") };
  } catch {
    return null;
  }
}

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function titleCase(s) {
  return s
    .split(/[-_]/g)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function companyNameFromHost(hostname) {
  const parts = hostname.split(".");
  const core = parts.length > 2 && parts[parts.length - 2].length <= 3
    ? parts[parts.length - 3]
    : parts[0];
  return titleCase(core);
}

function detectIndustry(hostname) {
  const h = hostname.toLowerCase();
  for (const rule of INDUSTRY_RULES) {
    if (rule.match.some((m) => h.includes(m))) return rule.industry;
  }
  return "Professional Services";
}

function tierFor(score) {
  if (score >= 78) return "High Value";
  if (score >= 55) return "Moderate";
  return "Low";
}

function coldEmail({ company, industry, pain, pitch }) {
  return `Subject: A quick thought on ${company}'s growth bottleneck

Hi ${company} team,

I spent a few minutes looking at how ${company} operates in ${industry.toLowerCase()}, and one pattern stood out: ${pain
    .split(".")[0]
    .toLowerCase()}.

Most teams in your position solve it the expensive way — more headcount. ${pitch}

We've run this exact play for comparable ${industry.toLowerCase()} teams and typically see meaningful throughput gains inside the first 30 days, without changing the existing stack.

Worth a 15-minute call next week? I'll bring a short teardown of ${company} specifically — useful whether or not we work together.

Best,
[Your name]
LeadPulse AI`;
}

export function analyzeUrl(raw) {
  const parsed = normalizeUrl(raw);
  if (!parsed) throw new Error("Enter a valid website URL, e.g. stripe.com");

  const { hostname, href } = parsed;
  const seed = hash(hostname);
  const company = companyNameFromHost(hostname);
  const industry = detectIndustry(hostname);

  const tldBonus = /\.(io|ai|com|co)$/i.test(hostname) ? 10 : 2;
  const lengthBonus = hostname.length <= 12 ? 8 : hostname.length <= 18 ? 4 : 0;
  const score = Math.max(18, Math.min(99, 42 + (seed % 34) + tldBonus + lengthBonus));

  const pain = PAIN_POINTS[industry] || PAIN_POINTS.Generic;
  const pitch = PITCHES[industry] || PITCHES.Generic;

  return {
    id: `${hostname}-${seed}-${Date.now()}`,
    url: href,
    domain: hostname,
    company,
    industry,
    score,
    tier: tierFor(score),
    employees: ["1-10", "11-50", "51-200", "201-500", "500+"][seed % 5],
    region: ["North America", "Europe", "APAC", "LATAM", "MENA"][seed % 5],
    pain,
    pitch,
    email: coldEmail({ company, industry, pain, pitch }),
    createdAt: new Date().toISOString(),
  };
}

