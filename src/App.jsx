import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

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

const SpatialMonolithCanvas = React.lazy(() => import('./components/SpatialMonolithCanvas'));

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [walkthroughSubject, setWalkthroughSubject] = useState('');
  const [resumeTab, setResumeTab] = useState('quick');

  // Initialize Lenis inertial smooth scroll
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    window.__lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // Pause Lenis when modal is open to avoid background scroll
  useEffect(() => {
    if (window.__lenis) {
      if (isContactOpen || isResumeOpen) {
        window.__lenis.stop();
      } else {
        window.__lenis.start();
      }
    }
  }, [isContactOpen, isResumeOpen]);

  // Shareable deep links: /#resume and /#resume-full
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#resume' || hash === '#resume-full') {
        setResumeTab(hash === '#resume-full' ? 'full' : 'quick');
        setIsResumeOpen(true);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
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
    <div className="min-h-screen bg-surface-dark text-slate-100 flex flex-col selection:bg-brand-cyan selection:text-slate-950 relative overflow-x-hidden">
      {/* 3D Spatial Systems Monolith (Ambient, Inertial, High-Taste, Lazy-Loaded) */}
      <React.Suspense fallback={null}>
        <SpatialMonolithCanvas />
      </React.Suspense>

      {/* Top Navigation */}
      <Navbar
        onOpenContact={handleOpenContact}
        onOpenResume={handleOpenResume}
      />

      {/* Main Content */}
      <main className="flex-grow relative z-10">
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
