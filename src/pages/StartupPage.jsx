import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import BackLink from '../components/BackLink';
import NotFound from './NotFound';
import { TRIPPY_FOUNDER_SPOTLIGHT, FIXIT_FOUNDER_SPOTLIGHT } from '../data/portfolioData';
import { useSite } from '../context/SiteContext';
import { usePageMeta } from '../components/PageMeta';

// Full-page profile for each startup. Each audience gets its own tab, so a visitor
// reads only what matters to them. Tab state lives in the URL (?tab=travelers) so a
// tab can be shared directly.
const CONFIG = {
  trippy: {
    data: TRIPPY_FOUNDER_SPOTLIGHT,
    theme: {
      text: 'text-teal-600 dark:text-teal-300',
      chip: 'bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/30',
      glow: 'bg-teal-400/25',
      button: 'bg-gradient-to-r from-teal-400 to-brand-cyan hover:from-teal-300 hover:to-cyan-300',
      active: 'bg-teal-500/15 text-teal-700 dark:text-teal-200 border-teal-500/40',
    },
    audiences: [
      {
        id: 'travelers',
        label: 'For travelers',
        title: 'The surfaces travelers use',
        intro: 'Compatibility matching, group trips and live safety features, built for the person taking the trip.',
        surfaces: ['Consumer Matchmaker', 'Bike & Road Trip Hub', 'Hostel Group Connect'],
        pillars: ['Compatibility-Led Matching', 'Safety by Design'],
      },
      {
        id: 'hosts',
        label: 'For hosts & creators',
        title: 'The surfaces hosts run their business on',
        intro: 'Itinerary building and direct booking lead capture for tour hosts, without platform fees taking a cut.',
        surfaces: ['Partner Host CRM'],
        pillars: ['Zero-Commission Hosts', 'India-First Network'],
      },
      {
        id: 'ops',
        label: 'Trust & operations',
        title: 'Keeping the network trustworthy',
        intro: 'Role-based access, verified host stamps and an immutable event ledger behind the scenes.',
        surfaces: ['Trust & Safety Admin'],
        pillars: [],
      },
    ],
    investors: {
      intro:
        'Trippy is in active beta testing. We are acquiring our dedicated custom domain and incorporating as an independent traveltech startup. Open to conversations with:',
      points: [
        ['Angel Investors & Micro-VCs:', 'Exploring early pre-seed allocation and strategic growth partnerships.'],
        ['Prospective Co-founders & Early Team:', 'Looking for a technical co-founder / founding engineers (Full-Stack & React Native) and travel community leads.'],
      ],
    },
  },
  fixit: {
    data: FIXIT_FOUNDER_SPOTLIGHT,
    theme: {
      text: 'text-cyan-600 dark:text-cyan-300',
      chip: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/30',
      glow: 'bg-cyan-400/25',
      button: 'bg-gradient-to-r from-brand-cyan to-blue-500 hover:from-cyan-300 hover:to-blue-400',
      active: 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-200 border-cyan-500/40',
    },
    audiences: [
      {
        id: 'users',
        label: 'For users',
        title: 'How users report what breaks',
        intro: 'Structured bug filing with auto-deduplication and an embeddable widget, so feedback arrives as something a team can act on.',
        surfaces: ['Reporter Feedback Portal'],
        pillars: ['Structured Ingestion'],
      },
      {
        id: 'product-teams',
        label: 'For product teams',
        title: 'Triage and support for product teams',
        intro: 'A ranked issue queue with transparent priority scores, Linear and GitHub sync, and a private support desk.',
        surfaces: ['Triage Command Center', 'Customer Support Desk'],
        pillars: ['Triage Command Center'],
      },
      {
        id: 'solvers',
        label: 'For solvers',
        title: 'Where fixes get paid',
        intro: 'Claim a bounty, submit a patch, and get paid from escrow when it is accepted.',
        surfaces: ['Solver Bounty Marketplace'],
        pillars: ['Bounty Escrow Marketplace'],
      },
      {
        id: 'ops',
        label: 'Ops & ledger',
        title: 'Money, identity and disputes',
        intro: 'KYC reviews, a double-entry ledger and dispute resolution keep the marketplace balanced.',
        surfaces: ['Fixit Ops & Ledger Console'],
        pillars: ['Double-Entry Balanced Ledger'],
      },
    ],
    investors: {
      intro:
        'FixIT is in active beta testing with early engineering and product teams. Formulating enterprise pilots and pre-seed syndicate allocation. Open to conversations with:',
      points: [
        ['Angel Investors & B2B SaaS VCs:', 'Exploring early pre-seed allocation and B2B SaaS GTM acceleration.'],
        ['Enterprise Design Partners & Solvers:', 'Engineering leaders looking to cut bug backlog debt and freelance technocrats seeking paid bounties.'],
      ],
    },
  },
};


export default function StartupPage({ active }) {
  const cfg = CONFIG[active];
  const { openContact } = useSite();
  const [params, setParams] = useSearchParams();
  usePageMeta({ title: cfg?.data.name, description: cfg?.data.tagline });

  if (!cfg) return <NotFound />;

  const t = cfg.data;
  const { theme } = cfg;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    ...cfg.audiences.map((a) => ({ id: a.id, label: a.label })),
    { id: 'tech', label: 'Under the hood' },
    { id: 'investors', label: 'Investors & partners' },
  ];

  const requested = params.get('tab');
  const current = tabs.some((x) => x.id === requested) ? requested : 'overview';

  const select = (id) => {
    setParams(id === 'overview' ? {} : { tab: id }, { replace: true });
    document.getElementById('startup-tabs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const launchLabel = `Launch ${t.name}`;

  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 md:pt-36 pb-12">
        <div className="absolute inset-0 hero-grid pointer-events-none" />
        <div className={`aurora-blob -top-24 -right-16 w-[30rem] h-[30rem] ${theme.glow}`} />
        <div className="aurora-blob top-1/2 -left-24 w-[22rem] h-[22rem] bg-brand-purple/15" style={{ animationDelay: '-8s' }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackLink />

          <div className="flex flex-wrap items-center gap-2 mt-8 mb-6">
            <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md border ${theme.chip}`}>{t.category}</span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-md border border-surface-border bg-surface-card text-slate-600 dark:text-slate-300">
              {t.stage}
            </span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-md border border-surface-border bg-surface-card text-slate-600 dark:text-slate-300">
              {t.statusBadge}
            </span>
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-slate-900 dark:text-white mb-4">
            {t.name}
          </h1>
          <p className={`text-xl sm:text-2xl font-semibold mb-6 ${theme.text}`}>{t.tagline}</p>

          <blockquote className="border-l-4 border-amber-500 dark:border-amber-400/80 pl-4 py-1 italic text-lg text-slate-800 dark:text-slate-200 max-w-2xl mb-8">
            "{t.mission}"
          </blockquote>

          <div className="flex flex-wrap items-center gap-3">
            {t.liveUrl && (
              <a
                href={t.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-3.5 rounded-xl text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 transition-all flex items-center gap-2 ${theme.button}`}
              >
                <span>▶ {launchLabel}</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}
            <button
              onClick={() => openContact(`${t.name}: Founder Walkthrough Request`)}
              className="px-6 py-3.5 rounded-xl glass text-amber-700 dark:text-amber-300 font-semibold text-sm hover:-translate-y-0.5 transition-all"
            >
              Talk to the founder →
            </button>
            <span className="text-xs font-mono text-slate-600 dark:text-slate-400 ml-1">{t.founderRole} · {t.brandOrg}</span>
          </div>
        </div>
      </section>

      {/* Sticky tab bar */}
      <div id="startup-tabs" className="sticky top-16 z-30 border-y border-surface-border bg-surface-dark/85 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1 whitespace-nowrap text-xs font-mono text-slate-500 dark:text-slate-400">
            <Link to="/startups" className="hover:text-brand-cyan">All startups</Link>
          </div>
          <div role="tablist" aria-label={`${t.name} sections`} className="flex gap-1.5 overflow-x-auto py-3 scrollbar-none flex-grow">
            {tabs.map((tab) => {
              const isOn = tab.id === current;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isOn}
                  onClick={() => select(tab.id)}
                  className={`whitespace-nowrap px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    isOn ? theme.active : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          {t.liveUrl && (
            <a
              href={t.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 whitespace-nowrap px-4 py-2 rounded-lg text-slate-950 text-xs font-bold bg-brand-cyan hover:bg-cyan-400"
            >
              ▶ Launch ↗
            </a>
          )}
        </div>
      </div>

      {/* Tab panels */}
      <div role="tabpanel" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {current === 'overview' && <Overview t={t} theme={theme} onPick={select} audiences={cfg.audiences} />}

        {cfg.audiences.some((a) => a.id === current) && (
          <Audience
            audience={cfg.audiences.find((a) => a.id === current)}
            t={t}
            theme={theme}
          />
        )}

        {current === 'tech' && <Tech t={t} theme={theme} />}

        {current === 'investors' && <Investors t={t} theme={theme} cfg={cfg} openContact={openContact} />}
      </div>
    </div>
  );
}

function Overview({ t, theme, onPick, audiences }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-6 rounded-2xl glass">
          <span className="font-mono text-rose-500 dark:text-rose-400 uppercase tracking-wider block text-xs font-bold mb-3">
            Market friction & founder thesis
          </span>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{t.problem}</p>
        </div>
        <div className="p-6 rounded-2xl glass">
          <span className={`font-mono uppercase tracking-wider block text-xs font-bold mb-3 ${theme.text}`}>
            0→1 product solution & systems engine
          </span>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{t.solution}</p>
        </div>
      </div>

      <div>
        <h2 className="text-xs font-mono uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-4">What it stands on</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {t.pillars.map((p) => (
            <div key={p.label} className="p-6 rounded-2xl bg-surface-card border border-surface-border">
              <div className="text-lg font-bold text-slate-900 dark:text-white mb-1">{p.label}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xs font-mono uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-4">Explore by audience</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {audiences.map((a) => (
            <button
              key={a.id}
              onClick={() => onPick(a.id)}
              className="lift-card text-left p-5 rounded-2xl glass group"
            >
              <div className="text-sm font-bold text-slate-900 dark:text-white mb-1">{a.label}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">{a.intro}</div>
              <span className={`text-xs font-semibold ${theme.text}`}>
                Open <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

function Audience({ audience, t, theme }) {
  const surfaces = t.surfaces.filter((s) => audience.surfaces.includes(s.name));
  return (
    <>
      <div className="max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">{audience.title}</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{audience.intro}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {surfaces.map((s) => (
          <div key={s.name} className="p-6 rounded-2xl bg-surface-card border border-surface-border">
            <div className={`text-xs font-mono mb-2 ${theme.text}`}>✦ Shipped surface</div>
            <div className="text-xl font-bold text-slate-900 dark:text-white mb-2">{s.name}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{s.desc}</div>
          </div>
        ))}
      </div>

      {audience.pillars.length > 0 && (
        <div>
          <h3 className="text-xs font-mono uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-3">Principles behind it</h3>
          <div className="flex flex-wrap gap-2">
            {audience.pillars.map((p) => (
              <span key={p} className={`text-sm px-3 py-1.5 rounded-full border ${theme.chip}`}>{p}</span>
            ))}
          </div>
        </div>
      )}

      {t.liveUrl && (
        <div className="p-6 rounded-2xl glass flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">Try it on the live app</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Opens the {t.name} app in a new tab.</div>
          </div>
          <a
            href={t.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg text-slate-950 font-bold text-sm bg-brand-cyan hover:bg-cyan-400 text-center"
          >
            ▶ Launch {t.name} ↗
          </a>
        </div>
      )}
    </>
  );
}

function Tech({ t, theme }) {
  return (
    <>
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">Engineering stack</h2>
        <div className="flex flex-wrap gap-2">
          {t.techStack.map((tech) => (
            <span key={tech} className={`text-sm px-3 py-1.5 rounded-lg border font-mono ${theme.chip}`}>{tech}</span>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xs font-mono uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-4">All delivered surfaces</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {t.surfaces.map((s) => (
            <div key={s.name} className="p-4 rounded-xl bg-surface-card border border-surface-border">
              <div className="text-sm font-bold text-slate-900 dark:text-white">{s.name}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-2xl glass">
        <h2 className="text-xs font-mono uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-3">Summary</h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{t.resumeSummary}</p>
      </div>
    </>
  );
}

function Investors({ t, theme, cfg, openContact }) {
  return (
    <>
      <div className="max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">Investors & partners</h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{cfg.investors.intro}</p>
      </div>

      <ul className="space-y-3 max-w-3xl">
        {cfg.investors.points.map(([label, text]) => (
          <li key={label} className="p-5 rounded-2xl bg-surface-card border border-surface-border text-slate-700 dark:text-slate-300">
            <strong className="block text-slate-900 dark:text-white font-bold mb-1">{label}</strong>
            <span className="text-sm leading-relaxed">{text}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => openContact(`${t.name}: Investment & Partnership Discussion`)}
          className={`px-6 py-3 rounded-xl text-slate-950 font-bold text-sm ${theme.button}`}
        >
          Connect with the founder →
        </button>
        <Link to="/experience" className="px-6 py-3 rounded-xl glass text-slate-900 dark:text-white font-semibold text-sm">
          Founder background
        </Link>
      </div>
    </>
  );
}
