import React, { useState, useEffect } from 'react';
import Reveal from './components/Reveal';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MetricsRibbon from './components/MetricsRibbon';
import ProductsOverview from './components/ProductsOverview';
import BackToTop from './components/BackToTop';
import TrippyFounderSpotlight from './components/TrippyFounderSpotlight';
import ExperienceSection from './components/ExperienceSection';
import VenturesSection from './components/VenturesSection';
import OpenSourceSection from './components/OpenSourceSection';
import CaseStudiesArchive from './components/CaseStudiesArchive';
import AccoladesSection from './components/AccoladesSection';
import ContactModal from './components/ContactModal';
import ResumeModal from './components/ResumeModal';
import Footer from './components/Footer';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [walkthroughSubject, setWalkthroughSubject] = useState('');
  const [resumeTab, setResumeTab] = useState('quick');

  // Shareable deep links: /#resume (quick view) and /#resume-full
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#resume' || hash === '#resume-full') {
      setResumeTab(hash === '#resume-full' ? 'full' : 'quick');
      setIsResumeOpen(true);
    }
  }, []);

  const handleOpenContact = () => {
    setWalkthroughSubject('');
    setIsContactOpen(true);
  };

  const handleOpenResume = () => {
    setResumeTab('quick');
    setIsResumeOpen(true);
    window.history.replaceState(null, '', '#resume');
  };

  const handleCloseResume = () => {
    setIsResumeOpen(false);
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  };

  const handleRequestWalkthrough = (ventureName) => {
    setWalkthroughSubject(ventureName);
    setIsContactOpen(true);
  };

  return (
    <div className="min-h-screen bg-surface-dark text-slate-100 flex flex-col selection:bg-brand-cyan selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        onOpenContact={handleOpenContact}
        onOpenResume={handleOpenResume}
      />

      {/* Main Content */}
      <main className="flex-grow">
        <Hero
          onOpenContact={handleOpenContact}
          onOpenResume={handleOpenResume}
        />
        <MetricsRibbon />
        <Reveal><ExperienceSection /></Reveal>
        <Reveal><ProductsOverview /></Reveal>
        <Reveal><TrippyFounderSpotlight onRequestWalkthrough={handleRequestWalkthrough} /></Reveal>
        <Reveal><VenturesSection onRequestWalkthrough={handleRequestWalkthrough} /></Reveal>
        <Reveal><OpenSourceSection /></Reveal>
        <Reveal><CaseStudiesArchive /></Reveal>
        <Reveal><AccoladesSection /></Reveal>
      </main>

      {/* Footer */}
      <Footer onOpenContact={handleOpenContact} />

      <BackToTop />

      {/* Modals */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultSubject={walkthroughSubject}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={handleCloseResume}
        initialTab={resumeTab}
      />
    </div>
  );
}
