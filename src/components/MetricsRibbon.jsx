import React from 'react';
import { metrics } from '../data/portfolioData';

export default function MetricsRibbon() {
  return (
    <section aria-label="Career highlights" className="py-10 border-y border-surface-border bg-surface-dark/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-3 rounded-lg hover:bg-surface-card/40 transition-colors">
              <span className="text-3xl sm:text-4xl font-extrabold text-brand-cyan tracking-tight font-mono">
                {metric.value}
              </span>
              <span className="text-xs font-semibold text-slate-200 mt-1 uppercase tracking-wider">
                {metric.label}
              </span>
              <span className="text-xs text-slate-400 mt-0.5 font-light">
                {metric.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
