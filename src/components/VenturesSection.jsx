import React, { useState } from 'react';
import { ventures } from '../data/portfolioData';

export default function VenturesSection({ onRequestWalkthrough }) {
  const [activeStage, setActiveStage] = useState('ALL');

  const filteredVentures = activeStage === 'ALL'
    ? ventures
    : ventures.filter(v => v.stage === activeStage);

  return (
    <section id="ventures" className="py-20 bg-surface-dark/50 border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-xs font-mono text-brand-cyan mb-3">
            <span>Proprietary 0→1 Software Ventures</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Commercial Software Platforms Built from Scratch
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            End-to-end architectures engineered with React, Node.js, AI orchestration, and production fintech integrations. Private IP available for deep-dive technical walkthroughs.
          </p>
        </div>

        {/* Stage Filter Buttons */}
        <div className="flex justify-center gap-2 mb-12">
          {['ALL', 'BETA', 'ALPHA', 'PROTOTYPE'].map((stage) => (
            <button
              key={stage}
              onClick={() => setActiveStage(stage)}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeStage === stage
                  ? 'bg-brand-cyan text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-surface-card text-slate-400 border border-surface-border hover:text-white'
              }`}
            >
              {stage}
            </button>
          ))}
        </div>

        {/* Ventures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVentures.map((item) => (
            <div
              key={item.name}
              className="bg-surface-card border border-surface-border rounded-2xl p-6 flex flex-col justify-between hover:border-brand-cyan/50 transition-all hover:shadow-xl hover:shadow-cyan-500/5 group"
            >
              {/* Card Top */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-surface-dark text-brand-cyan border border-surface-border">
                    {item.category}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {item.stage}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white group-hover:text-brand-cyan transition-colors mb-2">
                  {item.name}
                </h3>
                <p className="text-xs font-semibold text-slate-300 mb-4">
                  {item.tagline}
                </p>

                {/* Problem vs Solution Callout */}
                <div className="space-y-3 text-xs mb-6">
                  <div className="p-3 rounded-lg bg-surface-dark/80 border border-surface-border">
                    <span className="font-mono text-rose-400 uppercase tracking-wider block text-[10px] mb-1 font-bold">
                      Problem Addressed
                    </span>
                    <p className="text-slate-300 leading-relaxed">{item.problem}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-surface-dark/80 border border-surface-border">
                    <span className="font-mono text-brand-cyan uppercase tracking-wider block text-[10px] mb-1 font-bold">
                      0→1 Architectural Solution
                    </span>
                    <p className="text-slate-300 leading-relaxed">{item.solution}</p>
                  </div>
                </div>

                {/* Delivered Surfaces */}
                <div className="mb-6">
                  <span className="text-[11px] font-mono text-slate-400 block mb-2 uppercase">
                    Shipped Surfaces & Features
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.surfaces.map((s, idx) => (
                      <span key={idx} className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Bottom / Footer CTA */}
              <div className="pt-4 border-t border-surface-border flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Private IP</span>
                </div>

                <div className="flex items-center gap-3">
                  {item.demoUrl && (
                    <a
                      href={item.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                    >
                      <span>Live Showcase ↗</span>
                    </a>
                  )}

                  <button
                    onClick={() => onRequestWalkthrough(item.name)}
                    className="text-xs font-semibold text-brand-cyan hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>Request Demo</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
