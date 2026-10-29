import React, { useState } from 'react';
import { Search, Wrench, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

interface HowItWorksSectionProps {
  onStartDiscovery: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onStartDiscovery }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Discovery',
      subtitle: 'Process Audit & Requirement Mapping',
      icon: Search,
      description: 'We analyze your current enquiry handling, common student or customer questions, call logs, and staff follow-up bottlenecks.',
      deliverables: [
        'Review of existing inbound call volume and WhatsApp query trends',
        'Identification of highest-frequency enquiries (fees, timings, admission deadlines)',
        'Architecture blueprint tailored to your coaching institute or business',
        'Definition of escalation rules for urgent or high-value enquiries',
      ],
    },
    {
      number: '02',
      title: 'Implementation',
      subtitle: 'Custom Agent Training & Integration',
      icon: Wrench,
      description: 'We construct and configure your dedicated AI voice agents, WhatsApp conversational flows, and lead routing pipelines without disrupting operations.',
      deliverables: [
        'Voice prompt engineering & telephony number integration',
        'WhatsApp Business API integration with automated response catalog',
        'Lead capture webhooks connecting forms, ads, and staff alert channels',
        'End-to-end sandbox testing of call latency and question accuracy',
      ],
    },
    {
      number: '03',
      title: 'Optimization',
      subtitle: 'Continuous Tuning & Performance Scaling',
      icon: TrendingUp,
      description: 'We continuously calibrate conversation transcripts, tune response precision, and optimize staff notification timing to maximize enquiry-to-admission rates.',
      deliverables: [
        'Weekly audit of unanswered or ambiguous customer questions',
        'Prompt refinements to improve objection handling and query clarity',
        'Staff feedback loop to ensure smooth counseling and follow-up',
        'Ongoing system updates and zero-downtime maintenance',
      ],
    },
  ];

  return (
    <section id="how-it-works" className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[#05070d] border-t border-slate-900 overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <span>02. Methodology</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">Structured Deployment</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display mb-4">
            How It Works
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            A transparent three-phase framework designed to take you from manual enquiry chaos to an automated, dependable conversion engine.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <div
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`p-8 rounded-xl bg-[#0a0f1d] border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-cyan-500/80 shadow-[0_0_25px_rgba(0,240,255,0.15)] bg-[#0d1628]'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-mono font-bold text-cyan-400">{step.number}</span>
                    <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 font-display">
                    {step.title}
                  </h3>
                  <div className="text-xs font-mono text-slate-400 mb-4">
                    {step.subtitle}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <div className="text-xs font-mono text-cyan-400 mb-2 uppercase tracking-wider">
                    Key Outcomes
                  </div>
                  <ul className="space-y-2">
                    {step.deliverables.slice(0, 2).map((del, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 text-xs text-slate-400">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Step Detailed Focus Box */}
        <div className="p-8 rounded-xl border border-slate-800 bg-[#0a0f1d]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                Detailed Scope · Phase {steps[activeStep].number} ({steps[activeStep].title})
              </div>
              <h4 className="text-xl font-bold text-white mb-3 font-display">
                {steps[activeStep].subtitle}
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {steps[activeStep].description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {steps[activeStep].deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-cyan-400 font-mono">→</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="shrink-0 flex flex-col gap-3">
              <button
                onClick={onStartDiscovery}
                className="px-6 py-3 rounded-lg text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white transition-all shadow-[0_0_20px_rgba(0,240,255,0.25)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Initiate Step 01 Discovery</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-[11px] font-mono text-center text-slate-500">
                Fast onboarding · No complex overhaul
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
