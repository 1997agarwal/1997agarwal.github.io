import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import { SiteContext } from './context/SiteContext';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ContactModal from './components/ContactModal';
import ResumeModal from './components/ResumeModal';
import ProjectRedirect from './components/ProjectRedirect';
import { COMMERCIAL_VENTURES, OPEN_SOURCE_TOOLS } from './data/portfolioData';

import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import StartupPage from './pages/StartupPage';
import StartupsPage from './pages/StartupsPage';
import VenturesPage from './pages/VenturesPage';
import OpenSourcePage from './pages/OpenSourcePage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import NotFound from './pages/NotFound';

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

  const openContact = useCallback((subject = '') => {
    setWalkthroughSubject(subject);
    setIsContactOpen(true);
  }, []);

  const openResume = useCallback((tab = 'quick') => {
    setResumeTab(tab);
    setIsResumeOpen(true);
    window.history.replaceState(null, '', tab === 'full' ? '#resume-full' : '#resume');
  }, []);

  const handleCloseResume = () => {
    setIsResumeOpen(false);
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  };

  return (
    <SiteContext.Provider value={{ openContact, openResume }}>
      <div className="min-h-screen bg-surface-dark text-slate-900 dark:text-slate-100 flex flex-col selection:bg-brand-cyan selection:text-slate-950 relative overflow-x-clip transition-colors duration-300">
        <ScrollToTop />
        <ScrollProgress />

        <Navbar
          onOpenContact={() => openContact()}
          onOpenResume={() => openResume('quick')}
        />

        <main className="flex-grow relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/startups" element={<StartupsPage />} />
            <Route path="/trippy" element={<StartupPage active="trippy" />} />
            <Route path="/fixit" element={<StartupPage active="fixit" />} />
            <Route path="/ventures" element={<VenturesPage />} />
            <Route path="/ventures/:projectId" element={<ProjectRedirect base="/ventures" items={COMMERCIAL_VENTURES} />} />
            <Route path="/open-source" element={<OpenSourcePage />} />
            <Route path="/open-source/:projectId" element={<ProjectRedirect base="/open-source" items={OPEN_SOURCE_TOOLS} />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer onOpenContact={() => openContact()} />

        <BackToTop />

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
    </SiteContext.Provider>
  );
}
