import React from 'react';

// Simple conic-gradient donut with a legend. Segments: [{ label, value, color }]
export default function Donut({ segments, centerValue, centerLabel }) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  let acc = 0;
  const stops = segments.map((s) => {
    const from = (acc / total) * 360;
    acc += s.value;
    const to = (acc / total) * 360;
    return `${s.color} ${from}deg ${to}deg`;
  });

  return (
    <div className="flex items-center gap-8">
      <div
        className="relative w-36 h-36 rounded-full flex-shrink-0"
        style={{ background: `conic-gradient(${stops.join(', ')})` }}
        role="img"
        aria-label={segments.map((s) => `${s.label}: ${s.value}`).join(', ')}
      >
        <div className="absolute inset-4 rounded-full bg-surface-card flex flex-col items-center justify-center">
          <span className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">{centerValue}</span>
          <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400">{centerLabel}</span>
        </div>
      </div>
      <ul className="space-y-2.5">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300">
            <span className="w-3 h-3 rounded-sm" style={{ background: s.color }} />
            <span>{s.label}</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">{s.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
