import React from 'react';

// Gantt-style career chart. Times are decimal years (2019.0 = Jan 2019).
const START = 2019;
const END = 2027;
const span = END - START;
const pct = (y) => ((y - START) / span) * 100;

export default function CareerTimeline({ roles }) {
  const years = Array.from({ length: span + 1 }, (_, i) => START + i);

  return (
    <div>
      <div className="relative">
        {roles.map((r) => (
          <div key={r.company} className="relative flex items-center gap-4 py-2.5">
            <div className="w-32 sm:w-40 flex-shrink-0">
              <div className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{r.company}</div>
              <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400">{r.period}</div>
            </div>
            <div className="relative flex-grow h-8 rounded-lg bg-black/[0.03] dark:bg-white/[0.03]">
              <div
                className={`absolute top-1 bottom-1 rounded-md bg-gradient-to-r ${r.gradient} shadow-md shadow-black/10 flex items-center px-2.5 overflow-hidden`}
                style={{ left: `${pct(r.start)}%`, width: `${pct(r.end) - pct(r.start)}%` }}
              >
                <span className="text-[11px] font-semibold text-slate-950 truncate">{r.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Year axis aligned with the bars above */}
      <div className="flex gap-4 mt-3">
        <div className="w-32 sm:w-40 flex-shrink-0" />
        <div className="relative flex-grow h-5">
          {years.map((y) => (
            <span
              key={y}
              className="absolute -translate-x-1/2 text-[10px] font-mono text-slate-600 dark:text-slate-400"
              style={{ left: `${pct(y)}%` }}
            >
              {y}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
