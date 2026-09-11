import React from 'react';
import { accolades, education, certifications } from '../data/portfolioData';

export default function AccoladesSection() {
  return (
    <section id="accolades" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400 mb-3">
          <span>Recognition & Foundation</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Honours, Academic Pedigree & Credentials
        </h2>
        <p className="mt-4 text-sm sm:text-base text-slate-400">
          Recognized by NITI Aayog (Govt of India), executive leadership at Tekion & Tally Solutions, alongside technical foundation from Jaypee Institute of Information Technology.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Accolades List */}
        <div className="lg:col-span-2 bg-surface-card border border-surface-border rounded-2xl p-6 sm:p-8">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
            <span className="text-amber-400">★</span> Major Industry & Corporate Awards
          </h3>

          <div className="space-y-4">
            {accolades.map((acc, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-surface-dark/70 border border-surface-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-amber-500/30 transition-all"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{acc.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {acc.year}
                    </span>
                  </div>
                  <div className="text-xs text-brand-cyan mt-0.5 font-medium">{acc.issuer}</div>
                  <div className="text-xs text-slate-400 mt-1">{acc.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certs */}
        <div className="space-y-8">
          
          {/* Education */}
          <div className="bg-surface-card border border-surface-border rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              <span>Education</span>
            </h3>
            {education.map((edu, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-surface-dark/70 border border-surface-border">
                <h4 className="text-sm font-bold text-white">{edu.degree}</h4>
                <div className="text-xs text-brand-cyan font-mono mt-0.5">{edu.institution}</div>
                <div className="flex items-center justify-between text-xs text-slate-400 mt-2 font-mono">
                  <span>{edu.period}</span>
                  <span className="text-emerald-400 font-bold">{edu.grade}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="bg-surface-card border border-surface-border rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <span>Credentials</span>
            </h3>
            <div className="space-y-2.5">
              {certifications.map((cert, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-surface-dark/70 border border-surface-border flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{cert.name}</div>
                    <div className="text-[11px] text-slate-400">{cert.issuer}</div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
