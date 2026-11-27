import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProgressPairs from './charts/ProgressPairs';
import UpliftBars from './charts/UpliftBars';
import CareerTimeline from './charts/CareerTimeline';
import Donut from './charts/Donut';
import { COMMERCIAL_VENTURES, OPEN_SOURCE_TOOLS, TRIPPY_FOUNDER_SPOTLIGHT, FIXIT_FOUNDER_SPOTLIGHT, CORPORATE_EXPERIENCE } from '../data/portfolioData';

// Numbers from the resume data, drawn as charts. Values are taken directly from the
// impact lines in portfolioData.js (Tally, Frendy, Shiprocket, Tekion).
const CHANGE_CARD = [
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
    label: 'Context sent to the model (ContextPrism)',
    from: 100,
    to: 15,
    fromLabel: 'Before',
    toLabel: 'After',
    toTone: 'text-violet-600 dark:text-violet-400',
    toGradient: 'from-violet-400 to-fuchsia-400',
    note: '−85% from AST pruning',
  },
];

const UPLIFT = [
  { label: 'On-time courier pickups (Shiprocket)', value: 12, display: '+12%', tone: 'text-brand-cyan', gradient: 'from-brand-cyan to-brand-blue' },
  { label: 'Escalation resolution (Shiprocket)', value: 16, display: '+16%', tone: 'text-brand-blue', gradient: 'from-brand-blue to-indigo-500' },
  { label: 'First-order completion (Frendy)', value: 45, display: '+45%', tone: 'text-emerald-600 dark:text-emerald-400', gradient: 'from-emerald-400 to-teal-400' },
];

// Tekion has no published before-and-after number, so this row is qualitative. It describes the
// workflow change in portfolioData.js (electronic invoice clearance and self-serve Promise-to-Pay).
// Two-line summary of the Tekion work, from the Customer Portal and AI bullets in the resume.
const TEKION_SUMMARY =
  'Built a self-serve B2B Business Portal where dealers view invoices, track statements and pay online, improving cash flow and reducing receivables. AI collections and an AR assistant are in progress.';

// Tekion Customer Portal pricing: $500 per dealership per month. Annual revenue is the calculation
// dealerships × $500 × 12. Dealership counts come from the launch (200+) and roadmap (1,000+) in the data.
const PRICE_PER_MONTH = 500;
const PRICING = [
  { label: '200+ dealers at launch', value: (200 * PRICE_PER_MONTH * 12) / 1e6, display: '$1.2M / yr', tone: 'text-violet-600 dark:text-violet-400', gradient: 'from-violet-400 to-fuchsia-400' },
  { label: '1,000+ dealerships (roadmap)', value: (1000 * PRICE_PER_MONTH * 12) / 1e6, display: '$6M / yr', tone: 'text-violet-600 dark:text-violet-400', gradient: 'from-violet-500 to-indigo-500' },
];

// Test counts as listed in each project's stack in portfolioData.js.
const TESTS = [
  { label: 'Housy', value: 265, display: '265', tone: 'text-brand-cyan', gradient: 'from-brand-cyan to-brand-blue' },
  { label: 'FixIT', value: 76, display: '76', tone: 'text-cyan-600 dark:text-cyan-300', gradient: 'from-cyan-400 to-blue-400' },
  { label: 'ReverseUI', value: 24, display: '24', tone: 'text-emerald-600 dark:text-emerald-400', gradient: 'from-emerald-400 to-teal-400' },
];

const CAREER = [
  { company: 'Frendy', role: 'Junior PM', period: '2019 – 2020', start: 2019.0, end: 2020.5, gradient: 'from-slate-300 to-slate-400' },
  { company: 'Shiprocket', role: 'Associate PM', period: 'Jun 2020 – Mar 2021', start: 2020.45, end: 2021.25, gradient: 'from-cyan-300 to-cyan-400' },
  { company: 'Tally', role: 'Product Manager', period: 'Apr 2021 – Jun 2024', start: 2021.25, end: 2024.45, gradient: 'from-blue-300 to-cyan-300' },
  { company: 'Tekion', role: 'Product Manager', period: 'Jun 2024 – Present', start: 2024.45, end: 2026.9, gradient: 'from-cyan-300 to-teal-300' },
];


const MIX = [
  { id: 'companies', label: 'Companies', value: CORPORATE_EXPERIENCE.length, color: '#8b5cf6' },
  { id: 'startups', label: 'Startups', value: 2, color: '#f59e0b' },
  { id: 'commercial', label: 'Commercial platforms', value: COMMERCIAL_VENTURES.length, color: '#3b82f6' },
  { id: 'open-source', label: 'Open-source tools', value: OPEN_SOURCE_TOOLS.length, color: '#10b981' },
];

export default function ChartsSection() {
  const productCount = MIX.reduce((s, m) => s + m.value, 0);
  const [selected, setSelected] = useState('commercial');

  return (
    <section aria-labelledby="charts-heading" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-xs font-mono uppercase tracking-widest text-brand-cyan mb-3">The numbers</p>
      <h2 id="charts-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-12 max-w-2xl">
        Outcomes, charted.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2 glass rounded-3xl p-7">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">What I have shipped</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">Tap a colour to see what is in that group.</p>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <Donut segments={MIX} centerValue={productCount} centerLabel="total" selected={selected} onSelect={setSelected} />
            <ShippedDetail selected={selected} />
          </div>
        </div>
        <div className="glass rounded-3xl p-7">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Before and after</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">Each bar is scaled to 0–100%.</p>
          <div className="space-y-8">
            <div>
              <div className="mt-4 mb-1 text-sm font-semibold text-slate-900 dark:text-white">Business Portal (Tekion)</div>
              <p className="mt-1 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{TEKION_SUMMARY}</p>
              <div className="mt-5">
                <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">Annual revenue at $500 per dealership per month</div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">Dealerships × $500 × 12 months.</p>
                <UpliftBars items={PRICING} max={6} />
              </div>
            </div>
            <ProgressPairs items={CHANGE_CARD} />
          </div>
        </div>

        <div className="glass rounded-3xl p-7">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Measured lifts</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">Improvements during my time in these roles.</p>
          <UpliftBars items={UPLIFT} max={50} />
          <div className="mt-8 pt-6 border-t border-surface-border">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Automated tests</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-5">Test counts from each project's stack.</p>
            <UpliftBars items={TESTS} max={265} />
          </div>
        </div>

        <div className="md:col-span-2 glass rounded-3xl p-7">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Career, 2019 to today</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">Each bar is a role, placed on the calendar.</p>
          <CareerTimeline roles={CAREER} />
        </div>

      </div>
    </section>
  );
}

// Right-hand panel: the detail for the selected segment, shown as clickable project boxes.
function ShippedDetail({ selected }) {
  if (selected === 'open-source') {
    return (
      <div>
        <Heading label="Open-source projects" count={OPEN_SOURCE_TOOLS.length} color="text-emerald-600 dark:text-emerald-400" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {OPEN_SOURCE_TOOLS.map((t) => (
            <Box
              key={t.id}
              to={`/open-source/${t.id}`}
              hover="group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
              name={t.name}
            />
          ))}
        </div>
      </div>
    );
  }

  if (selected === 'companies') {
    return (
      <div>
        <Heading label="Companies I have worked at" count={CORPORATE_EXPERIENCE.length} color="text-violet-600 dark:text-violet-400" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {CORPORATE_EXPERIENCE.map((c) => (
            <Box key={c.id} to="/experience" hover="group-hover:text-violet-600 dark:group-hover:text-violet-400" name={c.company} />
          ))}
        </div>
      </div>
    );
  }

  if (selected === 'startups') {
    return (
      <div>
        <Heading label="Startups" count={2} color="text-amber-600 dark:text-amber-400" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[TRIPPY_FOUNDER_SPOTLIGHT, FIXIT_FOUNDER_SPOTLIGHT].map((s) => (
            <Box
              key={s.name}
              to={s.name === 'Trippy' ? '/trippy' : '/fixit'}
              hover="group-hover:text-amber-600 dark:group-hover:text-amber-400"
              name={s.name}
              chipTone="text-emerald-600 dark:text-emerald-400"
            />
          ))}
        </div>
      </div>
    );
  }

  // Commercial platforms: one set of clickable names
  return (
    <div>
      <Heading label="Commercial platforms" count={COMMERCIAL_VENTURES.length} color="text-blue-600 dark:text-blue-400" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {COMMERCIAL_VENTURES.map((v) => (
          <Box key={v.id} to={`/ventures/${v.id}`} hover="group-hover:text-blue-600 dark:group-hover:text-blue-400" name={v.name} />
        ))}
      </div>
    </div>
  );
}

function Heading({ label, count, color }) {
  return (
    <div className="flex items-baseline justify-between mb-3">
      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400">{label}</span>
      <span className={`text-sm font-extrabold font-mono ${color}`}>{count}</span>
    </div>
  );
}

// One clickable project box, name only.
function Box({ to, hover, name }) {
  return (
    <Link to={to} className={`group flex items-center justify-between gap-3 rounded-xl border border-surface-border bg-surface-card px-4 py-3 transition-colors hover:border-black/20 dark:hover:border-white/20`}>
      <span className={`text-sm font-semibold text-slate-900 dark:text-white transition-colors ${hover}`}>{name}</span>
      <span className="text-slate-500 dark:text-slate-400 transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
    </Link>
  );
}
