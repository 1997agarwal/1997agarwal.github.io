import React from 'react';

// Horizontal bars for single outcome numbers, scaled to the largest value.
export default function UpliftBars({ items, max }) {
  const top = max ?? Math.max(...items.map((i) => i.value));
  return (
    <div className="space-y-5">
      {items.map((it) => (
        <div key={it.label}>
          <div className="flex items-baseline justify-between gap-4 mb-1.5">
            <span className="text-sm text-slate-700 dark:text-slate-300">{it.label}</span>
            <span className={`text-lg font-extrabold font-mono ${it.tone}`}>{it.display}</span>
          </div>
          <div className="h-2.5 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${it.gradient}`}
              style={{ width: `${(it.value / top) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
