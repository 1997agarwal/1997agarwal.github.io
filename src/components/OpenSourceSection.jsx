import React from 'react';
import { openSourceTools } from '../data/portfolioData';

export default function OpenSourceSection() {
  return (
    <section id="opensource" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 mb-3">
          <span>100% Public Open Source</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Developer Tooling & Agentic AI Infrastructure
        </h2>
        <p className="mt-4 text-sm sm:text-base text-slate-400">
          Open-source developer primitives engineered for agentic workflows, deterministic prompt evaluation, and context-window optimization.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {openSourceTools.map((tool) => (
          <div
            key={tool.name}
            className="bg-surface-card border border-surface-border rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/40 transition-all hover:shadow-xl hover:shadow-emerald-500/5 group"
          >
            <div>
              {/* Badge & Stars */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-surface-dark text-emerald-400 border border-surface-border">
                  {tool.category}
                </span>
                <a
                  href={tool.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  title="Star on GitHub"
                >
                  <img
                    src={`https://img.shields.io/github/stars/1997agarwal/${tool.name}?style=social`}
                    alt={`${tool.name} stars`}
                    className="h-5"
                  />
                </a>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-2">
                {tool.name}
              </h3>
              <p className="text-xs font-semibold text-slate-300 mb-4">
                {tool.tagline}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                {tool.description}
              </p>

              {/* Highlights */}
              <div className="mb-6 space-y-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Core Engineering Primitives
                </span>
                {tool.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Stack Chips */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {tool.stack.map((tech, idx) => (
                  <span key={idx} className="text-xs px-2 py-0.5 rounded bg-surface-dark text-slate-300 border border-surface-border font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-surface-border flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                License: {tool.license}
              </span>
              <a
                href={tool.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
              >
                <span>View on GitHub</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
