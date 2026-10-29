import React, { useState } from 'react';
import { PhoneCall, MessageSquare, Database, ArrowRight, CheckCircle2, Bot, BellRing } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState<'voice' | 'whatsapp' | 'leads'>('voice');

  const services = [
    {
      id: 'voice',
      title: 'AI Voice Agents',
      subtitle: 'Inbound & Outbound Telephony',
      description: 'AI-powered voice agents that handle customer enquiries and follow-up calls with human-like conversation latency.',
      icon: PhoneCall,
      accentColor: 'text-cyan-400',
      borderColor: 'hover:border-cyan-500/50',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]',
      highlights: [
        'Answers admission and course enquiries instantly without human delay',
        'Executes automated outbound follow-up calls to interested prospects',
        'Transcribes caller details directly into CRM or notification systems',
        'Handles peak-hour call surges with zero wait time',
      ],
      simulation: {
        role: 'AI Voice Representative',
        scenario: 'Coaching Institute Admissions Call',
        dialogue: [
          { speaker: 'Caller', text: 'Hello, I wanted to know the schedule and batch timings for the upcoming exam prep course.' },
          { speaker: 'AI Agent', text: 'Good afternoon! Our weekday batch runs 6:00 PM to 8:30 PM, and the weekend intensive is 10:00 AM to 2:00 PM. Would you like me to reserve a trial seat or text you the full syllabus brochure?' },
          { speaker: 'Caller', text: 'Please send me the syllabus and fee structure on WhatsApp.' },
          { speaker: 'AI Agent', text: 'Done! I have verified your number and sent the syllabus document directly. Our admissions mentor will also follow up tomorrow at 11 AM.' },
        ],
      },
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp AI Automation',
      subtitle: 'Instant Conversational Enquiries',
      description: 'Automated WhatsApp conversations for common questions and business enquiries with continuous 24/7 availability.',
      icon: MessageSquare,
      accentColor: 'text-blue-400',
      borderColor: 'hover:border-blue-500/50',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]',
      highlights: [
        'Instant answers for course fees, curriculum, and registration queries',
        'Automated brochure and timetable PDF delivery over WhatsApp chat',
        'Follow-up sequences that re-engage prospects who went cold',
        'Human-agent handover whenever complex custom guidance is requested',
      ],
      simulation: {
        role: 'WhatsApp AI Assistant',
        scenario: '24/7 Instant Prospect Support',
        dialogue: [
          { speaker: 'Student', text: 'Hi, are admissions open for the Crash Course?' },
          { speaker: 'WhatsApp Bot', text: 'Yes! Only 6 seats remain in Batch A starting Monday. Here is the course overview [PDF attached]. What is your preferred study center location?' },
          { speaker: 'Student', text: 'South Campus center.' },
          { speaker: 'WhatsApp Bot', text: 'South Campus confirmed. Would you like to lock your early-bird registration slot now or schedule a counselor callback?' },
        ],
      },
    },
    {
      id: 'leads',
      title: 'Lead Management Systems',
      subtitle: 'Centralized Pipeline Architecture',
      description: 'Systems that capture leads, organize enquiries, and notify staff for follow-up so no opportunity slips away.',
      icon: Database,
      accentColor: 'text-emerald-400',
      borderColor: 'hover:border-emerald-500/50',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
      highlights: [
        'Captures leads from landing pages, phone calls, social media, and WhatsApp',
        'Auto-categorizes leads by urgency, batch preference, and readiness',
        'Instant notifications sent to staff via Slack, Telegram, or SMS',
        'Status tracking dashboard showing every pending follow-up at a glance',
      ],
      simulation: {
        role: 'Lead Pipeline Dispatcher',
        scenario: 'Automated Enquiry Capture & Team Dispatch',
        dialogue: [
          { speaker: 'System Event', text: 'New inbound enquiry captured from Website Admissions Form (Score: High Intent).' },
          { speaker: 'CRM Engine', text: 'Enquiry enriched with WhatsApp & Voice interaction logs. Tagged: [IIT-JEE Batch 2026].' },
          { speaker: 'Staff Alert', text: 'Notification dispatched to Senior Counselor (Priya M.): Callback requested for today 4:00 PM.' },
          { speaker: 'Status Update', text: 'Follow-up task created, auto-reminder set 15 minutes prior to scheduled call.' },
        ],
      },
    },
  ];

  const currentService = services.find((s) => s.id === activeTab) || services[0];

  return (
    <section id="services" className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[#05070d] border-t border-slate-900 overflow-hidden max-w-full">
      
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[300px] sm:h-[400px] bg-blue-900/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <span>01. Core Capabilities</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">Targeted AI Systems</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display mb-4">
            Autonomous Solutions for Coaching Institutes & Small Businesses
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Eliminate missed calls, late replies, and chaotic spreadsheets. We implement dedicated AI agents and reliable pipelines that capture every lead and execute prompt follow-up.
          </p>
        </div>

        {/* 3 Core Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isSelected = activeTab === service.id;
            return (
              <div
                key={service.id}
                onClick={() => setActiveTab(service.id as any)}
                className={`group relative p-8 rounded-xl bg-[#0a0f1d] border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-cyan-500/80 shadow-[0_0_25px_rgba(0,240,255,0.2)] bg-[#0d1527]'
                    : 'border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Top Row: Index & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono text-slate-500">0{index + 1}</span>
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 ${
                        isSelected ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/40' : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 font-display">
                    {service.title}
                  </h3>
                  <div className="text-xs font-mono text-slate-400 mb-4">
                    {service.subtitle}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div>
                  <ul className="space-y-2 mb-6">
                    {service.highlights.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectService(service.title);
                    }}
                    className="w-full py-2.5 px-4 rounded-lg text-xs font-medium bg-slate-900 hover:bg-cyan-950 border border-slate-800 hover:border-cyan-500/50 text-slate-200 hover:text-cyan-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Request Implementation</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Operational Simulation Preview */}
        <div className="rounded-xl border border-slate-800 bg-[#0a0f1d] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                <Bot className="w-4 h-4" />
                <span>Interactive Workflow Demonstration</span>
              </div>
              <h4 className="text-lg font-bold text-white font-display">
                {currentService.simulation.scenario}
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Active Scenario:</span>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-300">
                {currentService.title}
              </span>
            </div>
          </div>

          {/* Dialogue Log Stream */}
          <div className="space-y-3 font-mono text-xs sm:text-sm">
            {currentService.simulation.dialogue.map((msg, idx) => {
              const isUser = msg.speaker === 'Caller' || msg.speaker === 'Student';
              const isAlert = msg.speaker === 'Staff Alert' || msg.speaker === 'System Event';
              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-lg flex flex-col sm:flex-row sm:items-baseline gap-2 ${
                    isAlert
                      ? 'bg-emerald-950/20 border border-emerald-900/40 text-emerald-300'
                      : isUser
                      ? 'bg-slate-900/70 border border-slate-800 text-slate-300'
                      : 'bg-cyan-950/30 border border-cyan-900/50 text-cyan-200'
                  }`}
                >
                  <span className="font-semibold shrink-0 uppercase tracking-wider text-[11px] opacity-80 min-w-28">
                    {msg.speaker}:
                  </span>
                  <span className="font-sans leading-relaxed">{msg.text}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <BellRing className="w-3.5 h-3.5 text-cyan-400" />
              <span>Real-time response time: &lt; 850ms · Zero manual dispatch needed</span>
            </div>
            <button
              onClick={() => onSelectService(currentService.title)}
              className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 cursor-pointer"
            >
              <span>Build this system for your institute</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
