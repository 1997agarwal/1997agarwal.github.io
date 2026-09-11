import React, { useState } from 'react';
import { experiences } from '../data/portfolioData';

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState(experiences[0].company);

  const activeExp = experiences.find(e => e.company === activeTab) || experiences[0];

  return (
    <section id="experience" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-xs font-mono uppercase tracking-widest text-brand-cyan mb-3">
          Proven Corporate Pedigree
        </h2>
        <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          7+ Years Delivering Enterprise & Consumer Scale
        </h3>
        <p className="mt-4 text-sm sm:text-base text-slate-400">
          From high-frequency B2B payment rails at Tekion to 500K+ enterprise learners at Tally and logistics automation at Shiprocket.
        </p>
      </div>

      {/* Experience Layout: Company Tabs + Content Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Company Selector Tabs */}
        <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-none">
          {experiences.map((exp) => {
            const isSelected = exp.company === activeTab;
            return (
              <button
                key={exp.company}
                onClick={() => setActiveTab(exp.company)}
                className={`text-left p-4 rounded-xl border transition-all flex items-center justify-between min-w-[240px] lg:min-w-0 ${
                  isSelected
                    ? 'bg-surface-card border-brand-cyan text-white shadow-lg shadow-cyan-500/5'
                    : 'bg-surface-dark/60 border-surface-border text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="font-bold text-base flex items-center gap-2">
                    <span>{exp.company}</span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{exp.role}</div>
                  <div className="text-[11px] font-mono text-slate-400 mt-1">{exp.period}</div>
                </div>
                <div className="text-xs font-mono text-brand-cyan/80 bg-brand-cyan/10 px-2 py-1 rounded">
                  {exp.location.split(',')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Detailed PAR Panel */}
        <div className="lg:col-span-8 bg-surface-card border border-surface-border rounded-2xl p-6 sm:p-8 shadow-xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-surface-border">
            <div>
              <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider mb-1">
                {activeExp.period} • {activeExp.location}
              </div>
              <h4 className="text-2xl font-bold text-white">
                {activeExp.role} <span className="text-brand-cyan">@ {activeExp.company}</span>
              </h4>
            </div>
            
            {/* Direct LinkedIn / Proof Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-dark border border-surface-border text-xs text-slate-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Verified Track Record</span>
            </div>
          </div>

          {/* Highlights / PAR bullets */}
          <div className="my-6 space-y-4">
            <h5 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
              Measurable Impacts & Key Deliverables
            </h5>
            <ul className="space-y-3.5">
              {activeExp.highlights.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                  <span className="text-brand-cyan mt-1 flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Awards or Accolades for this company */}
          {activeExp.awards && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 mb-6">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>Accolades & Honours</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1 font-mono">
                {activeExp.awards.map((award, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">★</span>
                    <span>{award}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Core Tech & Skills Stack */}
          <div className="pt-4 border-t border-surface-border">
            <span className="text-xs font-mono uppercase text-slate-400 tracking-wider block mb-3">
              Technologies & Methodologies
            </span>
            <div className="flex flex-wrap gap-2">
              {activeExp.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-surface-dark text-slate-300 border border-surface-border text-xs font-mono"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
