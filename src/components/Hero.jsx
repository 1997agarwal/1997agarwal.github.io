import React from 'react';
import { personalInfo } from '../data/portfolioData';

export default function Hero({ onOpenContact }) {
  return (
    <header className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Left Column: Core Positioning */}
          <div className="flex-1 text-center md:text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-card border border-surface-border text-xs font-medium text-slate-300 mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{personalInfo.status}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
              Building scalable <span className="text-gradient">fintech platforms</span> & 0→1 systems.
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-slate-300 font-medium mb-4">
              {personalInfo.title}
            </p>

            {/* Short Bio */}
            <p className="text-base text-slate-400 max-w-2xl mb-8 leading-relaxed">
              {personalInfo.summary}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <button
                onClick={onOpenContact}
                className="px-6 py-3 rounded-lg bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 flex items-center gap-2"
              >
                <span>Get in Touch</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <a
                href="#ventures"
                className="px-6 py-3 rounded-lg bg-surface-card hover:bg-surface-border/50 text-slate-200 border border-surface-border font-medium text-sm transition-all flex items-center gap-2"
              >
                <span>Explore Ventures</span>
                <svg className="w-4 h-4 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>

              <a
                href={personalInfo.links.github}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3 rounded-lg bg-surface-card hover:bg-surface-border/50 text-slate-300 border border-surface-border font-medium text-sm transition-all flex items-center gap-2"
                title="View GitHub Profile"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub</span>
              </a>
            </div>

            {/* Mini Trust Credibility Badges */}
            <div className="mt-10 pt-8 border-t border-surface-border/50 flex flex-wrap items-center justify-center md:justify-start gap-6 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="text-brand-cyan font-bold">14+</span> Software Platforms
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <span className="text-brand-cyan font-bold">5M+</span> End Users Served
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <span className="text-brand-cyan font-bold">NITI Aayog</span> Awardee
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Profile Card */}
          <div className="w-full md:w-auto flex justify-center">
            <div className="relative p-1 rounded-2xl bg-gradient-to-br from-brand-cyan/30 via-slate-800/50 to-brand-purple/30 shadow-2xl backdrop-blur-sm max-w-sm">
              <div className="bg-surface-card rounded-xl p-6 border border-surface-border">
                
                {/* Avatar & Header */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative flex-shrink-0">
                    <img
                      src="./avatar.png"
                      alt={personalInfo.name}
                      className="w-16 h-16 rounded-full ring-2 ring-brand-cyan/50 object-cover object-top"
                    />
                    <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-surface-card" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{personalInfo.name}</h3>
                    <p className="text-xs text-brand-cyan font-mono">{personalInfo.location}</p>
                    <p className="text-xs text-slate-400">Duke Univ (PGPM) • B.Tech (ECE)</p>
                  </div>
                </div>

                {/* Core Philosophy */}
                <div className="p-3 rounded-lg bg-surface-dark border border-surface-border/60 text-xs text-slate-300 italic mb-5 leading-relaxed">
                  "{personalInfo.bio}"
                </div>

                {/* Refactored Quick Info Grid (3 clean focus tiles) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-lg bg-surface-dark/80 border border-surface-border/60">
                    <div className="text-slate-400 font-mono uppercase text-[10px] tracking-wider">Role</div>
                    <div className="text-white font-semibold mt-1">PM @ Tekion</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-surface-dark/80 border border-surface-border/60">
                    <div className="text-slate-400 font-mono uppercase text-[10px] tracking-wider">Domains</div>
                    <div className="text-brand-cyan font-semibold mt-1">Fintech, Travel, AI</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-surface-dark/80 border border-surface-border/60">
                    <div className="text-slate-400 font-mono uppercase text-[10px] tracking-wider">Alumni</div>
                    <div className="text-white font-semibold mt-1">Duke & Tally</div>
                  </div>
                </div>

                {/* Social Quick Links */}
                <div className="mt-5 pt-4 border-t border-surface-border/40 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono">Handle: @1997agarwal</span>
                  <div className="flex gap-3">
                    <a href={personalInfo.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-brand-cyan transition-colors">
                      LinkedIn
                    </a>
                    <a href={personalInfo.links.github} target="_blank" rel="noreferrer" className="hover:text-brand-cyan transition-colors">
                      GitHub
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
