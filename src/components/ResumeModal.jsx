import React from 'react';
import { personalInfo, experiences, education, accolades, certifications } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 print:p-0 print:bg-white print:static animate-fadeIn">
      
      {/* Container / Paper Surface */}
      <div className="bg-white text-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 print:my-0 print:border-none print:shadow-none print:rounded-none">
        
        {/* Modal Controls Bar (Hidden during Print) */}
        <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Interactive Executive Resume • ATS Optimized</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-lg bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span>Download PDF / Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <div className="p-8 sm:p-12 print:p-6 text-[13px] leading-relaxed font-sans text-slate-800">
          
          {/* Header */}
          <header className="border-b-2 border-slate-900 pb-5 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 uppercase">
                  {personalInfo.name}
                </h1>
                <p className="text-sm font-semibold text-indigo-700 mt-0.5 tracking-wide">
                  AI-Native Product Manager • 0→1 Systems Builder • Platform Architect
                </p>
              </div>
              <div className="text-xs text-slate-600 sm:text-right font-medium space-y-0.5">
                <div>{personalInfo.location.split('•')[0]} • +91 8130803028</div>
                <div>
                  <a href={`mailto:${personalInfo.email}`} className="text-indigo-600 hover:underline">{personalInfo.email}</a>
                </div>
                <div className="space-x-2 font-mono text-[11px]">
                  <a href="https://1997agarwal.github.io" className="text-indigo-600 hover:underline">1997agarwal.github.io</a> •
                  <a href={personalInfo.links.linkedin} className="text-indigo-600 hover:underline">linkedin.com/in/1997agarwal</a> •
                  <a href={personalInfo.links.github} className="text-indigo-600 hover:underline">github.com/1997agarwal</a>
                </div>
              </div>
            </div>
          </header>

          {/* Executive Summary */}
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Executive Profile
            </h2>
            <p className="text-xs text-slate-700 leading-normal text-justify">
              Product Manager with 7+ years of experience building, scaling, and architecting 0-to-1 enterprise fintech platforms, SaaS products, and high-growth consumer logistics. Proven track record scaling platforms to 500,000+ active users, driving +41% ecosystem adoption deltas, and compressing Days Sales Outstanding (DSO). Hands-on builder combining customer discovery, data modeling, and master PRDs with multi-agent AI pipelines and production engineering.
            </p>
          </section>

          {/* Core Competencies */}
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Core Competencies & Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-700">
              <div>
                <strong className="text-slate-900 block font-semibold">Product Leadership:</strong>
                0→1 Discovery, Master PRDs, Customer Journey Mapping, GTM Strategy, Unit Economics (CAC/LTV, DSO, GMV).
              </div>
              <div>
                <strong className="text-slate-900 block font-semibold">AI & Systems:</strong>
                Autonomous Agent Pipelines, Multi-Model Prompt Evaluation, Vector Similarity (pgvector), AST Context FinOps.
              </div>
              <div>
                <strong className="text-slate-900 block font-semibold">Platforms & Engineering:</strong>
                Enterprise B2B Payments, AR Portals, React, Node.js, Express, SQL, RESTful APIs, 4-File Parity Governance.
              </div>
            </div>
          </section>

          {/* Professional Corporate Experience */}
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
              Professional Corporate Experience
            </h2>

            <div className="space-y-4">
              {experiences.map((exp, idx) => (
                <div key={idx}>
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

          {/* 0-to-1 Ventures & Open Source DevTools */}
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2.5">
              0→1 Ventures & Open-Source AI Infrastructure
            </h2>

            <div className="space-y-2 text-xs text-slate-700">
              <div>
                <span className="font-bold text-slate-950">Open-Source DevTools</span>
                <span className="text-slate-500 font-mono text-[11px]"> (github.com/1997agarwal)</span>:
                <div className="mt-1 space-y-1">
                  <div>• <strong>SpecForge:</strong> Autonomous 3-agent pipeline converting user discovery voice notes into PRDs, RFCs, and synchronized Linear tickets.</div>
                  <div>• <strong>ContextPrism:</strong> High-performance local token FinOps reverse proxy analyzing code ASTs to cut LLM inference tokens by up to 40%.</div>
                  <div>• <strong>PromptCourt:</strong> Multi-model LLM benchmark arena scoring prompt variations with Elo rating mathematics and statistical rigor.</div>
                </div>
              </div>

              <div className="pt-1">
                <span className="font-bold text-slate-950">Commercial 0→1 Platforms</span>:
                Architected 5 venture platforms: <strong>StartupOS</strong> (AI founder launchpad), <strong>Trippy</strong> (solo travel matching OS), <strong>DupeScout</strong> (CLIP + pgvector multimodal search), <strong>BusinessPay</strong> (B2B AR collections accelerator), and <strong>CollabKaro</strong> (creator escrow marketplace).
              </div>
            </div>
          </section>

          {/* Education & Accolades */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Education, Credentials & Honours
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div>
                <strong className="text-slate-900 block font-semibold">Education & Certifications:</strong>
                <div>• <strong>Duke Corporate Education:</strong> Post-Graduate Program in Product Management (2020)</div>
                <div>• <strong>JIIT Noida:</strong> B.Tech in Electronics & Communication Engineering (2015 – 2019)</div>
                <div>• <strong>Credentials:</strong> Udacity Growth PM Nanodegree, Y Combinator Startup School</div>
              </div>
              <div>
                <strong className="text-slate-900 block font-semibold">Honours & Recognition:</strong>
                <div>• <strong>Tekion Recognition Award (May 2025):</strong> B2B Payment Portal execution</div>
                <div>• <strong>NITI Aayog (Govt. of India):</strong> Top 5 Startup Ideas in India (IoT Road Safety)</div>
                <div>• <strong>Tally Solutions:</strong> The All Star Award (2024), 2x Annual Team of the Year Awards</div>
                <div>• <strong>Techfest, IIT Bombay:</strong> Robotics Zonal Winner, Autonomous Navigation (2016)</div>
              </div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
