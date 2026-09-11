// src/data/portfolioData.js
// Single Source of Truth for Harshit Agarwal's Executive Portfolio

export const PERSONAL_INFO = {
  name: 'Harshit Agarwal',
  role: 'Senior Product Manager & AI Systems Builder',
  tagline: 'Bridging 0-to-1 product discovery, master PRDs, and unit economics with full-stack AI engineering, multi-agent pipelines, and production architectures.',
  location: 'Bengaluru, Karnataka, India • Global Remote',
  email: 'agarwal.harshit97@gmail.com',
  phone: '+91 8130803028',
  linkedin: 'https://www.linkedin.com/in/1997agarwal/',
  github: 'https://github.com/1997agarwal',
  twitter: 'https://x.com/1997agarwal',
  medium: 'https://medium.com/@1997agarwal',
  avatarUrl: 'https://avatars.githubusercontent.com/u/43310705?v=4',
  yearsExperience: '7+',
  usersScaled: '500K+',
  awardsCount: '7',
  venturesCount: '5',
  openSourceCount: '3',
  communityFollowers: '15K+'
};

export const METRICS = [
  { label: 'Years Shipping Product', value: '7+', suffix: 'Years', desc: 'From 0→1 startups to enterprise SaaS leaders' },
  { label: 'Learners Scaled at Tally', value: '500K+', suffix: 'Users', desc: 'In-house LMS adopted across 2,000+ partner institutes' },
  { label: 'Corporate Awards', value: '7', suffix: 'Accolades', desc: 'Tekion Recognition, Tally All Star, 2x Team of the Year' },
  { label: 'Commercial Ventures', value: '5', suffix: 'Ventures', desc: 'StartupOS, Trippy, DupeScout, BusinessPay, CollabKaro' },
  { label: 'Open Source AI DevTools', value: '3', suffix: 'Public Tools', desc: 'SpecForge, ContextPrism, PromptCourt' },
  { label: 'Builder Community', value: '15K+', suffix: 'Followers', desc: 'Creator of @prod.tech101 on Product & AI' },
];

export const CORPORATE_EXPERIENCE = [
  {
    id: 'tekion',
    company: 'Tekion Corp',
    role: 'Product Manager',
    period: 'Jun 2024 – Present',
    duration: 'Current',
    location: 'Bengaluru, India',
    domain: 'Automotive Retail Cloud • B2B Payments & Accounts Receivable (AR)',
    badge: 'Unicorn Enterprise SaaS',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    summary: 'Owned the 0-to-1 product lifecycle of Tekion’s self-serve B2B Customer Portal and AI Collections Management platform for enterprise automotive dealerships and fleet buyers.',
    achievements: [
      'Built a self-serve B2B Customer Portal enabling automotive dealerships and enterprise commercial accounts to discover invoices, track aging balances, and execute online settlements.',
      'Designed multi-invoice selection, partial payments, AutoPay, and real-time payment reconciliation to directly compress Days Sales Outstanding (DSO).',
      'Architected an AI-powered collections management engine analyzing invoice aging signals to prioritize high-risk delinquent accounts and trigger automated recovery workflows.',
      'Built an AI-powered conversational AR assistant chatbot enabling financial controllers to query unpaid accounts in natural language (e.g. "Show high-priority overdue dealers") and trigger payment reminders.',
      'Solved mission-critical edge cases: duplicate customer identity deduplication, concurrent payment race conditions, and payment gateway retry fallbacks.',
      'Honored with the Tekion Recognition Award (05/2025) for execution of the B2B Portal and seamless transition into production engineering.'
    ],
    stack: ['B2B Payments', 'AR Automation', 'AI Collections', 'Conversational AI', 'REST APIs', 'Postman', 'SQL', 'FinTech SaaS']
  },
  {
    id: 'tally',
    company: 'Tally Solutions / Tally Education',
    role: 'Product Manager',
    period: 'Mar 2021 – Jun 2024',
    duration: '3 yrs 4 mos',
    location: 'Bengaluru, India',
    domain: 'Enterprise ERP Leader • EdTech & Global Skills Assessment',
    badge: 'Enterprise Leader',
    badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    summary: 'Conceptualized, built, and scaled an in-house enterprise Learning Management System from 0 to 1, replacing costly third-party solutions and serving 500K+ learners across 2,000+ institutional partners.',
    achievements: [
      'Built an in-house enterprise LMS from scratch and rolled it out to 2,000+ institutional partners and 500,000+ active learners.',
      'Drove product adoption rate from 19% to 60% within 5 months through deep UX simplification and engagement loops.',
      'Saved the company a six-figure monthly sum in INR by sunsetting legacy third-party vendor platforms.',
      'Overhauled the global Skill Assessment Platform (V2), creating a sleek interface that conducted over 5 Million candidate assessments.',
      'Revamped the Placement Portal to facilitate frictionless interactions between employers, candidates, and educational partners.',
      'Built pilot flow for B2C vertical Tally DigiLearn, integrating payment gateways, course discovery, and automated support for 100K+ users.',
      'Recipient of 7 major awards: The All Star Award (H2 2024), Annual Team of the Year Award (2022 & 2023), and 4 Spot Excellence awards.'
    ],
    stack: ['0-to-1 Product', 'LMS Architecture', 'Adoption Funnels', 'Pricing Strategy', 'Enterprise B2B', 'Assessment Engines', 'Payment Gateway']
  },
  {
    id: 'shiprocket',
    company: 'Shiprocket',
    role: 'Associate Product Manager',
    period: 'Jun 2020 – Apr 2021',
    duration: '11 mos',
    location: 'New Delhi / Gurugram, India',
    domain: 'E-Commerce Logistics Unicorn • First-Mile Operations',
    badge: 'Logistics Unicorn',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    summary: 'Owned first-mile pickup enhancements and seller experience for India’s largest D2C e-commerce logistics platform.',
    achievements: [
      'Owned product enhancement for the First Mile Segment of the Shiprocket system for thousands of D2C sellers and enterprise merchants.',
      'Improved seller escalation resolution performance via automated IVR workflows by 16%.',
      'Drove a 12% delta improvement in seller pickup fulfillment performance.',
      'Shipped core seller features: automated order verification, seller bridge calls, pickup cutoff timers, and payment mode switching flows.',
      'Managed multi-carrier courier API integrations, SMS communication delivery channels, and operational tooling.'
    ],
    stack: ['Logistics Tech', 'First-Mile Pickup', 'Courier APIs', 'IVR Workflows', 'A/B Testing', 'Figma', 'Seller Operations']
  },
  {
    id: 'frendy',
    company: 'Frendy',
    role: 'Junior Product Manager',
    period: '2019 – 2020',
    duration: '1 yr',
    location: 'Ahmedabad, Gujarat, India',
    domain: 'Social Commerce & Hyperlocal Retail • Bharat / Tier 2-3',
    badge: 'Social Commerce Startup',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    summary: 'Spearheaded vendor panel development, conversion rate optimization, and vernacular localization for Tier 2/3 consumers across Bharat.',
    achievements: [
      'Built the Vendor Operations Panel from scratch, significantly increasing vendor order processing rates and inventory transparency.',
      'Slashed the Checkout Process Drop-off Rate (CPDR) from 50% down to 30% by designing and launching a streamlined single-page checkout flow (+20% conversion lift).',
      'Executed full vernacularization of the application in Hindi and Gujarati, delivering an intuitive localized experience for 60% of users across Tier 2 & 3 cities.',
      'Developed the B2B Franchise Application for the community leader hyperlocal network to reduce last-mile distribution costs.'
    ],
    stack: ['Checkout Optimization', 'Vernacular UI', 'Hyperlocal Ops', 'Vendor Portals', 'User Research', 'Wireframing']
  }
];

export const COMMERCIAL_VENTURES = [
  {
    id: 'startup-os',
    name: 'StartupOS',
    tagline: 'Universal 360° AI Product Incubator & Community Launchpad',
    category: 'Venture OS',
    problem: '0-to-1 building is fragmented across disconnected docs, chat prompts, and unverified AI agents, leaving founders with dead prototypes.',
    solution: 'A unified operating system with a Product Hunt-style launchpad, Blueprint Studio, AI IdeaLab feasibility scorer, and automated 4-File Parity health auditor.',
    stack: ['React 18', 'Vite', 'Node.js', 'Multi-Realm JWT', 'SQLite', 'AntiGravity Agentic SDK'],
    access: 'Private Commercial IP',
    surfaces: ['Launchpad Feed', 'Blueprint Studio', 'IdeaLab Scorer', 'LMS Hub']
  },
  {
    id: 'trippy',
    name: 'Trippy',
    tagline: 'AI Solo-Travel Group Matching & Host Operating System',
    category: 'TravelTech AI',
    problem: 'Solo travelers suffer from emotional friction (loneliness, safety, bad group fit), while community trip hosts struggle with fragmented discovery and partner CRM management.',
    solution: 'Travel solo, never alone. Multi-attribute compatibility matching engine with 4 dedicated surfaces: consumer matchmaker, tour host CRM (crm-), admin console (a-), and marketing satellite.',
    stack: ['React 18 SPA', 'Express', 'better-sqlite3', 'Node 22', 'Render Blueprint'],
    access: 'Private Commercial IP',
    surfaces: ['Consumer Matchmaker', 'Host Partner CRM', 'Trust & Safety Admin', 'Marketing Site']
  },
  {
    id: 'dupe-scout',
    name: 'DupeScout',
    tagline: 'AI Shopping OS & Multimodal Visual Similarity Engine',
    category: 'AI Vision & E-Commerce',
    problem: 'Gen Z consumers are priced out of luxury lifestyle goods but drown in scammy or low-quality counterfeits without verifiable comparison.',
    solution: 'Shop the Look. Not the Markup. Multimodal image search powered by CLIP models and sub-second pgvector cosine similarity to find high-quality affordable alternatives.',
    stack: ['Next.js 14', 'FastAPI (Python 3.14)', 'PostgreSQL', 'pgvector', 'Redis', 'CLIP Vision', 'Chrome Extension'],
    access: 'Private Commercial IP',
    surfaces: ['Next.js App', 'FastAPI API', 'Chrome Extension', 'Vector Pipeline']
  },
  {
    id: 'business-pay',
    name: 'BusinessPay',
    tagline: 'B2B AR Collections Accelerator & Dynamic Early Discounting Engine',
    category: 'B2B FinTech',
    problem: 'B2B enterprises have millions trapped in overdue receivables; rigid payment terms cause high Days Sales Outstanding (DSO) and expensive working capital credit lines.',
    solution: 'Dynamic delinquency discounting engine calculating real-time APR discounts for immediate payment, paired with risk-scored collector workqueues and buyer self-serve portals.',
    stack: ['React 19', 'Express 5', 'better-sqlite3', 'Node.js', 'Financial Discount Math'],
    access: 'Private Commercial IP',
    surfaces: ['Collector Workqueue', 'Buyer Portal Simulation', 'Dynamic Discount Engine', 'Admin Analytics']
  },
  {
    id: 'collab-karo',
    name: 'CollabKaro',
    tagline: 'India-First Creator Marketplace & Escrow Milestone Operating System',
    category: 'Creator Economy',
    problem: 'Brands face unreliable deliverable completion, while Indian UGC creators suffer from delayed payments and scope creep without legal protection.',
    solution: 'Two-sided creator marketplace backed by an automated milestone escrow engine, verified media kit analytics, and automated deliverable sign-off workflows.',
    stack: ['React TS', 'Vite', 'Express', 'PostgreSQL/SQLite', 'Escrow Milestone API', 'React Native Mobile'],
    access: 'Private Commercial IP',
    surfaces: ['Brand & Agency Portal', 'Creator Media Kit Hub', 'Escrow Admin Console', 'Mobile App']
  }
];

export const OPEN_SOURCE_TOOLS = [
  {
    id: 'spec-forge',
    name: 'SpecForge',
    tagline: 'Autonomous Discovery-to-Spec Engine with 3-Agent Pipeline & Linear Sync',
    description: 'Autonomous 3-stage agent pipeline (Discovery Agent, Architect Agent, Linear Sync) converting unstructured founder conversations and discovery voice notes into structured PRDs, technical architectural RFCs, and synchronized Linear tickets.',
    starsUrl: 'https://img.shields.io/github/stars/1997agarwal/SpecForge?style=social',
    repoUrl: 'https://github.com/1997agarwal/SpecForge',
    stack: ['React 18', 'TypeScript', 'Node.js', 'Linear SDK', 'SQLite', 'Agentic Workflow'],
    highlights: ['Autonomous 3-Agent Pipeline', 'Bidirectional Linear Sync', 'Zero-Drift PRD Contracts']
  },
  {
    id: 'context-prism',
    name: 'ContextPrism',
    tagline: 'Enterprise Token FinOps Gateway & AST Context Pruner',
    description: 'A high-performance local FinOps reverse proxy (Port 4200) analyzing code Abstract Syntax Trees (AST) to eliminate redundant syntax, comments, and boilerplate before prompt injection, cutting LLM inference token spend by up to 40%.',
    starsUrl: 'https://img.shields.io/github/stars/1997agarwal/ContextPrism?style=social',
    repoUrl: 'https://github.com/1997agarwal/ContextPrism',
    stack: ['Node.js', 'Express', 'TypeScript', 'AST Parser', 'Vite', 'FinOps Reverse Proxy'],
    highlights: ['AST Boilerplate Pruning', 'Task-Aware Model Routing', 'Budget Circuit Breakers']
  },
  {
    id: 'prompt-court',
    name: 'PromptCourt',
    tagline: 'Multi-Model LLM Benchmark Arena & Elo Scoring Engine',
    description: 'Blind side-by-side prompt evaluation platform utilizing Elo rating mathematics to empirically score and rank competitive LLM prompt outputs with statistical rigor across reasoning, coding, and creative tasks.',
    starsUrl: 'https://img.shields.io/github/stars/1997agarwal/PromptCourt?style=social',
    repoUrl: 'https://github.com/1997agarwal/PromptCourt',
    stack: ['React 18', 'TypeScript', 'Tailwind CSS', 'Elo Engine', 'Multi-Model Benchmarking'],
    highlights: ['Blind Elo Arena', 'Statistical Significance Scoring', 'Prompt Variant Testing']
  }
];

export const CASE_STUDIES_ARCHIVE = [
  {
    category: 'Market & User Research',
    items: [
      { title: 'PharmEasy Competitor Analysis', desc: 'Comprehensive competitor benchmarking in online pharmacy logistics.', url: 'https://drive.google.com/file/d/1agL9g6hCdYGc2Jk9EwlptuZ8ljIYvgJ0/view?usp=sharing' },
      { title: 'Furniture Rental User Research', desc: 'Quantitative user research survey on subscription furniture adoption.', url: 'https://drive.google.com/file/d/1lyaYrLhEsGdLtxBMoThgn7yUt_pEVPaE/view?usp=sharing' },
      { title: 'Lyft Business Model Canvas', desc: 'Strategic BMC dissecting ridesharing unit economics and driver incentives.', url: 'https://drive.google.com/file/d/1MIDMJyevwmeY1pen9T__5Zk007bDQdlm/view?usp=sharing' },
      { title: 'Flat-Mate Finding Service Artifacts', desc: '0-to-1 PRD and wireframes for peer roommate discovery.', url: 'https://drive.google.com/file/d/1FlDde27xYtGRhcqTD_WbYzREXVoaNOVf/view?usp=sharing' }
    ]
  },
  {
    category: 'Product Analytics, Retention & Growth',
    items: [
      { title: 'Redbus Analytics & Engagement', desc: 'Bus booking funnels, user retention levers, and drop-off analysis.', url: 'https://drive.google.com/file/d/1euNb9BQYqiguq0bp6C4AmJjg6BADqOaB/view?usp=sharing' },
      { title: 'Zoom Key Metrics Identification', desc: 'North Star metric decomposition for B2B video communication.', url: 'https://drive.google.com/file/d/1fgDAgme_a5jfSkwS_aoRljeCCSAgRHkS/view?usp=sharing' },
      { title: 'Slack Activation & Retention Workflow', desc: 'Cohort retention sheets and team activation workflow modeling.', url: 'https://docs.google.com/spreadsheets/d/17IHOPnn_eVKcOM6xj1-Yj-nExuNaSKnb/edit?usp=sharing' },
      { title: 'Snapdeal Growth Hack Teardown', desc: 'Viral referral mechanics and gamified buyer incentives.', url: 'https://drive.google.com/file/d/1YMyEjvAmyCinx_e0LxFMh06gyeqwVjz_/view?usp=sharing' }
    ]
  },
  {
    category: 'PRDs, Specs & Feature Teardowns',
    items: [
      { title: 'Food Delivery App (Swiggy/Zomato Competitor PRD)', desc: 'Complete 10-part Master PRD with roadmaps, edge cases, and metrics.', url: 'https://drive.google.com/drive/folders/1QXaP_ZdX6-LL2pl97MFCO_swzGEbP7mf?usp=sharing' },
      { title: 'In-Flight Food-Ordering App MVP', desc: 'Offline-first airline passenger ordering system and traction plan.', url: 'https://drive.google.com/file/d/1FILNWyruvOzB3AFhhVa8epkAzt1eXM8v/view?usp=sharing' },
      { title: 'Google Pay Value Enhancement Spec', desc: 'Feature specification adding high-value consumer billing workflows.', url: 'https://drive.google.com/file/d/1t8EcVLss9Sr76tfW2tePyisOVgRRo_5u/view?usp=sharing' },
      { title: 'Microsoft Teams Collaboration Enhancement', desc: 'Workflow design improving remote meeting tools and attendee engagement.', url: 'https://drive.google.com/file/d/1RZ8sVIEU5hNG2YjsmIsNylSAA2POF8FX/view?usp=share_link' }
    ]
  }
];

export const AWARDS_AND_EDUCATION = {
  awards: [
    { title: 'Tekion Recognition Award', org: 'Tekion Corp', date: 'May 2025', desc: 'For rapid execution of the B2B Payment Portal and seamless transition into production engineering.' },
    { title: 'The All Star Award (H2)', org: 'Tally RnR, Tally Education', date: 'Mar 2024', desc: 'Highest individual honor for architecting and rolling out the Candidate Placement Portal.' },
    { title: 'Annual Team of the Year Award', org: 'Tally Mahasabha RnR', date: 'May 2023', desc: 'For scaling the in-house Learning Management System to 500,000+ active learners.' },
    { title: 'Annual Team of the Year Award', org: 'Tally Digisabha RnR', date: 'May 2022', desc: 'For conceptualizing and launching the B2C vertical Tally DigiLearn.' },
    { title: 'Top 5 Startup Ideas in India', org: 'Niti Aayog (Govt. of India)', date: 'Apr 2017', desc: 'National recognition for IoT safety hardware device mitigating road accident after-effects.' },
    { title: 'Robotics Zonal Winner', org: 'Techfest, IIT Bombay', date: 'Oct 2016', desc: 'Winner in autonomous robotics navigation at Asia’s largest science and technology festival.' },
    { title: 'Excellence & Collaboration Champion', org: 'Tally Education', date: '2023 – 2024', desc: '4x Spot Awards from Product Leads and Department Heads for sprint excellence.' }
  ],
  education: [
    { school: 'Duke Corporate Education / Duke University', program: 'Post-Graduate Program in Product Management', period: '2020', desc: 'Business metrics, data-driven prioritization, market research, and financial modeling.' },
    { school: 'Jaypee Institute of Information Technology (JIIT, Noida)', program: 'Bachelor of Technology (B.Tech) — Electronics & Communication', period: '2015 – 2019', desc: 'Coordinator of Robotics Hub, embedded systems, microcontrollers, and digital signal processing.' }
  ],
  certifications: [
    { title: 'Growth Product Manager Nanodegree', issuer: 'Udacity' },
    { title: 'Startup School Program', issuer: 'Y Combinator' },
    { title: 'Product Management Micro-Certification', issuer: 'Product School' },
    { title: 'Foundations of User Experience (UX) Design', issuer: 'Google' }
  ]
};

// Backwards-compatibility aliases
export const personalInfo = {
  name: PERSONAL_INFO.name,
  title: PERSONAL_INFO.role,
  summary: PERSONAL_INFO.tagline,
  bio: "The best product managers don't just manage the backlog — they understand the system, prototype the future, and ship value.",
  status: "Senior Product Manager @ Tekion Corp • 0→1 Founder",
  location: PERSONAL_INFO.location,
  education: "Duke Univ (PGPM) • B.Tech (ECE)",
  email: PERSONAL_INFO.email,
  avatar: PERSONAL_INFO.avatarUrl,
  links: {
    linkedin: PERSONAL_INFO.linkedin,
    github: PERSONAL_INFO.github,
    twitter: PERSONAL_INFO.twitter,
    medium: PERSONAL_INFO.medium,
  }
};

export const metrics = METRICS.map(m => ({
  value: m.value,
  label: m.label,
  detail: m.desc
}));

export const experiences = CORPORATE_EXPERIENCE.map(c => ({
  company: c.company,
  role: c.role,
  period: c.period,
  location: c.location,
  highlights: c.bullets,
  awards: c.awards,
  skills: c.techStack
}));

export const ventures = COMMERCIAL_VENTURES.map(v => ({
  name: v.name,
  tagline: v.tagline,
  category: v.category,
  stage: v.stage,
  problem: v.problemThesis,
  solution: v.solutionArchitecture,
  surfaces: v.surfaces,
  metrics: v.metrics,
  stack: v.stack
}));

export const openSourceTools = OPEN_SOURCE_TOOLS;

export const caseStudies = CASE_STUDIES_ARCHIVE.flatMap(cat => 
  cat.items.map((item, idx) => ({
    id: `${cat.category}-${idx}`,
    category: cat.category,
    title: item.title,
    subtitle: item.desc,
    description: item.desc,
    date: '2020-2021',
    highlights: ['Deep Market Research', 'User Journey Mapping', 'Unit Economics Breakdown'],
    link: item.url
  }))
);

export const accolades = AWARDS_AND_EDUCATION.awards.map(a => ({
  title: a.title,
  issuer: a.org,
  year: a.date,
  detail: a.desc
}));

export const education = AWARDS_AND_EDUCATION.education.map(e => ({
  degree: e.program,
  institution: e.school,
  period: e.period,
  grade: 'Alumnus'
}));

export const certifications = AWARDS_AND_EDUCATION.certifications.map(c => ({
  name: c.title,
  issuer: c.issuer,
  date: 'Verified'
}));
