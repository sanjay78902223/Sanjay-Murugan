import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavigationProps {
  onContactClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onContactClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#05070d]/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between gap-6 sm:gap-10">
        
        {/* Zone 1: Elegant Brand Wordmark */}
        <a
          href="#"
          className="text-base sm:text-lg font-bold tracking-tight text-white hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 font-display flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>Saan Code n Convert</span>
        </a>

        {/* Zone 2: Simplified & Balanced Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-mono uppercase tracking-wider text-slate-400">
          <a
            href="#services"
            className="hover:text-cyan-300 transition-colors whitespace-nowrap"
          >
            Services
          </a>
          <a
            href="#how-it-works"
            className="hover:text-cyan-300 transition-colors whitespace-nowrap"
          >
            How It Works
          </a>
          <a
            href="#about"
            className="hover:text-cyan-300 transition-colors whitespace-nowrap"
          >
            About
          </a>
          <a
            href="#contact"
            className="hover:text-cyan-300 transition-colors whitespace-nowrap"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: Refined Primary CTA */}
        <div className="hidden md:flex items-center shrink-0">
          <button
            onClick={onContactClick}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 rounded-lg transition-all shadow-sm hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] whitespace-nowrap cursor-pointer flex items-center gap-1.5"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-1.5 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#05070d]/98 border-b border-slate-800 px-6 py-5 flex flex-col gap-4 animate-in fade-in duration-200">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-slate-300 hover:text-cyan-400 py-1"
          >
            Services
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-slate-300 hover:text-cyan-400 py-1"
          >
            How It Works
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-slate-300 hover:text-cyan-400 py-1"
          >
            About
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-slate-300 hover:text-cyan-400 py-1"
          >
            Contact
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onContactClick();
            }}
            className="w-full mt-2 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all shadow-md text-center flex items-center justify-center gap-1.5"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </header>
  );
};
