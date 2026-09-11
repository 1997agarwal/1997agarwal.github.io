import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';

export default function ContactModal({ isOpen, onClose, defaultSubject = '' }) {
  const [subject, setSubject] = useState(defaultSubject ? `Technical Walkthrough Request: ${defaultSubject}` : '');
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoUri = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      subject || 'Inquiry from Portfolio'
    )}&body=${encodeURIComponent(
      `Name: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${message}`
    )}`;
    window.location.href = mailtoUri;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-card border border-surface-border rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider mb-1">
            Initiate Direct Discussion
          </div>
          <h3 className="text-2xl font-bold text-white">
            Connect with Harshit Agarwal
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Available for Principal/Staff PM roles, venture collaborations, or private technical walkthroughs.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-mono mb-1">Your Name</label>
            <input
              type="text"
              required
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="e.g. Elena Vance"
              className="w-full px-3 py-2.5 rounded-lg bg-surface-dark border border-surface-border text-slate-200 focus:outline-none focus:border-brand-cyan"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-mono mb-1">Your Email</label>
            <input
              type="email"
              required
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              placeholder="elena@enterprise.com"
              className="w-full px-3 py-2.5 rounded-lg bg-surface-dark border border-surface-border text-slate-200 focus:outline-none focus:border-brand-cyan"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-mono mb-1">Subject</label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Discussion / Venture Demo Request"
              className="w-full px-3 py-2.5 rounded-lg bg-surface-dark border border-surface-border text-slate-200 focus:outline-none focus:border-brand-cyan"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-mono mb-1">Message</label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about your team, challenge, or what you'd like to dive into..."
              className="w-full px-3 py-2.5 rounded-lg bg-surface-dark border border-surface-border text-slate-200 focus:outline-none focus:border-brand-cyan resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <a
              href={`https://cal.com/1997agarwal`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-brand-cyan hover:underline font-mono"
            >
              Book 15-min sync ↗
            </a>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20"
            >
              Send via Email Client
            </button>
          </div>
        </form>

        {/* Quick Contacts Footer */}
        <div className="mt-6 pt-4 border-t border-surface-border flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Direct: {personalInfo.email}</span>
          <a
            href={personalInfo.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-brand-cyan"
          >
            LinkedIn Message ↗
          </a>
        </div>

      </div>
    </div>
  );
}
