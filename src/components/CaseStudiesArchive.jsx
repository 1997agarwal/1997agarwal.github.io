import React, { useState } from 'react';
import { caseStudies } from '../data/portfolioData';

export default function CaseStudiesArchive() {
  const [filter, setFilter] = useState('ALL');

  const filtered = filter === 'ALL'
    ? caseStudies
    : caseStudies.filter(c => c.category === filter);

  const categories = ['ALL', ...new Set(caseStudies.map(c => c.category))];

  return (
    <section id="casestudies" className="py-20 bg-surface-dark/50 border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/30 text-xs font-mono text-brand-purple mb-3">
            <span>Product Management Deep Dives</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Case Studies, PRDs & Business Models
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Comprehensive product specs, business model canvases, unit economics breakdowns, and user journey analyses authored across Duke University & industry programs.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                filter === cat
                  ? 'bg-brand-purple text-white font-bold shadow-md shadow-purple-500/20'
                  : 'bg-surface-card text-slate-400 border border-surface-border hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((study) => (
            <div
              key={study.id}
              className="bg-surface-card border border-surface-border rounded-xl p-6 flex flex-col justify-between hover:border-brand-purple/50 transition-all hover:shadow-lg group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                  <span className="px-2 py-0.5 rounded bg-surface-dark border border-surface-border text-brand-purple">
                    {study.category}
                  </span>
                  <span>{study.date}</span>
                </div>

                <h4 className="text-xl font-bold text-white group-hover:text-brand-purple transition-colors mb-2">
                  {study.title}
                </h4>
                <p className="text-xs text-slate-300 mb-4 font-medium">
                  {study.subtitle}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {study.description}
                </p>

                {/* Highlights */}
                <div className="space-y-1.5 mb-6">
                  {study.highlights.map((h, i) => (
                    <div key={i} className="text-[11px] text-slate-300 flex items-start gap-1.5 font-mono">
                      <span className="text-brand-purple font-bold">›</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-surface-border">
                {study.link ? (
                  <a
                    href={study.link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 px-3 rounded-lg bg-surface-dark hover:bg-brand-purple/20 border border-surface-border hover:border-brand-purple/40 text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <span>View Artifact / Document</span>
                    <svg className="w-3.5 h-3.5 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ) : (
                  <div className="w-full py-2 px-3 rounded-lg bg-surface-dark/50 border border-surface-border text-xs text-center text-slate-400 font-mono">
                    Available Upon Request
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
