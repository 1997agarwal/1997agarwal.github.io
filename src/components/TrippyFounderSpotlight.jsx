import React, { useState, useEffect } from 'react';
import { TRIPPY_FOUNDER_SPOTLIGHT, FIXIT_FOUNDER_SPOTLIGHT } from '../data/portfolioData';
import Expandable from './Expandable';

export default function TrippyFounderSpotlight({ onRequestWalkthrough }) {
  const [activeStartup, setActiveStartup] = useState('trippy');

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#fixit') {
        setActiveStartup('fixit');
      } else if (hash === '#trippy' || hash === '#startups') {
        setActiveStartup('trippy');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const isTrippy = activeStartup === 'trippy';
  const t = isTrippy ? TRIPPY_FOUNDER_SPOTLIGHT : FIXIT_FOUNDER_SPOTLIGHT;

  return (
    <section id="startups" className="relative py-16 sm:py-24 bg-gradient-to-b from-surface-dark via-[#0d1424] to-surface-dark border-t border-b border-surface-border/80 overflow-hidden">
      {/* Anchor targets for direct deep-linking */}
      <div id="trippy" className="absolute -top-24 pointer-events-none" />
      <div id="fixit" className="absolute -top-24 pointer-events-none" />

      {/* Ambient background glows */}
      <div className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
        isTrippy ? 'bg-teal-500/10' : 'bg-cyan-500/10'
      }`} />
      <div className={`absolute bottom-0 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
        isTrippy ? 'bg-amber-500/10' : 'bg-indigo-500/10'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Top Header Tag & Startup Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-surface-card border border-surface-border shadow-inner">
            <button
              onClick={() => setActiveStartup('trippy')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                isTrippy
                  ? 'bg-gradient-to-r from-amber-500/20 via-teal-500/20 to-brand-cyan/20 border border-amber-500/50 text-amber-300 shadow-md shadow-amber-500/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="text-sm">🏕️</span>
              <span>Trippy</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Consumer AI
              </span>
            </button>

            <button
              onClick={() => setActiveStartup('fixit')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                !isTrippy
                  ? 'bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-brand-cyan/20 border border-cyan-500/50 text-cyan-300 shadow-md shadow-cyan-500/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="text-sm">🛠️</span>
              <span>FixIT</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                B2B SaaS
              </span>
            </button>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-semibold">
              {isTrippy ? 'Testing with Live Cohorts' : '76/76 Tests Passing · Active Beta'}
            </span>
            <span className="text-slate-600">|</span>
            <span>{t.brandOrg}</span>
          </div>
        </div>

        {/* Main Founder Card */}
        <div className={`bg-surface-card/90 backdrop-blur-xl border-2 rounded-3xl p-5 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden transition-all duration-500 ${
          isTrippy
            ? 'border-teal-500/30 shadow-teal-950/30'
            : 'border-cyan-500/30 shadow-cyan-950/30'
        }`}>
          
          {/* Subtle watermark / decorative brand tag */}
          <div className="absolute -right-8 -bottom-10 text-9xl font-black text-white/[0.02] font-mono select-none pointer-events-none uppercase">
            {t.name}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Col: Narrative, Problem/Solution, Founder Role */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                    {t.name}
                  </h2>
                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded border ${
                    isTrippy
                      ? 'bg-teal-500/10 text-teal-300 border-teal-500/30'
                      : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                  }`}>
                    {t.category}
                  </span>
                </div>
                <p className={`text-base sm:text-lg font-semibold ${
                  isTrippy ? 'text-teal-400' : 'text-cyan-400'
                }`}>
                  {t.tagline}
                </p>
                <p className="text-xs font-mono text-amber-300/90 mt-1">
                  Founder Role: <span className="text-white font-bold">{t.founderRole}</span>
                </p>
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                {t.liveUrl ? (
                  <a
                    href={t.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center py-3 px-5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs font-mono transition-all shadow-md shadow-teal-500/20"
                  >
                    ▶ Explore {t.name} Beta App ↗
                  </a>
                ) : (
                  <button
                    onClick={() => onRequestWalkthrough(`${t.name}: Enterprise B2B Pilot & Architecture Walkthrough`)}
                    className="py-3 px-5 rounded-xl bg-brand-cyan hover:bg-cyan-300 text-slate-950 font-bold text-xs font-mono transition-all shadow-md shadow-cyan-500/20"
                  >
                    ▶ Request B2B Pilot / Tech Walkthrough →
                  </button>
                )}
                <button
                  onClick={() => onRequestWalkthrough(`${t.name}: Investment & Co-founder Discussion`)}
                  className="py-3 px-5 rounded-xl bg-surface-dark hover:bg-slate-800 text-amber-300 hover:text-white border border-amber-500/50 font-bold text-xs font-mono transition-all"
                >
                  Talk to the Founder →
                </button>
              </div>

              {/* The Mission Quote */}
              <blockquote className="border-l-4 border-amber-400/80 pl-4 py-1 italic text-slate-200 text-sm sm:text-base font-medium">
                "{t.mission}"
              </blockquote>

              {/* Market Thesis & 0-to-1 Architecture */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-surface-dark/90 border border-surface-border">
                  <span className="font-mono text-rose-400 uppercase tracking-wider block text-xs font-bold mb-1">
                    Market Friction & Founder Thesis
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {t.problem}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface-dark/90 border border-surface-border">
                  <span className={`font-mono uppercase tracking-wider block text-xs font-bold mb-1 ${
                    isTrippy ? 'text-teal-300' : 'text-cyan-300'
                  }`}>
                    0→1 Product Solution & Systems Engine
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {t.solution}
                  </p>
                </div>
              </div>

              {/* Shipped Operational Surfaces */}
              <Expandable label="product surfaces">
                <span className="text-xs font-mono text-slate-400 block mb-2 uppercase font-semibold">
                  Delivered Surfaces & Sub-Systems
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {t.surfaces.map((s, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-surface-dark/60 border border-surface-border/80 flex items-start gap-2">
                      <span className={`mt-0.5 ${isTrippy ? 'text-teal-400' : 'text-cyan-400'}`}>✦</span>
                      <div>
                        <div className="text-xs font-bold text-slate-100">{s.name}</div>
                        <div className="text-xs text-slate-400 leading-tight">{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Expandable>

            </div>

            {/* Right Col: Traction Metrics, Tech Stack, & Investor / Co-founder Pitch Box */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Product Pillars */}
              <div className="grid grid-cols-2 gap-3">
                {t.pillars.map((p, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-surface-dark/80 border border-surface-border">
                    <div className="text-sm font-bold text-white leading-tight">
                      {p.label}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1.5 leading-snug">
                      {p.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <Expandable label="engineering stack">
                <div className="p-4 rounded-2xl bg-surface-dark/70 border border-surface-border">
                  <span className="text-xs font-mono text-slate-400 block mb-2 uppercase font-semibold">
                    Production Engineering Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {t.techStack.map((tech, idx) => (
                      <span key={idx} className={`text-xs px-2.5 py-1 rounded-md bg-slate-800/90 border border-slate-700/80 font-mono ${
                        isTrippy ? 'text-teal-300' : 'text-cyan-300'
                      }`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Expandable>

              {/* Special Box: For Investors & Co-Founders */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-surface-dark to-brand-cyan/10 border-2 border-amber-500/40 space-y-3 shadow-lg shadow-amber-500/5">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🤝</span>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Investors & Partners Callout
                  </h3>
                </div>
                
                {isTrippy ? (
                  <>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Trippy is in active beta testing. We are acquiring our dedicated custom domain and incorporating as an independent traveltech startup. 
                      Open to conversations with:
                    </p>

                    <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                      <li><strong className="text-amber-300">Angel Investors & Micro-VCs:</strong> Exploring early pre-seed allocation and strategic growth partnerships.</li>
                      <li><strong className="text-teal-300">Prospective Co-founders & Early Team:</strong> Looking for a technical co-founder / founding engineers (Full-Stack & React Native) and travel community leads.</li>
                    </ul>
                  </>
                ) : (
                  <>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      FixIT is in active beta testing with early engineering and product teams. Formulating enterprise pilots and pre-seed syndicate allocation.
                      Open to conversations with:
                    </p>

                    <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                      <li><strong className="text-amber-300">Angel Investors & B2B SaaS VCs:</strong> Exploring early pre-seed allocation and B2B SaaS GTM acceleration.</li>
                      <li><strong className="text-cyan-300">Enterprise Design Partners & Solvers:</strong> Engineering leaders looking to cut bug backlog debt and freelance technocrats seeking paid bounties.</li>
                    </ul>
                  </>
                )}

                <button
                  onClick={() => onRequestWalkthrough(`${t.name}: Investment & Partnership Discussion`)}
                  className="w-full py-2.5 px-4 rounded-xl bg-surface-card hover:bg-slate-800 text-amber-300 hover:text-white border border-amber-500/50 font-bold text-xs font-mono transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Connect with Founder</span>
                  <span>→</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
