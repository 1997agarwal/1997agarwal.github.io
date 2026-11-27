import React from 'react';
import { Link } from 'react-router-dom';
import BackLink from '../components/BackLink';
import { TRIPPY_FOUNDER_SPOTLIGHT, FIXIT_FOUNDER_SPOTLIGHT } from '../data/portfolioData';
import { usePageMeta } from '../components/PageMeta';

// Index for the two startups. The navigation links here so both products are visible.
const STARTUPS = [
  { s: TRIPPY_FOUNDER_SPOTLIGHT, to: '/trippy', accent: 'text-teal-600 dark:text-teal-300', ring: 'hover:border-teal-400/60' },
  { s: FIXIT_FOUNDER_SPOTLIGHT, to: '/fixit', accent: 'text-cyan-600 dark:text-cyan-300', ring: 'hover:border-cyan-400/60' },
];

export default function StartupsPage() {
  usePageMeta({ title: 'Startups', description: 'Trippy, a consumer AI travel network, and FixIT, a B2B feedback-to-fix platform. Both in active beta.' });
  return (
    <div className="pt-28 md:pt-36 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackLink />
        <header className="mt-8 mb-12 max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-widest text-brand-cyan mb-3">Startups I founded</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight mb-4">
            Two products, both in active beta.
          </h1>
          <p className="text-slate-600 dark:text-slate-400">A consumer AI travel network and a B2B feedback-to-fix platform.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {STARTUPS.map(({ s, to, accent, ring }) => (
            <Link key={s.name} to={to} className={`lift-card group glass rounded-3xl p-8 flex flex-col border border-transparent ${ring}`}>
              <div className="flex items-center gap-2 mb-5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">● {s.stage}</span>
                <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400">{s.category}</span>
              </div>
              <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2">{s.name}</h2>
              <p className={`text-sm font-semibold mb-4 ${accent}`}>{s.tagline}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-grow mb-6">{s.mission}</p>
              <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-brand-cyan transition-colors">
                Open {s.name} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
