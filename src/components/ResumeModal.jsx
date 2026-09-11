import React, { useEffect } from 'react';
import { personalInfo, experiences } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-start p-3 sm:p-6 print:p-0 print:bg-white print:static animate-fadeIn">
      
      {/* Top Floating Control Bar (Always visible on screen, hidden in print) */}
      <div className="w-full max-w-4xl mb-4 flex items-center justify-between bg-slate-900/95 border border-slate-700/80 px-4 sm:px-6 py-3 rounded-xl shadow-2xl print:hidden sticky top-3 z-50 backdrop-blur-lg">
        {/* Left: Back / Close button */}
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-lg border border-slate-600/60 transition-all group"
        >
          <svg className="w-4 h-4 text-brand-cyan group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Portfolio</span>
        </button>

        {/* Center: Recruiter Title */}
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-300 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>ATS-Friendly Executive Resume • Single-Page Layout</span>
        </div>

        {/* Right: Download PDF Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-lg bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
            title="Save as PDF or Print"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download PDF / Print</span>
          </button>
          
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Resume Sheet */}
      <div className="bg-white text-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden print:m-0 print:p-0 print:border-none print:shadow-none print:rounded-none">
        
        <div className="p-8 sm:p-12 print:p-8 text-[13px] leading-relaxed font-sans text-slate-800">
          
          {/* Header Block with Name, Role, and Tagline */}
          <header className="border-b-2 border-slate-900 pb-5 mb-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 uppercase">
                  HARSHIT AGARWAL
                </h1>
                <p className="text-sm sm:text-base font-bold text-indigo-700 mt-1">
                  Product Manager • 0→1 Systems Builder
                </p>
                <p className="text-xs text-slate-600 mt-1 max-w-xl italic">
                  "Turning ambiguous, high-friction problems into scalable software products with customer-backed metrics and cross-functional leadership."
                </p>
              </div>

              {/* Direct Contact Metadata */}
              <div className="text-xs text-slate-600 sm:text-right font-medium space-y-1">
                <div>Bengaluru, India • +91 8130803028</div>
                <div>
                  <a href="mailto:agarwal.harshit97@gmail.com" className="text-indigo-600 font-semibold hover:underline">
                    agarwal.harshit97@gmail.com
                  </a>
                </div>
                <div className="font-mono text-[11px] text-indigo-600 space-x-1.5">
                  <a href="https://1997agarwal.github.io" target="_blank" rel="noreferrer" className="hover:underline">portfolio</a> •
                  <a href="https://www.linkedin.com/in/1997agarwal/" target="_blank" rel="noreferrer" className="hover:underline">linkedin</a> •
                  <a href="https://github.com/1997agarwal" target="_blank" rel="noreferrer" className="hover:underline">github</a>
                </div>
              </div>
            </div>
          </header>

          {/* Executive Summary */}
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Executive Profile
            </h2>
            <p className="text-xs text-slate-700 leading-normal text-justify">
              Product Manager with 7+ years of experience conceptualizing, scaling, and architecting 0-to-1 enterprise platforms, B2B SaaS, and consumer tech. Proven track record scaling platforms to 500,000+ active users, driving +41% ecosystem adoption deltas, and compressing Days Sales Outstanding (DSO). Combines deep user research, market sizing, and master PRDs with modern AI-assisted product delivery and data-informed roadmap prioritization.
            </p>
          </section>

          {/* PM-Grounded Core Competencies (No misleading developer claims) */}
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Core Competencies & Product Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <strong className="text-slate-950 block font-bold mb-1 text-[11px] uppercase tracking-wide">
                  Product Leadership & Strategy
                </strong>
                0→1 Product Discovery, Master PRDs, User Journey Mapping, Feature Prioritization, Customer Feedback Loops, Go-To-Market (GTM) Execution, Stakeholder Alignment.
              </div>

              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <strong className="text-slate-950 block font-bold mb-1 text-[11px] uppercase tracking-wide">
                  AI & Product Innovation
                </strong>
                AI Product Scoping, Multi-Agent Workflow Design, LLM Prompt Architecture, Multimodal Feature Design, Human-in-the-Loop Workflows, Model Benchmarking.
              </div>

              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <strong className="text-slate-950 block font-bold mb-1 text-[11px] uppercase tracking-wide">
                  Metrics, Data & Process
                </strong>
                North Star Metrics, Retention & Funnel Analytics, Unit Economics (CAC/LTV, DSO), Agile/Scrum Sprint Leadership, API Contract Scoping, User Story Mapping.
              </div>
            </div>
          </section>

          {/* Professional Corporate Experience */}
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
              Professional Experience
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

          {/* 0-to-1 Ventures & Developer Tooling */}
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2.5">
              0→1 Ventures & Public Developer Infrastructure
            </h2>

            <div className="space-y-2 text-xs text-slate-700">
              <div>
                <span className="font-bold text-slate-950">Open-Source Developer Infrastructure</span>
                <span className="text-slate-500 font-mono text-[11px]"> (github.com/1997agarwal)</span>:
                <div className="mt-1 space-y-1">
                  <div>• <strong>SpecForge:</strong> Productized 3-stage agent pipeline converting unstructured user discovery calls into master PRDs and synchronized Linear tickets.</div>
                  <div>• <strong>ContextPrism:</strong> High-performance local token FinOps gateway analyzing code ASTs to eliminate prompt bloat, reducing inference token spend by up to 40%.</div>
                  <div>• <strong>PromptCourt:</strong> Multi-model LLM benchmark arena scoring competing prompt outputs using Elo rating mathematics and statistical significance.</div>
                </div>
              </div>

              <div className="pt-1">
                <span className="font-bold text-slate-950">Commercial Software Platforms (0→1 Concept to Release)</span>:
                Architected 5 venture solutions: <strong>StartupOS</strong> (founder incubator), <strong>Trippy</strong> (AI solo-travel matching OS), <strong>DupeScout</strong> (visual similarity shopping engine), <strong>BusinessPay</strong> (B2B early discount accelerator), and <strong>CollabKaro</strong> (creator escrow milestone marketplace).
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
                <div>• <strong>Duke Corporate Education:</strong> Post-Graduate Program in Product Management (2020)</div>
                <div>• <strong>Jaypee Institute of Information Technology (JIIT):</strong> B.Tech in Electronics & Communication (2015 – 2019)</div>
                <div>• <strong>Certifications:</strong> Udacity Growth PM Nanodegree, Y Combinator Startup School</div>
              </div>
              <div>
                <strong className="text-slate-900 block font-semibold">Major Honors & Awards:</strong>
                <div>• <strong>Tekion Recognition Award (May 2025):</strong> B2B Payment Portal rollout</div>
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
