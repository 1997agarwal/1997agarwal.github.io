import React from 'react';
import {
  TRIPPY_FOUNDER_SPOTLIGHT,
  ventures,
  openSourceTools,
} from '../data/portfolioData';

export default function ProductsOverview() {
  const tiers = [
    {
      href: '#trippy',
      step: '01',
      label: 'Flagship Startup',
      title: TRIPPY_FOUNDER_SPOTLIGHT.name,
      desc: 'AI solo-travel matching & host OS. Active beta, founder-led.',
      accent: 'border-amber-500/40 hover:border-amber-400/70 text-amber-300',
      cta: 'Meet Trippy',
    },
    {
      href: '#ventures',
      step: '02',
      label: 'Commercial Platforms',
      title: `${ventures.length} Products`,
      desc: ventures.map((v) => v.name).join(', '),
      accent: 'border-brand-cyan/30 hover:border-brand-cyan/70 text-brand-cyan',
      cta: 'See platforms',
    },
    {
      href: '#opensource',
      step: '03',
      label: 'Open Source',
      title: `${openSourceTools.length} Public Tools`,
      desc: openSourceTools.map((t) => t.name).join(', '),
      accent: 'border-emerald-500/30 hover:border-emerald-400/70 text-emerald-400',
      cta: 'Browse tools',
    },
  ];

  return (
    <section aria-labelledby="products-heading" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h2 id="products-heading" className="text-xs font-mono uppercase tracking-widest text-brand-cyan mb-2">
          What I Build
        </h2>
        <p className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Three tiers of products, from startup to open source
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiers.map((t) => (
          <a
            key={t.href}
            href={t.href}
            className={`group block p-5 rounded-2xl bg-surface-card border transition-all hover:-translate-y-0.5 ${t.accent.split(' ').slice(0, 2).join(' ')}`}
          >
            <div className={`text-[11px] font-mono font-bold uppercase tracking-wider mb-2 ${t.accent.split(' ').slice(2).join(' ')}`}>
              {t.step} · {t.label}
            </div>
            <div className="text-lg font-bold text-white mb-1">{t.title}</div>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">{t.desc}</p>
            <span className={`text-xs font-semibold ${t.accent.split(' ').slice(2).join(' ')}`}>
              {t.cta} <span aria-hidden="true">→</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
