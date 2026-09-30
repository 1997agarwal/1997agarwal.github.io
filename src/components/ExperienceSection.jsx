import React, { useState } from 'react';
import { experiences } from '../data/portfolioData';
import SectionHeader from './SectionHeader';

function RoleCard({ exp, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <li className="relative pl-9 sm:pl-12 pb-8 last:pb-0">
      {/* Timeline rail + dot */}
      <span className="absolute left-[11px] sm:left-[15px] top-3 bottom-0 w-px bg-gradient-to-b from-brand-cyan/50 to-surface-border" aria-hidden="true" />
      <span className="absolute left-0 sm:left-1 top-1.5 w-6 h-6 rounded-full bg-surface-dark border-2 border-brand-cyan flex items-center justify-center" aria-hidden="true">
        <span className="w-2 h-2 rounded-full bg-brand-cyan" />
      </span>

      <article className="bg-surface-card border border-surface-border rounded-2xl p-5 sm:p-7 hover:border-brand-cyan/30 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {exp.role} <span className="text-brand-cyan">@ {exp.company}</span>
            </h3>
            <p className="text-xs font-mono text-slate-400 mt-1">{exp.businessUnit}</p>
          </div>
          <div className="sm:text-right text-xs font-mono text-slate-300 shrink-0">
            <div className="inline-block px-2.5 py-1 rounded-md bg-surface-dark border border-surface-border">{exp.period}</div>
            <div className="text-slate-400 mt-1.5">{exp.location}</div>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">{exp.quickLine}</p>

        {exp.impact.length > 0 && (
          <dl className={`grid grid-cols-2 gap-2.5 mt-4 ${exp.impact.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-4'}`}>
            {exp.impact.map((m) => (
              <div key={m.label} className="rounded-xl bg-surface-dark/80 border border-surface-border px-3 py-2.5">
                <dd className="text-lg sm:text-xl font-extrabold text-brand-cyan font-mono leading-none">{m.value}</dd>
                <dt className="text-xs text-slate-400 mt-1.5 leading-tight">{m.label}</dt>
              </div>
            ))}
          </dl>
        )}

        {exp.awards && exp.awards.length > 0 && (
          <ul className="flex flex-wrap gap-2 mt-4">
            {exp.awards.map((award) => (
              <li key={award} className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/25">
                ★ {award}
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-5 text-xs font-mono font-semibold text-brand-cyan hover:text-cyan-300 flex items-center gap-1.5"
        >
          <span>{open ? 'Hide details' : `Show ${exp.highlights.length} key deliverables`}</span>
          <span aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`}>⌄</span>
        </button>

        {open && (
          <div className="mt-4 pt-4 border-t border-surface-border">
            <ul className="space-y-3">
              {exp.highlights.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                  <span className="text-brand-cyan mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-cyan shrink-0" aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mt-5">
              {exp.skills.map((skill) => (
                <span key={skill} className="px-2.5 py-1 rounded bg-surface-dark text-slate-300 border border-surface-border text-xs font-mono">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </li>
  );
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Career Timeline"
        title="7+ Years Delivering Enterprise & Consumer Scale"
        subtitle="From B2B payments and AI collections at Tekion to 500K+ learners at Tally and logistics automation at Shiprocket."
      />
      <ol>
        {experiences.map((exp) => (
          <RoleCard key={exp.company} exp={exp} defaultOpen={false} />
        ))}
      </ol>
    </section>
  );
}
