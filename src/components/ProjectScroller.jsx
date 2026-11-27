import React, { useEffect, useState } from 'react';

// Shared layout for every project list. A sticky index on the left follows the reader and shows
// the current project's name and actions. The right side is one continuous read.
// Each project can be opened directly with a link such as /ventures#housy.
const ACCENTS = [
  { text: 'text-cyan-600 dark:text-cyan-300', bar: 'bg-cyan-400', btn: 'bg-cyan-400 hover:bg-cyan-300' },
  { text: 'text-blue-600 dark:text-blue-300', bar: 'bg-blue-500', btn: 'bg-blue-400 hover:bg-blue-300' },
  { text: 'text-violet-600 dark:text-violet-300', bar: 'bg-violet-500', btn: 'bg-violet-400 hover:bg-violet-300' },
  { text: 'text-amber-600 dark:text-amber-300', bar: 'bg-amber-400', btn: 'bg-amber-400 hover:bg-amber-300' },
  { text: 'text-emerald-600 dark:text-emerald-300', bar: 'bg-emerald-400', btn: 'bg-emerald-400 hover:bg-emerald-300' },
  { text: 'text-rose-600 dark:text-rose-300', bar: 'bg-rose-400', btn: 'bg-rose-400 hover:bg-rose-300' },
];

const STAGE_TONE = {
  BETA: 'text-emerald-600 dark:text-emerald-400',
  ALPHA: 'text-amber-600 dark:text-amber-400',
};

const sectionId = (id) => `project-${id}`;

/**
 * items: [{ id, name, category, stage?, license?, tagline, audience?, problem, solution,
 *           description?, summary?, access?, points: string[], stack: string[],
 *           demoUrl?, repoUrl? }]
 */
export default function ProjectScroller({ items, onRequest }) {
  const [active, setActive] = useState(items[0]?.id);

  // Highlight the project that is in the reading zone.
  useEffect(() => {
    const els = items.map((i) => document.getElementById(sectionId(i.id))).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id.replace('project-', ''));
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  // Deep links such as /ventures#housy: scroll to the project on load and on later hash changes.
  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.replace('#', '');
      const el = id && document.getElementById(sectionId(id));
      if (el) {
        if (window.__lenis) window.__lenis.scrollTo(el, { offset: -110 });
        else el.scrollIntoView({ block: 'start' });
        setActive(id);
      }
    };
    const t = setTimeout(scrollToHash, 60);
    window.addEventListener('hashchange', scrollToHash);
    return () => {
      clearTimeout(t);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, [items]);

  const go = (id) => {
    const el = document.getElementById(sectionId(id));
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -110 });
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    window.history.replaceState(null, '', `#${id}`);
    setActive(id);
  };

  const activeIndex = Math.max(0, items.findIndex((i) => i.id === active));
  const current = items[activeIndex];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
      {/* Mobile: horizontal index, pinned under the navigation bar */}
      <nav aria-label="Projects" className="lg:hidden sticky top-16 z-30 -mx-4 px-4 py-3 bg-surface-dark/90 backdrop-blur-xl border-b border-surface-border">
        <div className="flex gap-2 overflow-x-auto scrollbar-none">
          {items.map((it, i) => (
            <button
              key={it.id}
              onClick={() => go(it.id)}
              aria-current={it.id === active ? 'true' : undefined}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                it.id === active
                  ? 'bg-brand-cyan text-slate-950 border-brand-cyan'
                  : 'border-surface-border text-slate-700 dark:text-slate-300'
              }`}
            >
              {String(i + 1).padStart(2, '0')} {it.name}
            </button>
          ))}
        </div>
      </nav>

      {/* Desktop: sticky index that follows the reader */}
      <aside className="hidden lg:block lg:col-span-4">
        <nav aria-label="Projects" className="sticky top-28">
          <div className="mb-6 p-4 rounded-2xl glass">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Now reading · {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </div>
            <div className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight">{current?.name}</div>
            {current?.demoUrl && (
              <div className="mt-3 text-xs font-semibold">
                <a href={current.demoUrl} target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline">Launch live ↗</a>
              </div>
            )}
          </div>

          <ol className="space-y-1 border-l border-surface-border">
            {items.map((it, i) => {
              const on = it.id === active;
              const a = ACCENTS[i % ACCENTS.length];
              return (
                <li key={it.id}>
                  <button
                    onClick={() => go(it.id)}
                    aria-current={on ? 'true' : undefined}
                    className={`group relative w-full text-left pl-5 pr-3 py-2.5 transition-colors ${
                      on ? 'text-slate-950 dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {on && <span className={`absolute -left-px top-0 bottom-0 w-0.5 ${a.bar}`} />}
                    <span className="flex items-baseline gap-3">
                      <span className={`text-xs font-mono ${on ? a.text : ''}`}>{String(i + 1).padStart(2, '0')}</span>
                      <span className={`text-base ${on ? 'font-bold' : 'font-medium'}`}>{it.name}</span>
                    </span>
                    <span className="block pl-7 text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">{it.category}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      </aside>

      {/* The read */}
      <div className="lg:col-span-8 space-y-24">
        {items.map((it, i) => {
          const a = ACCENTS[i % ACCENTS.length];
          return (
            <article key={it.id} id={sectionId(it.id)} className="scroll-mt-28">
              <div className={`h-px w-16 mb-8 ${a.bar}`} />
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono mb-4">
                <span className={`font-bold ${a.text}`}>{String(i + 1).padStart(2, '0')}</span>
                <span className="text-slate-600 dark:text-slate-400">{it.category}</span>
                {it.stage && <span className={`font-bold ${STAGE_TONE[it.stage] || ''}`}>● {it.stage}</span>}
                {it.license && <span className="text-slate-600 dark:text-slate-400">{it.license} licensed</span>}
              </div>

              <h2 className="text-5xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-4 leading-[1.02]">{it.name}</h2>
              <p className={`text-xl font-semibold leading-snug mb-8 ${a.text}`}>{it.tagline}</p>

              {it.audience && (
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-10">
                  <span className="font-bold text-slate-900 dark:text-white">Who it's for: </span>{it.audience}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 mb-12">
                <div>
                  <h3 className="text-[11px] font-mono uppercase tracking-wider text-rose-500 dark:text-rose-400 font-bold mb-2">The problem</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{it.problem}</p>
                </div>
                <div>
                  <h3 className="text-[11px] font-mono uppercase tracking-wider text-brand-cyan font-bold mb-2">How it works</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{it.solution}</p>
                </div>
              </div>

              {it.description && (
                <div className="mb-12">
                  <h3 className="text-[11px] font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 font-bold mb-2">Overview</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{it.description}</p>
                </div>
              )}

              {it.points.length > 0 && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 mb-12">
                  {it.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-slate-800 dark:text-slate-200">
                      <span className={`mt-0.5 ${a.text}`}>✦</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              )}

              {it.summary && (
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-12">
                  <span className="font-bold text-slate-900 dark:text-white">In one line: </span>{it.summary}
                </p>
              )}

              {it.stack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-12">
                  {it.stack.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-300 font-mono">{t}</span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3">
                {it.demoUrl && (
                  <a href={it.demoUrl} target="_blank" rel="noopener noreferrer" className={`px-5 py-2.5 rounded-xl text-slate-950 font-semibold text-sm transition-colors ${a.btn}`}>
                    ▶ Launch live ↗
                  </a>
                )}
                {it.repoUrl && (
                  <a href={it.repoUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-xl glass text-slate-900 dark:text-white font-semibold text-sm">
                    View on GitHub ↗
                  </a>
                )}
                {onRequest && (
                  <button onClick={() => onRequest(it.name)} className="px-3 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-brand-cyan transition-colors">
                    Request a walkthrough
                  </button>
                )}
              </div>
              {it.access && <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-4">{it.access}</p>}
            </article>
          );
        })}
      </div>
    </div>
  );
}
