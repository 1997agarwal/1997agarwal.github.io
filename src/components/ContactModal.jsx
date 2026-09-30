import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';

// Optional: set VITE_CONTACT_FORM_ENDPOINT (e.g. a Formspree URL) to send messages
// straight to your inbox. Without it the form falls back to the visitor's email app.
const FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

const buildSubject = (defaultSubject) =>
  defaultSubject ? `Technical Walkthrough Request: ${defaultSubject}` : '';

export default function ContactModal({ isOpen, onClose, defaultSubject = '' }) {
  const [subject, setSubject] = useState(buildSubject(defaultSubject));
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [copied, setCopied] = useState(false);

  // Re-sync the subject every time the modal opens (the component stays mounted while closed)
  useEffect(() => {
    if (isOpen) {
      setSubject(buildSubject(defaultSubject));
      setStatus('idle');
      setCopied(false);
    }
  }, [isOpen, defaultSubject]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const finalSubject = subject || 'Inquiry from Portfolio';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!FORM_ENDPOINT) {
      const mailtoUri = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
        finalSubject
      )}&body=${encodeURIComponent(
        `Name: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${message}`
      )}`;
      window.location.href = mailtoUri;
      onClose();
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: senderName,
          email: senderEmail,
          subject: finalSubject,
          message,
        }),
      });
      if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`);
      setStatus('sent');
      setMessage('');
    } catch {
      setStatus('error');
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Contact Harshit Agarwal"
    >
      <div className="bg-surface-card border border-surface-border rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close contact form"
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
            Available for Senior PM roles, venture collaborations, or private technical walkthroughs.
          </p>
        </div>

        {status === 'sent' ? (
          <div className="py-8 text-center space-y-4">
            <div className="text-emerald-400 text-lg font-bold">Message sent ✓</div>
            <p className="text-xs text-slate-400">Thanks for reaching out — I'll get back to you soon.</p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-bold text-xs"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label htmlFor="contact-name" className="block text-slate-300 font-mono mb-1">Your Name</label>
              <input
                id="contact-name"
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g. Elena Vance"
                className="w-full px-3 py-2.5 rounded-lg bg-surface-dark border border-surface-border text-slate-200 focus:outline-none focus:border-brand-cyan"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-slate-300 font-mono mb-1">Your Email</label>
              <input
                id="contact-email"
                type="email"
                required
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="elena@enterprise.com"
                className="w-full px-3 py-2.5 rounded-lg bg-surface-dark border border-surface-border text-slate-200 focus:outline-none focus:border-brand-cyan"
              />
            </div>

            <div>
              <label htmlFor="contact-subject" className="block text-slate-300 font-mono mb-1">Subject</label>
              <input
                id="contact-subject"
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Discussion / Venture Demo Request"
                className="w-full px-3 py-2.5 rounded-lg bg-surface-dark border border-surface-border text-slate-200 focus:outline-none focus:border-brand-cyan"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-slate-300 font-mono mb-1">Message</label>
              <textarea
                id="contact-message"
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your team, challenge, or what you'd like to dive into..."
                className="w-full px-3 py-2.5 rounded-lg bg-surface-dark border border-surface-border text-slate-200 focus:outline-none focus:border-brand-cyan resize-none"
              />
            </div>

            {status === 'error' && (
              <p className="text-rose-400" role="alert">
                Couldn't send right now. Please email me directly at {personalInfo.email}.
              </p>
            )}

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="text-xs text-brand-cyan hover:underline font-mono"
              >
                {copied ? 'Email copied ✓' : 'Copy my email'}
              </button>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="px-6 py-2.5 rounded-lg bg-brand-cyan hover:bg-cyan-400 disabled:opacity-60 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20"
              >
                {status === 'sending' ? 'Sending…' : FORM_ENDPOINT ? 'Send Message' : 'Send via Email Client'}
              </button>
            </div>
          </form>
        )}

        {/* Quick Contacts Footer */}
        <div className="mt-6 pt-4 border-t border-surface-border flex items-center justify-between text-xs text-slate-400 font-mono">
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
