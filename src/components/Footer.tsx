import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#03050a] border-t border-slate-900 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-slate-900">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <a href="#" className="text-xl font-bold tracking-tight text-white font-display block">
              Saan Code n Convert
            </a>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Specialized AI automation agency helping coaching institutes and small businesses automate repetitive processes, manage enquiries, and improve customer follow-up.
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
              <span>AI Voice Agents</span>
              <span>·</span>
              <span>WhatsApp Automation</span>
              <span>·</span>
              <span>Lead Systems</span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 font-semibold">
              Navigation
            </div>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#cinematic-stage" className="hover:text-white transition-colors">
                  Cinematic Experience
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Core Services
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Saan Code n Convert
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact & Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions Summary */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 font-semibold">
              Target Solutions
            </div>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center justify-between">
                <span>AI Voice Agents</span>
                <span className="text-xs font-mono text-slate-600">Telephony</span>
              </li>
              <li className="flex items-center justify-between">
                <span>WhatsApp AI Automation</span>
                <span className="text-xs font-mono text-slate-600">Conversational</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Lead Management Systems</span>
                <span className="text-xs font-mono text-slate-600">Pipeline</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} Saan Code n Convert. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Scroll-driven 3D Experience</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
