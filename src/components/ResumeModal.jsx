import React, { useEffect, useState } from 'react';
import ResumeQuickView from './ResumeQuickView';
import {
  personalInfo,
  experiences,
  ventures,
  openSourceTools,
  accolades,
  education,
  certifications,
  TRIPPY_FOUNDER_SPOTLIGHT,
} from '../data/portfolioData';

const stripProtocol = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');
const featuredAwards = accolades.filter((a) => a.featured);

const PDF_BY_TAB = {
  quick: { href: './Harshit-Agarwal-Resume-1-Page.pdf', label: 'Download 1-Page PDF' },
  full: { href: './Harshit-Agarwal-Resume-Full.pdf', label: 'Download Full PDF' },
};

export default function ResumeModal({ isOpen, onClose, initialTab = 'quick' }) {
  const [tab, setTab] = useState(initialTab);

  useEffect(() => {
    if (isOpen) setTab(initialTab);
  }, [isOpen, initialTab]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (!isOpen) return undefined;
    document.body.style.overflow = 'hidden';
    document.documentElement.classList.add('resume-open'); // lets print CSS show only the resume
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.classList.remove('resume-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div role="dialog" aria-modal="true" aria-label="Resume" className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-slate-950/90 backdrop-blur-md p-3 sm:p-6 print:p-0 print:bg-white print:static animate-fadeIn">
      
      {/* Centering / Max-width Wrapper */}
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Top Sticky Control Bar */}
        <div className="w-full mb-4 flex items-center justify-between bg-slate-900 border border-slate-700/80 px-4 sm:px-6 py-3 rounded-xl shadow-2xl print:hidden sticky top-3 z-50 backdrop-blur-lg">
          {/* Left: Back to Portfolio Button */}
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-lg border border-slate-600/60 transition-all group cursor-pointer"
          >
            <svg className="w-4 h-4 text-brand-cyan group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="hidden sm:inline">Back</span>
          </button>

          {/* Center: view switcher */}
          <div role="tablist" aria-label="Resume view" className="flex items-center p-1 rounded-lg bg-slate-800 border border-slate-700">
            {[['quick', 'Quick View'], ['full', 'Full Resume']].map(([key, label]) => (
              <button
                key={key}
                role="tab"
                aria-selected={tab === key}
                onClick={() => setTab(key)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  tab === key ? 'bg-brand-cyan text-slate-950' : 'text-slate-300 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Right: Download PDF Action */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:flex px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600/60 text-slate-200 font-semibold text-xs items-center gap-2 transition-all cursor-pointer"
              title="Print this view"
            >
              <span>Print</span>
            </button>

            <a
              href={PDF_BY_TAB[tab].href}
              download
              className="px-4 py-2 rounded-lg bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20 active:scale-95 cursor-pointer"
              title="Download this view as a PDF"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>{PDF_BY_TAB[tab].label}</span>
            </a>
            
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Close"
              aria-label="Close resume"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Resume Sheet */}
        <div className="bg-white text-slate-900 w-full rounded-2xl shadow-2xl border border-slate-200 overflow-hidden mb-12 print:m-0 print:mb-0 print:p-0 print:border-none print:shadow-none print:rounded-none">
          
          {tab === 'quick' ? (
            <ResumeQuickView onShowFull={() => setTab('full')} />
          ) : (
          <div className="p-8 sm:p-12 print:p-8 text-[13px] leading-relaxed font-sans text-slate-800">
            
            {/* Header Block with Name, Role, and Tagline */}
            <header className="border-b-2 border-slate-900 pb-5 mb-5 print:pb-3 print:mb-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 uppercase">
                    HARSHIT AGARWAL
                  </h1>
                  <p className="text-sm sm:text-base font-bold text-indigo-700 mt-1">
                    Senior Product Manager · AI · Builder — 7+ Years of Experience
                  </p>
                  <p className="text-xs text-slate-600 mt-1 max-w-xl italic">
                    "Built products for leading tech companies and early-stage consumer tech startups across AI, Automotive Retail, Ed-Tech, E-commerce, and Logistics."
                  </p>
                </div>

                {/* Direct Contact Metadata */}
                <div className="text-xs text-slate-600 sm:text-right font-medium space-y-1">
                  <div>Bengaluru, India</div>
                  <div>
                    <a href={`mailto:${personalInfo.email}`} className="text-indigo-600 font-semibold hover:underline">
                      {personalInfo.email}
                    </a>
                  </div>
                  <div className="font-mono text-[11px] text-indigo-600 space-x-1.5">
                    <a href="https://1997agarwal.github.io" target="_blank" rel="noreferrer" className="hover:underline">1997agarwal.github.io</a> •
                    <a href={personalInfo.links.linkedin} target="_blank" rel="noreferrer" className="hover:underline">linkedin</a> •
                    <a href={personalInfo.links.github} target="_blank" rel="noreferrer" className="hover:underline">github</a>
                  </div>
                </div>
              </div>
            </header>

            {/* Executive Summary */}
            <section className="mb-5 print:mb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                Executive Profile
              </h2>
              <p className="text-xs text-slate-700 leading-normal text-justify">
                Senior Product Manager with 7+ years of experience conceptualizing, scaling, and architecting 0-to-1 enterprise platforms, B2B SaaS, and consumer tech. Proven track record scaling platforms to 500,000+ active users, growing platform adoption from 19% to 60%, and compressing Days Sales Outstanding (DSO). Combines deep user research, market sizing, and master PRDs with modern AI-assisted product delivery and data-informed roadmap prioritization.
              </p>
            </section>

            {/* Categorized Skills Extracted from User Resume */}
            <section className="mb-5 print:mb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2.5">
                Core Competencies & Skills
              </h2>

              <div className="space-y-2.5 text-xs">
                
                {/* Category 1: Product Management & Strategy */}
                <div>
                  <span className="font-bold text-slate-950 uppercase tracking-wide text-[11px] block mb-1.5">
                    Product Management & Strategy
                  </span>
                  <div className="flex flex-wrap gap-1.5 print:gap-x-1 print:gap-y-0">
                    {[
                      'Product Management', 'Product Strategy', 'Product Roadmap', 'Product Adoption',
                      'Product-Led Growth (PLG)', 'PDLC', 'Problem Solving', 'Go-To-Market (GTM)',
                      'Pricing Strategy', 'Digital Marketing', 'Customer Discovery', 'PRDs'
                    ].map((s, i) => (
                      <span key={i} className="print:p-0 print:border-0 print:bg-transparent print:after:content-[','] print:last:after:content-[''] px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-900 font-medium text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Category 2: AI & Emerging Tech */}
                <div>
                  <span className="font-bold text-slate-950 uppercase tracking-wide text-[11px] block mb-1.5">
                    AI & Emerging Tech
                  </span>
                  <div className="flex flex-wrap gap-1.5 print:gap-x-1 print:gap-y-0">
                    {[
                      'Generative AI', 'Agentic AI', 'LLM Prompt Scoping', 'AI Evals & Benchmarking',
                      'AI Intents & Workflows', 'AI Assistant Chatbots', 'AI Collections Scoring', 'AGI Exploration'
                    ].map((s, i) => (
                      <span key={i} className="print:p-0 print:border-0 print:bg-transparent print:after:content-[','] print:last:after:content-[''] px-2 py-0.5 rounded bg-cyan-50 border border-cyan-200 text-cyan-900 font-medium text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Category 3: Design, Analytics & Tooling */}
                <div>
                  <span className="font-bold text-slate-950 uppercase tracking-wide text-[11px] block mb-1.5">
                    Design, Analytics & Tooling
                  </span>
                  <div className="flex flex-wrap gap-1.5 print:gap-x-1 print:gap-y-0">
                    {[
                      'Wireframing', 'Figma', 'UI/UX Design', 'Product Analytics', 'Data Analysis',
                      'SQL Queries', 'API Scoping', 'Postman', 'Agile / Scrum', 'n8n Automation', 'Lovable'
                    ].map((s, i) => (
                      <span key={i} className="print:p-0 print:border-0 print:bg-transparent print:after:content-[','] print:last:after:content-[''] px-2 py-0.5 rounded bg-slate-100 border border-slate-300 text-slate-800 font-medium text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </section>

            {/* Professional Corporate Experience */}
            <section className="mb-5 print:mb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
                Professional Experience
              </h2>

              <div className="space-y-4">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="print:break-inside-avoid">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-950">{exp.role}</span>
                        <span className="text-slate-600"> — </span>
                        <span className="font-semibold text-indigo-700">{exp.company}</span>
                      </div>
                      <div className="text-xs text-slate-500 font-mono">
                        {exp.period} | {exp.location.split(',')[0]}
                      </div>
                    </div>

                    <ul className="list-disc list-outside ml-4 mt-1.5 space-y-1 text-xs text-slate-700">
                      {exp.highlights.map((bullet, bIdx) => (
                        <li key={bIdx} className="leading-snug">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* 0-to-1 Ventures & Developer Tooling */}
            <section className="mb-5 print:mb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2.5">
                0→1 Ventures & Public Developer Infrastructure
              </h2>

              <div className="space-y-2 text-xs text-slate-700">
                <div>
                  <span className="font-bold text-slate-950">Open-Source Developer Infrastructure</span>
                  <span className="text-slate-500 font-mono text-[11px]"> (github.com/1997agarwal)</span>:
                  <div className="mt-1 space-y-1">
                    {openSourceTools.map((tool) => (
                      <div key={tool.id}>• <strong>{tool.name}:</strong> <span className="print:hidden">{tool.resumeSummary}</span><span className="hidden print:inline">{tool.resumeSummary.split(';')[0].replace(/\.$/, '')}.</span></div>
                    ))}
                  </div>
                </div>

                <div className="pt-1 space-y-1.5">
                  <div>
                    <span className="font-bold text-slate-950">Founder & Systems Architect — Trippy</span>
                    <span className="text-slate-500 font-mono text-[11px]"> ({stripProtocol(TRIPPY_FOUNDER_SPOTLIGHT.liveUrl)})</span>:
                    <div className="text-slate-700 leading-snug">
                      {TRIPPY_FOUNDER_SPOTLIGHT.resumeSummary}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-slate-950">Proprietary 0→1 Commercial Platforms</span>:
                    {' '}Architected {ventures.length} enterprise and consumer platforms:{' '}
                    {ventures.map((v, i) => (
                      <React.Fragment key={v.name}>
                        <strong>{v.name}</strong> ({v.resumeBlurb} at {stripProtocol(v.demoUrl)})
                        {i < ventures.length - 1 ? ', ' : '.'}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Education, Credentials & Honours */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                Education, Credentials & Honours
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                <div>
                  <strong className="text-slate-900 block font-semibold">Education & Certifications:</strong>
                  {education.map((edu) => (
                    <div key={edu.institution}>• <strong>{edu.institution}:</strong> {edu.degree} ({edu.period})</div>
                  ))}
                  <div>• <strong>Certifications:</strong> {certifications.map((c) => `${c.name} (${c.issuer})`).join(', ')}</div>
                </div>
                <div>
                  <strong className="text-slate-900 block font-semibold">Top Achievements & Awards:</strong>
                  {featuredAwards.map((a) => (
                    <div key={`${a.title}-${a.year}`}>• <strong>{a.title} ({a.year}):</strong> {a.issuer} — {a.resumeNote}</div>
                  ))}
                </div>
              </div>
            </section>

          </div>
          )}

        </div>

      </div>
    </div>
  );
}
