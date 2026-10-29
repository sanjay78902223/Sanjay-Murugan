/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { CinematicHero } from './components/CinematicHero';
import { ServicesSection } from './components/ServicesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedService, setSelectedService] = useState<string>('AI Voice Agents');

  // Handle autostart query parameter if provided
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      const servicesEl = document.getElementById('services');
      if (servicesEl) {
        servicesEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const handleScrollToContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToServices = () => {
    const servicesEl = document.getElementById('services');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName);
    handleScrollToContact();
  };

  return (
    <div className="min-h-screen bg-[#05070d] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300 w-full max-w-full overflow-x-clip">
      {/* 3-Zone Top Navigation */}
      <Navigation onContactClick={handleScrollToContact} />

      <main className="flex-1 w-full max-w-full overflow-x-clip">
        {/* Main Feature: Scroll-Controlled Cinematic Experience (Hero -> Kinetic Typography -> 3D Cube -> Transition) */}
        <CinematicHero onExploreClick={handleScrollToServices} />

        {/* Core Agency Services */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* How It Works (Discovery, Implementation, Optimization) */}
        <HowItWorksSection onStartDiscovery={handleScrollToContact} />

        {/* About Saan Code n Convert */}
        <AboutSection onContactClick={handleScrollToContact} />

        {/* Direct Contact & Consultation Form */}
        <ContactSection initialService={selectedService} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
