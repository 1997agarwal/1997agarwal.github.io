import React, { useState, useEffect } from 'react';

const CHAPTERS = [
  {
    id: 'hero',
    chapter: '00',
    total: '05',
    category: 'EXECUTIVE OVERVIEW',
    title: 'Harshit Agarwal',
    roleTag: 'Senior PM · Enterprise FinTech · 0→1 Founder',
    metrics: [
      { label: 'Scale', value: '1M+ Users' },
      { label: 'FinTech ARR', value: '$1.5–2M' },
      { label: 'Venture Betas', value: 'Trippy & FixIT' }
    ],
    thesis: 'Translating complex enterprise payment rails & consumer AI algorithms into scalable market products.',
    primaryAction: { type: 'resume', label: 'Executive 1-Pager' },
    secondaryAction: { type: 'contact', label: 'Direct Signal' },
  },
  {
    id: 'experience',
    chapter: '01',
    total: '05',
    category: 'ENTERPRISE PLATFORMS',
    title: 'Tekion Corp & Tally Scale',
    roleTag: 'FinTech Dealer AR & 500K EdTech Ecosystem',
    metrics: [
      { label: 'Tekion Projected ARR', value: '$1.5–2M' },
      { label: 'Tally Active Learners', value: '500,000+' },
      { label: 'Dealer Settlement', value: 'Zero Latency' }
    ],
    thesis: 'Architected automated B2B payment reconciliation portal for automotive dealerships, cutting invoice-to-cash settlement cycles.',
    primaryAction: { type: 'scroll', target: '#casestudies', label: 'Inspect PRDs' },
    secondaryAction: { type: 'resume', label: 'Work History' },
  },
  {
    id: 'startups',
    chapter: '02',
    total: '05',
    category: '0→1 VENTURE BETAS',
    title: 'FixIT & Trippy',
    roleTag: 'Bounty Escrow Protocol & Solo Travel Network',
    metrics: [
      { label: 'FixIT Revenue Split', value: '75 / 10 / 15' },
      { label: 'Automated Tests', value: '76 Passing' },
      { label: 'Trippy Match Engine', value: 'Multi-Vibe' }
    ],
    thesis: 'FixIT eliminates contractor and bug dispute latency via double-entry escrow; Trippy removes solo travel friction.',
    primaryAction: {
      type: 'external',
      label: 'Launch FixIT ↗',
      url: 'https://technocrat-tribe.github.io/FixIT-Website/'
    },
    secondaryAction: {
      type: 'walkthrough',
      venture: 'FixIT',
      label: 'Request Walkthrough'
    },
  },
  {
    id: 'ventures',
    chapter: '03',
    total: '05',
    category: 'COMMERCIAL BLUEPRINTS',
    title: '6 Production Blueprints',
    roleTag: 'StartupOS · DupeScout · BusinessPay · CollabKaro',
    metrics: [
      { label: 'Commercial Models', value: '6 Platforms' },
      { label: 'Billing Systems', value: 'Multi-Tenant' },
      { label: 'Parity Test Suite', value: '100% Verified' }
    ],
    thesis: 'Complete commercial specifications addressing SaaS governance, patent deduplication, and creator collaboration.',
    primaryAction: { type: 'scroll', target: '#ventures', label: 'Explore Ventures' },
    secondaryAction: { type: 'scroll', target: '#casestudies', label: 'Case Studies' },
  },
  {
    id: 'opensource',
    chapter: '04',
    total: '05',
    category: 'AI DEVTOOLS & INFRA',
    title: '6 Open Source DevTools',
    roleTag: 'SpecForge · ContextPrism · ReverseUI · BrainGym',
    metrics: [
      { label: 'Public Tooling', value: '6 Repos' },
      { label: 'FinOps Engine', value: 'Token Routing' },
      { label: 'Architecture', value: 'CLI + Web' }
    ],
    thesis: 'Open-source tools automating PRD generation, LLM context-window token optimization, and UI AST reverse engineering.',
    primaryAction: {
      type: 'external',
      label: 'GitHub Repos ↗',
      url: 'https://github.com/1997agarwal'
    },
    secondaryAction: { type: 'scroll', target: '#opensource', label: 'Inspect Tools' },
  },
  {
    id: 'accolades',
    chapter: '05',
    total: '05',
    category: 'VERIFIED IMPACT',
    title: '7 Honors & Credentials',
    roleTag: 'Tekion 2025 · 4x Tally Awards · NITI Aayog Top 5',
    metrics: [
      { label: 'National Award', value: 'NITI Aayog' },
      { label: 'Tekion Award', value: 'May 2025' },
      { label: 'Certification', value: 'Duke CE (PM)' }
    ],
    thesis: 'Demonstrated history of execution excellence recognized across engineering, product management, and corporate leadership.',
    primaryAction: { type: 'contact', label: 'Direct Signal ↗' },
    secondaryAction: { type: 'resume', label: 'View Credentials' },
  },
];

export default function ExecutiveTelemetryHUD({
  onOpenContact,
  onOpenResume,
  onRequestWalkthrough,
}) {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMinimized, setIsMinimized] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640;
    }
    return false;
  });
  const [isVisible, setIsVisible] = useState(false);

  // Monitor scroll landmarks via IntersectionObserver and scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 150);
      if (window.scrollY < 200) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const ids = ['accolades', 'opensource', 'ventures', 'startups', 'experience'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -40% 0px', threshold: 0.1 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const currentChapter = CHAPTERS.find((c) => c.id === activeSection) || CHAPTERS[0];

  const handleAction = (action) => {
    if (!action) return;
    if (action.type === 'resume') {
      onOpenResume();
    } else if (action.type === 'contact') {
      onOpenContact();
    } else if (action.type === 'walkthrough') {
      onRequestWalkthrough(action.venture || 'FixIT');
    } else if (action.type === 'scroll' && action.target) {
      if (window.__lenis) {
        window.__lenis.scrollTo(action.target, { offset: -70 });
      } else {
        const targetEl = document.querySelector(action.target);
        if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (action.type === 'external' && action.url) {
      window.open(action.url, '_blank', 'noopener,noreferrer');
    }
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Executive Telemetry Guide"
      className="fixed bottom-5 right-4 sm:right-6 z-40 transition-all duration-300 pointer-events-auto"
    >
      {isMinimized ? (
        /* Minimized Capsule State */
        <button
          onClick={() => setIsMinimized(false)}
          className="group flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#0B0F17]/90 hover:bg-[#0B0F17] backdrop-blur-xl border border-white/15 hover:border-cyan-500/50 shadow-2xl shadow-black/80 text-xs font-mono transition-all transform hover:scale-[1.02]"
          title="Expand Executive Telemetry HUD"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-400 font-semibold">
            CH {currentChapter.chapter} ·
          </span>
          <span className="text-slate-200 font-bold group-hover:text-cyan-300 transition-colors">
            {currentChapter.title}
          </span>
          <span className="text-[10px] text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-full bg-cyan-500/10">
            Expand HUD ⤢
          </span>
        </button>
      ) : (
        /* Full Executive HUD Console */
        <div className="w-[320px] sm:w-[360px] rounded-2xl bg-[#0B0F17]/92 backdrop-blur-xl border border-white/15 p-4 shadow-2xl shadow-black/90 text-left transition-all">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                {currentChapter.category}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-400">
                [{currentChapter.chapter}/{currentChapter.total}]
              </span>
              <button
                onClick={() => setIsMinimized(true)}
                className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors text-xs font-mono"
                title="Minimize Telemetry HUD"
                aria-label="Minimize Telemetry HUD"
              >
                —
              </button>
            </div>
          </div>

          {/* Active Chapter Details */}
          <div className="mt-3">
            <div className="text-sm font-bold text-white tracking-tight flex items-center justify-between">
              <span>{currentChapter.title}</span>
            </div>
            <div className="text-[11px] text-cyan-300 font-medium mt-0.5 line-clamp-1">
              {currentChapter.roleTag}
            </div>
            <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
              {currentChapter.thesis}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10 bg-white/[0.02] p-2 rounded-xl">
            {currentChapter.metrics.map((m, idx) => (
              <div key={idx} className="text-center">
                <div className="text-[11px] font-mono font-bold text-white">
                  {m.value}
                </div>
                <div className="text-[9px] text-slate-400 uppercase tracking-tight mt-0.5 truncate">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2 mt-3 pt-2">
            <button
              onClick={() => handleAction(currentChapter.primaryAction)}
              className="flex-1 py-1.5 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-all shadow-md shadow-cyan-500/20 text-center truncate"
            >
              {currentChapter.primaryAction.label}
            </button>
            {currentChapter.secondaryAction && (
              <button
                onClick={() => handleAction(currentChapter.secondaryAction)}
                className="py-1.5 px-2.5 rounded-lg bg-surface-card hover:bg-surface-border text-slate-300 hover:text-white border border-surface-border text-xs transition-all truncate"
              >
                {currentChapter.secondaryAction.label}
              </button>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
