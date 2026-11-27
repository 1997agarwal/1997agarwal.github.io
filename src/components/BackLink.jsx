import React from 'react';
import { Link } from 'react-router-dom';

// Back control as a clear pill button, so it reads as an action rather than stray text.
export default function BackLink({ to = '/', label = 'Home' }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-brand-cyan hover:-translate-x-0.5 transition-all"
    >
      <span aria-hidden="true">←</span>
      <span>Back to {label.toLowerCase()}</span>
    </Link>
  );
}
