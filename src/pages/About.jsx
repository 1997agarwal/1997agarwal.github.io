import React from 'react';
import { Link } from 'react-router-dom';
import BackLink from '../components/BackLink';
import MetricsRibbon from '../components/MetricsRibbon';
import AccoladesSection from '../components/AccoladesSection';
import { personalInfo, QUICK_VIEW } from '../data/portfolioData';
import { useSite } from '../context/SiteContext';
import { usePageMeta } from '../components/PageMeta';

export default function About() {
  usePageMeta({ title: 'About', description: 'Profile, at-a-glance metrics, awards, education and certifications for Harshit Agarwal.' });
  const { openContact, openResume } = useSite();

  return (
    <div className="pt-28 md:pt-36">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackLink />

        {/* Profile (moved here from the landing hero) */}
        <section className="mt-8 mb-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-surface-card border border-surface-border shadow-sm">
            <div className="flex items-center gap-4 mb-5">
              <img
                src="/avatar.png"
                alt={personalInfo.name}
                className="w-16 h-16 rounded-full ring-2 ring-brand-cyan/50 object-cover object-top flex-shrink-0"
              />
              <div>
                <h1 className="text-slate-900 dark:text-white font-bold text-2xl">{personalInfo.name}</h1>
                <p className="text-xs text-brand-cyan font-mono font-medium">{personalInfo.location}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">{personalInfo.education}</p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-5">
              {QUICK_VIEW.summary}
            </p>

            <div className="p-3 rounded-lg bg-surface-dark border border-surface-border/60 text-sm text-slate-700 dark:text-slate-300 italic mb-5 leading-relaxed">
              "{personalInfo.bio}"
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs mb-5">
              <div className="p-2.5 rounded-lg bg-surface-dark/80 border border-surface-border/60">
                <div className="text-slate-600 dark:text-slate-400 font-mono uppercase tracking-wider">Role</div>
                <div className="text-slate-900 dark:text-white font-semibold mt-1">PM @ Tekion</div>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-dark/80 border border-surface-border/60">
                <div className="text-slate-600 dark:text-slate-400 font-mono uppercase tracking-wider">Focus</div>
                <div className="text-brand-cyan font-semibold mt-1">Product, AI & Building</div>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-dark/80 border border-surface-border/60">
                <div className="text-slate-600 dark:text-slate-400 font-mono uppercase tracking-wider">Alumni</div>
                <div className="text-slate-900 dark:text-white font-semibold mt-1">Duke University</div>
              </div>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              {QUICK_VIEW.building}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-surface-border/60">
              <button
                onClick={() => openContact()}
                className="px-5 py-2.5 rounded-lg bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all"
              >
                Get in touch
              </button>
              <button
                onClick={() => openResume('quick')}
                className="px-5 py-2.5 rounded-lg bg-surface-dark hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white border border-surface-border font-medium text-sm transition-all"
              >
                View resume
              </button>
              <a href={personalInfo.links.linkedin} target="_blank" rel="noreferrer" className="text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-brand-cyan">
                LinkedIn ↗
              </a>
              <a href={personalInfo.links.github} target="_blank" rel="noreferrer" className="text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-brand-cyan">
                GitHub ↗
              </a>
              <a href={personalInfo.links.medium} target="_blank" rel="noreferrer" className="text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-brand-cyan">
                Medium ↗
              </a>
            </div>
          </div>
        </section>

        {/* At a glance */}
        <section className="mb-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-4">At a glance</h2>
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {QUICK_VIEW.stats.map((s) => (
              <div key={s.label} className="px-3 py-3 rounded-xl bg-surface-card border border-surface-border shadow-sm">
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-xl font-extrabold text-brand-cyan font-mono leading-none">{s.value}</dd>
                <dd className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-snug">{s.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="-mx-4 sm:-mx-6 lg:-mx-8">
          <MetricsRibbon />
        </div>

        <div className="mt-6 mb-6 text-sm text-slate-600 dark:text-slate-400">
          Read the deeper product write-ups in <Link to="/case-studies" className="text-brand-cyan hover:underline">Case Studies, PRDs &amp; Business Models</Link>.
        </div>
      </div>

      {/* Awards, education & certifications (unchanged content) */}
      <AccoladesSection />
    </div>
  );
}
