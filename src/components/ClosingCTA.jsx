import React from 'react';
import { useSite } from '../context/SiteContext';

// Final call to action: every visitor who reads to the bottom gets a clear next step.
export default function ClosingCTA() {
  const { openContact, openResume } = useSite();

  return (
    <section aria-labelledby="closing-heading" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p className="text-xs font-mono uppercase tracking-widest text-brand-cyan mb-3">Next step</p>
      <h2 id="closing-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
        Let's talk product, startups or AI.
      </h2>
      <p className="text-slate-600 dark:text-slate-400 mb-8">Tell me what you're building or hiring for.</p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => openContact()}
          className="px-6 py-3.5 rounded-xl bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-semibold text-sm shadow-xl shadow-cyan-500/25"
        >
          Get in touch →
        </button>
        <button
          onClick={() => openResume('quick')}
          className="px-6 py-3.5 rounded-xl glass text-slate-900 dark:text-white font-medium text-sm"
        >
          View resume
        </button>
      </div>
    </section>
  );
}
