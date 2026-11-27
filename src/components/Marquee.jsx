import React from 'react';
import { ventures, openSourceTools } from '../data/portfolioData';

const ITEMS = [
  'Trippy',
  'FixIT',
  ...ventures.map((v) => v.name),
  ...openSourceTools.map((t) => t.name),
  'Tekion',
  'Tally',
  'Shiprocket',
  'Frendy',
];

// Decorative ticker. The list is rendered twice so the loop is seamless.
export default function Marquee() {
  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-surface-border bg-surface-card/50 py-5">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {[...ITEMS, ...ITEMS].map((name, i) => (
          <span key={i} className="flex items-center gap-10 text-sm font-mono font-semibold text-slate-600 dark:text-slate-400">
            <span>{name}</span>
            <span className="text-brand-cyan">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
