import React from 'react';
import { personalInfo } from '../data/portfolioData';

export default function Footer({ onOpenContact }) {
  return (
    <footer className="border-t border-surface-border bg-surface-dark/80 py-12 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand info */}
          <div className="text-center md:text-left">
            <div className="font-bold text-white text-base tracking-tight mb-1">
              Harshit Agarwal
            </div>
            <p className="text-slate-400 max-w-sm">
              Product Manager by Profession • Founder & 0-to-1 Systems Builder. Centralized Personal Branding System.
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap justify-center gap-6 font-mono text-xs">
            <a href="#experience" className="hover:text-brand-cyan transition-colors">Experience</a>
            <a href="#ventures" className="hover:text-brand-cyan transition-colors">Ventures</a>
            <a href="#opensource" className="hover:text-brand-cyan transition-colors">Open Source</a>
            <a href="#casestudies" className="hover:text-brand-cyan transition-colors">Case Studies</a>
            <a href="#accolades" className="hover:text-brand-cyan transition-colors">Accolades</a>
            <button onClick={onOpenContact} className="text-brand-cyan hover:underline">Contact</button>
          </div>

          {/* Socials & Copyright */}
          <div className="text-center md:text-right font-mono text-[11px] text-slate-400">
            <div className="flex justify-center md:justify-end gap-4 mb-2">
              <a href={personalInfo.links.github} target="_blank" rel="noreferrer" className="hover:text-white">
                GitHub: 1997agarwal
              </a>
              <span>•</span>
              <a href={personalInfo.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">
                LinkedIn: 1997agarwal
              </a>
            </div>
            <div>
              © {new Date().getFullYear()} Harshit Agarwal. Engineered with React + Tailwind.
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
