import React from 'react';
import ProgressPairs from './charts/ProgressPairs';
import UpliftBars from './charts/UpliftBars';
import CareerTimeline from './charts/CareerTimeline';
import Donut from './charts/Donut';
import { COMMERCIAL_VENTURES, OPEN_SOURCE_TOOLS } from '../data/portfolioData';

// Numbers from the resume data, drawn as charts. Values are taken directly from the
// impact lines in portfolioData.js (Tally, Frendy, Shiprocket, Tekion).
const CHANGE_CARD = [
  {
    label: 'Cart-to-payment drop-off (Frendy)',
    from: 50,
    to: 30,
    fromLabel: 'Before',
    toLabel: 'After',
    toTone: 'text-emerald-600 dark:text-emerald-400',
    toGradient: 'from-emerald-400 to-teal-400',
    note: 'lower is better',
  },
  {
    label: 'Platform adoption (Tally)',
    from: 19,
    to: 60,
    fromLabel: 'Before',
    toLabel: 'After',
    toTone: 'text-brand-blue',
    toGradient: 'from-brand-blue to-brand-cyan',
    note: '2021 → 2024',
  },
];

const UPLIFT = [
  { label: 'On-time courier pickups (Shiprocket)', value: 12, display: '+12%', tone: 'text-brand-cyan', gradient: 'from-brand-cyan to-brand-blue' },
  { label: 'Escalation resolution (Shiprocket)', value: 16, display: '+16%', tone: 'text-brand-blue', gradient: 'from-brand-blue to-indigo-500' },
  { label: 'First-order completion (Frendy)', value: 45, display: '+45%', tone: 'text-emerald-600 dark:text-emerald-400', gradient: 'from-emerald-400 to-teal-400' },
];

const CAREER = [
  { company: 'Frendy', role: 'Junior PM', period: '2019 – 2020', start: 2019.0, end: 2020.5, gradient: 'from-slate-300 to-slate-400' },
  { company: 'Shiprocket', role: 'Associate PM', period: 'Jun 2020 – Mar 2021', start: 2020.45, end: 2021.25, gradient: 'from-cyan-300 to-cyan-400' },
  { company: 'Tally', role: 'Product Manager', period: 'Apr 2021 – Jun 2024', start: 2021.25, end: 2024.45, gradient: 'from-blue-300 to-cyan-300' },
  { company: 'Tekion', role: 'Product Manager', period: 'Jun 2024 – Present', start: 2024.45, end: 2026.9, gradient: 'from-cyan-300 to-teal-300' },
];

const stageCounts = COMMERCIAL_VENTURES.reduce((acc, v) => {
  acc[v.stage] = (acc[v.stage] || 0) + 1;
  return acc;
}, {});

const MIX = [
  { label: 'Startups', value: 2, color: '#f59e0b' },
  { label: 'Commercial platforms', value: COMMERCIAL_VENTURES.length, color: '#06b6d4' },
  { label: 'Open-source tools', value: OPEN_SOURCE_TOOLS.length, color: '#10b981' },
];

export default function ChartsSection() {
  const productCount = MIX.reduce((s, m) => s + m.value, 0);

  return (
    <section aria-labelledby="charts-heading" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-xs font-mono uppercase tracking-widest text-brand-cyan mb-3">The numbers</p>
      <h2 id="charts-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-12 max-w-2xl">
        Outcomes, charted.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="glass rounded-3xl p-7">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Before and after</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">Each bar is scaled to 0–100%.</p>
          <ProgressPairs items={CHANGE_CARD} />
        </div>

        <div className="glass rounded-3xl p-7">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Measured lifts</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">Improvements during my time in these roles.</p>
          <UpliftBars items={UPLIFT} max={50} />
        </div>

        <div className="md:col-span-2 glass rounded-3xl p-7">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Career, 2019 to today</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">Each bar is a role, placed on the calendar.</p>
          <CareerTimeline roles={CAREER} />
        </div>

        <div className="md:col-span-2 glass rounded-3xl p-7">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">What I have shipped</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
            By type. Platforms in beta: {stageCounts.BETA || 0}, in alpha: {stageCounts.ALPHA || 0}.
          </p>
          <Donut segments={MIX} centerValue={productCount} centerLabel="products" />
        </div>
      </div>
    </section>
  );
}
