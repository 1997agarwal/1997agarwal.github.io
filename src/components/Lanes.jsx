import React from 'react';
import { Link } from 'react-router-dom';
import {
  CORPORATE_EXPERIENCE,
  TRIPPY_FOUNDER_SPOTLIGHT,
  FIXIT_FOUNDER_SPOTLIGHT,
  COMMERCIAL_VENTURES,
  OPEN_SOURCE_TOOLS,
} from '../data/portfolioData';

// Every project is listed, as compact rows. The lists read straight from the data, so a new
// project added to portfolioData.js appears here with no layout change.
// The one headline number per company shown here. Other numbers appear in their own sections.
const KPI_INDEX = { tekion: 1, tally: 1, shiprocket: 0, frendy: 1 };
const kpi = (c) => c.impact[KPI_INDEX[c.id] ?? 0];

export default function Lanes() {
  const startupRows = [TRIPPY_FOUNDER_SPOTLIGHT, FIXIT_FOUNDER_SPOTLIGHT].map((s) => ({
    key: s.name,
    title: s.name,
    meta: `${s.category} · ${s.stage}`,
    line: s.tagline,
    to: s.name === 'Trippy' ? '/trippy' : '/fixit',
  }));
  const commercialRows = COMMERCIAL_VENTURES.map((v) => ({
    key: v.id,
    title: v.name,
    meta: `${v.category} · ${v.stage}`,
    line: v.tagline,
    to: `/ventures/${v.id}`,
  }));
  const ossRows = OPEN_SOURCE_TOOLS.map((t) => ({
    key: t.id,
    title: t.name,
    meta: `${t.category} · ${t.license || 'MIT'}`,
    line: t.tagline,
    to: `/open-source/${t.id}`,
  }));

  return (
    <section aria-labelledby="lanes-heading" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-xs font-mono uppercase tracking-widest text-brand-cyan mb-3">What I've built</p>
        <h2 id="lanes-heading" className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Four arenas, one builder.
        </h2>
      </div>

      {/* 1. Corporate experience */}
      <Arena
        id="experience"
        number="01"
        eyebrow="Corporate experience"
        title="Products I shipped inside growing companies"
        desc="Product roles from fintech to edtech to logistics, each with measurable outcomes."
        cta={{ to: '/experience', label: 'Full experience' }}
        accent="text-brand-cyan"
      >
        <ol className="relative border-l border-surface-border ml-2 space-y-6">
          {CORPORATE_EXPERIENCE.map((c) => (
            <li key={c.id} className="pl-6 relative">
              <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-brand-cyan" />
              <Link to="/experience" className="group block">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-cyan transition-colors">{c.company}</span>
                  <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400">{c.period}</span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">{c.role}</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-extrabold font-mono text-brand-cyan">{kpi(c).value}</span>
                  <span className="text-xs text-slate-600 dark:text-slate-400">{kpi(c).label}</span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </Arena>

      {/* 2. Startups */}
      <Arena
        id="startups"
        number="02"
        eyebrow="Startups I founded"
        title="From idea to live beta, founder-led"
        desc="A consumer AI travel network and a B2B feedback-to-fix platform. Both are in active beta."
        cta={{ to: '/startups', label: 'Explore both startups' }}
        accent="text-amber-600 dark:text-amber-300"
      >
        <Rows rows={startupRows} hover="group-hover:text-amber-600 dark:group-hover:text-amber-300" />
      </Arena>

      {/* 3. Commercial projects */}
      <Arena
        id="platforms"
        number="03"
        eyebrow="Commercial projects"
        title={`${COMMERCIAL_VENTURES.length} platforms built end to end`}
        desc="Problem framing, architecture and shipped product for each platform. Private IP, with walkthroughs on request."
        cta={{ to: '/ventures', label: `All ${COMMERCIAL_VENTURES.length} platforms` }}
        accent="text-brand-blue"
      >
        <Rows rows={commercialRows} hover="group-hover:text-brand-blue" />
      </Arena>

      {/* 4. Open source */}
      <Arena
        id="open-source"
        number="04"
        eyebrow="Open-source projects"
        title={`${OPEN_SOURCE_TOOLS.length} open-source projects, MIT licensed`}
        desc="Agentic dev tools, LLM cost control, and interactive AI experiments. Free to read, run and fork."
        cta={{ to: '/open-source', label: `All ${OPEN_SOURCE_TOOLS.length} projects` }}
        accent="text-emerald-600 dark:text-emerald-400"
      >
        <Rows rows={ossRows} hover="group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
      </Arena>
    </section>
  );
}

// A short list of rows separated by hairlines. Reads as a list, not a grid of boxes.
function Rows({ rows, hover }) {
  return (
    <ul className="divide-y divide-surface-border border-y border-surface-border">
      {rows.map((r) => (
        <li key={r.key}>
          <Link to={r.to} className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 py-4">
            <div className="sm:w-56 flex-shrink-0">
              <div className={`text-lg font-bold text-slate-900 dark:text-white transition-colors ${hover}`}>{r.title}</div>
              <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400 mt-0.5">{r.meta}</div>
            </div>
            <p className="flex-grow text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">{r.line}</p>
            <span className="hidden sm:inline text-brand-cyan transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Arena({ id, number, eyebrow, title, desc, cta, accent, children }) {
  return (
    <div id={id} className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
      <div className="lg:col-span-5 lg:sticky lg:top-28">
        <div className={`text-5xl font-black font-mono leading-none mb-4 opacity-30 ${accent}`}>{number}</div>
        <p className={`text-xs font-mono uppercase tracking-widest mb-3 ${accent}`}>{eyebrow}</p>
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight mb-4">{title}</h3>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
      </div>
      {/* The action sits under the content, so both columns end at about the same height */}
      <div className="lg:col-span-7">
        {children}
        <div className="mt-8">
          <Link to={cta.to} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm font-semibold text-slate-900 dark:text-white hover:text-brand-cyan transition-colors">
            {cta.label} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
