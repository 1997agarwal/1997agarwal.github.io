import React from 'react';

const ACCENTS = {
  cyan: 'bg-brand-cyan/10 border-brand-cyan/30 text-brand-cyan',
  emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  amber: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
  slate: 'bg-white/5 border-white/10 text-slate-300',
};

export default function SectionHeader({ eyebrow, title, subtitle, accent = 'cyan' }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12">
      <div className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-mono mb-4 ${ACCENTS[accent]}`}>
        {eyebrow}
      </div>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
