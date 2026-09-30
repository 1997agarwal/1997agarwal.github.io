import React from 'react';
import { personalInfo, experiences, education, QUICK_VIEW } from '../data/portfolioData';

// One-screen, 7-second summary for recruiters. Reads entirely from portfolioData.js.
export default function ResumeQuickView({ onShowFull }) {
  return (
    <div className="p-6 sm:p-10 print:p-6 text-slate-800">
      {/* Header */}
      <header className="pb-5 mb-6 border-b-2 border-slate-900 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 uppercase">Harshit Agarwal</h1>
          <p className="text-sm sm:text-base font-semibold text-cyan-700 mt-1">{QUICK_VIEW.headline}</p>
        </div>
        <div className="text-xs text-slate-600 sm:text-right space-y-0.5">
          <div>{personalInfo.location.split('•')[0].trim()}</div>
          <a href={`mailto:${personalInfo.email}`} className="text-cyan-700 font-semibold hover:underline block">{personalInfo.email}</a>
          <div className="font-mono text-[11px]">
            <a href={personalInfo.links.linkedin} target="_blank" rel="noreferrer" className="text-cyan-700 hover:underline">linkedin</a>
            {' · '}
            <a href={personalInfo.links.github} target="_blank" rel="noreferrer" className="text-cyan-700 hover:underline">github</a>
          </div>
        </div>
      </header>

      <p className="text-sm sm:text-[15px] leading-relaxed text-slate-700 mb-6">{QUICK_VIEW.summary}</p>

      {/* Headline numbers */}
      <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
        {QUICK_VIEW.stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-slate-50 border border-slate-200 px-3 py-3">
            <dd className="text-2xl font-extrabold text-slate-950 leading-none">{s.value}</dd>
            <dt className="text-[11px] text-slate-500 mt-1.5 leading-tight">{s.label}</dt>
          </div>
        ))}
      </dl>

      {/* Experience at a glance */}
      <section className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
          Experience at a glance
        </h2>
        <ul className="space-y-3">
          {experiences.map((e) => (
            <li key={e.company} className="grid grid-cols-1 sm:grid-cols-[11rem_1fr] gap-x-4 gap-y-0.5">
              <div>
                <div className="text-sm font-bold text-slate-950">{e.company}</div>
                <div className="text-[11px] text-slate-500 font-mono">{e.period}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-cyan-800">{e.role}</div>
                <div className="text-sm text-slate-700 leading-snug">{e.quickLine}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Also building
          </h2>
          <p className="text-sm text-slate-700 leading-snug">{QUICK_VIEW.building}</p>
        </section>
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Recognition
          </h2>
          <ul className="text-sm text-slate-700 space-y-0.5">
            {QUICK_VIEW.topAwards.map((a) => (
              <li key={a}>★ {a}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
          Education
        </h2>
        <ul className="text-sm text-slate-700 space-y-0.5">
          {education.map((edu) => (
            <li key={edu.institution}>
              <strong>{edu.institution.split('/')[0].trim()}</strong>: {edu.degree} ({edu.period})
            </li>
          ))}
        </ul>
      </section>

      {onShowFull && (
        <div className="print:hidden pt-2">
          <button
            type="button"
            onClick={onShowFull}
            className="text-sm font-semibold text-cyan-700 hover:text-cyan-900 hover:underline"
          >
            See the full resume →
          </button>
        </div>
      )}
    </div>
  );
}
