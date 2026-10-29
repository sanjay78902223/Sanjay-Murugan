import React from 'react';
import { Target, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  return (
    <section id="about" className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[#05070d] border-t border-slate-900 overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <span>03. Agency Profile</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">Mission & Focus</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display mb-4">
            About Saan Code n Convert
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            We are a dedicated AI automation agency built to solve one fundamental challenge: helping businesses capture, qualify, and convert every customer interaction without manual burnout.
          </p>
        </div>

        {/* 2-Column Story / Mission Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch mb-14">
          
          {/* Column 1: Core Story */}
          <div className="p-8 sm:p-10 rounded-xl border border-slate-800 bg-[#0a0f1d] flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3">
                Purpose & Commitment
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 font-display">
                Engineered for Coaching Institutes & Small Businesses
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Coaching institutes and growing small businesses handle dozens of repetitive queries every single day: class schedules, fee structures, admissions criteria, trial class bookings, and appointment rescheduling.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                When staff are busy teaching or managing daily operations, calls go unanswered and messages sit unread. By the time a team member responds hours later, the prospective student or client has moved on to a competitor.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                At <span className="text-cyan-300 font-medium">Saan Code n Convert</span>, we bridge this exact gap. We replace manual friction with autonomous AI voice agents, automated WhatsApp conversations, and clean lead tracking systems that respond within seconds.
              </p>
            </div>

            <div className="pt-8 mt-8 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Saan Code n Convert</span>
              <span className="text-cyan-400">· Intelligent Automation</span>
            </div>
          </div>

          {/* Column 2: 3 Operating Pillars */}
          <div className="space-y-4 flex flex-col justify-between">
            <div className="p-6 rounded-xl border border-slate-800 bg-[#0a0f1d] hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded bg-cyan-950 text-cyan-400 flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <h4 className="text-lg font-bold text-white font-display">
                  Zero Delayed Follow-ups
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Speed to lead determines conversion rates. Our automated workflows engage every inbound enquiry the moment it enters the pipeline.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-[#0a0f1d] hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded bg-blue-950 text-blue-400 flex items-center justify-center">
                  <Target className="w-4 h-4" />
                </div>
                <h4 className="text-lg font-bold text-white font-display">
                  Staff Focus on High-Value Work
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Instead of answering the exact same FAQ 50 times a day, your counselors and administrators only handle qualified students and high-intent clients.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-[#0a0f1d] hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded bg-indigo-950 text-indigo-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-lg font-bold text-white font-display">
                  Practical, Dependable Implementations
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We design straightforward systems that your staff can actually use and rely on, integrated cleanly into your existing phone lines and WhatsApp numbers.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-cyan-900/40 bg-gradient-to-r from-cyan-950/20 to-blue-950/20 flex items-center justify-between">
              <div>
                <div className="text-xs font-mono text-cyan-400 uppercase">Ready to modernize?</div>
                <div className="text-sm font-semibold text-white">Let&apos;s evaluate your current enquiry processes.</div>
              </div>
              <button
                onClick={onContactClick}
                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer shrink-0"
              >
                <span>Talk to Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
