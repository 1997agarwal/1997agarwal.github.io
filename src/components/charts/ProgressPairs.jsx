import React from 'react';

// Before → after bars. Each row shows a starting value and an outcome on the same 0–100 scale.
export default function ProgressPairs({ items }) {
  return (
    <div className="space-y-6">
      {items.map((it) => (
        <div key={it.label}>
          <div className="flex items-baseline justify-between gap-4 mb-2">
            <span className="text-sm font-semibold text-slate-900 dark:text-white">{it.label}</span>
            <span className="text-xs font-mono text-slate-600 dark:text-slate-400">{it.note}</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <span className="w-14 text-[11px] font-mono text-slate-600 dark:text-slate-400">{it.fromLabel}</span>
              <div className="flex-grow h-3 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                <div className="h-full rounded-full bg-slate-400/60 dark:bg-slate-500/60" style={{ width: `${it.from}%` }} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`w-14 text-[11px] font-mono font-bold ${it.toTone}`}>{it.toLabel}</span>
              <div className="flex-grow h-3 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                <div className={`h-full rounded-full bg-gradient-to-r ${it.toGradient}`} style={{ width: `${it.to}%` }} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
