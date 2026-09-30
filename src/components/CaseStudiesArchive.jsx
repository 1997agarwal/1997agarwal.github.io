import React, { useState } from 'react';
import { caseStudies } from '../data/portfolioData';
import SectionHeader from './SectionHeader';

export default function CaseStudiesArchive() {
  const [filter, setFilter] = useState('ALL');
  const [showAll, setShowAll] = useState(false);

  const INITIAL_COUNT = 6;
  const matching = filter === 'ALL'
    ? caseStudies
    : caseStudies.filter(c => c.category === filter);
  const filtered = showAll ? matching : matching.slice(0, INITIAL_COUNT);

  const categories = ['ALL', ...new Set(caseStudies.map(c => c.category))];

  return (
    <section id="casestudies" className="py-20 bg-surface-dark/50 border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          accent="slate"
          eyebrow="Product Management Deep Dives"
          title="Case Studies, PRDs & Business Models"
          subtitle="Product specs, business model canvases, unit economics breakdowns, and user journey analyses authored across Duke University & industry programs."
        />

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setFilter(cat); setShowAll(false); }}
              aria-pressed={filter === cat}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono transition-all ${
                filter === cat
                  ? 'bg-brand-cyan text-slate-950 font-bold shadow-md shadow-cyan-500/20'
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
              className="bg-surface-card border border-surface-border rounded-xl p-6 flex flex-col justify-between hover:border-brand-cyan/50 transition-all hover:shadow-lg group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                  <span className="px-2 py-0.5 rounded bg-surface-dark border border-surface-border text-brand-cyan">
                    {study.category}
                  </span>
                </div>

                <h4 className="text-xl font-bold text-white group-hover:text-brand-cyan transition-colors mb-2">
                  {study.title}
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {study.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-surface-border">
                {study.link ? (
                  <a
                    href={study.link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 px-3 rounded-lg bg-surface-dark hover:bg-brand-cyan/20 border border-surface-border hover:border-brand-cyan/40 text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <span>View Artifact / Document</span>
                    <svg className="w-3.5 h-3.5 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

        {matching.length > INITIAL_COUNT && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="px-6 py-2.5 rounded-lg bg-surface-card hover:bg-slate-800 border border-surface-border hover:border-brand-cyan/50 text-xs font-mono text-slate-200 transition-all"
            >
              {showAll ? 'Show fewer' : `Show all ${matching.length} case studies`}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
