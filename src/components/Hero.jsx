import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { personalInfo } from '../data/portfolioData';
import { useSite } from '../context/SiteContext';

const ROLES = ['a Product Manager', 'an AI builder', 'a Founder', 'an open-source author'];

// Landing hero: who I am in one sentence, then a mixed set of highlights.
export default function Hero() {
  const { openContact, openResume } = useSite();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="relative overflow-hidden pt-28 pb-16 md:pt-40 md:pb-24">
      {/* Ambient background */}
      <div className="absolute inset-0 hero-grid pointer-events-none" />
      <div className="aurora-blob -top-32 -left-24 w-[34rem] h-[34rem] bg-brand-cyan/30" />
      <div className="aurora-blob top-10 right-0 w-[28rem] h-[28rem] bg-brand-blue/25" style={{ animationDelay: '-6s' }} />
      <div className="aurora-blob bottom-0 left-1/3 w-[24rem] h-[24rem] bg-brand-purple/20" style={{ animationDelay: '-11s' }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-14 items-center">
        {/* Who I am */}
        <div className="lg:col-span-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-xs font-medium text-slate-700 dark:text-slate-300 mb-7">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full w-2 h-2 bg-emerald-500" />
            </span>
            Open to senior PM, VP Product, or co-founder roles
          </div>

          <div className="flex items-center gap-3 mb-7 justify-center lg:justify-start">
            <div className="p-[2px] rounded-full bg-gradient-to-tr from-brand-cyan to-brand-blue">
              <img src="/avatar.png" alt={personalInfo.name} className="w-12 h-12 rounded-full object-cover object-top bg-surface-card" />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-slate-900 dark:text-white">{personalInfo.name}</div>
              <div className="text-xs font-mono text-slate-600 dark:text-slate-400">{personalInfo.status}</div>
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.05]">
            I build products that <span className="text-gradient">people actually use</span>.
          </h1>

          <p className="text-lg text-slate-700 dark:text-slate-300 mb-4">
            I'm{' '}
            <span key={roleIndex} className="animate-fadeUp inline-block font-bold text-brand-cyan">
              {ROLES[roleIndex]}
            </span>
            {' '}working across enterprise fintech, AI and startups.
          </p>

          <p className="text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Seven years taking ideas from zero to live: payments for car dealerships at Tekion, a learning platform
            for 500K+ students at Tally, and two startups of my own.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-9">
            <button
              onClick={() => openContact()}
              className="group px-6 py-3.5 rounded-xl bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 flex items-center gap-2"
            >
              Get in touch
              <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
            </button>
            <button
              onClick={() => openResume('quick')}
              className="px-6 py-3.5 rounded-xl glass text-slate-900 dark:text-white font-medium text-sm hover:-translate-y-0.5 transition-all"
            >
              View resume
            </button>
            <Link to="/about" className="px-3 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-brand-cyan transition-colors">
              About me →
            </Link>
          </div>
        </div>

        {/* Mixed highlights */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4 auto-rows-min">
          {/* Stat (wide) */}
          <div className="col-span-2 animate-float glass rounded-2xl p-6" style={{ animationDelay: '0s' }}>
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-5xl font-extrabold font-mono text-brand-cyan leading-none">$1.5–2M</div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">projected yearly revenue from the Tekion payments product I lead</p>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 whitespace-nowrap">● Projected</span>
            </div>
          </div>

          {/* Stat */}
          <div className="animate-float glass rounded-2xl p-5" style={{ animationDelay: '-2s' }}>
            <div className="text-3xl font-extrabold font-mono text-brand-blue leading-none">200+</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-snug">dealers live at the Tekion payments go-live</p>
          </div>

          {/* Award */}
          <div className="animate-float glass rounded-2xl p-5" style={{ animationDelay: '-4s' }}>
            <div className="text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-3">Recognition</div>
            <div className="text-lg font-extrabold text-slate-900 dark:text-white leading-tight">Tekion Recognition Award</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">May 2025 · Payment portal delivery</p>
          </div>

          {/* Live product */}
          <Link to="/trippy" className="lift-card animate-float glass rounded-2xl p-5 group" style={{ animationDelay: '-6s' }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full w-2 h-2 bg-teal-500" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-teal-600 dark:text-teal-300">Live beta</span>
            </div>
            <div className="text-lg font-extrabold text-slate-900 dark:text-white">Trippy</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Consumer AI travel network I founded</p>
          </Link>

          {/* Quote */}
          <div className="animate-float glass rounded-2xl p-5" style={{ animationDelay: '-8s' }}>
            <div className="text-2xl text-brand-cyan leading-none mb-2">“</div>
            <p className="text-sm italic text-slate-700 dark:text-slate-300 leading-relaxed">
              Going solo does not mean going alone.
            </p>
            <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400 mt-2">Trippy's mission</p>
          </div>
        </div>
      </div>
    </header>
  );
}
