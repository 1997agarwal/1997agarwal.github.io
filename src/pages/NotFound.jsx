import React from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../components/PageMeta';

export default function NotFound() {
  usePageMeta({ title: 'Page not found' });
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 pt-28">
      <div className="text-xs font-mono text-brand-cyan mb-3">404</div>
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">This page doesn't exist</h1>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">The link may be old, or the page may have moved.</p>
      <Link to="/" className="px-5 py-2.5 rounded-lg bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all">
        Back to home
      </Link>
    </div>
  );
}
