import React from 'react';
import { Link } from 'react-router-dom';
import {
  QUICK_VIEW,
  METRICS,
  accolades,
  education,
  certifications,
  caseStudies,
  personalInfo,
} from '../data/portfolioData';
import { useSite } from '../context/SiteContext';

// Credentials block: resume and LinkedIn first, then awards, education, certifications and case studies.
export default function GoDeeper() {
  const { openResume } = useSite();
  const linkedinFollowers = METRICS.find((m) => m.label === 'LinkedIn Community')?.value;
  const featuredAwards = accolades.slice(0, 4);

  return (
    <section aria-labelledby="credentials-heading" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-xs font-mono uppercase tracking-widest text-brand-cyan mb-3">Credentials</p>
      <h2 id="credentials-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-10 max-w-2xl">
        Credentials and recognition.
      </h2>

      {/* Top: resume + LinkedIn */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="md:col-span-2 glass rounded-3xl p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Resume</div>
            <div className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">{personalInfo.name}</div>
            <p className="text-sm text-slate-600 dark:text-slate-400">{QUICK_VIEW.headline}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => openResume('quick')}
              className="px-5 py-2.5 rounded-xl bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-semibold text-sm shadow-lg shadow-cyan-500/20"
            >
              View 1-page resume
            </button>
            <button
              onClick={() => openResume('full')}
              className="px-5 py-2.5 rounded-xl glass text-slate-900 dark:text-white font-semibold text-sm"
            >
              Full resume
            </button>
          </div>
        </div>

        <a
          href={personalInfo.links.linkedin}
          target="_blank"
          rel="noreferrer"
          className="lift-card group glass rounded-3xl p-7 flex flex-col justify-between"
        >
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">LinkedIn</div>
            <div className="text-3xl font-extrabold font-mono text-brand-blue">{linkedinFollowers}</div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">followers</p>
          </div>
          <span className="mt-6 text-sm font-semibold text-slate-900 dark:text-white group-hover:text-brand-blue transition-colors">
            Connect on LinkedIn <span className="inline-block transition-transform group-hover:translate-x-1">↗</span>
          </span>
        </a>
      </div>

      {/* Middle: awards, education, certifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="glass rounded-3xl p-7">
          <div className="flex items-baseline justify-between mb-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Awards & honors</h3>
            <span className="text-xs font-mono text-amber-600 dark:text-amber-400">{accolades.length} total</span>
          </div>
          <ul className="space-y-4">
            {featuredAwards.map((a) => (
              <li key={a.title + a.year}>
                <div className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">{a.title}</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">{a.issuer} · {a.year}</div>
              </li>
            ))}
          </ul>
          <Link to="/about" className="inline-block mt-5 text-xs font-semibold text-brand-cyan hover:underline">All awards →</Link>
        </div>

        <div className="glass rounded-3xl p-7">
          <div className="flex items-baseline justify-between mb-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Education</h3>
            <span className="text-xs font-mono text-brand-blue">{education.length} programs</span>
          </div>
          <ul className="space-y-4">
            {education.map((e) => (
              <li key={e.institution}>
                <div className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">{e.institution}</div>
                <div className="text-xs text-slate-600 dark:text-slate-400 leading-snug">{e.degree}</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">{e.period}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass rounded-3xl p-7">
          <div className="flex items-baseline justify-between mb-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Certifications</h3>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">{certifications.length} total</span>
          </div>
          <ul className="space-y-4">
            {certifications.map((c) => (
              <li key={c.name}>
                <div className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">{c.name}</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">{c.issuer}{c.year ? ` · ${c.year}` : ''}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom: case studies */}
      <Link to="/case-studies" className="lift-card group glass rounded-3xl p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Case studies, PRDs & business models</div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{caseStudies.length} documents</div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Market research, product analytics, MVP specs and unit economics.</p>
        </div>
        <span className="text-sm font-semibold text-brand-cyan group-hover:translate-x-1 transition-transform">Browse case studies →</span>
      </Link>
    </section>
  );
}
