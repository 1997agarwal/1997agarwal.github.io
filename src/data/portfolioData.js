// src/data/portfolioData.js
// Single Source of Truth for Harshit Agarwal's Executive Portfolio

export const PERSONAL_INFO = {
  name: 'Harshit Agarwal',
  role: 'Founder @ Trippy | Senior Product Manager & AI Systems Builder',
  tagline: 'Founder of Trippy (travel social OS in active beta). Bridging 0-to-1 product discovery, master PRDs, and unit economics with full-stack AI engineering, multi-agent pipelines, and production architectures.',
  location: 'Bengaluru, Karnataka, India • Global Remote',
  email: 'agarwal.harshit97@gmail.com',
  phone: '+91 8130803028',
  linkedin: 'https://www.linkedin.com/in/1997agarwal/',
  github: 'https://github.com/1997agarwal',
  twitter: 'https://x.com/1997agarwal',
  medium: 'https://medium.com/@1997agarwal',
  avatarUrl: './avatar.png',
  yearsExperience: '7+',
  usersScaled: '500K+',
  awardsCount: '7',
  venturesCount: '4',
  openSourceCount: '4',
  communityFollowers: '15K+'
};

export const METRICS = [
  { label: 'Lead Startup Venture', value: 'Trippy', suffix: 'Active Beta', desc: 'AI solo-travel social & host CRM OS (Nomad-Tribe)' },
  { label: 'Years Shipping Product', value: '7+', suffix: 'Years', desc: 'From 0→1 startups to enterprise SaaS leaders' },
  { label: 'Learners Scaled at Tally', value: '500K+', suffix: 'Users', desc: 'In-house LMS adopted across 2,000+ partner institutes' },
  { label: 'Corporate Awards', value: '7', suffix: 'Accolades', desc: 'Tekion Recognition, Tally All Star, 2x Team of the Year' },
  { label: 'Commercial Blueprints', value: '4', suffix: 'Platforms', desc: 'StartupOS, DupeScout, BusinessPay, CollabKaro' },
  { label: 'Open Source AI DevTools', value: '4', suffix: 'Public Tools', desc: 'SpecForge, ContextPrism, TicTacCourt, BrainGym' },
  { label: 'Builder Community', value: '15K+', suffix: 'Followers', desc: 'Creator of @prod.tech101 on Product & AI' },
];

export const TRIPPY_FOUNDER_SPOTLIGHT = {
  name: 'Trippy',
  brandOrg: 'Nomad-Tribe',
  founderRole: 'Founder & Systems Architect',
  category: 'TravelTech AI & Social Network',
  stage: 'ACTIVE BETA',
  statusBadge: 'Testing with Live Cohorts · Incorporating',
  tagline: 'AI Solo-Travel Compatibility Matching & Host Operating System',
  mission: 'Going solo does not mean going alone.',
  problem: '70M+ solo travelers face high emotional friction (loneliness, safety anxiety, and poor group chemistry), while community tour hosts, bike clubs, and hostels suffer from fragmented discovery, manual WhatsApp coordination, and high platform commissions.',
  solution: 'India-first social travel network pairing travelers on overlapping dates with multi-attribute compatibility scoring. Features 4 specialized surfaces: Consumer Matchmaker, Motorcycle & Road Trip Live Telemetry Hub, Hostel Guest Connect, and Partner Host CRM (crm-).',
  metrics: [
    { label: 'Solo Travelers Matched', value: '12,400+' },
    { label: 'Curated Trips & Expeditions', value: '340+' },
    { label: 'Destinations Across India', value: '47' },
    { label: 'Verified Communities & Hostels', value: '80+' }
  ],
  surfaces: [
    { name: 'Consumer Matchmaker', desc: 'Compatibility & vibe overlap scoring for solo travelers' },
    { name: 'Bike & Road Trip Hub', desc: '60s live GPS telemetry, waypoint logs & emergency SOS alerts' },
    { name: 'Hostel Group Connect', desc: 'Pre-arrival guest matching for Zostel, GoStops, & Moustache' },
    { name: 'Partner Host CRM (crm-)', desc: 'Itinerary builder, direct booking lead capture & zero platform fees' },
    { name: 'Trust & Safety Admin (a-)', desc: '9 RBAC roles, verified host stamps, and immutable event ledger' }
  ],
  techStack: ['React 18 SPA', 'Node 22 Express', 'better-sqlite3 / PostgreSQL', 'Docker / Cloud Run', 'Vite Satellite'],
  liveUrl: 'https://nomad-tribe.github.io/trippy-website/'
};

export const CORPORATE_EXPERIENCE = [
  {
    id: 'tekion',
    company: 'Tekion Corp',
    role: 'Product Manager',
    period: 'Jun 2024 – Present',
    duration: 'Current',
    location: 'Bengaluru, India',
    businessUnit: 'FinTech & Dealer Financial Operations',
    bullets: [
      'Spearheading enterprise B2B Payments, Dealer AR Portals, and automated collection workqueues across automotive dealer networks.',
      'Shipped electronic invoice clearance and self-serve Promise-to-Pay (PTP) workflows, directly compressing Days Sales Outstanding (DSO).',
      'Engineered intelligent aging workqueues classifying overdue ledger accounts with automated dunning triggers and risk scoring models.',
      'Authored comprehensive PRDs, API schemas, and data contracts bridging front-office dealer workflows to enterprise accounting ledgers.',
      'Awarded the Tekion Recognition Award (May 2025) for high-velocity payment portal delivery and seamless production rollout.'
    ],
    awards: ['Tekion Recognition Award (May 2025)'],
    techStack: ['FinTech Payments', 'Accounts Receivable (AR)', 'Automated Dunning', 'Ledger Integration', 'Enterprise PRDs']
  },
  {
    id: 'tally',
    company: 'Tally Solutions',
    role: 'Product Manager',
    period: 'Apr 2021 – Jun 2024',
    duration: '3 yrs 3 mos',
    location: 'Bengaluru, India',
    businessUnit: 'Tally Education & Ecosystem Platforms',
    bullets: [
      'Spearheaded 0-to-1 design, architecture, and nationwide launch of Tally LMS across 2,000+ partner institutes.',
      'Scaled digital platform adoption from 19% to 60%, delivering self-paced interactive learning to 500,000+ registered candidates.',
      'Re-architected the National Skill Assessment Platform (V2), supporting concurrent execution of 5,000,000+ online proctored exams.',
      'Conceptualized and launched the 0→1 Candidate Placement Portal, connecting 150,000+ certified candidates with 1,500+ SMB employers.',
      'Led cross-functional teams of 14+ engineers, UX designers, and academic heads across 8 quarterly major release cycles.',
      'Honored with 7 corporate awards, including The All Star Award (H2 2024) and 2x Annual Team of the Year Awards.'
    ],
    awards: [
      'The All Star Award (H2 2024)',
      'Annual Team of the Year (Mahasabha 2023)',
      'Annual Team of the Year (Digisabha 2022)',
      '4x Spot Excellence Awards (2023 – 2024)'
    ],
    techStack: ['EdTech LMS', 'Online Assessment V2', 'Placement Portal', 'Microservices', 'Candidate Funnels']
  },
  {
    id: 'shiprocket',
    company: 'Shiprocket',
    role: 'Associate Product Manager',
    period: 'Jun 2020 – Mar 2021',
    duration: '10 mos',
    location: 'Gurugram, India',
    businessUnit: 'First-Mile Operations & Seller Fulfillment',
    bullets: [
      'Managed First-Mile Logistics and Seller Fulfillment operations for 40,000+ active D2C and social commerce merchants.',
      'Engineered seller pickup SLA monitoring systems, driving on-time courier pickup completion by +12%.',
      'Built automated IVR and escalation routing for non-pickup incidents, reducing support tickets and escalation resolution time by +16%.',
      'Unified courier webhook tracking schemas across Bluedart, Delhivery, and Shadowfax, eliminating tracking data discrepancies.'
    ],
    awards: ['SLA Optimization Champion (2020)'],
    techStack: ['First-Mile Logistics', 'Courier Webhooks', 'IVR Escalation Engine', 'Seller SLAs']
  },
  {
    id: 'frendy',
    company: 'Frendy',
    role: 'Junior Product Manager',
    period: '2019 – 2020',
    duration: '1 yr',
    location: 'Ahmedabad, India',
    businessUnit: 'Social Commerce & Partner Operations',
    bullets: [
      'Shipped 0-to-1 Vendor Management Panel, onboarding 200+ local FMCG distributors and automating inventory ingestion.',
      'Re-architected checkout into a single-page streamlined flow, cutting Cart-to-Payment Drop-off Rate (CPDR) from 50% to 30%.',
      'Designed vernacular mobile UI experiences (Hindi & Gujarati), driving 45% higher first-order completion rates for Tier 2/3 micro-entrepreneurs.'
    ],
    awards: ['Checkout Redesign Spotlight (2020)'],
    techStack: ['Social Commerce', 'Vernacular UX', 'Single-Page Checkout', 'Vendor Management']
  }
];

export const COMMERCIAL_VENTURES = [
  {
    id: 'startup-os',
    name: 'StartupOS',
    tagline: 'Universal 360° AI Product Incubator & Community Launchpad',
    category: 'Venture OS',
    stage: 'BETA',
    problem: '0-to-1 building is fragmented across disconnected docs, chat prompts, and unverified AI agents, leaving founders with dead prototypes.',
    solution: 'A unified operating system with a Product Hunt-style launchpad, Blueprint Studio, AI IdeaLab feasibility scorer, and automated 4-File Parity health auditor.',
    stack: ['React 18', 'Vite', 'Node.js', 'Multi-Realm JWT', 'SQLite', 'AntiGravity Agentic SDK'],
    access: 'Private Commercial IP',
    demoUrl: 'https://builder-tribe.github.io/StartupOS-Website',
    surfaces: ['Launchpad Feed', 'Blueprint Studio', 'IdeaLab Scorer', 'LMS Hub']
  },
  {
    id: 'dupe-scout',
    name: 'DupeScout',
    tagline: 'AI Shopping OS & Multimodal Visual Similarity Engine',
    category: 'AI Vision & E-Commerce',
    stage: 'ALPHA',
    problem: 'Gen Z consumers are priced out of luxury lifestyle goods but drown in scammy or low-quality counterfeits without verifiable comparison.',
    solution: 'Shop the Look. Not the Markup. Multimodal image search powered by CLIP models and sub-second pgvector cosine similarity to find high-quality affordable alternatives.',
    stack: ['Next.js 14', 'FastAPI (Python 3.14)', 'PostgreSQL', 'pgvector', 'Redis', 'CLIP Vision', 'Chrome Extension'],
    access: 'Private Commercial IP',
    demoUrl: 'https://trend-tribe.github.io/dupescout-website',
    surfaces: ['Next.js App', 'FastAPI API', 'Chrome Extension', 'Vector Pipeline']
  },
  {
    id: 'business-pay',
    name: 'BusinessPay',
    tagline: 'B2B AR Collections Accelerator & Dynamic Early Discounting Engine',
    category: 'B2B FinTech',
    stage: 'BETA',
    problem: 'B2B enterprises have millions trapped in overdue receivables; rigid payment terms cause high Days Sales Outstanding (DSO) and expensive working capital credit lines.',
    solution: 'Dynamic delinquency discounting engine calculating real-time APR discounts for immediate payment, paired with risk-scored collector workqueues and buyer self-serve portals.',
    stack: ['React 19', 'Express 5', 'better-sqlite3', 'Node.js', 'Financial Discount Math'],
    access: 'Private Commercial IP',
    demoUrl: 'https://business-tribe.github.io/BusinessPay-Website',
    surfaces: ['Collector Workqueue', 'Buyer Portal Simulation', 'Dynamic Discount Engine', 'Admin Analytics']
  },
  {
    id: 'collab-karo',
    name: 'CollabKaro',
    tagline: 'India-First Creator Marketplace & Escrow Milestone Operating System',
    category: 'Creator Economy',
    stage: 'ALPHA',
    problem: 'Brands face unreliable deliverable completion, while Indian UGC creators suffer from delayed payments and scope creep without legal protection.',
    solution: 'Two-sided creator marketplace backed by an automated milestone escrow engine, verified media kit analytics, and automated deliverable sign-off workflows.',
    stack: ['React TS', 'Vite', 'Express', 'PostgreSQL/SQLite', 'Escrow Milestone API', 'React Native Mobile'],
    access: 'Private Commercial IP',
    demoUrl: 'https://collab-tribe.github.io/CollabKaro-Website',
    surfaces: ['Brand & Agency Portal', 'Creator Media Kit Hub', 'Escrow Admin Console', 'Mobile App']
  }
];

export const OPEN_SOURCE_TOOLS = [
  {
    id: 'spec-forge',
    name: 'SpecForge',
    tagline: 'Autonomous Discovery-to-Spec Engine with 3-Agent Pipeline & Linear Sync',
    category: 'Agentic DevTools',
    description: 'Autonomous 3-stage agent pipeline converting customer discovery calls into technical PRDs, Gherkin BDD user stories, and Linear/GitHub tickets. Features 1-click Markdown/Jira export and a 3-scenario discovery switcher.',
    starsUrl: 'https://img.shields.io/github/stars/1997agarwal/SpecForge?style=social',
    repoUrl: 'https://github.com/1997agarwal/SpecForge',
    demoUrl: 'https://1997agarwal.github.io/SpecForge',
    stack: ['React 18', 'TypeScript', 'Node.js', 'Linear SDK', 'SQLite', 'Agentic Workflow'],
    highlights: ['1-Click PRD & Jira BDD Export', '3-Scenario Discovery Switcher', 'Autonomous 3-Agent Linear Sync'],
    license: 'MIT'
  },
  {
    id: 'context-prism',
    name: 'ContextPrism',
    tagline: 'Enterprise Token FinOps Gateway & AST Context Pruner',
    category: 'AI FinOps & Compiler',
    description: 'Enterprise Token FinOps Gateway and AST context pruner supporting dual-language (TypeScript & Python) compression. Features task-aware model routing, a zero-cost semantic cache ($0, 2ms), and an interactive Token FinOps ROI Calculator cutting LLM bills by up to 90%.',
    starsUrl: 'https://img.shields.io/github/stars/1997agarwal/ContextPrism?style=social',
    repoUrl: 'https://github.com/1997agarwal/ContextPrism',
    demoUrl: 'https://1997agarwal.github.io/ContextPrism',
    stack: ['Node.js', 'Express', 'TypeScript & Python', 'AST Parser', 'Token FinOps ROI Calculator'],
    highlights: ['Dual-Language AST Pruning (-85%)', 'Token FinOps ROI Calculator', 'Zero-Cost Semantic Cache ($0)'],
    license: 'MIT'
  },
  {
    id: 'tictac-court',
    name: 'TicTacCourt',
    tagline: 'AI-Native Tactical Strategy Arena & Autonomous Arbiter with Zero-Draw Guarantee',
    category: 'AI Gaming & Interactive LLMs',
    description: 'An AI-native tactical strategy arena breaking the 1,000-year-old solved draw loop of Tic-Tac-Toe. Features live browser gameplay on GitHub Pages, 3 AI Arbiter personalities (Strict, Comedian, Merciful), dynamic board mutations, and an infinite Sudden Death protocol mathematically guaranteeing zero draws.',
    starsUrl: 'https://img.shields.io/github/stars/1997agarwal/TicTacCourt?style=social',
    repoUrl: 'https://github.com/1997agarwal/TicTacCourt',
    demoUrl: 'https://1997agarwal.github.io/TicTacCourt',
    stack: ['React 18', 'TypeScript', 'Gemini AI Arbiter', 'GitHub Pages Live', 'Autonomous Tool Calling'],
    highlights: ['Live Playable on GitHub Pages', '3 Arbiter Personalities (Strict/Comedian/Merciful)', 'Zero-Draw Sudden Death Protocol'],
    license: 'MIT'
  },
  {
    id: 'brain-gym',
    name: 'BrainGym',
    tagline: 'Daily Mental Resistance Training to Counteract AI-Induced Cognitive Atrophy',
    category: 'Cognitive AI & EdTech',
    description: 'An AI-native mental workout arena engineered to preserve critical human reasoning in the generative AI era. Features Fermi estimation drills, Hallucination Hunter logic audits, spatial Memory Fortress exercises, a 15-level progression map, and offline algorithmic judges.',
    starsUrl: 'https://img.shields.io/github/stars/1997agarwal/BrainGym?style=social',
    repoUrl: 'https://github.com/1997agarwal/BrainGym',
    demoUrl: 'https://1997agarwal.github.io/BrainGym',
    stack: ['React 18', 'TypeScript', 'Vite 6', 'Web Audio API', 'Node.js CLI Engine'],
    highlights: ['Live Browser Play on GitHub Pages', 'Fermi Drills & Hallucination Hunter', 'Standalone CLI Engine (npm run cli)'],
    license: 'MIT'
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

// Aliases
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
  stage: v.stage || 'ACTIVE',
  isPrimaryStartup: v.isPrimaryStartup || false,
  badge: v.badge || null,
  problem: v.problem || '0-to-1 building friction',
  solution: v.solution || 'Automated architecture',
  surfaces: v.surfaces || [],
  metrics: v.metrics || '',
  demoUrl: v.demoUrl || null,
  stack: v.stack || []
}));

export const openSourceTools = OPEN_SOURCE_TOOLS;

export const caseStudies = CASE_STUDIES_ARCHIVE.flatMap(cat => 
  (cat.items || []).map((item, idx) => ({
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
