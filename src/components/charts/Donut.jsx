import React from 'react';

// Donut with clickable segments. Segments: [{ id, label, value, color }].
// Click or press Enter on a segment (or its legend entry) to select it. The rest dim.
const R = 52;
const C = 2 * Math.PI * R;

export default function Donut({ segments, centerValue, centerLabel, selected, onSelect }) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  let acc = 0;

  const arcs = segments.map((s) => {
    const len = (s.value / total) * C;
    const offset = (acc / total) * C;
    acc += s.value;
    return { ...s, len, offset };
  });

  const pick = (id) => onSelect && onSelect(id);
  const onKey = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      pick(id);
    }
  };

  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 140 140" className="w-52 h-52 flex-shrink-0 outline-none" role="group" aria-label="Portfolio mix. Select a segment to see its detail.">
        <circle cx="70" cy="70" r={R} fill="none" strokeWidth="16" className="stroke-black/5 dark:stroke-white/10" />
        {arcs.map((a) => {
          const isSel = selected === a.id;
          const dim = selected && !isSel;
          return (
            <circle
              key={a.id}
              cx="70"
              cy="70"
              r={R}
              fill="none"
              stroke={a.color}
              strokeWidth={isSel ? 20 : 16}
              strokeDasharray={`${a.len} ${C - a.len}`}
              strokeDashoffset={-a.offset}
              transform="rotate(-90 70 70)"
              opacity={dim ? 0.3 : 1}
              style={{ cursor: 'pointer', transition: 'opacity 0.25s, stroke-width 0.25s' }}
              role="button"
              tabIndex={0}
              className="outline-none"
              aria-pressed={isSel}
              aria-label={`${a.label}: ${a.value}`}
              onClick={() => pick(a.id)}
              onKeyDown={(e) => onKey(e, a.id)}
            />
          );
        })}
        <text x="70" y="72" textAnchor="middle" className="fill-slate-900 dark:fill-white" style={{ fontSize: 26, fontWeight: 800, fontFamily: 'ui-monospace, monospace' }}>
          {centerValue}
        </text>
        <text x="70" y="90" textAnchor="middle" className="fill-slate-600 dark:fill-slate-400" style={{ fontSize: 9, fontFamily: 'ui-monospace, monospace' }}>
          {centerLabel}
        </text>
      </svg>

      <ul className="space-y-2">
        {segments.map((s) => {
          const isSel = selected === s.id;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => pick(s.id)}
                aria-pressed={isSel}
                className={`flex items-center gap-2.5 text-sm text-left rounded-lg px-2 py-1 transition-colors ${
                  isSel ? 'bg-black/5 dark:bg-white/10 text-slate-900 dark:text-white font-semibold' : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span className="w-3 h-3 rounded-sm" style={{ background: s.color }} />
                <span>{s.label}</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{s.value}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
