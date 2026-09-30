import React, { useState } from 'react';

// Collapsed behind a toggle on phones/tablets, always expanded on desktop (lg+).
// Pure CSS breakpoint, so there is no layout jump or JS media query.
export default function Expandable({ label, children, className = '' }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="lg:hidden w-full flex items-center justify-between text-xs font-mono text-slate-300 px-3.5 py-3 rounded-lg bg-surface-dark/80 border border-surface-border hover:border-slate-600 transition-colors"
      >
        <span>{open ? 'Hide' : 'Show'} {label}</span>
        <span aria-hidden="true" className="text-brand-cyan text-base leading-none">{open ? '−' : '+'}</span>
      </button>
      <div className={`${open ? 'block mt-4' : 'hidden'} lg:block`}>{children}</div>
    </div>
  );
}
