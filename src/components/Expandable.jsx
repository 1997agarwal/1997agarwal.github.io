import React, { useState } from 'react';

// Always expanded on desktop (lg+). On phones/tablets the content starts open so it is
// readable without a tap; the toggle lets the reader collapse it to skim.
// Pure CSS breakpoint, so there is no layout jump or JS media query.
export default function Expandable({ label, children, className = '', defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

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
