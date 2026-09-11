import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MetricsRibbon from './components/MetricsRibbon';
import ExperienceSection from './components/ExperienceSection';
import VenturesSection from './components/VenturesSection';
import OpenSourceSection from './components/OpenSourceSection';
import CaseStudiesArchive from './components/CaseStudiesArchive';
import AccoladesSection from './components/AccoladesSection';
import ContactModal from './components/ContactModal';
import Footer from './components/Footer';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [walkthroughSubject, setWalkthroughSubject] = useState('');

  const handleOpenContact = () => {
    setWalkthroughSubject('');
    setIsContactOpen(true);
  };

  const handleRequestWalkthrough = (ventureName) => {
    setWalkthroughSubject(ventureName);
    setIsContactOpen(true);
  };

  return (
    <div className="min-h-screen bg-surface-dark text-slate-100 flex flex-col selection:bg-brand-cyan selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* Main Content */}
      <main className="flex-grow">
        <Hero onOpenContact={handleOpenContact} />
        <MetricsRibbon />
        <ExperienceSection />
        <VenturesSection onRequestWalkthrough={handleRequestWalkthrough} />
        <OpenSourceSection />
        <CaseStudiesArchive />
        <AccoladesSection />
      </main>

      {/* Footer */}
      <Footer onOpenContact={handleOpenContact} />

      {/* Modal Dialog */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultSubject={walkthroughSubject}
      />
    </div>
  );
}
